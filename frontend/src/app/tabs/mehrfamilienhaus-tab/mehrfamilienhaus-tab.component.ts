import { Component, OnInit, ViewChild, EventEmitter, Output} from '@angular/core';
import { CustomIconService } from 'src/app/services/icon.service';
import { HttpService } from 'src/app/services/http.service';
import { ChartBreakEvenMsComponent } from 'src/app/charts/charts_break_even/chart-break-even-ms/chart-break-even-ms.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChartsInvestMsComponent } from 'src/app/charts/charts_invest/charts-invest-ms/charts-invest-ms.component';
import { ChartRenditeMsComponent } from 'src/app/charts/charts_rendite/chart-rendite-ms/chart-rendite-ms.component';
import { ChartsNettobarwertMsComponent } from 'src/app/charts/charts_nettobarwert/charts-nettobarwert-ms/charts-nettobarwert-ms.component';
import { ChartAutarkieEigenverbrauchMsComponent } from 'src/app/charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-ms/chart-autarkie-eigenverbrauch-ms.component';
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartStromgestehungskostenMsComponent } from 'src/app/charts/charts_stromgestehungskosten/chart-stromgestehungskosten-ms/chart-stromgestehungskosten-ms.component';

interface Betreiber {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-mehrfamilienhaus-tab',
  templateUrl: './mehrfamilienhaus-tab.component.html',
  styleUrls: ['./mehrfamilienhaus-tab.component.css']
})
export class MehrfamilienhausTabComponent implements OnInit {
  nettobarwert: number;
  rendite: number;
  gewinnkurve: number[];
  eigenverbrauchsanteil: number;
  autarkiegrad: number;
  investition: number;
  KonfigurationBoolean: boolean = true;
  sichtbarkeit_einstellungen: boolean = false;
  stromgestehungskosten: number;
  berechnungForm_ms: FormGroup;

  @Output() transfer_event_ms = new EventEmitter<string>();
  @ViewChild(ChartBreakEvenMsComponent) break_even_chart_ms: ChartBreakEvenMsComponent;
  @ViewChild(ChartsInvestMsComponent) invest_chart_ms: ChartsInvestMsComponent;
  @ViewChild(ChartRenditeMsComponent) rendite_chart_ms: ChartRenditeMsComponent;
  @ViewChild(ChartsNettobarwertMsComponent) nettobarwert_chart_ms: ChartsNettobarwertMsComponent;
  @ViewChild(ChartAutarkieEigenverbrauchMsComponent) autarkie_eva_chart_ms: ChartAutarkieEigenverbrauchMsComponent;
  @ViewChild(ChartStromgestehungskostenMsComponent) stromgestehung_chart_ms: ChartStromgestehungskostenMsComponent;
  constructor(private httpService: HttpService,
    private customIconService: CustomIconService) {
    this.customIconService.init();
  }
  

