import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-wetter-tab',
  templateUrl: './wetter-tab.component.html',
  styleUrls: ['./wetter-tab.component.css']
})
export class WetterTabComponent implements OnInit {

  constructor() { }

  wetter_form: FormGroup;
  ngOnInit(): void {
    this.wetter_form = new FormGroup({
      //Hier werden die kommenden Form Elemente eingetragen
      //Ändernde Elemente
      'wetter_radio_control': new FormControl('1'),
    })
      localStorage.setItem('wetterstation', '1');
  };

  saveChanges(event) {
    localStorage.setItem('wetterstation', event.value);
  }

}
