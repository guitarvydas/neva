# usage
`make`

# Goal
Draw diagrams of apps and convert them to Neva

# WIP
`das2json.mjs` converts `neva-echo.drawio` into `neva-echo.drawio.json`

# future approach?
Use t2t to transpile `neva-echo.drawio.json`

Can we use an LLM to do some of the conversion?

# Expectations / Inspirations 
I'm using `das2json` and `t2t` to convert diagrams to Javascript and Python. This makes me hopeful that the conversion to Neva will be easy.

# Thinking Aloud - Bumps Along The Road
- Syntax like `imports` is needed due to textual nature of Neva programs and the expectation that humans will write such text directly
  - Do we need `imports` on the diagrams? If yes, then what is the suggested syntax (visual)?
- `das2json` expects diagrams to be nested layers, using TABs on draw.io to draw nested diagrams
  - I don't know how this maps to Neva (I haven't come down the Neva learning curve yet)
- nested diagrams means that we need to think about _connections_ differently
  - connections are triples, not doubles
  - connection == `{Direction, Sender, Receiver}`
	- where `Direction` is one of `[down | across | up | through]`
	- does this kind of thing already exist in Neva?
	
# t2t
Text to Text transpilation
- I've written several articles about t2t, [Writing A JSON Parser Using T2T in Only 2.5 Hours](https://programmingsimplicity.substack.com/p/writing-a-json-parser-using-t2t-in?r=1egdky) is one, it contains a reference to more detail about t2t
- t2t leans on Ohm technology, which is the best variant of PEG that I've encountered
- I created a nano-DSL for the back end of t2t to allow rewriting text more easily than writing raw Javascript
  - t2t front end == OhmJS
  - t2t back end == .rewrite files ; custom nano-DSL for rewriting text
