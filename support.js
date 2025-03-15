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

function fmtDict () {
    return JSON.stringify (dict);
}
