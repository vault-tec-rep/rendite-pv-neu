import { Component, ViewChild, OnInit, EventEmitter, Output, HostListener} from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomIconService } from 'src/app/services/icon.service';
import { ChartBreakEvenEvComponent } from 'src/app/charts/charts_break_even/chart-break-even-ev/chart-break-even-ev.component'
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartsInvestEvComponent } from 'src/app/charts/charts_invest/charts-invest-ev/charts-invest-ev.component';
import { ChartRenditeEvComponent } from 'src/app/charts/charts_rendite/chart-rendite-ev/chart-rendite-ev.component';
import { ChartsNettobarwertEvComponent } from 'src/app/charts/charts_nettobarwert/charts-nettobarwert-ev/charts-nettobarwert-ev.component';
import { ChartAutarkieEigenverbrauchEvComponent } from 'src/app/charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-ev/chart-autarkie-eigenverbrauch-ev.component';
import { ChartStromgestehungskostenEvComponent } from 'src/app/charts/charts_stromgestehungskosten/chart-stromgestehungskosten-ev/chart-stromgestehungskosten-ev.component';

@Component({
  selector: 'app-einfamilienhaus-tab',
  templateUrl: './einfamilienhaus-tab.component.html',
  styleUrls: ['./einfamilienhaus-tab.component.css']
})
export class EinfamilienhausTabComponent implements OnInit {
  nettobarwert: number;
  rendite: number;
  gewinnkurve: number[];
  eigenverbrauchsanteil: number;
  autarkiegrad: number;
  investition: number;
  anzahl_bewohner: number;
  jahresstromverbrauch: number;
  jahresstromverbrauch_2: number;
  wert: number;
  berechnungForm_ev: FormGroup;
  KonfigurationBoolean: boolean = true;
  sichtbarkeit_einstellungen: boolean = false;
  warmwasser: boolean = false;
  stromgestehungskosten: number;

  @Output() transfer_event_ev = new EventEmitter<string>();
  @ViewChild(ChartBreakEvenEvComponent) break_even_chart_ev: ChartBreakEvenEvComponent;
  @ViewChild(ChartsInvestEvComponent) invest_chart_ev: ChartsInvestEvComponent;
  @ViewChild(ChartRenditeEvComponent) rendite_chart_ev: ChartRenditeEvComponent;
  @ViewChild(ChartsNettobarwertEvComponent) nettobarwert_chart_ev: ChartsNettobarwertEvComponent;
  @ViewChild(ChartAutarkieEigenverbrauchEvComponent) autarkie_eva_chart_ev: ChartAutarkieEigenverbrauchEvComponent;
  @ViewChild(ChartStromgestehungskostenEvComponent) stromgestehung_chart_ev: ChartStromgestehungskostenEvComponent;
  constructor(private httpService: HttpService,
    private customIconService: CustomIconService) {
    this.customIconService.init();
  }

  ngOnInit(): void {

    this.berechnungForm_ev = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      //Ändernde Elemente
      'leistung_slider_control': new FormControl(10, Validators.required),
      'speicher_kWh_control': new FormControl(0, Validators.required),
      'anzahl_personen_haushalt_control': new FormControl(1, Validators.required),
      'warmwasser_control': new FormControl(0, Validators.required),
      'jahresstromverbrauch_control': new FormControl(2250, Validators.required),
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
    this.httpService.httpPost_ev(this.berechnungForm_ev).subscribe(result => {
      //Entpacken vom Result
      this.nettobarwert = result[0];
      this.rendite = result[1];
      this.gewinnkurve = result[2];
      this.investition = -1 * this.gewinnkurve[0];
      this.eigenverbrauchsanteil = result[3];
      this.autarkiegrad = result[4];
      this.stromgestehungskosten = result[5];
      //aktualisiere Chart
      this.break_even_chart_ev.aktualisiere_chart(this.gewinnkurve);
      this.invest_chart_ev.aktualisiere_chart(this.investition);
      this.nettobarwert_chart_ev.aktualisiere_chart(this.nettobarwert);
      this.rendite_chart_ev.aktualisiere_chart(this.rendite);
      this.autarkie_eva_chart_ev.aktualisiere_chart(this.autarkiegrad, this.eigenverbrauchsanteil);
      this.stromgestehung_chart_ev.aktualisiere_chart(this.stromgestehungskosten);

      if (this.KonfigurationBoolean == true) {
        this.KonfigurationBoolean = false;
      }
    });
  }

