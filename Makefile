fallzahlen.csv:
	ls artikel/*.html | xargs -n1 ./fallzahlen > fallzahlen.csv

artikel.tsv:
	printf "id\tcreated\tmodified\ttitle\turl\n" > artikel.tsv
	ls artikel/*.html | xargs -n1 ./extract >> artikel.tsv
