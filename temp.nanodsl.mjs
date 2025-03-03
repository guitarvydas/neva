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
styleexpand {
  main = item+
  item =
    | str<"style"> spaces ":" spaces stylestr -- style
    | any                       -- default
  stylestr = dq styleitem+ dq
  styleitem=
    | word "=" number ";" -- num
    | word "=" word   ";" -- eq
    | word            ";" -- declaration
  word = wchar+
  wchar = ~";" ~"=" ~dq any
  number = sign? fdigit+
  sign = "+" | "-"
  fdigit = digit | "."
  dq = "\""
  str<s> = dq s dq
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
item_style : function (_style,spaces,_colon,spaces2,stylestr,) {
enter_rule ("item_style");
    set_return (`${stylestr.rwr ()}`);
return exit_rule ("item_style");
},
item_default : function (c,) {
enter_rule ("item_default");
    set_return (`${c.rwr ()}`);
return exit_rule ("item_default");
},
stylestr : function (dq,styleitem,dq2,) {
enter_rule ("stylestr");
    set_return (`${styleitem.rwr ().join ('')}`);
return exit_rule ("stylestr");
},
styleitem_num : function (word,_eq,number,_semicolon,) {
enter_rule ("styleitem_num");
    set_return (`\n"${word.rwr ()}" : ${number.rwr ()}, `);
return exit_rule ("styleitem_num");
},
styleitem_eq : function (word,_eq,v,_semicolon,) {
enter_rule ("styleitem_eq");
    set_return (`\n"${word.rwr ()}": "${v.rwr ()}", `);
return exit_rule ("styleitem_eq");
},
styleitem_declaration : function (word,_semicolon,) {
enter_rule ("styleitem_declaration");
    set_return (`\n"${word.rwr ()}" : true, `);
return exit_rule ("styleitem_declaration");
},
word : function (wchar,) {
enter_rule ("word");
    set_return (`${wchar.rwr ().join ('')}`);
return exit_rule ("word");
},
wchar : function (c,) {
enter_rule ("wchar");
    set_return (`${c.rwr ()}`);
return exit_rule ("wchar");
},
number : function (sign,fdigit,) {
enter_rule ("number");
    set_return (`${sign.rwr ().join ('')}${fdigit.rwr ().join ('')}`);
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

