'use strict'

import * as ohm from 'ohm-js';

let verbose = false;

function top (stack) { let v = stack.pop (); stack.push (v); return v; }

function set_top (stack, v) { stack.pop (); stack.push (v); return v; }

let return_value_stack = [];
let rule_name_stack = [];
let depth_prefix = ' ';

function enter_rule (name) {
    if (verbose) {
	console.error (depth_prefix, ["enter", name]);
	depth_prefix += ' ';
    }
    return_value_stack.push ("");
    rule_name_stack.push (name);
}

function set_return (v) {
    set_top (return_value_stack, v);
}

function exit_rule (name) {
    if (verbose) {
	depth_prefix = depth_prefix.substr (1);
	console.error (depth_prefix, ["exit", name]);
    }
    rule_name_stack.pop ();
    return return_value_stack.pop ()
}

const grammar = String.raw`
drawio1 {
  Mxfile = "<" "mxfile" stuff ">" DiagramTab+ "</mxfile>"
  DiagramTab = 
    | "<" "diagram" Name ID ">" MxGraphModel "</diagram>" -- withContent
    | "<" "diagram" stuff "/>"                            -- noContent
  MxGraphModel = "<" "mxGraphModel" Attribute* ">" Root "</mxGraphModel>"
  Root = "<" "root" ">" Cell+ "</root>"
  Cell =
    | "<" "mxCell" ID Parent "/>" -- cell1
    | "<" "mxCell" ID "/>"        -- cell0
    | "<" "mxCell" Attribute* ">" CellContents "</mxCell>" -- other

    CellContents =
      | "<" "mxGeometry" Attribute* "/>" -- noContent
      | "<" "mxGeometry" Attribute* ">" GeometryContents "</mxGeometry>" -- withContent

    GeometryContents =
      | MxPoint+ -- mxpoints
    MxPoint =
      | SourcePoint -- sourcePoint
      | TargetPoint -- targetPoint

    SourcePoint = "<" "mxPoint" Xcoord Ycoord "as" "=" dq "sourcePoint" dq "/>"
    TargetPoint = "<" "mxPoint" Xcoord Ycoord "as" "=" dq "targetPoint" dq "/>"

    Xcoord = "x" "=" numericString
    Ycoord = "y" "=" numericString
    
    Name = "name" "=" str
    ID = "id" "=" str
    Parent = "parent" "=" str
    Attribute =
      | ID          -- id
      | Parent      -- parent
      | sym "=" str -- other

      sym = letter symFollow*
      symFollow = alnum | "_"
      stuff = notGT+
      notGT = ~">" any
      numericString = dq digit+ dq
      str = dq char* dq
      dq = "\""
      char =
	| "\\\""  -- escapedDQ
	| ~dq any -- other
}
`;

let args = {};
function resetArgs () {
    args = {};
}
function memoArg (name, accessorString) {
    args [name] = accessorString;
};
function fetchArg (name) {
    return args [name];
}

// empty
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
import * as fs from 'fs';

function grammarname (s) {
    let n = s.search (/{/);
    return s.substr (0, n).replaceAll (/\n/g,'').trim ();
}

try {
    const argv = process.argv.slice(2);
    let srcFilename = argv[0];
    if ('-' == srcFilename) { srcFilename = 0 }
    let src = fs.readFileSync(srcFilename, 'utf-8');
    try {
	let parser = ohm.grammar (grammar);
	let cst = parser.match (src);
	if (cst.failed ()) {
	    //throw Error (`${cst.message}\ngrammar=${grammarname (grammar)}\nsrc=\n${src}`);
	    throw Error (cst.message);
	}
	let sem = parser.createSemantics ();
	sem.addOperation ('rwr', _rewrite);
	console.log (sem (cst).rwr ());
	process.exit (0);
    } catch (e) {
	//console.error (`${e}\nargv=${argv}\ngrammar=${grammarname (grammar)}\src=\n${src}`);
	console.error (`${e}\n\ngrammar = "${grammarname (grammar)}"`);
	process.exit (1);
    }
} catch (e) {
    console.error (`${e}\n\ngrammar = "${grammarname (grammar)}`);
    process.exit (1);
}

