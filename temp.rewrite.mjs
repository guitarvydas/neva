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
item_geometry : function (g,) {
enter_rule ("item_geometry");
    set_return (`${g.rwr ()}`);
return exit_rule ("item_geometry");
},
item_default : function (c,) {
enter_rule ("item_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("item_default");
},
geometry : function (_geo,ws1,lb,ws2,x,y,w,h,as,rect,rb,ws3,_comma,ws4,) {
enter_rule ("geometry");
    set_return (`\n${_geo.rwr ()}${ws1.rwr ()}${lb.rwr ()}${ws2.rwr ()}${x.rwr ()}${y.rwr ()}${w.rwr ()}${h.rwr ()}${as.rwr ().join ('')}${rect.rwr ().join ('')}${rb.rwr ()}${ws3.rwr ()}${_comma.rwr ()}${ws4.rwr ()}`);
return exit_rule ("geometry");
},
x : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("x");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${n.rwr ()}${_comma.rwr ()}${ws3.rwr ()}`);
return exit_rule ("x");
},
y : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("y");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${n.rwr ()}${_comma.rwr ()}${ws3.rwr ()}`);
return exit_rule ("y");
},
width : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("width");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${n.rwr ()}${_comma.rwr ()}${ws3.rwr ()}`);
return exit_rule ("width");
},
height : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("height");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${n.rwr ()}${_comma.rwr ()}${ws3.rwr ()}`);
return exit_rule ("height");
},
as : function (_,ws1,_colon,ws2,s,_comma,ws3,) {
enter_rule ("as");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${s.rwr ()}${_comma.rwr ()}${ws3.rwr ()}`);
return exit_rule ("as");
},
rectangle : function (_,ws1,_colon,ws2,lb,ws3,cs,rb,ws4,) {
enter_rule ("rectangle");
    set_return (`${_.rwr ()}${ws1.rwr ()}${_colon.rwr ()}${ws2.rwr ()}${lb.rwr ()}${ws3.rwr ()}${cs.rwr ().join ('')}${rb.rwr ()}${ws4.rwr ()}`);
return exit_rule ("rectangle");
},
string : function (ldq,cs,rdq,ws,) {
enter_rule ("string");
    set_return (`${ldq.rwr ()}${cs.rwr ().join ('')}${rdq.rwr ()}${ws.rwr ()}`);
return exit_rule ("string");
},
number : function (sign,fdigit,ws,) {
enter_rule ("number");
    set_return (`${sign.rwr ().join ('')}${fdigit.rwr ().join ('')}${ws.rwr ()}`);
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
ws : function (x,) {
enter_rule ("ws");
    set_return (`${x.rwr ()}`);
return exit_rule ("ws");
},
_terminal: function () { return this.sourceString; },
_iter: function (...children) { return children.map(c => c.rwr ()); }
}
