#%%
from Gewerbe_Funktionen import oekonomie_vorbereiten_gw_ds, \
    oekonomie_berechnen_gw_ds
from Allgemeine_Funktionen import wetter_waehlen, pv_werte_waehlen, berechnung_pv_vektor
import numpy as np
import pandas as pd
#%%
air_temp = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Air_Temp.npy', allow_pickle=True)
GlobalStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\GlobalStr.npy', allow_pickle=True)
DiffusStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\DiffusStr.npy', allow_pickle=True)
Lastprofile_GW = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Lastprofile_Gewerbe.npy', allow_pickle=True)

# %%
Standort = '1'
kW = 30
Jahresstromverbrauch = 35000
Strompreis = 28
Azimuth = 0
Aufstellwinkel = 15
KalkZins = 2
Strompreissteigerung = 2
Dachart = 2 # 1 = Flachdach, 2 = Schraegdach
WelchesDach = 1 #  1 = Eine Hälfte, 2 = Beide Hälften
Dachkonfiguration = 2 # 1 = Trapez, 2 = Hintereinander
zeit_vektor = pd.date_range('2010-01-01 00:00:00', '2010-12-31 23:59:00', freq='1min')
lastprofil_wahl = Lastprofile_GW[:,0]
Betreiber = 'betreiber-0'
# %%
[dirh, dhi, tamb, breite, laenge] = wetter_waehlen(Standort, air_temp, GlobalStr, DiffusStr)
logisch_doppelte_rechnung = pv_werte_waehlen(Dachart, Dachkonfiguration, WelchesDach)
eco = oekonomie_vorbereiten_gw_ds(Strompreis, kW, Strompreissteigerung)
leistung_pv = berechnung_pv_vektor(dirh, dhi, tamb, zeit_vektor, breite, laenge, Azimuth, Aufstellwinkel, kW, logisch_doppelte_rechnung)
[barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = oekonomie_berechnen_gw_ds(leistung_pv, lastprofil_wahl, eco, kW, KalkZins, Betreiber, Jahresstromverbrauch)
print(barwert, rendite, autarkiegrad, eigenverbrauchsanteil)

# %%
