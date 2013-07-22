REPORTER ?= dot
TESTS ?= $(shell find test -name "*-test.js")

all: \
	pseudoloc.js \
	pseudoloc.min.js \
	component.json \
	package.json

.PHONY: clean all test test-cov

test: pseudoloc.js
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) $(TESTS)

test-cov: pseudoloc-cov.js
	@PSEUDOLOC_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

pseudoloc-cov.js: pseudoloc.js
	@rm -f $@
	@jscoverage --no-highlight src src-cov \
		--no-instrument=pseudoloc.js \
		--no-instrument=core/index.js \
		--no-instrument=start.js \
		--no-instrument=end.js \
		--no-instrument=component.js \
		--no-instrument=package.js
	node_modules/.bin/smash src-cov/pseudoloc.js > pseudoloc-cov.js
	@chmod a-w $@

benchmark: all
	@node benchmark/bench.js

pseudoloc.js: $(shell node_modules/.bin/smash --list src/pseudoloc.js)
	@rm -f $@
	node_modules/.bin/smash src/pseudoloc.js | node_modules/.bin/uglifyjs - -b indent-level=2 -o $@
	@chmod a-w $@

pseudoloc.min.js: pseudoloc.js
	@rm -f $@
	node_modules/.bin/uglifyjs $< -c -m -o $@

component.json: src/component.js pseudoloc.js
	@rm -f $@
	node src/component.js > $@
	@chmod a-w $@

package.json: src/package.js pseudoloc.js
	@rm -f $@
	node src/package.js > $@
	@chmod a-w $@

clean:
	rm -f pseudoloc*.js package.json component.json