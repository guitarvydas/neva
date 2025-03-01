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

main : function (_g,ws,drawing,_h,ws2,) {
enter_rule ("main");
    set_return (`${drawing.rwr ().join ('')}`);
return exit_rule ("main");
},
drawing : function (_b,ws,name,_comma,ws2,children,_comma2,_ws3,connections,_e,ws4,) {
enter_rule ("drawing");
    set_return (`def ${name.rwr ()} () () {\n${children.rwr ()}\n---\n${connections.rwr ()}\n}\n`);
return exit_rule ("drawing");
},
name : function (name,_c,ws,s,) {
enter_rule ("name");
    set_return (`${s.rwr ()}`);
return exit_rule ("name");
},
children : function (_children,_c,ws,_g,ws2,childR,_h,ws3,) {
enter_rule ("children");
    set_return (`${childR.rwr ().join ('')}`);
return exit_rule ("children");
},
connections : function (_connections,_c,ws,_g,ws2,wireR,_h,ws3,) {
enter_rule ("connections");
    set_return (`${_connections.rwr ()}${_c.rwr ()}${ws.rwr ()}${_g.rwr ()}${ws2.rwr ()}${wireR.rwr ().join ('')}${_h.rwr ()}${ws3.rwr ()}`);
return exit_rule ("connections");
},
childR_many : function (partRef,_command,_ws,childR,) {
enter_rule ("childR_many");
    set_return (`${partRef.rwr ()}, ${childR.rwr ()}`);
return exit_rule ("childR_many");
},
childR_last : function (partRef,) {
enter_rule ("childR_last");
    set_return (`undefined`);
return exit_rule ("childR_last");
},
wireR_many : function (wireDef,_comma,ws,wireR,) {
enter_rule ("wireR_many");
    set_return (`${wireDef.rwr ()}${wireR.rwr ()}`);
return exit_rule ("wireR_many");
},
wireR_last : function (wireDef,) {
enter_rule ("wireR_last");
    set_return (`${wireDef.rwr ()}`);
return exit_rule ("wireR_last");
},
wireDef : function (_b,ws,direction,sourcePort,targetPort,source,target,_e,ws2,) {
enter_rule ("wireDef");
    set_return (`${_b.rwr ()}${ws.rwr ()}${direction.rwr ()}${sourcePort.rwr ()}${targetPort.rwr ()}${source.rwr ().join ('')}${target.rwr ().join ('')}${_e.rwr ()}${ws2.rwr ()}`);
return exit_rule ("wireDef");
},
partRef : function (_b,ws,name,_comma,id,_ws,_e,ws2,) {
enter_rule ("partRef");
    set_return (`${name.rwr ()}`);
return exit_rule ("partRef");
},
sourcePort_strng : function (p,_c,ws,s,_comma,_ws2,) {
enter_rule ("sourcePort_strng");
    set_return (`${p.rwr ()}${_c.rwr ()}${ws.rwr ()}${s.rwr ()}`);
return exit_rule ("sourcePort_strng");
},
sourcePort_emptystrng : function (p,_c,ws,es,_comma,_ws2,) {
enter_rule ("sourcePort_emptystrng");
    set_return (`${p.rwr ()}${_c.rwr ()}${ws.rwr ()}${es.rwr ()}${_comma.rwr ()}${_ws2.rwr ()}`);
return exit_rule ("sourcePort_emptystrng");
},
targetPort_strng : function (p,_c,ws,s,_comma,ws2,) {
enter_rule ("targetPort_strng");
    set_return (`${p.rwr ()}${_c.rwr ()}${ws.rwr ()}${s.rwr ()}${_comma.rwr ()}undefined`);
return exit_rule ("targetPort_strng");
},
targetPort_emptystrng : function (p,_c,ws,es,_comma,ws2,) {
enter_rule ("targetPort_emptystrng");
    set_return (`${p.rwr ()}${_c.rwr ()}${ws.rwr ()}${es.rwr ()}${_comma.rwr ()}undefined`);
return exit_rule ("targetPort_emptystrng");
},
source : function (s,_c,ws,partRef,_comma,ws2,) {
enter_rule ("source");
    set_return (`${s.rwr ()}${_c.rwr ()}${ws.rwr ()}${partRef.rwr ()}${_comma.rwr ().join ('')}${ws2.rwr ()}`);
return exit_rule ("source");
},
target : function (t,_c,ws,partRef,_comma,ws2,) {
enter_rule ("target");
    set_return (`${t.rwr ()}${_c.rwr ()}${ws.rwr ()}${partRef.rwr ()}${_comma.rwr ().join ('')}${ws2.rwr ()}`);
return exit_rule ("target");
},
id : function (id,_c,ws,digit,ws2,) {
enter_rule ("id");
    set_return (`${id.rwr ()}${_c.rwr ()}${ws.rwr ()}${digit.rwr ().join ('')}${ws2.rwr ()}`);
return exit_rule ("id");
},
direction : function (dir,_c,ws,dirEnum,_comma,ws2,) {
enter_rule ("direction");
    set_return (`${dir.rwr ()}${_c.rwr ()}${ws.rwr ()}${dirEnum.rwr ()}${_comma.rwr ()}${ws2.rwr ()}`);
return exit_rule ("direction");
},
dirEnum : function (d,ws,) {
enter_rule ("dirEnum");
    set_return (`${d.rwr ()}${ws.rwr ()}`);
return exit_rule ("dirEnum");
},
dirDown : function (c,) {
enter_rule ("dirDown");
    set_return (`'down'`);
return exit_rule ("dirDown");
},
dirAcross : function (c,) {
enter_rule ("dirAcross");
    set_return (`'across'`);
return exit_rule ("dirAcross");
},
dirUp : function (c,) {
enter_rule ("dirUp");
    set_return (`'up'`);
return exit_rule ("dirUp");
},
dirThrough : function (c,) {
enter_rule ("dirThrough");
    set_return (`'through'`);
return exit_rule ("dirThrough");
},
strng : function (dq,char,dq2,ws,) {
enter_rule ("strng");
    set_return (`${char.rwr ().join ('')}`);
return exit_rule ("strng");
},
emptystrng : function (dq,dq2,ws,) {
enter_rule ("emptystrng");
    set_return (`${dq.rwr ()}${dq2.rwr ()}${ws.rwr ()}`);
return exit_rule ("emptystrng");
},
str : function (dq,s,dq2,ws,) {
enter_rule ("str");
    set_return (`${dq.rwr ()}${s.rwr ()}${dq2.rwr ()}${ws.rwr ()}`);
return exit_rule ("str");
},
dq : function (c,) {
enter_rule ("dq");
    set_return (`${c.rwr ()}`);
return exit_rule ("dq");
},
char : function (c,) {
enter_rule ("char");
    set_return (`${c.rwr ()}`);
return exit_rule ("char");
},
ws : function (c,) {
enter_rule ("ws");
    set_return (`${c.rwr ().join ('')}`);
return exit_rule ("ws");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
