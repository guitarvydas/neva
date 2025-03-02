all: drawio

basic:
	node das2json.mjs <neva-echo.drawio >neva-echo.drawio.json
	./ndsl das.ohm das.rewrite support.js <neva-echo.drawio.json

test:
	./ndsl test.ohm test.rewrite support.js <test.txt

drawio:
	./ndsl drawio.ohm drawio.rewrite support.js <sample.drawio

drawio2:
	./ndsl drawio.ohm drawio.rewrite support.js <sample2.drawio
