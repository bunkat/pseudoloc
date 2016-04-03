/**
* obj.js
*
* Replaces all string values in given object with pseudolocalized version according to
* pseudoloc.options.
*
* (c) 2016 Rafał Sierawski
* (c) 2013 Bill, BunKat LLC.
* Pseudoloc is freely distributable under the MIT license.
* For all details and documentation:
*     http://bunkat.github.com/pseudoloc
*/
pseudoloc.obj = function(obj) {
  for(var id in obj) {
    switch (typeof(obj[id])) {
      case "string":
        obj[id] = pseudoloc.str(obj[id]);
        break;
      case "object":
        pseudoloc.obj(obj[id]);
        break;
      default:
        continue;
    }
  }
  return obj;
};
