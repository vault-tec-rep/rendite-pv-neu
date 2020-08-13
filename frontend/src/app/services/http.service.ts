import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';

export interface BerechnungsDaten_EV {
    speicher_kWh?: number;
    //anzahl_personen?: number;
    jahresstromverbrauch?: number;
    strompreis?: number;
    //Immer gleich
    invest_parameter?: number[];
    betrieb_parameter?: number[];
    kW?: number;
    wetterstation?: string;
    strompreissteigerung?: number;
    kalkZins?: number;
    dachart?: string;
    dachhaelfte?: string;
    aufstaenderung?: string;
    ausrichtung?: number;
    aufstellwinkel?: number;
}

export interface BerechnungsDaten_MS {
    rolle?: string;
    i_teilnehmer?: number;
    mieterstromzuschlag?: number;
    strompreis?: number;
    //Immer gleich
    invest_parameter?: number[];
    betrieb_parameter?: number[];
    kW?: number;
    wetterstation?: string;
    strompreissteigerung?: number;
    kalkZins?: number;
    dachart?: string;
    dachhaelfte?: string;
    aufstaenderung?: string;
    ausrichtung?: number;
    aufstellwinkel?: number;
}

export interface BerechnungsDaten_GW_EV {
    lastprofil?: string;
    jahresstromverbrauch?: number;
    strompreis?: number;
    //Immer gleich
    invest_parameter?: number[];
    betrieb_parameter?: number[];
    kW?: number;
    wetterstation?: string;
    strompreissteigerung?: number;
    kalkZins?: number;
    dachart?: string;
    dachhaelfte?: string;
    aufstaenderung?: string;
    ausrichtung?: number;
    aufstellwinkel?: number;
}

export interface BerechnungsDaten_GW_DS {
    rolle?: string;
    lastprofil?: string;
    jahresstromverbrauch?: number;
    strompreis?: number;
    //Immer gleich
    invest_parameter?: number[];
    betrieb_parameter?: number[];
    kW?: number;
    wetterstation?: string;
    strompreissteigerung?: number;
    kalkZins?: number;
    dachart?: string;
    dachhaelfte?: string;
    aufstaenderung?: string;
    ausrichtung?: number;
    aufstellwinkel?: number;
}

export interface BerechnungsDaten_GW_VE {
    //Immer gleich
    invest_parameter?: number[];
    betrieb_parameter?: number[];
    kW?: number;
    wetterstation?: string;
    strompreissteigerung?: number;
    kalkZins?: number;
    dachart?: string;
    dachhaelfte?: string;
    aufstaenderung?: string;
    ausrichtung?: number;
    aufstellwinkel?: number;
}


@Injectable({ providedIn: 'root' })
export class HttpService {
    constructor(private httpClient: HttpClient) { }

    httpPost_ev(form: FormGroup) {
        let data_ev: BerechnungsDaten_EV = {};
        let invest_parameter_data = JSON.parse(localStorage.getItem("parameter_invest"));
        let betrieb_parameter_data = JSON.parse(localStorage.getItem("parameter_betrieb"));
        //data_ev.anzahl_personen = form.controls["anzahl_personen_haushalt_control"].value;

        data_ev.invest_parameter = invest_parameter_data;
        data_ev.betrieb_parameter = betrieb_parameter_data;
        data_ev.wetterstation = localStorage.getItem('wetterstation');
        data_ev.kW = form.controls["leistung_slider_control"].value;
        data_ev.speicher_kWh = form.controls["speicher_kWh_control"].value;
        data_ev.jahresstromverbrauch = form.controls["jahresstromverbrauch_control"].value;
        data_ev.strompreis = form.controls["strompreis_control"].value;
        data_ev.strompreissteigerung = form.controls["strompreissteigerung_control"].value;
        data_ev.kalkZins = form.controls["kalk_zins_control"].value;
        data_ev.dachart = form.controls["dachart_control"].value;
        data_ev.dachhaelfte = form.controls["dachhaelften_control"].value;
        data_ev.aufstaenderung = form.controls["aufstaenderung_control"].value;
        data_ev.ausrichtung = form.controls["ausrichtung_slider_control"].value;
        data_ev.aufstellwinkel = form.controls["aufstellwinkel_slider_control"].value;
        return this.httpClient.post<any>('http://localhost:5002/ev', data_ev);
    }
    httpPost_ms(form: FormGroup) {
        let data_ms: BerechnungsDaten_MS = {};
        let invest_parameter_data = JSON.parse(localStorage.getItem("parameter_invest"));
        let betrieb_parameter_data = JSON.parse(localStorage.getItem("parameter_betrieb"));

        data_ms.invest_parameter = invest_parameter_data;
        data_ms.betrieb_parameter = betrieb_parameter_data;
        data_ms.wetterstation = localStorage.getItem('wetterstation');
        data_ms.dachart = form.controls["dachart_control"].value;
        data_ms.aufstaenderung = form.controls["aufstaenderung_control"].value;
        data_ms.dachhaelfte = form.controls["dachhaelften_control"].value;
        data_ms.strompreis = form.controls["strompreis_control"].value;
        data_ms.kW = form.controls["leistung_slider_control"].value;
        data_ms.strompreissteigerung = form.controls["strompreissteigerung_control"].value;
        data_ms.i_teilnehmer = form.controls["anzahl_wohneinheiten_control"].value * (form.controls["anteil_wohneinheiten_control"].value / 100)
        data_ms.ausrichtung = form.controls["ausrichtung_slider_control"].value;
        data_ms.aufstellwinkel = form.controls["aufstellwinkel_slider_control"].value;
        data_ms.mieterstromzuschlag = form.controls["mieterstromzuschlag_control"].value;
        data_ms.kalkZins = form.controls["kalk_zins_control"].value;
        data_ms.rolle = form.controls["betreiber_control"].value;
        return this.httpClient.post<any>('http://localhost:5002/ms', data_ms);
    }

