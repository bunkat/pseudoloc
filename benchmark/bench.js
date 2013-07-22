var Benchmark = require('benchmark'),
    pseudoloc = require('../index'),
    suite = new Benchmark.Suite('next');

suite
.add('short', function() {
  pseudoloc.str('test string');
})
.add('long', function() {
  pseudoloc.str('the quick brown fox jumped over the lazy dogs the quick brown fox jumped over the lazy dogs');
})
.add('short with tokens', function() {
  pseudoloc.str('test %token% string');
})
.add('long with tokens', function() {
  pseudoloc.str('the quick %token% brown fox %token% jumped %token% over the %token% lazy dogs the %token% quick brown fox jumped over %token% the lazy %token% dogs');

})
.on('cycle', function(event) {
  console.log(String(event.target));
})
.run({async: false});