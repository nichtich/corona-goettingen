# Corona-Fallzahlen im Landkreis Göttingen

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/nichtich/corona-goettingen/HEAD?filepath=Fallzahlen.ipynb)

> Inoffizielle Datensammlung zu Göttinger Corona-Fallzahlen

Dieses Repository enthält Corona-Fallzahlen des Landkreis Göttingen auf Gemeindeebene. Die Zahlen stammen [von der Homepage der Stadt Göttingen](https://www.goettingen.de/aktuelles.html) wo sie seit April 2020 veröffentlicht werden. Darüber hinaus enthalt das Repository Hilfsmittel zum
Herunterladen und Analysieren der Daten.

## Inhalt

* [`fallzahlen.csv`](fallzahlen.csv) enthält die von der Homepage der Stadt Göttingen übernommenen Zahlen. In [dieses Google Spreadhseet](https://docs.google.com/spreadsheets/d/1b3PmQ2b6RC4gRC2K6Kb7oI4BbZ9LXTA5RvkSyq8y9EE/edit?usp=sharing) werden die Daten importiert.
* [Fallzahlen.ipynb](Fallzahlen.ipynb) ist ein [Jupyter Notebook](https://jupyter-tutorial.readthedocs.io/de/latest/index.html) mit einigen Analysen. Das Notebook kann [hier mittels Binder](https://mybinder.org/v2/gh/nichtich/corona-goettingen/HEAD?filepath=Fallzahlen.ipynb) im Browser geöffnet werden. *Verbesserungsvorschläge sind willkommen!*

## Technischer Hintergrund

Für die Datensammlung und -Extraktion wird benötigt:

* Bash
* [pup](https://github.com/ericchiang/pup#pup)

Für die Datenanalyse wird benötigt:

* Juypter Notebook mit Pandas (ggf. installierbar mit `pip3 install jupyter pandas matplotlib`)

Da der RSS-Feed der Homepage der Stadt Göttingen nicht brauchbar ist (anscheinend tauchen nicht alle Artikel auf?) werden einfach *alle* Artikel (ab Artikel-ID 3064 vom 4.3.2020) heruntergeladen:

~~~bash
for i in {3064..4310}; do ./download $i; sleep 1; done
~~~

Zur Übersicht kann erstmal eine Liste aller Artikel mit Datum, URL und Titel erstellt werden:
Anschließend werden aus den Artikeln Datum, Titel und Inhalt extrahiert:

~~~bash
make artikel.tsv
~~~

Aus den Titel lässt sich schon oft die Zahl von Infizierten ablesen. Für die genauen Zahlen nach Gemeinde müssen die Artikelinhalte analysiert werden:

~~~bash
make fallzahlen.tsv
~~~

Das Skript `update` ermittelt automatisch die letzte Artikel-ID, läd alle fehlenden Artikel herunter und erweitert die Datei `fallzahlen.tsv`. Mit dem Argument `commit` wird die Aktualisierung gleich im git-Repository committed:

~~~
./update commit
~~~

## License

Use as you like and stay safe (Unlicense)!
