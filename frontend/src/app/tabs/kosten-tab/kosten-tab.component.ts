import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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

    });

  }

}
