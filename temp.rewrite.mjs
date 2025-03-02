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

Top : function (macro,) {
enter_rule ("Top");
    set_return (`${macro.rwr ().join ('')}`);
return exit_rule ("Top");
},
Macro_style : function (s,) {
enter_rule ("Macro_style");
    set_return (`${s.rwr ()}`);
return exit_rule ("Macro_style");
},
Macro_string : function (s,) {
enter_rule ("Macro_string");
    set_return (`${s.rwr ()}`);
return exit_rule ("Macro_string");
},
Macro_other : function (c,) {
enter_rule ("Macro_other");
    set_return (`${c.rwr ()}`);
return exit_rule ("Macro_other");
},
Style : function (_,_eq,s,) {
enter_rule ("Style");
    set_return (`${_.rwr ()}${_eq.rwr ()}${s.rwr ()}`);
return exit_rule ("Style");
},
str : function (dq1,char,dq2,) {
enter_rule ("str");
    set_return (`${dq1.rwr ()}${char.rwr ().join ('')}${dq2.rwr ()}`);
return exit_rule ("str");
},
dq : function (c,) {
enter_rule ("dq");
    set_return (`${c.rwr ()}`);
return exit_rule ("dq");
},
char_escapedDQ : function (c,) {
enter_rule ("char_escapedDQ");
    set_return (`${c.rwr ()}`);
return exit_rule ("char_escapedDQ");
},
char_other : function (c,) {
enter_rule ("char_other");
    set_return (`${c.rwr ()}`);
return exit_rule ("char_other");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
