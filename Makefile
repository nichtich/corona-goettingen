fallzahlen.csv:
	echo "datum,update,gemeinde,faelle,infizierte,quelle" > $@
	ls artikel/*.html | xargs -n1 ./fallzahlen >> $@

artikel.tsv:
	printf "id\tdatum\tupdate\ttitle\turl\n" > artikel.tsv
	ls artikel/*.html | xargs -n1 ./extract >> artikel.tsv

duplicated:
	awk -F, '{print $$1,$$3}' fallzahlen.csv | sort | uniq -d | awk '{print $$1}' | uniq
