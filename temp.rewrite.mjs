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
item_braces : function (lb,ws,item,rb,) {
enter_rule ("item_braces");
    set_return (`${lb.rwr ()}${ws.rwr ()}${item.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("item_braces");
},
item_square : function (lb,ws,item,rb,) {
enter_rule ("item_square");
    set_return (`${lb.rwr ()}${ws.rwr ()}${item.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("item_square");
},
RootArray : function (lb,Object,rb,) {
enter_rule ("RootArray");
    set_return (`${lb.rwr ()}${Object.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("RootArray");
},
Object_inputgate : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_inputgate");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()}${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_inputgate");
},
Object_inputport : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_inputport");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_inputport");
},
Object_outputgate : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_outputgate");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_outputgate");
},
Object_outputport : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_outputport");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_outputport");
},
Object_part : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_part");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_part");
},
Object_wire : function (lb,_kind,_,c,Other,rb,c2,) {
enter_rule ("Object_wire");
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Object_wire");
},
Object_ignore : function (lb,c,rb,_comma,) {
enter_rule ("Object_ignore");
    set_return (``);
return exit_rule ("Object_ignore");
},
Other_braces : function (lb,Other,rb,) {
enter_rule ("Other_braces");
    set_return (`${lb.rwr ()}${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Other_braces");
},
Other_square : function (lb,Other,rb,) {
enter_rule ("Other_square");
    set_return (`${lb.rwr ()}${Other.rwr ().join ('')}${rb.rwr ()},`);
return exit_rule ("Other_square");
},
Other_default : function (c,) {
enter_rule ("Other_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("Other_default");
},
Key : function (dq1,s,dq2,_colon,) {
enter_rule ("Key");
    set_return (`${dq1.rwr ()}${s.rwr ()}${dq2.rwr ()}${_colon.rwr ()}`);
return exit_rule ("Key");
},
value : function (dq1,s,dq2,) {
enter_rule ("value");
    set_return (`${dq1.rwr ()}${s.rwr ()}${dq2.rwr ()}`);
return exit_rule ("value");
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
