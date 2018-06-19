var globals = ["document", "window", "pseudoloc"],
    globalValues = {};

globals.forEach(function(g) {
  if (g in global) globalValues[g] = global[g];
});

require("./pseudoloc");

module.exports = pseudoloc;

globals.forEach(function(g) {
  if (g in globalValues) global[g] = globalValues[g];
  else delete global[g];
});