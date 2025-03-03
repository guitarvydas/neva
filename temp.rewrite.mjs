let parameters = {};
function pushParameter (name, v) {
    if (!parameters [name]) {
	parameters [name] = [];
    }
    parameters [name].push (v);
}
function popParameter (name) {
    parameters [name].pop ();
}
function getParameter (name) {
    return parameters [name];
}


let _rewrite = {

main : function (item,) {
enter_rule ("main");
    set_return (`${item.rwr ().join ('')}`);
return exit_rule ("main");
},
item_style : function (_style,spaces,_colon,spaces2,stylestr,) {
enter_rule ("item_style");
    set_return (`${_style.rwr ()}${spaces.rwr ()}${_colon.rwr ()}${spaces2.rwr ()}${stylestr.rwr ()}`);
return exit_rule ("item_style");
},
item_default : function (c,) {
enter_rule ("item_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("item_default");
},
stylestr : function (dq,styleitem,dq2,) {
enter_rule ("stylestr");
    set_return (`${dq.rwr ()}${styleitem.rwr ().join ('')}${dq2.rwr ()}`);
return exit_rule ("stylestr");
},
styleitem_num : function (word,_eq,number,_semicolon,) {
enter_rule ("styleitem_num");
    set_return (`${word.rwr ()}${_eq.rwr ()}${number.rwr ()}${_semicolon.rwr ()}`);
return exit_rule ("styleitem_num");
},
styleitem_hex : function (word,_eq,number,_semicolon,) {
enter_rule ("styleitem_hex");
    set_return (`${word.rwr ()}${_eq.rwr ()}${number.rwr ()}${_semicolon.rwr ()}`);
return exit_rule ("styleitem_hex");
},
styleitem_eq : function (word,_eq,v,_semicolon,) {
enter_rule ("styleitem_eq");
    set_return (`${word.rwr ()}${_eq.rwr ()}${v.rwr ()}${_semicolon.rwr ()}`);
return exit_rule ("styleitem_eq");
},
styleitem_declaration : function (word,_semicolon,) {
enter_rule ("styleitem_declaration");
    set_return (`${word.rwr ()}${_semicolon.rwr ()}`);
return exit_rule ("styleitem_declaration");
},
word : function (wchar,) {
enter_rule ("word");
    set_return (`${wchar.rwr ().join ('')}`);
return exit_rule ("word");
},
wchar : function (c,) {
enter_rule ("wchar");
    set_return (`${c.rwr ()}`);
return exit_rule ("wchar");
},
number : function (fdigit,) {
enter_rule ("number");
    set_return (`${fdigit.rwr ().join ('')}`);
return exit_rule ("number");
},
hex : function (_octothorpe,hexDigit,) {
enter_rule ("hex");
    set_return (`${_octothorpe.rwr ()}${hexDigit.rwr ().join ('')}`);
return exit_rule ("hex");
},
fdigit : function (c,) {
enter_rule ("fdigit");
    set_return (`${c.rwr ()}`);
return exit_rule ("fdigit");
},
dq : function (c,) {
enter_rule ("dq");
    set_return (`${c.rwr ()}`);
return exit_rule ("dq");
},
str : function (dq,s,dq2,) {
enter_rule ("str");
    set_return (`${dq.rwr ()}${s.rwr ()}${dq2.rwr ()}`);
return exit_rule ("str");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
