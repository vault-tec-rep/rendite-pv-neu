import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-gewerbe-tab',
  templateUrl: './gewerbe-tab.component.html',
  styleUrls: ['./gewerbe-tab.component.css']
})
export class GewerbeTabComponent implements OnInit {
  @Output() transfer_event_gw_gesamt = new EventEmitter<string>();

  
  constructor() { }

  ngOnInit(): void {
  }

  transfer_emit($event) {
    this.transfer_event_gw_gesamt.emit($event);
  }

}
