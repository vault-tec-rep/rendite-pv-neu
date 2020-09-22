import { Component, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomIconService } from 'src/app/services/icon.service';

import { ChartBreakEvenGwEvComponent } from 'src/app/charts/charts_break_even/chart-break-even-gw-ev/chart-break-even-gw-ev.component';
import { ChartsInvestGwEvComponent } from 'src/app/charts/charts_invest/charts-invest-gw-ev/charts-invest-gw-ev.component';
import { ChartRenditeGwEvComponent } from 'src/app/charts/charts_rendite/chart-rendite-gw-ev/chart-rendite-gw-ev.component';
import { ChartsNettobarwertGwEvComponent } from 'src/app/charts/charts_nettobarwert/charts-nettobarwert-gw-ev/charts-nettobarwert-gw-ev.component';
import { ChartAutarkieEigenverbrauchGwEvComponent } from 'src/app/charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-gw-ev/chart-autarkie-eigenverbrauch-gw-ev.component';
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartStromgestehungskostenGwEvComponent } from 'src/app/charts/charts_stromgestehungskosten/chart-stromgestehungskosten-gw-ev/chart-stromgestehungskosten-gw-ev.component';

interface Lastprofil {
  value: number;
  viewValue: string;
}

@Component({
  selector: 'app-gewerbe-ev-tab',
  templateUrl: './gewerbe-ev-tab.component.html',
  styleUrls: ['./gewerbe-ev-tab.component.css']
})
export class GewerbeEvTabComponent implements OnInit {
  nettobarwert: number;
  rendite: number;
  gewinnkurve: number[];
  eigenverbrauchsanteil: number;
  autarkiegrad: number;
  investition: number;
  KonfigurationBoolean: boolean = true;
  sichtbarkeit_einstellungen: boolean = false;
  stromgestehungskosten: number;
  lastprofil_verwenden: boolean = true;
  berechnungForm_gw_ev: FormGroup;

  //Lastprofil Auswahl
  lastprofil_auswahl: Lastprofil[] = [
    { value: 0, viewValue: 'allgemeines Gewerbe' },
    { value: 1, viewValue: 'Gewerbe werktags 8-18 Uhr' },
    { value: 2, viewValue: 'Gewerbe mit starkem Verbrauch in den Abendstunden' },
    { value: 3, viewValue: 'Gewerbe durchlaufend' },
    { value: 4, viewValue: 'Gewerbe Laden/Friseur' },
    { value: 5, viewValue: 'Gewerbe Bäckerei mit Backstube' },
    { value: 6, viewValue: 'Gewerbe Wochenendbetrieb' },
  ]

  @Output() transfer_event_gw_ev = new EventEmitter<string>();
  @ViewChild(ChartBreakEvenGwEvComponent) break_even_chart_gw_ev: ChartBreakEvenGwEvComponent;
  @ViewChild(ChartsInvestGwEvComponent) invest_chart_gw_ev: ChartsInvestGwEvComponent;
  @ViewChild(ChartRenditeGwEvComponent) rendite_chart_gw_ev: ChartRenditeGwEvComponent;
  @ViewChild(ChartsNettobarwertGwEvComponent) nettobarwert_chart_gw_ev: ChartsNettobarwertGwEvComponent;
  @ViewChild(ChartAutarkieEigenverbrauchGwEvComponent) autarkie_eva_chart_gw_ev: ChartAutarkieEigenverbrauchGwEvComponent;
  @ViewChild(ChartStromgestehungskostenGwEvComponent) stromgestehung_chart_gw_ev: ChartStromgestehungskostenGwEvComponent;

  constructor(private httpService: HttpService,
    private customIconService: CustomIconService) {
    this.customIconService.init();
  }

  ngOnInit(): void {
    this.berechnungForm_gw_ev = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      'leistung_slider_control': new FormControl(20, Validators.required),
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
      'eigenverbrauchsanteil_control': new FormControl(0, [Validators.min(0), Validators.max(100)]),
      'eigenverbrauch_toggle_control':new FormControl(false),
    
    });
  }

  berechnungSenden() {
    this.httpService.httpPost_gw_ev(this.berechnungForm_gw_ev).subscribe(result => {
      //Entpacken vom Result
      this.nettobarwert = result[0];
      this.rendite = result[1];
      this.gewinnkurve = result[2];
      this.investition = -1 * this.gewinnkurve[0];
      this.eigenverbrauchsanteil = result[3];
      this.autarkiegrad = result[4];
      this.stromgestehungskosten = result[5];
      //aktualisiere Chart
      this.break_even_chart_gw_ev.aktualisiere_chart(this.gewinnkurve);
      this.invest_chart_gw_ev.aktualisiere_chart(this.investition);
      this.nettobarwert_chart_gw_ev.aktualisiere_chart(this.nettobarwert);
      this.rendite_chart_gw_ev.aktualisiere_chart(this.rendite);
      this.autarkie_eva_chart_gw_ev.aktualisiere_chart(this.autarkiegrad, this.eigenverbrauchsanteil);
      this.stromgestehung_chart_gw_ev.aktualisiere_chart(this.stromgestehungskosten);

      if (this.KonfigurationBoolean == true) {
        this.KonfigurationBoolean = false;
      }
    });

  }

  onErweiterteEinstellungenChange() {
    this.sichtbarkeit_einstellungen = !this.sichtbarkeit_einstellungen
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
    data_einzeln.geschaeftsmodell = 'GW: Eigenverbrauch';
    data_einzeln.strompreis = this.berechnungForm_gw_ev.controls["strompreis_control"].value;
    data_einzeln.strompreissteigerung = this.berechnungForm_gw_ev.controls["strompreissteigerung_control"].value;
    data_einzeln.kalkulatorischerZins = this.berechnungForm_gw_ev.controls["kalk_zins_control"].value;
    data_einzeln.Jahresstromverbrauch = String(this.berechnungForm_gw_ev.controls["jahresstromverbrauch_control"].value);
    data_einzeln.kW = this.berechnungForm_gw_ev.controls["leistung_slider_control"].value;
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
    this.transfer_event_gw_ev.emit('Daten übermittelt');
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

  onLastprofilToggle() {
    this.lastprofil_verwenden = !this.lastprofil_verwenden;
  }

}
