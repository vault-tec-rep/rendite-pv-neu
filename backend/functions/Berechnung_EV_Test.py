#%%
from Eigenverbrauch_Funktionen import oekonomie_vorbereiten_ev_speicher, \
    oekonomie_berechnen_ev_speicher, last_waehlen
from Allgemeine_Funktionen import wetter_waehlen, pv_werte_waehlen, berechnung_pv_vektor
import numpy as np
import pandas as pd
from timeit import default_timer as timer
Standort = '1'
zeit_vektor = pd.date_range('2010-01-01 00:00:00', '2010-12-31 23:59:00', freq='1min')
kW = 10
Jahresstromverbrauch = 3000
Strompreis = 28
Azimuth = 180
Aufstellwinkel = 15
KalkZins = 2
Strompreissteigerung = 2
Speicher_kWh = 0
Dachart = '2' # 1 = Flachdach, 2 = Schraegdach
WelchesDach = '1' #  1 = Eine Hälfte, 2 = Beide Hälften
Dachkonfiguration = '2' # 1 = Trapez, 2 = Hintereinander
invest_a = 1923
invest_b = -0.16
betrieb_a = 148
betrieb_b = 5

air_temp = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Air_Temp.npy', allow_pickle=True)
GlobalStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\GlobalStr.npy', allow_pickle=True)
DiffusStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\DiffusStr.npy', allow_pickle=True)
Lastprofil = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Lastprofil_ev.npy', allow_pickle=True)
Wirkleistung_Jahr_Sortiert = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Wirkleistung_Jahr_Sortiert.npy', allow_pickle=True)
IndexLast = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Index_Last.npy', allow_pickle=True)
zeit_vektor = pd.date_range('2010-01-01 00:00:00', '2010-12-31 23:59:00', freq='1min')
#%%
[dirh, dhi, tamb, breite, laenge] = wetter_waehlen(Standort, air_temp, GlobalStr, DiffusStr)
logisch_doppelte_rechnung = pv_werte_waehlen(Dachart, Dachkonfiguration, WelchesDach)
eco = oekonomie_vorbereiten_ev_speicher(Strompreis, kW, Strompreissteigerung, Speicher_kWh, invest_a, invest_b, betrieb_a, betrieb_b)
lastprofil_wahl = last_waehlen(Jahresstromverbrauch, Lastprofil, Wirkleistung_Jahr_Sortiert, IndexLast)
leistung_pv = berechnung_pv_vektor(dirh, dhi, tamb, zeit_vektor, breite, laenge, Azimuth, Aufstellwinkel, kW, logisch_doppelte_rechnung)
[barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad, stromgestehungskosten] = oekonomie_berechnen_ev_speicher(leistung_pv, lastprofil_wahl, eco, kW, KalkZins, Speicher_kWh)

# %%
