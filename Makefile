all: drawio1

basic:
	node das2json.mjs <neva-echo.drawio >neva-echo.drawio.json
	./ndsl das.ohm das.rewrite support.js <neva-echo.drawio.json

test:
	./ndsl test.ohm test.rewrite support.js <test.txt

drawio1:
	./ndsl drawio1.ohm drawio1.rewrite support.js <sample.drawio
