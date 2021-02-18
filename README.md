# Corona-Fallzahlen im Landkreis Göttingen

> Inoffizielle Datensammlung zu Göttinger Corona-Fallzahlen

Dieses Repository enthält Corona-Fallzahlen des Landkreis Göttingen auf Gemeindeebene. Die Zahlen stammen [von der Homepage der Stadt Göttingen](https://www.goettingen.de/aktuelles.html) wo sie seit April 2020 veröffentlicht werden. Darüber hinaus enthalt das Repository Hilfsmittel zum Herunterladen, Visualisieren und Analysieren der Daten, insbesondere:

* [Eine Webseite zur Übersicht](https://jakobvoss.de/corona-goettingen/)
* [Die aggregierten Daten als CSV-Datei](fallzahlen.csv)

Sowie

* [Fallzahlen.ipynb](Fallzahlen.ipynb) ist ein [Jupyter Notebook](https://jupyter-tutorial.readthedocs.io/de/latest/index.html) mit einigen Analysen. Das Notebook kann [hier mittels Binder](https://mybinder.org/v2/gh/nichtich/corona-goettingen/HEAD?filepath=Fallzahlen.ipynb) im Browser geöffnet werden. *Verbesserungsvorschläge sind willkommen!*

[![Binder](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/nichtich/corona-goettingen/HEAD?filepath=Fallzahlen.ipynb)

## Technischer Hintergrund

### Datensammlung

Für die Datensammlung und -Extraktion wird benötigt:

* Bash
* [pup](https://github.com/ericchiang/pup#pup)
* jq

Für die Datenanalyse wird benötigt:

* Juypter Notebook mit Pandas (ggf. installierbar mit `pip3 install jupyter pandas matplotlib`)

Da der RSS-Feed der Homepage der Stadt Göttingen nicht verlässlich ist werden einfach *alle* Artikel (ab Artikel-ID 3064 vom 4.3.2020) heruntergeladen.

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

### Webseite

Webseite hot-reloading unter <http://localhost:37073> bereitstellen:

~~~sh
npm i
npm run dev
~~~

Die Layout-Dateien sind um Wesentlichen `views/*.html` und `docs/*.css`.

## License

Use as you like and stay safe (Unlicense)!
