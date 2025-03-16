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
keep {
  main = item+
  item =
    | applySyntactic<RootArray>
    | "{" spaces item+ "}" -- braces
    | "[" spaces item+ "]" -- square
    | ~"{" ~"}" ~"[" ~"]" any
  RootArray = "[" Object+ "]"
  Object =
    | "{" Key<"kind"> value<"inputgate"> "," Other+ "}" "," -- inputgate
    | "{" Key<"kind"> value<"inputport"> "," Other+ "}" "," -- inputport
    | "{" Key<"kind"> value<"outputgate"> "," Other+ "}" "," -- outputgate
    | "{" Key<"kind"> value<"outputport"> "," Other+ "}" "," -- outputport
    | "{" Key<"kind"> value<"part"> "," Other+ "}" "," -- part
    | "{" Key<"kind"> value<"wire"> "," Other+ "}" "," -- wire
    | "{" Other+ "}" ","? -- ignore

  Other =
    | "{" Other+ "}" -- braces
    | "[" Other+ "]" -- square
    | ~"{" ~"}" ~"[" ~"]" any -- default

  Key<s> = dq s dq ":"
  value<s> = dq s dq
  dq = "\""
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
    set_return (`\n${lb.rwr ()}${_kind.rwr ()}${_.rwr ()},${Other.rwr ().join ('')}${rb.rwr ()},`);
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
    set_return (`\n${dq1.rwr ()}${s.rwr ()}${dq2.rwr ()}${_colon.rwr ()}`);
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

