import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChartInvestFunktionComponent } from 'src/app/charts/charts_kostenfunktionen/chart-invest-funktion/chart-invest-funktion.component';
import { ChartBetriebFunktionComponent } from 'src/app/charts/charts_kostenfunktionen/chart-betrieb-funktion/chart-betrieb-funktion.component';

@Component({
  selector: 'app-kosten-tab',
  templateUrl: './kosten-tab.component.html',
  styleUrls: ['./kosten-tab.component.css']
})
export class KostenTabComponent implements OnInit {
  kostenfunktion_form: FormGroup;
  parameter_invest: number[] = [0, 0];
  parameter_betrieb: number[] = [0, 0];

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
    })
    this.parameter_invest[0] = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    this.parameter_invest[1] = this.kostenfunktion_form.controls["Invest_Parameter_B"].value;
    this.parameter_betrieb[0] = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    this.parameter_betrieb[1] = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
  }



  chartInvestAktualisieren() {
    let Y_Werte: number[] = [];
    let iterator_schleife: number = 0;
    let i_wert_A: number = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    let i_wert_B: number = this.kostenfunktion_form.controls["Invest_Parameter_B"].value
    let value_schleife: number;

    while (iterator_schleife <= 20) {
      value_schleife = i_wert_A * (iterator_schleife ** i_wert_B) * iterator_schleife * 1.19;
      Y_Werte.push(value_schleife)
      iterator_schleife++;
    }
    this.chart_invest.aktualisiere_chart(Y_Werte)
  }
  
  chartBetriebAktualisieren() {
    let Y_Werte: number[] = [];
    let iterator_schleife: number = 0;
    let b_wert_A: number = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    let b_wert_B: number = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;

    let value_schleife: number;
    while (iterator_schleife <= 20) {
      value_schleife = b_wert_A + b_wert_B * iterator_schleife;
      Y_Werte.push(value_schleife)
      iterator_schleife++;
    }
    this.chart_betrieb.aktualisiere_chart(Y_Werte)
  }

  kostenfunktionSpeichern() {
    this.parameter_invest[0] = this.kostenfunktion_form.controls["Invest_Parameter_A"].value;
    this.parameter_invest[1] = this.kostenfunktion_form.controls["Invest_Parameter_B"].value;
    this.parameter_betrieb[0] = this.kostenfunktion_form.controls["Betrieb_Parameter_A"].value;
    this.parameter_betrieb[1] = this.kostenfunktion_form.controls["Betrieb_Parameter_B"].value;
    localStorage.setItem("parameter_invest", JSON.stringify(this.parameter_invest));
    localStorage.setItem("parameter_betrieb", JSON.stringify(this.parameter_betrieb));
  }

  standardwerte_einstellen() {
    this.kostenfunktion_form.controls["Invest_Parameter_A"].setValue(1923);
    this.kostenfunktion_form.controls["Invest_Parameter_B"].setValue(-0.16);
    this.kostenfunktion_form.controls["Betrieb_Parameter_A"].setValue(148);
    this.kostenfunktion_form.controls["Betrieb_Parameter_B"].setValue(5);
  }

}
