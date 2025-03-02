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
clean {
  main = item+
  item =
    | commaNLClose -- cnc
    | commaClose -- cc
    | blankline    -- blank
    | any          -- default
  commaNLClose = spaces "," spaces nl snl* "}"
  commaClose = spaces "," spaces "}"
  blankline = nl space+ nl
  nl = "\n" | "\t"
  snl = space | nl
  space := " "
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
item_cnc : function (x,) {
enter_rule ("item_cnc");
    set_return (`\n}`);
return exit_rule ("item_cnc");
},
item_cc : function (x,) {
enter_rule ("item_cc");
    set_return (`}`);
return exit_rule ("item_cc");
},
item_blank : function (x,) {
enter_rule ("item_blank");
    set_return (`\n`);
return exit_rule ("item_blank");
},
item_default : function (x,) {
enter_rule ("item_default");
    set_return (`${x.rwr ()}`);
return exit_rule ("item_default");
},
commaNLClose : function (spaces,_comma,spaces2,nl,snl,_close,) {
enter_rule ("commaNLClose");
    set_return (``);
return exit_rule ("commaNLClose");
},
commaClose : function (spaces,_comma,spaces2,_close,) {
enter_rule ("commaClose");
    set_return (``);
return exit_rule ("commaClose");
},
blankline : function (nl1,space,nl2,) {
enter_rule ("blankline");
    set_return (``);
return exit_rule ("blankline");
},
nl : function (c,) {
enter_rule ("nl");
    set_return (`${c.rwr ()}`);
return exit_rule ("nl");
},
snl : function (c,) {
enter_rule ("snl");
    set_return (`${c.rwr ()}`);
return exit_rule ("snl");
},
space : function (c,) {
enter_rule ("space");
    set_return (`${c.rwr ()}`);
return exit_rule ("space");
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

