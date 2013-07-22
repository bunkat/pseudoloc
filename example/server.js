var pseudoloc = require('../index'), // require('pseudoloc') if installed with npm
    str = 'Thank you for using %pseudoloc.js%.';

console.log('Before: ', str);
console.log('After : ', pseudoloc.str(str));