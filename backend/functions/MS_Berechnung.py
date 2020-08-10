def berechnung_ms(Standort, Dachart, Aufstaenderung, Dachhaelften, Strompreis, kW, Strompreissteigerung, 
                  i_teilnehmer, Azimuth, Aufstellwinkel, mieterstromzuschlag, KalkZins, betreiber):
    from Mehrfamilienhaus_Funktionen import oekonomie_vorbereiten_ms, \
        oekonomie_berechnen_ms
    from Allgemeine_Funktionen import wetter_waehlen, pv_werte_waehlen, berechnung_pv_vektor
    import numpy as np
    import pandas as pd

    air_temp = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Air_Temp.npy', allow_pickle=True)
    GlobalStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\GlobalStr.npy', allow_pickle=True)
    DiffusStr = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\DiffusStr.npy', allow_pickle=True)
    Lastprofile_Mfh = np.load('D:\\Solarspeichersysteme\\09_Projekte\\2016_PV2City\\2018_10 Leitfaden Eigenverbrauch\\App-Entwicklung\\Unabhaengigkeitsrechner_Python\\Daten Wetter und Last\\Lastprofile_MFH.npy', allow_pickle=True)
    zeit_vektor = pd.date_range('2010-01-01 00:00:00', '2010-12-31 23:59:00', freq='1min')
    Lastprofil_MS = Lastprofile_Mfh[:, i_teilnehmer - 1]


    [dirh, dhi, tamb, breite, laenge] = wetter_waehlen(Standort, air_temp, GlobalStr, DiffusStr)
    logisch_doppelte_rechnung = pv_werte_waehlen(Dachart, Aufstaenderung, Dachhaelften)
    eco = oekonomie_vorbereiten_ms(Strompreis, kW, Strompreissteigerung, i_teilnehmer)
    leistung_pv = berechnung_pv_vektor(dirh, dhi, tamb, zeit_vektor, breite, laenge, Azimuth, Aufstellwinkel, kW, logisch_doppelte_rechnung)
    [barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad] = oekonomie_berechnen_ms(leistung_pv, Lastprofil_MS, eco, kW, mieterstromzuschlag, KalkZins, betreiber)
    return barwert, rendite, gewinnkurve, eigenverbrauchsanteil, autarkiegrad
