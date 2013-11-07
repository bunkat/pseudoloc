/**
* Option.js
*
* Pseudolocalization options.
*
* (c) 2013 Bill, BunKat LLC.
* Pseudoloc is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudoloc
*/
pseudoloc.option = {};

pseudoloc.reset = function() {
  pseudoloc.option = {
    prepend: '[!!',
    append: '!!]',
    delimiter: '%',
    startDelimiter: '',
    endDelimiter: '',
    extend: 0,
    override: undefined
  };
};

pseudoloc.reset();