    httpPost_gw_ev(form: FormGroup) {
        let data_gw_ev: BerechnungsDaten_GW_EV = {};
        let invest_parameter_data = JSON.parse(localStorage.getItem("parameter_invest"));
        let betrieb_parameter_data = JSON.parse(localStorage.getItem("parameter_betrieb"));

        data_gw_ev.invest_parameter = invest_parameter_data;
        data_gw_ev.betrieb_parameter = betrieb_parameter_data;
        data_gw_ev.kW = form.controls["leistung_slider_control"].value;
        data_gw_ev.wetterstation = localStorage.getItem('wetterstation');
        data_gw_ev.strompreissteigerung = form.controls["strompreissteigerung_control"].value;
        data_gw_ev.kalkZins = form.controls["kalk_zins_control"].value;
        data_gw_ev.dachart = form.controls["dachart_control"].value;
        data_gw_ev.dachhaelfte = form.controls["dachhaelften_control"].value;
        data_gw_ev.aufstaenderung = form.controls["aufstaenderung_control"].value;
        data_gw_ev.ausrichtung = form.controls["ausrichtung_slider_control"].value;
        data_gw_ev.aufstellwinkel = form.controls["aufstellwinkel_slider_control"].value;
        //Unterschiedlich
        data_gw_ev.lastprofil = form.controls["lastprofil_control"].value;
        data_gw_ev.jahresstromverbrauch = form.controls["jahresstromverbrauch_control"].value;
        data_gw_ev.strompreis = form.controls["strompreis_control"].value;
        return this.httpClient.post<any>('http://localhost:5002/gw_ev', data_gw_ev);
    }
    httpPost_gw_ds(form: FormGroup) {
        let data_gw_ds: BerechnungsDaten_GW_DS = {};
        let invest_parameter_data = JSON.parse(localStorage.getItem("parameter_invest"));
        let betrieb_parameter_data = JSON.parse(localStorage.getItem("parameter_betrieb"));


        data_gw_ds.invest_parameter = invest_parameter_data;
        data_gw_ds.betrieb_parameter = betrieb_parameter_data;
        //Immer gleich
        data_gw_ds.kW = form.controls["leistung_slider_control"].value;
        data_gw_ds.wetterstation = localStorage.getItem('wetterstation');
        data_gw_ds.strompreissteigerung = form.controls["strompreissteigerung_control"].value;
        data_gw_ds.kalkZins = form.controls["kalk_zins_control"].value;
        data_gw_ds.dachart = form.controls["dachart_control"].value;
        data_gw_ds.dachhaelfte = form.controls["dachhaelften_control"].value;
        data_gw_ds.aufstaenderung = form.controls["aufstaenderung_control"].value;
        data_gw_ds.ausrichtung = form.controls["ausrichtung_slider_control"].value;
        data_gw_ds.aufstellwinkel = form.controls["aufstellwinkel_slider_control"].value;
        //Unterschiedlich
        data_gw_ds.lastprofil = form.controls["lastprofil_control"].value;
        data_gw_ds.jahresstromverbrauch = form.controls["jahresstromverbrauch_control"].value;
        data_gw_ds.strompreis = form.controls["strompreis_control"].value;
        data_gw_ds.rolle = form.controls["betreiber-control"].value;
        return this.httpClient.post<any>('http://localhost:5002/gw_ds', data_gw_ds);
    }
    httpPost_gw_ve(form: FormGroup) {
        let data_gw_ve: BerechnungsDaten_GW_VE = {};
        let invest_parameter_data = JSON.parse(localStorage.getItem("parameter_invest"));
        let betrieb_parameter_data = JSON.parse(localStorage.getItem("parameter_betrieb"));

        data_gw_ve.invest_parameter = invest_parameter_data;
        data_gw_ve.betrieb_parameter = betrieb_parameter_data;
        //Immer gleich
        data_gw_ve.kW = form.controls["leistung_slider_control"].value;
        data_gw_ve.wetterstation = localStorage.getItem('wetterstation');
        data_gw_ve.strompreissteigerung = form.controls["strompreissteigerung_control"].value;
        data_gw_ve.kalkZins = form.controls["kalk_zins_control"].value;
        data_gw_ve.dachart = form.controls["dachart_control"].value;
        data_gw_ve.dachhaelfte = form.controls["dachhaelften_control"].value;
        data_gw_ve.aufstaenderung = form.controls["aufstaenderung_control"].value;
        data_gw_ve.ausrichtung = form.controls["ausrichtung_slider_control"].value;
        data_gw_ve.aufstellwinkel = form.controls["aufstellwinkel_slider_control"].value;
        return this.httpClient.post<any>('http://localhost:5002/gw_ve', data_gw_ve);
    }

}