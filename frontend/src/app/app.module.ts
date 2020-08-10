// Notwendige Komponenten
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Tab Komponenten
import { WetterTabComponent } from './tabs/wetter-tab/wetter-tab.component';
import { EinfamilienhausTabComponent } from './tabs/einfamilienhaus-tab/einfamilienhaus-tab.component';
import { MehrfamilienhausTabComponent } from './tabs/mehrfamilienhaus-tab/mehrfamilienhaus-tab.component';
import { GewerbeTabComponent } from './tabs/Gewerbe/gewerbe-tab/gewerbe-tab.component';
import { GewerbeEvTabComponent } from './tabs/Gewerbe/gewerbe-ev-tab/gewerbe-ev-tab.component';
import { GewerbeDsTabComponent } from './tabs/Gewerbe/gewerbe-ds-tab/gewerbe-ds-tab.component';
import { GewerbeVeTabComponent } from './tabs/Gewerbe/gewerbe-ve-tab/gewerbe-ve-tab.component';
import { ErgebnisTabComponent } from './tabs/ergebnis-tab/ergebnis-tab.component';
// Angular Material
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button'; 
import { MatSliderModule } from '@angular/material/slider'; 
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
//Chart Components
//Break Even Charts
import { ChartBreakEvenEvComponent } from './charts/charts_break_even/chart-break-even-ev/chart-break-even-ev.component';
import { ChartBreakEvenGwEvComponent } from './charts/charts_break_even/chart-break-even-gw-ev/chart-break-even-gw-ev.component';
import { ChartBreakEvenMsComponent } from './charts/charts_break_even/chart-break-even-ms/chart-break-even-ms.component';
import { ChartBreakEvenGwDsComponent } from './charts/charts_break_even/chart-break-even-gw-ds/chart-break-even-gw-ds.component';
import { ChartBreakEvenGwVeComponent } from './charts/charts_break_even/chart-break-even-gw-ve/chart-break-even-gw-ve.component';

//Invest Charts
import { ChartsInvestEvComponent } from './charts/charts_invest/charts-invest-ev/charts-invest-ev.component';
import { ChartsInvestMsComponent } from './charts/charts_invest/charts-invest-ms/charts-invest-ms.component';
import { ChartsInvestGwEvComponent } from './charts/charts_invest/charts-invest-gw-ev/charts-invest-gw-ev.component';
import { ChartsInvestGwDsComponent } from './charts/charts_invest/charts-invest-gw-ds/charts-invest-gw-ds.component';
import { ChartsInvestGwVeComponent } from './charts/charts_invest/charts-invest-gw-ve/charts-invest-gw-ve.component';
//Nettobarwert Charts
import { ChartsNettobarwertEvComponent } from './charts/charts_nettobarwert/charts-nettobarwert-ev/charts-nettobarwert-ev.component';
import { ChartsNettobarwertMsComponent } from './charts/charts_nettobarwert/charts-nettobarwert-ms/charts-nettobarwert-ms.component';
import { ChartsNettobarwertGwEvComponent } from './charts/charts_nettobarwert/charts-nettobarwert-gw-ev/charts-nettobarwert-gw-ev.component';
import { ChartsNettobarwertGwDsComponent } from './charts/charts_nettobarwert/charts-nettobarwert-gw-ds/charts-nettobarwert-gw-ds.component';
import { ChartsNettobarwertGwVeComponent } from './charts/charts_nettobarwert/charts-nettobarwert-gw-ve/charts-nettobarwert-gw-ve.component';
//Rendite Charts
import { ChartRenditeEvComponent } from './charts/charts_rendite/chart-rendite-ev/chart-rendite-ev.component';
import { ChartRenditeMsComponent } from './charts/charts_rendite/chart-rendite-ms/chart-rendite-ms.component';
import { ChartRenditeGwEvComponent } from './charts/charts_rendite/chart-rendite-gw-ev/chart-rendite-gw-ev.component';
import { ChartRenditeGwDsComponent } from './charts/charts_rendite/chart-rendite-gw-ds/chart-rendite-gw-ds.component';
import { ChartRenditeGwVeComponent } from './charts/charts_rendite/chart-rendite-gw-ve/chart-rendite-gw-ve.component';
//Autarkie und Eigenverbrauch
import { ChartAutarkieEigenverbrauchEvComponent } from './charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-ev/chart-autarkie-eigenverbrauch-ev.component';
import { ChartAutarkieEigenverbrauchMsComponent } from './charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-ms/chart-autarkie-eigenverbrauch-ms.component';
import { ChartAutarkieEigenverbrauchGwEvComponent } from './charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-gw-ev/chart-autarkie-eigenverbrauch-gw-ev.component';
import { ChartAutarkieEigenverbrauchGwDsComponent } from './charts/charts_autarkie_eigenverbrauch/chart-autarkie-eigenverbrauch-gw-ds/chart-autarkie-eigenverbrauch-gw-ds.component';
//Echarts
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { ChartBreakEvenErgebnisComponent } from './charts/charts_break_even/chart-break-even-ergebnis/chart-break-even-ergebnis.component';

@NgModule({
  declarations: [
    AppComponent,
    WetterTabComponent,
    MainComponent,
    //Tab Components
    EinfamilienhausTabComponent,
    MehrfamilienhausTabComponent,
    GewerbeTabComponent,
    GewerbeEvTabComponent,
    GewerbeDsTabComponent,
    GewerbeVeTabComponent,
    ErgebnisTabComponent,
    //Charts
    //Chart Break Even
    ChartBreakEvenEvComponent,
    ChartBreakEvenMsComponent,
    ChartBreakEvenGwEvComponent,
    ChartBreakEvenGwDsComponent,
    ChartBreakEvenGwVeComponent,
    //Chart Rendite
    ChartRenditeEvComponent,
    ChartRenditeMsComponent,
    ChartRenditeGwEvComponent,
    ChartRenditeGwDsComponent,
    ChartRenditeGwVeComponent,
    //Chart Nettobarwert
    ChartsNettobarwertEvComponent,
    ChartsNettobarwertMsComponent,
    ChartsNettobarwertGwEvComponent,
    ChartsNettobarwertGwDsComponent,
    ChartsNettobarwertGwVeComponent,
    //Chart Invest
    ChartsInvestEvComponent,
    ChartsInvestMsComponent,
    ChartsInvestGwEvComponent,
    ChartsInvestGwDsComponent,
    ChartsInvestGwVeComponent,

    ChartAutarkieEigenverbrauchEvComponent,
    ChartAutarkieEigenverbrauchMsComponent,
    ChartAutarkieEigenverbrauchGwEvComponent,
    ChartAutarkieEigenverbrauchGwDsComponent,
    ChartBreakEvenErgebnisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    //material Module
    MatSlideToggleModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatToolbarModule,
    MatRadioModule,
    MatButtonModule,
    MatSliderModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    //Echarts
    NgxEchartsModule.forRoot({echarts}),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
