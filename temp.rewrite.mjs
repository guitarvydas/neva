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

Mxfile : function (_lt,_mxfile,attr,_gt,DiagramTab,_emxfile,) {
enter_rule ("Mxfile");
    set_return (`\n"mxfile" : {
  ${attr.rwr ().join ('')}
  ${DiagramTab.rwr ().join ('')}
}`);
return exit_rule ("Mxfile");
},
DiagramTab_withContent : function (_lt,_dia,Name,ID,_gt,MxGraphModel,_edia,) {
enter_rule ("DiagramTab_withContent");
    set_return (`\n"diagram" : {
  ${Name.rwr ()}
  ${ID.rwr ()}
  ${MxGraphModel.rwr ()}
},`);
return exit_rule ("DiagramTab_withContent");
},
DiagramTab_noContent : function (_lt,_dia,attr,_end,) {
enter_rule ("DiagramTab_noContent");
    set_return (`\n"diagram": {
  ${attr.rwr ().join ('')}
},`);
return exit_rule ("DiagramTab_noContent");
},
MxGraphModel : function (_lt,_gm,Attribute,_gt,Root,_egm,) {
enter_rule ("MxGraphModel");
    set_return (`\n"graphmodel": {
  ${Attribute.rwr ().join ('')}
  ${Root.rwr ()}
},
`);
return exit_rule ("MxGraphModel");
},
Root : function (_lt,_root,_gt,Cell,_eroot,) {
enter_rule ("Root");
    set_return (`\n"root": [
  ${Cell.rwr ().join ('')}
],`);
return exit_rule ("Root");
},
Cell_cell1 : function (_lt,_mxcell,ID,Parent,_end,) {
enter_rule ("Cell_cell1");
    set_return (`\n{${ID.rwr ()}${Parent.rwr ()}}`);
return exit_rule ("Cell_cell1");
},
Cell_cell0 : function (_lt,_mxcell,ID,_end,) {
enter_rule ("Cell_cell0");
    set_return (`\n{${ID.rwr ()}}`);
return exit_rule ("Cell_cell0");
},
Cell_other : function (_lt,_mxcell,Attribute,_gt,CellContents,_emxcell,) {
enter_rule ("Cell_other");
    set_return (`\n{
  ${Attribute.rwr ().join ('')}
  ${CellContents.rwr ()}
},`);
return exit_rule ("Cell_other");
},
CellContents_noContent : function (_lt,_geo,Attribute,_end,) {
enter_rule ("CellContents_noContent");
    set_return (`"geometry": {
  ${Attribute.rwr ().join ('')}
},`);
return exit_rule ("CellContents_noContent");
},
CellContents_withContent : function (_lt,_geo,Attribute,_gt,GeometryContents,_egeo,) {
enter_rule ("CellContents_withContent");
    set_return (`\n"geometry" {
  ${Attribute.rwr ().join ('')}
  ${GeometryContents.rwr ()}
},`);
return exit_rule ("CellContents_withContent");
},
GeometryContents : function (item,) {
enter_rule ("GeometryContents");
    set_return (`${item.rwr ().join ('')}`);
return exit_rule ("GeometryContents");
},
GeometryItem_sourcePoint : function (p,) {
enter_rule ("GeometryItem_sourcePoint");
    set_return (`${p.rwr ()}`);
return exit_rule ("GeometryItem_sourcePoint");
},
GeometryItem_targetPoint : function (p,) {
enter_rule ("GeometryItem_targetPoint");
    set_return (`${p.rwr ()}`);
return exit_rule ("GeometryItem_targetPoint");
},
GeometryItem_point : function (p,) {
enter_rule ("GeometryItem_point");
    set_return (`${p.rwr ()}`);
return exit_rule ("GeometryItem_point");
},
GeometryItem_rect : function (r,) {
enter_rule ("GeometryItem_rect");
    set_return (`${r.rwr ()}`);
return exit_rule ("GeometryItem_rect");
},
GeometryItem_array : function (a,) {
enter_rule ("GeometryItem_array");
    set_return (`${a.rwr ()}`);
return exit_rule ("GeometryItem_array");
},
SourcePoint : function (_lt,_mxpoint,Xcoord,Ycoord,_as,_eq,dq,_sourcePoint,dq2,_end,) {
enter_rule ("SourcePoint");
    set_return (`\n"point" : {"xy": [${Xcoord.rwr ()},${Ycoord.rwr ()}], "kind":"sourcepoint"},`);
return exit_rule ("SourcePoint");
},
TargetPoint : function (_lt,_mxpoint,Xcoord,Ycoord,_as,_eq,dq,_targetPoint,dq2,_end,) {
enter_rule ("TargetPoint");
    set_return (`\n"point" : {"xy": [${Xcoord.rwr ()},${Ycoord.rwr ()}], "kind":"targetpoint"},`);
return exit_rule ("TargetPoint");
},
Point : function (_lt,_,x,y,_e,) {
enter_rule ("Point");
    set_return (`"point":[${x.rwr ()},${y.rwr ()}],`);
return exit_rule ("Point");
},
RectangleGeometry : function (_lt,_,attr,_e,) {
enter_rule ("RectangleGeometry");
    set_return (`\n"rectangle":{
${attr.rwr ().join ('')}
}`);
return exit_rule ("RectangleGeometry");
},
ArrayGeometry : function (_lt,_,attr,_gt,GeometryContents,_e,) {
enter_rule ("ArrayGeometry");
    set_return (`\n"array" : {
  ${attr.rwr ().join ('')}
  ${GeometryContents.rwr ()}
},`);
return exit_rule ("ArrayGeometry");
},
Xcoord : function (_x,_eq,numericString,) {
enter_rule ("Xcoord");
    set_return (`${numericString.rwr ()}`);
return exit_rule ("Xcoord");
},
Ycoord : function (_y,_eq,numericString,) {
enter_rule ("Ycoord");
    set_return (`${numericString.rwr ()}`);
return exit_rule ("Ycoord");
},
Name : function (_,_eq,s,) {
enter_rule ("Name");
    set_return (`"name" : ${s.rwr ()}, `);
return exit_rule ("Name");
},
ID : function (_,_eq,s,) {
enter_rule ("ID");
    set_return (`"id" : ${s.rwr ()}, `);
return exit_rule ("ID");
},
Parent : function (_,_eq,s,) {
enter_rule ("Parent");
    set_return (`"parent" : ${s.rwr ()}, `);
return exit_rule ("Parent");
},
Attribute_num : function (sym,_eq,nstr,) {
enter_rule ("Attribute_num");
    set_return (`\n"${sym.rwr ()}" : ${nstr.rwr ()}, `);
return exit_rule ("Attribute_num");
},
Attribute_frac : function (sym,_eq,fstr,) {
enter_rule ("Attribute_frac");
    set_return (`\n"${sym.rwr ()}" : "${fstr.rwr ()}", `);
return exit_rule ("Attribute_frac");
},
Attribute_other : function (sym,_eq,str,) {
enter_rule ("Attribute_other");
    set_return (`\n"${sym.rwr ()}" : ${str.rwr ()}, `);
return exit_rule ("Attribute_other");
},
sym : function (letter,symFollow,) {
enter_rule ("sym");
    set_return (`${letter.rwr ()}${symFollow.rwr ().join ('')}`);
return exit_rule ("sym");
},
symFollow : function (c,) {
enter_rule ("symFollow");
    set_return (`${c.rwr ()}`);
return exit_rule ("symFollow");
},
notGT : function (c,) {
enter_rule ("notGT");
    set_return (`${c.rwr ()}`);
return exit_rule ("notGT");
},
numericString : function (dq,digit,dq2,) {
enter_rule ("numericString");
    set_return (`${digit.rwr ().join ('')}`);
return exit_rule ("numericString");
},
fractionalString : function (dq1,fdigit,dq2,) {
enter_rule ("fractionalString");
    set_return (`${fdigit.rwr ().join ('')}`);
return exit_rule ("fractionalString");
},
fdigit : function (c,) {
enter_rule ("fdigit");
    set_return (`${c.rwr ()}`);
return exit_rule ("fdigit");
},
str : function (dq,char,dq2,) {
enter_rule ("str");
    set_return (`${dq.rwr ()}${char.rwr ().join ('')}${dq2.rwr ()}`);
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
