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

Mxfile : function (_lt,_mxfile,stuff,_gt,DiagramTab,_emxfile,) {
enter_rule ("Mxfile");
    set_return (`${_lt.rwr ()}${_mxfile.rwr ()}${stuff.rwr ()}${_gt.rwr ()}${DiagramTab.rwr ().join ('')}\n${_emxfile.rwr ()}`);
return exit_rule ("Mxfile");
},
DiagramTab_withContent : function (_lt,_dia,Name,ID,_gt,MxGraphModel,_edia,) {
enter_rule ("DiagramTab_withContent");
    set_return (`\n${_lt.rwr ()}${_dia.rwr ()}${Name.rwr ()}${ID.rwr ()}${_gt.rwr ()}${MxGraphModel.rwr ()}\n${_edia.rwr ()}`);
return exit_rule ("DiagramTab_withContent");
},
DiagramTab_noContent : function (_lt,_dia,stuff,_end,) {
enter_rule ("DiagramTab_noContent");
    set_return (`\n${_lt.rwr ()}${_dia.rwr ()}${stuff.rwr ()}${_end.rwr ()}\n`);
return exit_rule ("DiagramTab_noContent");
},
MxGraphModel : function (_lt,_gm,Attribute,_gt,Root,_egm,) {
enter_rule ("MxGraphModel");
    set_return (`\n${_lt.rwr ()}${_gm.rwr ()}${Attribute.rwr ().join ('')}${_gt.rwr ()}${Root.rwr ()}\n${_egm.rwr ()}`);
return exit_rule ("MxGraphModel");
},
Root : function (_lt,_root,_gt,Cell,_eroot,) {
enter_rule ("Root");
    set_return (`\n${_lt.rwr ()}${_root.rwr ()}${_gt.rwr ()}${Cell.rwr ().join ('')}\n${_eroot.rwr ()}`);
return exit_rule ("Root");
},
Cell_cell1 : function (_lt,_mxcell,ID,Parent,_end,) {
enter_rule ("Cell_cell1");
    set_return (`\n{${ID.rwr ()}${Parent.rwr ()}}`);
return exit_rule ("Cell_cell1");
},
Cell_cell0 : function (_lt,_mxcell,ID,_end,) {
enter_rule ("Cell_cell0");
    set_return (`\n{${_mxcell.rwr ()}${ID.rwr ()}}`);
return exit_rule ("Cell_cell0");
},
Cell_other : function (_lt,_mxcell,Attribute,_gt,CellContents,_emxcell,) {
enter_rule ("Cell_other");
    set_return (`\n{${Attribute.rwr ().join ('')}${_gt.rwr ()}${CellContents.rwr ()}\n}`);
return exit_rule ("Cell_other");
},
CellContents_noContent : function (_lt,_geo,Attribute,_end,) {
enter_rule ("CellContents_noContent");
    set_return (`\n${_lt.rwr ()}${_geo.rwr ()}${Attribute.rwr ().join ('')}${_end.rwr ()}`);
return exit_rule ("CellContents_noContent");
},
CellContents_withContent : function (_lt,_geo,Attribute,_gt,GeometryContents,_egeo,) {
enter_rule ("CellContents_withContent");
    set_return (`\n${_lt.rwr ()}${_geo.rwr ()}${Attribute.rwr ().join ('')}${_gt.rwr ()}${GeometryContents.rwr ()}${_egeo.rwr ()}`);
return exit_rule ("CellContents_withContent");
},
GeometryContents_mxpoints : function (MxPoint,) {
enter_rule ("GeometryContents_mxpoints");
    set_return (`${MxPoint.rwr ().join ('')}`);
return exit_rule ("GeometryContents_mxpoints");
},
MxPoint_sourcePoint : function (p,) {
enter_rule ("MxPoint_sourcePoint");
    set_return (`${p.rwr ()}`);
return exit_rule ("MxPoint_sourcePoint");
},
MxPoint_targetPoint : function (p,) {
enter_rule ("MxPoint_targetPoint");
    set_return (`${p.rwr ()}`);
return exit_rule ("MxPoint_targetPoint");
},
SourcePoint : function (_lt,_mxpoint,Xcoord,Ycoord,_as,_eq,dq,_sourcePoint,dq2,_end,) {
enter_rule ("SourcePoint");
    set_return (`\n${_lt.rwr ()}${_mxpoint.rwr ()}${Xcoord.rwr ()}${Ycoord.rwr ()}${_as.rwr ()}${_eq.rwr ()}${dq.rwr ()}${_sourcePoint.rwr ()}${dq2.rwr ()}${_end.rwr ()}\n`);
return exit_rule ("SourcePoint");
},
TargetPoint : function (_lt,_mxpoint,Xcoord,Ycoord,_as,_eq,dq,_targetPoint,dq2,_end,) {
enter_rule ("TargetPoint");
    set_return (`\n${_lt.rwr ()}${_mxpoint.rwr ()}${Xcoord.rwr ()}${Ycoord.rwr ()}${_as.rwr ()}${_eq.rwr ()}${dq.rwr ()}${_targetPoint.rwr ()}${dq2.rwr ()}${_end.rwr ()}\n`);
return exit_rule ("TargetPoint");
},
Xcoord : function (_x,_eq,numericString,) {
enter_rule ("Xcoord");
    set_return (` ${_x.rwr ()}${_eq.rwr ()}${numericString.rwr ()} `);
return exit_rule ("Xcoord");
},
Ycoord : function (_y,_eq,numericString,) {
enter_rule ("Ycoord");
    set_return (` ${_y.rwr ()}${_eq.rwr ()}${numericString.rwr ()} `);
return exit_rule ("Ycoord");
},
Name : function (_name,_eq,str,) {
enter_rule ("Name");
    set_return (` ${_name.rwr ()}${_eq.rwr ()}${str.rwr ()} `);
return exit_rule ("Name");
},
ID : function (_id,_eq,str,) {
enter_rule ("ID");
    set_return (` ${_id.rwr ()}${_eq.rwr ()}${str.rwr ()} `);
return exit_rule ("ID");
},
Parent : function (_parent,_eq,str,) {
enter_rule ("Parent");
    set_return (` ${_parent.rwr ()}${_eq.rwr ()}${str.rwr ()} `);
return exit_rule ("Parent");
},
Attribute_id : function (id,) {
enter_rule ("Attribute_id");
    set_return (`${id.rwr ()}`);
return exit_rule ("Attribute_id");
},
Attribute_parent : function (p,) {
enter_rule ("Attribute_parent");
    set_return (`${p.rwr ()}`);
return exit_rule ("Attribute_parent");
},
Attribute_other : function (sym,_eq,str,) {
enter_rule ("Attribute_other");
    set_return (` ${sym.rwr ()}${_eq.rwr ()}${str.rwr ()} `);
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
stuff : function (notGT,) {
enter_rule ("stuff");
    set_return (` ${notGT.rwr ().join ('')} `);
return exit_rule ("stuff");
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
