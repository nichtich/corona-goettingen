#!/usr/bin/env python3

import pandas as pd
import json
import os
import re

dtypes = {'datum': 'str', 'update': 'str', 'gemeinde': 'str', 'faelle': 'Int64', 'infizierte': 'Int64', 'quelle': 'int'}
zahlen = pd.read_csv('fallzahlen.csv', dtype=dtypes, parse_dates=['datum', 'update'])

gemeinden = json.load(open('gemeinden.json'))

html = open("index.html", "w")

for g in gemeinden:
    infizierte = zahlen[zahlen["gemeinde"]==g["name"]][['datum','infizierte']]
    infizierte.set_index(['datum'], inplace=True)
    infizierte.dropna(inplace=True)
    fig = infizierte.plot(title=g["name"])
    img = "docs/%s.png" % (g["id"])
    fig.figure.savefig(img)
    print(g["name"])
    html.write("<img src='%s'>" % (img))

#gemeinden = pd.read_csv('gemeinden.csv', dtype={'Gemeinde':'str', 'Einwohner':'Int64'})
#gemeinden.set_index(['Gemeinde'],inplace=True)
#print(gemeinden)
