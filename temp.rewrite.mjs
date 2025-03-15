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
item : function (x,) {
enter_rule ("item");
    set_return (`${x.rwr ()}`);
return exit_rule ("item");
},
item_rec : function (lb,item,rb,) {
enter_rule ("item_rec");
    set_return (`${lb.rwr ()}${item.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("item_rec");
},
item_recsq : function (lb,item,rb,) {
enter_rule ("item_recsq");
    set_return (`${lb.rwr ()}${item.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("item_recsq");
},
SymbolTable : function (_symbolTable,lb,KVpairs,rb,) {
enter_rule ("SymbolTable");
    set_return (`${_symbolTable.rwr ()}${lb.rwr ()}undefined${rb.rwr ()}`);
return exit_rule ("SymbolTable");
},
Wire : function (lb,ID,Label,_kind,_wire,Parent,Source,Target,rb,) {
enter_rule ("Wire");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${_kind.rwr ()}${_wire.rwr ()}${Parent.rwr ()}${Source.rwr ()}${Target.rwr ()}${rb.rwr ()}`);
return exit_rule ("Wire");
},
Source : function (k,v,) {
enter_rule ("Source");
    set_return (`${k.rwr ()}undefined${v.rwr ()}`);
return exit_rule ("Source");
},
Target : function (k,v,) {
enter_rule ("Target");
    set_return (`${k.rwr ()}undefined${v.rwr ()}`);
return exit_rule ("Target");
},
ID : function (id,s,) {
enter_rule ("ID");
    set_return (`\n${id.rwr ()}${s.rwr ()},`);
return exit_rule ("ID");
},
Label : function (v,s,) {
enter_rule ("Label");
    set_return (`\n"label":${s.rwr ()},`);
return exit_rule ("Label");
},
Parent : function (_parent,s,) {
enter_rule ("Parent");
    set_return (`\n${_parent.rwr ()}${s.rwr ()},`);
return exit_rule ("Parent");
},
Key : function (dq1,s,dq2,_colon,) {
enter_rule ("Key");
    set_return (`\n${dq1.rwr ()}${s.rwr ()}${dq2.rwr ()}${_colon.rwr ()}`);
return exit_rule ("Key");
},
value : function (dq1,s,dq2,) {
enter_rule ("value");
    set_return (`${dq1.rwr ()}${s.rwr ()}${dq2.rwr ()}`);
return exit_rule ("value");
},
notBrace_rec : function (lb,notBrace,rb,) {
enter_rule ("notBrace_rec");
    set_return (`${lb.rwr ()}${notBrace.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("notBrace_rec");
},
notBrace_default : function (c,) {
enter_rule ("notBrace_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("notBrace_default");
},
x : function (number,) {
enter_rule ("x");
    set_return (`${number.rwr ()}`);
return exit_rule ("x");
},
y : function (number,) {
enter_rule ("y");
    set_return (`${number.rwr ()}`);
return exit_rule ("y");
},
width : function (number,) {
enter_rule ("width");
    set_return (`${number.rwr ()}`);
return exit_rule ("width");
},
height : function (number,) {
enter_rule ("height");
    set_return (`${number.rwr ()}`);
return exit_rule ("height");
},
number : function (sign,int,frac,) {
enter_rule ("number");
    set_return (`${sign.rwr ().join ('')}${int.rwr ()}${frac.rwr ().join ('')}`);
return exit_rule ("number");
},
int : function (digit,) {
enter_rule ("int");
    set_return (`${digit.rwr ().join ('')}`);
return exit_rule ("int");
},
sign : function (c,) {
enter_rule ("sign");
    set_return (`${c.rwr ()}`);
return exit_rule ("sign");
},
frac : function (_dot,digit,) {
enter_rule ("frac");
    set_return (`${_dot.rwr ()}${digit.rwr ().join ('')}`);
return exit_rule ("frac");
},
string : function (dq1,cs,dq2,) {
enter_rule ("string");
    set_return (`${dq1.rwr ()}${cs.rwr ().join ('')}${dq2.rwr ()}`);
return exit_rule ("string");
},
dq : function (c,) {
enter_rule ("dq");
    set_return (`${c.rwr ()}`);
return exit_rule ("dq");
},
space : function (c,) {
enter_rule ("space");
    set_return (`${c.rwr ()}`);
return exit_rule ("space");
},
spaces : function (cs,) {
enter_rule ("spaces");
    set_return (`${cs.rwr ().join ('')}`);
return exit_rule ("spaces");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
