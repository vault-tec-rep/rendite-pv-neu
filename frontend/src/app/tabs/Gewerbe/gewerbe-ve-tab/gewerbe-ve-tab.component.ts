import { Component, ViewChild, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomIconService } from 'src/app/services/icon.service';
import { ChartBreakEvenGwVeComponent } from 'src/app/charts/charts_break_even/chart-break-even-gw-ve/chart-break-even-gw-ve.component';
import { ChartsInvestGwVeComponent } from 'src/app/charts/charts_invest/charts-invest-gw-ve/charts-invest-gw-ve.component';
import { ChartRenditeGwVeComponent } from 'src/app/charts/charts_rendite/chart-rendite-gw-ve/chart-rendite-gw-ve.component';
import { ChartsNettobarwertGwVeComponent } from 'src/app/charts/charts_nettobarwert/charts-nettobarwert-gw-ve/charts-nettobarwert-gw-ve.component';
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartStromgestehungskostenGwVeComponent } from 'src/app/charts/charts_stromgestehungskosten/chart-stromgestehungskosten-gw-ve/chart-stromgestehungskosten-gw-ve.component';


@Component({
  selector: 'app-gewerbe-ve-tab',
  templateUrl: './gewerbe-ve-tab.component.html',
  styleUrls: ['./gewerbe-ve-tab.component.css']
})
export class GewerbeVeTabComponent implements OnInit {
  nettobarwert: number;
  rendite: number;
  gewinnkurve: number[];
  investition: number;
  KonfigurationBoolean: boolean = true;
  sichtbarkeit_einstellungen: boolean = false;
  stromgestehungskosten: number;
  berechnungForm_gw_ve: FormGroup;
  
  @Output() transfer_event_gw_ve = new EventEmitter<string>();
  @ViewChild(ChartBreakEvenGwVeComponent) break_even_chart_gw_ve: ChartBreakEvenGwVeComponent;
  @ViewChild(ChartsInvestGwVeComponent) invest_chart_gw_ve: ChartsInvestGwVeComponent;
  @ViewChild(ChartRenditeGwVeComponent) rendite_chart_gw_ve: ChartRenditeGwVeComponent;
  @ViewChild(ChartsNettobarwertGwVeComponent) nettobarwert_chart_gw_ve: ChartsNettobarwertGwVeComponent;
  @ViewChild(ChartStromgestehungskostenGwVeComponent) stromgestehung_chart_gw_ve: ChartStromgestehungskostenGwVeComponent;

  constructor(private httpService: HttpService,
    private customIconService: CustomIconService) {
    this.customIconService.init();
  }

  ngOnInit(): void {
    this.berechnungForm_gw_ve = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      'leistung_slider_control': new FormControl(20, Validators.required),
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
    this.httpService.httpPost_gw_ve(this.berechnungForm_gw_ve).subscribe(result => {
      //Entpacken vom Result
      this.nettobarwert = result[0];
      this.rendite = result[1];
      this.gewinnkurve = result[2];
      this.stromgestehungskosten = result[3];
      this.investition = -1 * this.gewinnkurve[0];
      //aktualisiere Chart
      this.break_even_chart_gw_ve.aktualisiere_chart(this.gewinnkurve);
      this.invest_chart_gw_ve.aktualisiere_chart(this.investition);
      this.nettobarwert_chart_gw_ve.aktualisiere_chart(this.nettobarwert);
      this.rendite_chart_gw_ve.aktualisiere_chart(this.rendite);
      this.stromgestehung_chart_gw_ve.aktualisiere_chart(this.stromgestehungskosten);

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
    if (localStorage.get("legende") != null) {
      legend = JSON.parse(localStorage.get("legende"))
    }
    if (localStorage.getItem("gewinnkurve") != null) {
      data_gewinn = JSON.parse(localStorage.getItem("gewinnkurve"));
    }
    laenge = data.length + 1;
    legende_element = "Nummer " + laenge;
    data_gewinn_element = this.gewinnkurve;
    //form auslesen und speichern
    data_einzeln.nummer = laenge;
    data_einzeln.geschaeftsmodell = 'GW: Volleinspeisung';
    data_einzeln.strompreis = 0;
    data_einzeln.strompreissteigerung = this.berechnungForm_gw_ve.controls["strompreissteigerung_control"].value;
    data_einzeln.kalkulatorischerZins = this.berechnungForm_gw_ve.controls["kalk_zins_control"].value;
    data_einzeln.Jahresstromverbrauch = this.berechnungForm_gw_ve.controls["jahressstromverbrauch_control"].value;
    data_einzeln.kW = this.berechnungForm_gw_ve.controls["leistung_slider_control"].value;
    data_einzeln.Investkosten = this.investition;
    data_einzeln.Rendite = this.rendite;
    data_einzeln.Autarkiegrad = 0;
    data_einzeln.Eigenverbrauchsanteil = 0;

    //Daten Pushen
    data.push(data_einzeln);
    legend.push(legende_element);
    data_gewinn.push(data_gewinn_element);
    localStorage.setItem("ergebnis_daten", JSON.stringify(data));
    localStorage.setItem("legende", JSON.stringify(legend));
    localStorage.setItem("gewinnkurve", JSON.stringify(data_gewinn));
    this.transfer_event_gw_ve.emit('Daten übermittelt');
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
