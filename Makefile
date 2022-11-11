JS_SRC=bang.js background.js browser-polyfill.min.js
SRC=$(JS_SRC) manifest.json icons/*
ADDITION_ID=",


zip: $(SRC)
	zip bang.zip $(SRC)

id_zip: $(SRC)
	mv manifest.json manifest.json.tmp
	head -n -1 manifest.json.tmp > manifest.json
	cat id.txt >> manifest.json
	zip bang.id.zip $(SRC)
	mv manifest.json.tmp manifest.json

