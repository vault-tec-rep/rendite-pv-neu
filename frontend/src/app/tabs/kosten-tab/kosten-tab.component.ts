import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlDirective } from '@angular/forms';
import { ChartInvestFunktionComponent } from 'src/app/charts/charts_kostenfunktionen/chart-invest-funktion/chart-invest-funktion.component';
import { ChartBetriebFunktionComponent } from 'src/app/charts/charts_kostenfunktionen/chart-betrieb-funktion/chart-betrieb-funktion.component';

@Component({
  selector: 'app-kosten-tab',
  templateUrl: './kosten-tab.component.html',
  styleUrls: ['./kosten-tab.component.css']
})
export class KostenTabComponent implements OnInit, AfterViewInit {
  kostenfunktion_form: FormGroup;
  parameter_invest: number[] = [0, 0];
  parameter_betrieb: number[] = [0, 0];
  einspeiseverguetung: number[] = [0, 0, 0];
  absolute_kosten: number[] = [0, 0, 0];
  zusatzkosten: number;
  absolut_spezifisch_boolean: boolean = true;

  @ViewChild(ChartInvestFunktionComponent) chart_invest: ChartInvestFunktionComponent;
  @ViewChild(ChartBetriebFunktionComponent) chart_betrieb: ChartBetriebFunktionComponent;

  constructor() {
    
   }

  ngOnInit(): void {
    this.kostenfunktion_form = new FormGroup({
      'Invest_Parameter_A': new FormControl(1923, Validators.required),
      'Invest_Parameter_B': new FormControl(-0.16, Validators.required),
      'Betrieb_Parameter_A': new FormControl(148, Validators.required),
      'Betrieb_Parameter_B': new FormControl(5, Validators.required),
      'Zusatz_Invest': new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100000)]),
      'Einspeisung_A': new FormControl(9.30, [Validators.required, Validators.min(0), Validators.max(50)]),
      'Einspeisung_B': new FormControl(9.05, [Validators.required, Validators.min(0), Validators.max(50)]),
      'Einspeisung_C': new FormControl(7.19, [Validators.required, Validators.min(0), Validators.max(50)]),
      'absolut_spezifisch': new FormControl(0),
      'Absolut_Invest': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10000000)]),
      'Absolut_Betrieb': new FormControl(1, [Validators.required, Validators.min(1), Validators.max(10000000)]),
    })
    this.parameter_invest[0] = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    this.parameter_invest[1] = this.kostenfunktion_form.controls["Invest_Parameter_B"].value;
    this.parameter_betrieb[0] = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    this.parameter_betrieb[1] = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;

    this.zusatzkosten = this.kostenfunktion_form.controls["Zusatz_Invest"].value;

    this.einspeiseverguetung[0] = this.kostenfunktion_form.controls["Einspeisung_A"].value;
    this.einspeiseverguetung[1] = this.kostenfunktion_form.controls["Einspeisung_B"].value;
    this.einspeiseverguetung[2] = this.kostenfunktion_form.controls["Einspeisung_C"].value;

    this.absolute_kosten[0] = +this.absolut_spezifisch_boolean; //boolean wird in integer für spätere Berechnung umgewandelt über "+"
    this.absolute_kosten[1] = this.kostenfunktion_form.controls["Absolut_Invest"].value;
    this.absolute_kosten[2] = this.kostenfunktion_form.controls["Absolut_Betrieb"].value;
    
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
    localStorage.setItem("zusatzkosten", JSON.stringify(this.zusatzkosten));
    localStorage.setItem("einspeiseverguetung", JSON.stringify(this.einspeiseverguetung));
    localStorage.setItem("absolute_kosten", JSON.stringify(this.absolute_kosten));
  }

  ngAfterViewInit() {
    setTimeout(_=> this.chartsAktualisieren());
  }

  absolut_spezifisch_Toggle() {
    this.absolut_spezifisch_boolean = !this.absolut_spezifisch_boolean;
  }
  
  chartInvestAktualisieren() {
    let daten: Array<number[]> = [];
    let iterator_schleife: number = 0;
    let invest_wert_A: number = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    let invest_wert_B: number = this.kostenfunktion_form.controls["Invest_Parameter_B"].value
    let value_schleife: number;
    
    while (iterator_schleife <= 101) {
      value_schleife = Math.round(invest_wert_A * (iterator_schleife ** invest_wert_B));
      daten[iterator_schleife] = [iterator_schleife, value_schleife];

      iterator_schleife++;
    }
    this.chart_invest.aktualisiere_chart(daten.slice(1,101))
  }
  
  chartBetriebAktualisieren() {
    let daten: Array<number[]> = [];
    let iterator_schleife: number = 0;
    let betrieb_wert_A: number = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    let betrieb_wert_B: number = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;
    let value_schleife: number;

    while (iterator_schleife <= 101) {
      value_schleife = Math.round(betrieb_wert_A + betrieb_wert_B * iterator_schleife);
      daten[iterator_schleife] = [iterator_schleife, value_schleife];
      iterator_schleife++;
    }
    this.chart_betrieb.aktualisiere_chart(daten.slice(1,101))
  }
  
  kostenfunktionSpeichern() {
    this.parameter_invest[0] = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    this.parameter_invest[1] = this.kostenfunktion_form.controls["Invest_Parameter_B"].value;
    this.parameter_betrieb[0] = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    this.parameter_betrieb[1] = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;

    this.zusatzkosten = this.kostenfunktion_form.controls["Zusatz_Invest"].value;

    this.einspeiseverguetung[0] = this.kostenfunktion_form.controls["Einspeisung_A"].value;
    this.einspeiseverguetung[1] = this.kostenfunktion_form.controls["Einspeisung_B"].value;
    this.einspeiseverguetung[2] = this.kostenfunktion_form.controls["Einspeisung_C"].value;

    this.absolute_kosten[0] = +this.absolut_spezifisch_boolean; //boolean wird in integer für spätere Berechnung umgewandelt über "+"
    this.absolute_kosten[1] = this.kostenfunktion_form.controls["Absolut_Invest"].value;
    this.absolute_kosten[2] = this.kostenfunktion_form.controls["Absolut_Betrieb"].value;
    
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
    localStorage.setItem("zusatzkosten", JSON.stringify(this.zusatzkosten));
    localStorage.setItem("einspeiseverguetung", JSON.stringify(this.einspeiseverguetung));
    localStorage.setItem("absolute_kosten", JSON.stringify(this.absolute_kosten));
    
  }
  
  standardwerte_einstellen() {
    this.kostenfunktion_form.controls["Invest_Parameter_A"].setValue(1923);
    this.kostenfunktion_form.controls["Invest_Parameter_B"].setValue(-0.16);
    this.kostenfunktion_form.controls["Betrieb_Parameter_A"].setValue(148);
    this.kostenfunktion_form.controls["Betrieb_Parameter_B"].setValue(5);
    this.kostenfunktion_form.controls["Zusatz_Invest"].setValue(0);

    this.kostenfunktion_form.controls["Einspeisung_A"].setValue(9.30);
    this.kostenfunktion_form.controls["Einspeisung_B"].setValue(9.05);
    this.kostenfunktion_form.controls["Einspeisung_C"].setValue(7.19);
    
    //Charts aktualiseren
    this.chartInvestAktualisieren();
    this.chartBetriebAktualisieren();
  }

  chartsAktualisieren() {
    this.chartInvestAktualisieren();
    this.chartBetriebAktualisieren();
  }
  
}
