import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ErgebnisTabComponent } from '../tabs/ergebnis-tab/ergebnis-tab.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild(ErgebnisTabComponent) ergebnis_tab: ErgebnisTabComponent;
  @HostListener("window:beforeunload", ["$event"]) clearLocalStorage(event) {localStorage.clear()};

  constructor() { }

  ngOnInit(): void {
  }

  transfer_event_recieve($event) {
    console.log('Main Component: ' + $event)
    this.ergebnis_tab.onDataUpdate();
  }
}
