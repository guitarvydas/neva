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
direction {
  main = item+
  item =
    | applySyntactic<SymbolTable>
    | applySyntactic<Wire>
    | "{" item+ "}" -- rec
    | "[" item+ "]" -- recsq
    | ~"}" ~"]" any

  SymbolTable = Key<"symbolTable"> "{" KVpair+ "}"
  Wire = "{" ID Label Key<"kind"> value<"wire"> Parent Source Target "}"

  KVpair = string ":" string

  ID = Key<"id"> string
  Label = Key<"label"> string
  Parent = Key<"parent"> (string | int)
  Source = Key<"source"> string
  Target = Key<"target"> string

  Key<s> = dq s dq ":"
  value<s> = dq s dq

  notBrace = 
    | "[" notBrace* "]"        -- rec
    | ~"{" ~"}" ~"[" ~"]" any  -- default
  x = number
  y = number
  width = number
  height = number
  number = sign? int frac?
  int = digit+
  sign = "+" | "-"
  frac = "." digit+
  string = dq (~dq any)* dq
  dq = "\""
  space += ","
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

let dict = {};

function resetDict () {
    dict = {};
    return "";
}

function treeWalk (ignore) {
    return '';
}

function gather (key, val) {
    let k = key.replaceAll (/^[^:]+:"/g, "").replaceAll ('"', '').replaceAll (',', '');
    dict [k] = val;
    return '';
}

function noQuotes (s) {
    return s.replaceAll ('"', '');
}

function appendDict (key, val) {
    let k = noQuotes (key);
    let v = noQuotes (val);
    dict [k] = v;
    return '';
}

function fmtDict () {
    return JSON.stringify (dict);
}

function makeDirection (source, target) {
    let sender = dict [noQuotes (source)];
    let receiver = dict [noQuotes (target)];
    if (sender === "outputport") {
	if (receiver === "inputport") {
	    return '"direction":"across"';
	} else if (receiver === "outputgate") {
	    return '"direction":"up"';
	    } else {
		return '"direction":"??? (A)"';
	    }
    } else if (sender === "inputgate") {
	if (receiver === "inputport") {
	    return '"direction":"down"';
	} else if (receiver === "outputgate") {
	    return '"direction":"through"';
	} else {
	    return '"direction":"??? (B)"';
	}
    } else {
	return '"direction":"??? (C)"';
    }
}

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
    resetDict ();
    
    treeWalk (`${KVpairs.rwr ().join ('')}`,);
    
    set_return (`${_symbolTable.rwr ()}${lb.rwr ()}${KVpairs.rwr ().join ('')}${rb.rwr ()}`);


return exit_rule ("SymbolTable");
},
Wire : function (lb,ID,Label,_kind,_wire,Parent,Source,Target,rb,) {
enter_rule ("Wire");
    set_return (`\n${lb.rwr ()}${ID.rwr ()},${Label.rwr ()},\n"kind":"wire",${makeDirection (`${Source.rwr ()}`,`${Target.rwr ()}`,)},"source":${Source.rwr ()},"target":${Target.rwr ()}\n${rb.rwr ()},`);
return exit_rule ("Wire");
},
KVpair : function (k,_colon,v,) {
enter_rule ("KVpair");
    set_return (`${appendDict (`${k.rwr ()}`,`${v.rwr ()}`,)}`);
return exit_rule ("KVpair");
},
Source : function (k,v,) {
enter_rule ("Source");
    set_return (`${v.rwr ()}`);
return exit_rule ("Source");
},
Target : function (k,v,) {
enter_rule ("Target");
    set_return (`${v.rwr ()}`);
return exit_rule ("Target");
},
ID : function (id,s,) {
enter_rule ("ID");
    set_return (`\n${id.rwr ()}${s.rwr ()}`);
return exit_rule ("ID");
},
Label : function (v,s,) {
enter_rule ("Label");
    set_return (`\n"label":${s.rwr ()}`);
return exit_rule ("Label");
},
Parent : function (_parent,s,) {
enter_rule ("Parent");
    set_return (`\n${_parent.rwr ()}${s.rwr ()}`);
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