  onKonfigurationSpeichern() {
    let data: Ergebnis_Daten[] = [];
    let data_einzeln: Ergebnis_Daten = {};
    let legend: string[] = [];
    let data_gewinn: Array<number>[] = [];
    let data_gewinn_element: Array<number> = [];
    let legende_element: string;
    let laenge: number;

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
    data_einzeln.geschaeftsmodell = 'Eigenverbrauch';
    data_einzeln.strompreis = this.berechnungForm_ev.controls["strompreis_control"].value;
    data_einzeln.strompreissteigerung = this.berechnungForm_ev.controls["strompreissteigerung_control"].value;
    data_einzeln.kalkulatorischerZins = this.berechnungForm_ev.controls["kalk_zins_control"].value;
    data_einzeln.Jahresstromverbrauch = String(this.berechnungForm_ev.controls["jahresstromverbrauch_control"].value);
    data_einzeln.kW = this.berechnungForm_ev.controls["leistung_slider_control"].value;
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
    this.transfer_event_ev.emit('Daten übermittelt');
  }

  onWarmwasserChange() {
    this.warmwasser = !this.warmwasser;
    this.anzahl_bewohner = this.berechnungForm_ev.controls["anzahl_personen_haushalt_control"].value;

    if (this.warmwasser == true) {
      switch (this.anzahl_bewohner) {
        case 1:
          this.wert = 2650;
          break;
        case 2:
          this.wert = 3750;
          break;
        case 3:
          this.wert = 4450;
          break;
        case 4:
          this.wert = 5250;
          break;
        case 5:
          this.wert = 6500;
          break;
        case 6:
          this.wert = 7700;
          break;
      }
    }
    else {
      switch (this.anzahl_bewohner) {
        case 1:
          this.wert = 2250;
          break;
        case 2:
          this.wert = 2950;
          break;
        case 3:
          this.wert = 3150;
          break;
        case 4:
          this.wert = 4150;
          break;
        case 5:
          this.wert = 5150;
          break;
        case 6:
          this.wert = 5850;
          break;

      }
    }
    this.berechnungForm_ev.controls["jahresstromverbrauch_control"].setValue(this.wert);

  }

  onPersonenChange() {
    this.anzahl_bewohner = this.berechnungForm_ev.controls["anzahl_personen_haushalt_control"].value;
    this.warmwasser = this.berechnungForm_ev.controls["warmwasser_control"].value;
    
    if (this.warmwasser == true) {
      switch (this.anzahl_bewohner) {
        case 1:
          this.wert = 2650;
          break;
        case 2:
          this.wert = 3750;
          break;
        case 3:
          this.wert = 4450;
          break;
        case 4:
          this.wert = 5250;
          break;
        case 5:
          this.wert = 6500;
          break;
        case 6:
          this.wert = 7700;
          break;
      }
    }
    else {
      switch (this.anzahl_bewohner) {
        case 1:
          this.wert = 2250;
          break;
        case 2:
          this.wert = 2950;
          break;
        case 3:
          this.wert = 3150;
          break;
        case 4:
          this.wert = 4150;
          break;
        case 5:
          this.wert = 5150;
          break;
        case 6:
          this.wert = 5850;
          break;

      }
    }
    this.berechnungForm_ev.controls["jahresstromverbrauch_control"].setValue(this.wert);

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
