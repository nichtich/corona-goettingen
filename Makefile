fallzahlen.csv:
	echo "created,modified,gemeinde,faelle,infizierte,quelle" > fallzahlen.csv
	ls artikel/*.html | xargs -n1 ./fallzahlen >> fallzahlen.csv

artikel.tsv:
	printf "id\tcreated\tmodified\ttitle\turl\n" > artikel.tsv
	ls artikel/*.html | xargs -n1 ./extract >> artikel.tsv

duplicated:
	awk -F, '{print $$1,$$3}' fallzahlen.csv | sort | uniq -d | awk '{print $$1}' | uniq