  ngOnInit(): void {
    this.berechnungForm_ms = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      'leistung_slider_control': new FormControl(20, Validators.required),
      'betreiber_control': new FormControl('betreiber-0', Validators.required),
      'anzahl_wohneinheiten_control': new FormControl(10, [Validators.required, Validators.min(1), Validators.max(20)]),
      'anteil_wohneinheiten_control': new FormControl(50, [Validators.required, Validators.min(0), Validators.max(100)]),
      'mieterstromzuschlag_control': new FormControl(0, Validators.required),
      'strompreis_control': new FormControl(28, [Validators.required, Validators.min(10), Validators.max(100)]),
      //Immer gleich
      'strompreissteigerung_control': new FormControl(2, [Validators.required, Validators.min(0)]),
      'kalk_zins_control': new FormControl(2, [Validators.required, Validators.min(0)]),
      'dachart_control': new FormControl('2', Validators.required),
      'dachhaelften_control': new FormControl('1', Validators.required),
      'aufstaenderung_control': new FormControl('2', Validators.required),
      'ausrichtung_slider_control': new FormControl(180, Validators.required),
      'aufstellwinkel_slider_control': new FormControl(15, Validators.required),
    });
  }
  //Betreiber Auswahl
  betreiber_auswahl: Betreiber[] = [
    {value: 'betreiber-0', viewValue: 'Betreiber'},
    {value: 'dachpacht-1', viewValue: 'Dachpacht'},
  ]

  berechnungSenden() {
    this.httpService.httpPost_ms(this.berechnungForm_ms).subscribe(result => {
      //Entpacken vom Result
      this.nettobarwert = result[0];
      this.rendite = result[1];
      this.gewinnkurve = result[2];
      this.investition = -1 * this.gewinnkurve[0];
      this.eigenverbrauchsanteil = result[3];
      this.autarkiegrad = result[4];
      this.stromgestehungskosten = result[5];
      //aktualisiere Chart
      this.break_even_chart_ms.aktualisiere_chart(this.gewinnkurve);
      this.invest_chart_ms.aktualisiere_chart(this.investition);
      this.nettobarwert_chart_ms.aktualisiere_chart(this.nettobarwert);
      this.rendite_chart_ms.aktualisiere_chart(this.rendite);
      this.autarkie_eva_chart_ms.aktualisiere_chart(this.autarkiegrad, this.eigenverbrauchsanteil);
      this.stromgestehung_chart_ms.aktualisiere_chart(this.stromgestehungskosten);
      
      if (this.KonfigurationBoolean == true) {
        this.KonfigurationBoolean = false;
      }
    });

  }

  onKonfigurationSpeichern() {
    let data: Ergebnis_Daten[] = [];
    let data_einzeln: Ergebnis_Daten = {};
    let legend: string[] = [];
    let legende_element: string;
    let laenge: number;
    let data_gewinn: Array<number>[] = [];
    let data_gewinn_element: Array<number> = [];


    if (localStorage.getItem("ergebnis_daten") != null) {
      data = JSON.parse(localStorage.getItem("ergebnis_daten"))
    }
    if (localStorage.getItem("legende") != null) {
      legend = JSON.parse(localStorage.getItem("legende"))
    }
    if (localStorage.getItem("gewinnkurve") != null) {
      data_gewinn = JSON.parse(localStorage.getItem("gewinnkurve"));
    }
    laenge = data.length + 1;
    legende_element = "Nummer " + laenge;
    data_gewinn_element = this.gewinnkurve;
    //form auslesen und speichern
    data_einzeln.nummer = laenge;
    data_einzeln.geschaeftsmodell = 'Mieterstrom';
    data_einzeln.strompreis = this.berechnungForm_ms.controls["strompreis_control"].value;
    data_einzeln.strompreissteigerung = this.berechnungForm_ms.controls["strompreissteigerung_control"].value;
    data_einzeln.kalkulatorischerZins = this.berechnungForm_ms.controls["kalk_zins_control"].value;
    data_einzeln.Jahresstromverbrauch = 'Keine Angabe';
    data_einzeln.kW = this.berechnungForm_ms.controls["leistung_slider_control"].value;
    data_einzeln.Investkosten = this.investition;
    data_einzeln.Rendite = this.rendite;
    data_einzeln.Autarkiegrad = this.autarkiegrad;
    data_einzeln.Eigenverbrauchsanteil = this.eigenverbrauchsanteil;

    //Daten Pushen
    data.push(data_einzeln);
    legend.push(legende_element);
    data_gewinn.push(data_gewinn_element);
    localStorage.setItem("ergebnis_daten", JSON.stringify(data));
    localStorage.setItem("legende", JSON.stringify(legend));
    localStorage.setItem("gewinnkurve", JSON.stringify(data_gewinn));
    this.transfer_event_ms.emit('Daten übermittelt');
  }

  onErweiterteEinstellungenChange() {
    this.sichtbarkeit_einstellungen = !this.sichtbarkeit_einstellungen
  }

  formatLabel(value: number) {
    switch (value) {
      case 0:
        return 'N'
      case 45:
        return 'NO'
      case 90:
        return 'O'
      case 135: 
        return 'SO'
      case 180: 
        return 'S'
      case 225: 
        return 'SW'
      case 270:
        return 'W'
      case 315: 
        return 'NW'
      case 360: 
        return 'N'

    }
  }
  
}
