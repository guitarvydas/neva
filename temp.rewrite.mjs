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

Main : function (_mxfile,lb,Diagram,rb,) {
enter_rule ("Main");
    set_return (`${_mxfile.rwr ()}${lb.rwr ()}${Diagram.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("Main");
},
Diagram : function (_diagram,lb,Name,ID,Graphmodel,rb,) {
enter_rule ("Diagram");
    set_return (`${_diagram.rwr ()}${lb.rwr ()}${Name.rwr ()}${ID.rwr ()}${Graphmodel.rwr ()}${rb.rwr ()}`);
return exit_rule ("Diagram");
},
Graphmodel : function (_graphmodel,lb,Root,rb,) {
enter_rule ("Graphmodel");
    set_return (`${_graphmodel.rwr ()}${lb.rwr ()}${Root.rwr ()}${rb.rwr ()}`);
return exit_rule ("Graphmodel");
},
Root : function (_root,lb,Part,rb,) {
enter_rule ("Root");
    set_return (`${_root.rwr ()}${lb.rwr ()}${Part.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("Root");
},
OutputGate : function (lb,ID,Label,Rhombus,OutputGateColor,VertexTag,Parent1,BoundingBox,rb,) {
enter_rule ("OutputGate");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${Rhombus.rwr ()}${OutputGateColor.rwr ()}${VertexTag.rwr ()}${Parent1.rwr ()}${BoundingBox.rwr ()}${rb.rwr ()}`);
return exit_rule ("OutputGate");
},
InputGate : function (lb,ID,Label,Rhombus,VertexTag,Parent1,BoundingBox,rb,) {
enter_rule ("InputGate");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${Rhombus.rwr ()}${VertexTag.rwr ()}${Parent1.rwr ()}${BoundingBox.rwr ()}${rb.rwr ()}`);
return exit_rule ("InputGate");
},
OutputPort : function (lb,ID,Label,OutputPortColor,VertexTag,Parent,BoundingBox,rb,) {
enter_rule ("OutputPort");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${OutputPortColor.rwr ()}${VertexTag.rwr ()}undefined${BoundingBox.rwr ()}${rb.rwr ()}`);
return exit_rule ("OutputPort");
},
InputPort : function (lb,ID,Label,VertexTag,Parent,BoundingBox,rb,) {
enter_rule ("InputPort");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${VertexTag.rwr ()}undefined${BoundingBox.rwr ()}${rb.rwr ()}`);
return exit_rule ("InputPort");
},
Component : function (lb,ID,Label,ContainerTag,AnyColor,VertexTag,Parent1,BoundingBox,rb,) {
enter_rule ("Component");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${ContainerTag.rwr ()}${AnyColor.rwr ()}${VertexTag.rwr ()}${Parent1.rwr ()}${BoundingBox.rwr ()}${rb.rwr ()}`);
return exit_rule ("Component");
},
Wire : function (lb,ID,Label,ConnectorTag,EdgeTag,Parent1,Source,Target,Geometry,rb,) {
enter_rule ("Wire");
    set_return (`${lb.rwr ()}${ID.rwr ()}${Label.rwr ()}${ConnectorTag.rwr ()}${EdgeTag.rwr ()}${Parent1.rwr ()}${Source.rwr ()}undefined${Geometry.rwr ()}${rb.rwr ()}`);
return exit_rule ("Wire");
},
Ignore_rec : function (lb,Ignore,rb,) {
enter_rule ("Ignore_rec");
    set_return (`${lb.rwr ()}${Ignore.rwr ().join ('')}${rb.rwr ()}`);
return exit_rule ("Ignore_rec");
},
Ignore_default : function (notBrace,) {
enter_rule ("Ignore_default");
    set_return (`${notBrace.rwr ().join ('')}`);
return exit_rule ("Ignore_default");
},
OutputGateColor : function (_fillcolor,v,) {
enter_rule ("OutputGateColor");
    set_return (`${_fillcolor.rwr ()}${v.rwr ()}`);
return exit_rule ("OutputGateColor");
},
OutputPortColor : function (_fillcolor,v,) {
enter_rule ("OutputPortColor");
    set_return (`${_fillcolor.rwr ()}${v.rwr ()}`);
return exit_rule ("OutputPortColor");
},
AnyColor : function (_fillcolor,s,) {
enter_rule ("AnyColor");
    set_return (`${_fillcolor.rwr ()}${s.rwr ()}`);
return exit_rule ("AnyColor");
},
ID : function (id,s,) {
enter_rule ("ID");
    set_return (`${id.rwr ()}${s.rwr ()}`);
return exit_rule ("ID");
},
Name : function (name,s,) {
enter_rule ("Name");
    set_return (`${name.rwr ()}${s.rwr ()}`);
return exit_rule ("Name");
},
Label : function (v,s,) {
enter_rule ("Label");
    set_return (`${v.rwr ()}${s.rwr ()}`);
return exit_rule ("Label");
},
VertexTag : function (_shape,_vertex,) {
enter_rule ("VertexTag");
    set_return (`${_shape.rwr ()}undefined`);
return exit_rule ("VertexTag");
},
ContainerTag : function (_container,_1,) {
enter_rule ("ContainerTag");
    set_return (`${_container.rwr ()}${_1.rwr ()}`);
return exit_rule ("ContainerTag");
},
ContainerTag : function (_container,_1,) {
enter_rule ("ContainerTag");
    set_return (`${_container.rwr ()}${_1.rwr ()}`);
return exit_rule ("ContainerTag");
},
ConnectorTag : function (_shape,_connector,) {
enter_rule ("ConnectorTag");
    set_return (`${_shape.rwr ()}${_connector.rwr ()}`);
return exit_rule ("ConnectorTag");
},
EdgeTag : function (_edge,_1,) {
enter_rule ("EdgeTag");
    set_return (`${_edge.rwr ()}${_1.rwr ()}`);
return exit_rule ("EdgeTag");
},
Source : function (_source,s,) {
enter_rule ("Source");
    set_return (`${_source.rwr ()}${s.rwr ()}`);
return exit_rule ("Source");
},
Target : function (_target,s,) {
enter_rule ("Target");
    set_return (`${_target.rwr ()}${s.rwr ()}`);
return exit_rule ("Target");
},
Geometry : function (_geometry,Ignore,) {
enter_rule ("Geometry");
    set_return (`${_geometry.rwr ()}${Ignore.rwr ()}`);
return exit_rule ("Geometry");
},
Parent : function (_parent,s,) {
enter_rule ("Parent");
    set_return (`${_parent.rwr ()}${s.rwr ()}`);
return exit_rule ("Parent");
},
Parent1 : function (_parent,_1,) {
enter_rule ("Parent1");
    set_return (`${_parent.rwr ()}${_1.rwr ()}`);
return exit_rule ("Parent1");
},
Rhombus : function (_rhombus,_true,) {
enter_rule ("Rhombus");
    set_return (`${_rhombus.rwr ()}${_true.rwr ()}`);
return exit_rule ("Rhombus");
},
BoundingBox : function (_boundingbox,lb,x,y,width,height,rb,) {
enter_rule ("BoundingBox");
    set_return (`${_boundingbox.rwr ()}${lb.rwr ()}${x.rwr ()}${y.rwr ()}${width.rwr ()}${height.rwr ()}${rb.rwr ()}`);
return exit_rule ("BoundingBox");
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
