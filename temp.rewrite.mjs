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
item_cnc : function (x,) {
enter_rule ("item_cnc");
    set_return (`\n}`);
return exit_rule ("item_cnc");
},
item_cc : function (x,) {
enter_rule ("item_cc");
    set_return (`}`);
return exit_rule ("item_cc");
},
item_blank : function (x,) {
enter_rule ("item_blank");
    set_return (`\n`);
return exit_rule ("item_blank");
},
item_default : function (x,) {
enter_rule ("item_default");
    set_return (`${x.rwr ()}`);
return exit_rule ("item_default");
},
commaNLClose : function (spaces,_comma,spaces2,nl,snl,_close,) {
enter_rule ("commaNLClose");
    set_return (``);
return exit_rule ("commaNLClose");
},
commaClose : function (spaces,_comma,spaces2,_close,) {
enter_rule ("commaClose");
    set_return (``);
return exit_rule ("commaClose");
},
blankline : function (nl1,space,nl2,) {
enter_rule ("blankline");
    set_return (``);
return exit_rule ("blankline");
},
nl : function (c,) {
enter_rule ("nl");
    set_return (`${c.rwr ()}`);
return exit_rule ("nl");
},
snl : function (c,) {
enter_rule ("snl");
    set_return (`${c.rwr ()}`);
return exit_rule ("snl");
},
space : function (c,) {
enter_rule ("space");
    set_return (`${c.rwr ()}`);
return exit_rule ("space");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
