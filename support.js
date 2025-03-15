let dict = {};

function resetDict () {
    dict = {};
    return "";
}

function treeWalk (ignore) {
    return '';
}

function gather (key, val) {
    let k = key.replaceAll (/^[^:]+:"/g, "").replaceAll ('"', '').replaceAll (',', '');
    dict [k] = val;
    return '';
}

function noQuotes (s) {
    return s.replaceAll ('"', '');
}

function appendDict (key, val) {
    let k = noQuotes (key);
    let v = noQuotes (val);
    dict [k] = v;
    return '';
}

function fmtDict () {
    return JSON.stringify (dict);
}

function makeDirection (source, target) {
    let sender = dict [noQuotes (source)];
    let receiver = dict [noQuotes (target)];
    if (sender === "outputport") {
	if (receiver === "inputport") {
	    return '"direction":"across"';
	} else if (receiver === "outputgate") {
	    return '"direction":"up"';
	    } else {
		return '"direction":"??? (A)"';
	    }
    } else if (sender === "inputgate") {
	if (receiver === "inputport") {
	    return '"direction":"down"';
	} else if (receiver === "outputgate") {
	    return '"direction":"through"';
	} else {
	    return '"direction":"??? (B)"';
	}
    } else {
	return '"direction":"??? (C)"';
    }
}

