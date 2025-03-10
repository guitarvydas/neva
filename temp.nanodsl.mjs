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
geometry {
  main = item+
  item =
    | geometry -- geometry
    | any      -- default
  geometry = str<"geometry"> ws "{" ws x y width height as? rectangle? "}" ws "," ws
  x = str<"x"> ws ":" ws number "," ws
  y = str<"y"> ws ":" ws number "," ws
  width = str<"width"> ws ":" ws number "," ws
  height = str<"height"> ws ":" ws number "," ws
  as = str<"as"> ws ":" ws string "," ws
  rectangle = str<"rectangle"> ws ":" ws "{" ws (~"}" any)* "}" ws
  string = dq (~dq any)* dq ws
  number = sign? fdigit+ ws
  sign = "+" | "-"
  fdigit = digit | "."
  dq = "\""
  str<s> = dq s dq
  ws = spaces
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
    set_return (`${n.rwr ()}`);
return exit_rule ("x");
},
y : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("y");
    set_return (`${n.rwr ()}`);
return exit_rule ("y");
},
width : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("width");
    set_return (`${n.rwr ()}`);
return exit_rule ("width");
},
height : function (_,ws1,_colon,ws2,n,_comma,ws3,) {
enter_rule ("height");
    set_return (`${n.rwr ()}`);
return exit_rule ("height");
},
as : function (_,ws1,_colon,ws2,s,_comma,ws3,) {
enter_rule ("as");
    set_return (``);
return exit_rule ("as");
},
rectangle : function (_,ws1,_colon,ws2,lb,ws3,cs,rb,ws4,) {
enter_rule ("rectangle");
    set_return (``);
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

