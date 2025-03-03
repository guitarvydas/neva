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
    set_return (`${stylestr.rwr ()}`);
return exit_rule ("item_style");
},
item_default : function (c,) {
enter_rule ("item_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("item_default");
},
stylestr : function (dq,styleitem,dq2,) {
enter_rule ("stylestr");
    set_return (`${styleitem.rwr ().join ('')}`);
return exit_rule ("stylestr");
},
styleitem_num : function (word,_eq,number,_semicolon,) {
enter_rule ("styleitem_num");
    set_return (`\n"${word.rwr ()}" : ${number.rwr ()}, `);
return exit_rule ("styleitem_num");
},
styleitem_eq : function (word,_eq,v,_semicolon,) {
enter_rule ("styleitem_eq");
    set_return (`\n"${word.rwr ()}": "${v.rwr ()}", `);
return exit_rule ("styleitem_eq");
},
styleitem_declaration : function (word,_semicolon,) {
enter_rule ("styleitem_declaration");
    set_return (`\n"${word.rwr ()}" : true, `);
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
number : function (sign,fdigit,) {
enter_rule ("number");
    set_return (`${sign.rwr ().join ('')}${fdigit.rwr ().join ('')}`);
return exit_rule ("number");
},
sign : function (c,) {
enter_rule ("sign");
    set_return (`${c.rwr ()}`);
return exit_rule ("sign");
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
