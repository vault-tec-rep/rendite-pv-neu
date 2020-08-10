import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-kosten-tab',
  templateUrl: './kosten-tab.component.html',
  styleUrls: ['./kosten-tab.component.css']
})
export class KostenTabComponent implements OnInit {
  kostenfunktion_form: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.kostenfunktion_form = new FormGroup({
      'Invest_Parameter_A': new FormControl(1, Validators.required),
      'Invest_Parameter_B': new FormControl(1, Validators.required),
      'Betrieb_Parameter_A': new FormControl(1, Validators.required),
      'Betrieb_Parameter_B': new FormControl(1, Validators.required),
    });

  }

  chartInvestAktualisieren() {
    
  }
  
  chartBetriebAktualisieren() {

  }

}
