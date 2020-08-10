import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ergebnis_Daten } from 'src/app/models/ergebnis_daten.model';
import { ChartBreakEvenErgebnisComponent } from 'src/app/charts/charts_break_even/chart-break-even-ergebnis/chart-break-even-ergebnis.component';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-ergebnis-tab',
  templateUrl: './ergebnis-tab.component.html',
  styleUrls: ['./ergebnis-tab.component.css']
})
export class ErgebnisTabComponent implements OnInit {
  ELEMENT_DATA: Ergebnis_Daten[];
  gewinnkurve: Array<number>[];
  legende: Array<string>;
  displayedColumns: string[] = ['nummer', 'geschaeftsmodell', 'strompreis', 'strompreissteigerung', 'kalkulatorischerZins',
                                'Jahresstromverbrauch', 'kW', 'Investkosten', 'Rendite', 'Autarkiegrad', 'Eigenverbrauchsanteil'];
  dataSource = this.ELEMENT_DATA;

  @ViewChild('TABLE') table: ElementRef;
  @ViewChild(ChartBreakEvenErgebnisComponent) break_even_chart_ergebnis: ChartBreakEvenErgebnisComponent;

  constructor() { }

  ngOnInit(): void {
    
  }

  onDataUpdate() {
    this.dataSource = JSON.parse(localStorage.getItem('ergebnis_daten'));
  }

  onKonfigurationAnzeigen() {
    let laenge_g: number;
    let i: number;

    this.gewinnkurve = JSON.parse(localStorage.getItem('gewinnkurve'));
    this.legende = JSON.parse(localStorage.getItem("legende"));
    laenge_g = this.gewinnkurve.length;

    for(i = 0; i < laenge_g; i++) {
      this.break_even_chart_ergebnis.aktualisiere_chart_1(this.gewinnkurve[i], this.legende, i);
    }
  }

  onKonfigurationLoeschen() {
    this.break_even_chart_ergebnis.reset_chart();
    localStorage.removeItem("gewinnkurve");
    localStorage.removeItem("legende");
  }

  onXlsxExport() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Ergebnis');

    XLSX.writeFile(wb, 'ErgebnisDaten.xlsx');
  }

}
