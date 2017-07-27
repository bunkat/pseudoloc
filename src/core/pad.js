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
pseudoloc.pad = function (str, percent) {

  var lenLeft = Math.floor((str.length * percent) / 2),
    lenRight = lenLeft,
    pStr = str;

  while (lenLeft-- > 0) {
    pStr = ' ' + pStr;
  }

  while (lenRight-- > 0) {
    pStr = pStr + ' ';
  }

  return pStr;
};