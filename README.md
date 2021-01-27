# corona-goettingen

Dieses Repository enthält Skripte zum Herunterladen der Corona-Fallzahlen auf Gemeindeebene aus dem Landkreis Göttingen.

## Requirements

Für die Datensammlung und -Extraktion:

* Bash
* [pup](https://github.com/ericchiang/pup#pup)

Für die Datenanalyse:

* Juypter Notebook mit Pandas (ggf. installierbar mit `pip3 install jupyter pandas matplotlib`)

## Usage

### Datensammlung

Da der RSS-Feed der Homepage der Stadt Göttingen nicht richtig zu funktionieren scheint (?) werden einfach *alle* Artikel (ab Artikel-ID 3064 vom 4.3.2020) heruntergeladen:

~~~bash
for i in {3064..4310}; do ./download $i; sleep 1; done
~~~

*Die ID des letzten Artikels muss jeweils noch per Hand aktualisiert werden*

Zur Übersicht wird erstmal eine Liste aller Artikel mit Datum, URL und Titel erstellt:
Anschließend werden aus den Artikeln Datum, Titel und Inhalt extrahiert:

~~~bash
make artikel.tsv
~~~

Aus den Titel lässt sich schon oft die Zahl von Infizierten ablesen. Für die genauen Zahlen nach Gemeinde müssen die Artikelinhalte analysiert werden:

~~~bash
make fallzahlen.tsv
~~~

### Datenanalyse

Die Datei [Fallzahlen.ipynb](Fallzahlen.ipynb) enthält ein exemplarisches Jupyter Notebook. Ergänzungen für weitere Analysen und schönere Visualisierungen sind willkommen!

## License

Use as you like and stay safe (Unlicense)!
