import { Component, OnInit, ViewChild, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
  zusatzkosten: number;

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
      'Zusatz_Invest': new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100000)])
    })
    this.parameter_invest[0] = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    this.parameter_invest[1] = this.kostenfunktion_form.controls["Invest_Parameter_B"].value;
    this.parameter_betrieb[0] = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    this.parameter_betrieb[1] = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;
    this.zusatzkosten = this.kostenfunktion_form.controls["Zusatz_Invest"].value;
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
    localStorage.setItem("zusatzkosten", JSON.stringify(this.zusatzkosten));

  }

  ngAfterViewInit() {
    setTimeout(_=> this.chartsAktualisieren());
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
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
    localStorage.setItem("zusatzkosten", JSON.stringify(this.zusatzkosten));
  }
  
  standardwerte_einstellen() {
    this.kostenfunktion_form.controls["Invest_Parameter_A"].setValue(1923);
    this.kostenfunktion_form.controls["Invest_Parameter_B"].setValue(-0.16);
    this.kostenfunktion_form.controls["Betrieb_Parameter_A"].setValue(148);
    this.kostenfunktion_form.controls["Betrieb_Parameter_B"].setValue(5);
    this.kostenfunktion_form.controls["Zusatz_Invest"].setValue(0);
    
    //Charts aktualiseren
    this.chartInvestAktualisieren();
    this.chartBetriebAktualisieren();
  }

  chartsAktualisieren() {
    this.chartInvestAktualisieren();
    this.chartBetriebAktualisieren();
  }
  
}
