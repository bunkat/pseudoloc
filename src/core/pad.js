/**
* Pad.js
*
* Pads a string with additional characters.
*
* (c) 2013 Bill, BunKat LLC.
* Pseudoloc is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudoloc
*/
pseudoloc.pad = function(str, percent) {

  var len = Math.floor(str.length * percent),
      pStr = str;

  while(len--) {
    pStr += ' ';
  }

  return pStr;
};