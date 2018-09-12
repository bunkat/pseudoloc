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
    var array = [ '🐔', '𠜎', '𠜱', '𠲖', '𠴕', '𢺳', '🏆', '🤙', '𠸏', '𠸏'];
    var tot = Math.floor(Math.random() * 10)
    pStr += array[tot];
  }

  return pStr;
};
