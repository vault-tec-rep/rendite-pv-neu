from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask import request
from EV_Berechnung import berechnung_ev
from MS_Berechnung import berechnung_ms
from Berechnung_Funktionen import berechnung_ev, berechnung_ms, berechnung_gw_ev, berechnung_gw_ds, berechnung_gw_ve

app = Flask(__name__)
CORS(app)

@app.route("/ev", methods = ["POST"])
def ev():
    datei = request.get_json()
    [barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = berechnung_ev(datei.get("wetterstation"), datei.get("kW"), datei.get("jahresstromverbrauch"), datei.get("strompreis"), 
    datei.get("ausrichtung"), datei.get("aufstellwinkel"), datei.get("kalkZins"), datei.get("strompreissteigerung"), datei.get("speicher_kWh"), 
    datei.get("dachart"), datei.get("aufstaenderung"), datei.get("dachhaelfte"))
    gewinnkurve_2 = gewinnkurve.tolist()
    ergebnis = [barwert, rendite, gewinnkurve_2, eigenverbrauchsanteil, autarkiegrad]
    return jsonify(ergebnis)
@app.route("/ms", methods = ["POST"])
def ms():
    datei = request.get_json()
    [barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = berechnung_ms(datei.get("wetterstation"), datei.get("dachart"), datei.get("aufstaenderung"), datei.get("dachhaelfte"), datei.get("strompreis"),
    datei.get("kW"), datei.get("strompreissteigerung"), datei.get("i_teilnehmer"), datei.get("ausrichtung"), datei.get("aufstellwinkel"), datei.get("mieterstromzuschlag"),
    datei.get("kalkZins"), datei.get("rolle"))
    gewinnkurve_2 = gewinnkurve.tolist()
    ergebnis = [barwert, rendite, gewinnkurve_2, eigenverbrauchsanteil, autarkiegrad]
    return jsonify(ergebnis)

@app.route("/gw_ev", methods = ["POST"])
def gw_ev():
    datei = request.get_json()
    [barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = berechnung_gw_ev(datei.get("wetterstation"), datei.get("dachart"), datei.get("aufstaenderung"), datei.get("dachhaelfte"), datei.get("strompreis"),
    datei.get("kW"), datei.get("strompreissteigerung"), datei.get("ausrichtung"), datei.get("aufstellwinkel"),
    datei.get("kalkZins"), datei.get("jahresstromverbrauch"), datei.get("lastprofil"))
    gewinnkurve_2 = gewinnkurve.tolist()
    ergebnis = [barwert, rendite, gewinnkurve_2, eigenverbrauchsanteil, autarkiegrad]
    return jsonify(ergebnis)

@app.route("/gw_ds", methods = ["POST"])
def gw_ds():
    datei = request.get_json()
    [barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = berechnung_gw_ds(datei.get("wetterstation"), datei.get("dachart"), datei.get("aufstaenderung"), datei.get("dachhaelfte"), datei.get("strompreis"), 
    datei.get("kW"), datei.get("strompreissteigerung"), datei.get("ausrichtung"), datei.get("aufstellwinkel"), datei.get("kalkZins"), datei.get("jahresstromverbrauch"), datei.get("rolle"), datei.get("lastprofil"))
    gewinnkurve_2 = gewinnkurve.tolist()
    ergebnis = [barwert, rendite, gewinnkurve_2, eigenverbrauchsanteil, autarkiegrad]
    return jsonify(ergebnis)

@app.route("/gw_ve", methods = ["POST"])
def gw_ve():
    datei = request.get_json()
    [barwert, rendite, gewinnkurve] = berechnung_gw_ve(datei.get("wetterstation"), datei.get("dachart"), datei.get("aufstaenderung"), datei.get("dachhaelften"), datei.get("kW"), datei.get("ausrichtung"), datei.get("aufstellwinkel"), datei.get("kalkZins"))
    gewinnkurve_2 = gewinnkurve.tolist()
    ergebnis = [barwert, rendite, gewinnkurve_2]
    return jsonify(ergebnis)


if __name__ == '__main__':
    app.run(port=5002)