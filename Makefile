JS_SRC=bang.js background.js browser-polyfill.min.js
SRC=$(JS_SRC) manifest.json 
zip: $(SRC)
	zip bang.zip $(SRC)
