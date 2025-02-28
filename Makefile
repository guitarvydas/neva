all:
	node das2json.mjs <neva-echo.drawio >neva-echo.drawio.json
	./ndsl das.ohm das.rewrite support.js <neva-echo.drawio.json

