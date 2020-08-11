import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomIconService } from 'src/app/services/icon.service';
import { ChartBreakEvenGwDsComponent } from 'src/app/charts/charts_break_even/chart-break-even-gw-ds/chart-break-even-gw-ds.component';
import { ChartsInvestGwDsComponent } from 'src/app/charts/charts_invest/charts-invest-gw-ds/charts-invest-gw-ds.component';
import { ChartRenditeGwDsComponent } from 'src/app/charts/charts_rendite/chart-rendite-gw-ds/chart-rendite-gw-ds.component';
import { ChartsNettobarwertGwDsComponent } from 'src/app/charts/charts_nettobarwert/charts-nettobarwert-gw-ds/charts-nettobarwert-gw-ds.component';
import { ChartAutarkieEigenverbrauchGwDsComponent } from 'src/app/charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-gw-ds/chart-autarkie-eigenverbrauch-gw-ds.component';
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartStromgestehungskostenGwDsComponent } from 'src/app/charts/charts_stromgestehungskosten/chart-stromgestehungskosten-gw-ds/chart-stromgestehungskosten-gw-ds.component';

interface Lastprofil {
  value: number;
  viewValue: string;
}

interface Betreiber {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-gewerbe-ds-tab',
  templateUrl: './gewerbe-ds-tab.component.html',
  styleUrls: ['./gewerbe-ds-tab.component.css']
})
export class GewerbeDsTabComponent implements OnInit {
  nettobarwert: number;
  rendite: number;
  gewinnkurve: number[];
  eigenverbrauchsanteil: number;
  autarkiegrad: number;
  investition: number;
  sichtbarkeit_einstellungen: boolean = false;
  KonfigurationBoolean: boolean = true;
  stromgestehungskosten: number;
  berechnungForm_gw_ds: FormGroup;

  //Lastprofil Auswahl
  lastprofil_auswahl: Lastprofil[] = [
    { value: 0, viewValue: 'allgemeines Gewerbe' },
    { value: 1, viewValue: 'Gewerbe werktags 8-18 Uhr' },
    { value: 2, viewValue: 'Gewerbe mit starkem Verbrauch in den Abendstunden' },
    { value: 3, viewValue: 'Gewerbe durchlaufend' },
    { value: 4, viewValue: 'Gewerbe Laden/Friseur' },
    { value: 5, viewValue: 'Gewerbe Bäckerei mit Backstube' },
    { value: 6, viewValue: 'Gewerbe Wochenendbetrieb' },
  ];

  //Betreiber Auswahl
  betreiber_auswahl: Betreiber[] = [
    { value: 'betreiber-0', viewValue: 'Betreiber' },
    { value: 'dachpacht-1', viewValue: 'Dachpacht' },
  ];
  
  @Output() transfer_event_gw_ds = new EventEmitter<string>();
  @ViewChild(ChartBreakEvenGwDsComponent) break_even_chart_gw_ds: ChartBreakEvenGwDsComponent;
  @ViewChild(ChartsInvestGwDsComponent) invest_chart_gw_ds: ChartsInvestGwDsComponent;
  @ViewChild(ChartRenditeGwDsComponent) rendite_chart_gw_ds: ChartRenditeGwDsComponent;
  @ViewChild(ChartsNettobarwertGwDsComponent) nettobarwert_chart_gw_ds: ChartsNettobarwertGwDsComponent;
  @ViewChild(ChartAutarkieEigenverbrauchGwDsComponent) autarkie_eva_chart_gw_ds: ChartAutarkieEigenverbrauchGwDsComponent;
  @ViewChild(ChartStromgestehungskostenGwDsComponent) stromgestehung_chart_gw_ds: ChartStromgestehungskostenGwDsComponent;

  constructor(private httpService: HttpService,
    private customIconService: CustomIconService) {
    this.customIconService.init();
  }

  ngOnInit(): void {
    this.berechnungForm_gw_ds = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      'betreiber-control': new FormControl('betreiber-0', Validators.required),
      'leistung_slider_control': new FormControl(80, Validators.required),
      'lastprofil_control': new FormControl(0, Validators.required),
      'jahresstromverbrauch_control': new FormControl(30000, Validators.required),
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

  berechnungSenden() {
    this.httpService.httpPost_gw_ev(this.berechnungForm_gw_ds).subscribe(result => {
      //Entpacken vom Result
      this.nettobarwert = result[0];
      this.rendite = result[1];
      this.gewinnkurve = result[2];
      this.investition = -1 * this.gewinnkurve[0];
      this.eigenverbrauchsanteil = result[3];
      this.autarkiegrad = result[4];
      this.stromgestehungskosten = result[5];
      //aktualisiere Chart
      this.break_even_chart_gw_ds.aktualisiere_chart(this.gewinnkurve);
      this.invest_chart_gw_ds.aktualisiere_chart(this.investition);
      this.nettobarwert_chart_gw_ds.aktualisiere_chart(this.nettobarwert);
      this.rendite_chart_gw_ds.aktualisiere_chart(this.rendite);
      this.autarkie_eva_chart_gw_ds.aktualisiere_chart(this.eigenverbrauchsanteil, this.autarkiegrad);
      this.stromgestehung_chart_gw_ds.aktualisiere_chart(this.stromgestehungskosten);

      if (this.KonfigurationBoolean == true) {
        this.KonfigurationBoolean = false;
      }
    });

  }

  onKonfigurationSpeichern() {
    let data: Ergebnis_Daten[] = [];
    let data_einzeln: Ergebnis_Daten;
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
    data_einzeln.geschaeftsmodell = 'GW: Direktstrom';
    data_einzeln.strompreis = this.berechnungForm_gw_ds.controls["strompreis_control"].value;
    data_einzeln.strompreissteigerung = this.berechnungForm_gw_ds.controls["strompreissteigerung_control"].value;
    data_einzeln.kalkulatorischerZins = this.berechnungForm_gw_ds.controls["kalk_zins_control"].value;
    data_einzeln.Jahresstromverbrauch = this.berechnungForm_gw_ds.controls["jahressstromverbrauch_control"].value;
    data_einzeln.kW = this.berechnungForm_gw_ds.controls["leistung_slider_control"].value;
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
    this.transfer_event_gw_ds.emit('Daten übermittelt');
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
