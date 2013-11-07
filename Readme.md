# Pseudoloc v1.1.0 [![Build Status](https://travis-ci.org/bunkat/pseudoloc.png)](https://travis-ci.org/bunkat/pseudoloc)

_Pseudoloc_ is a small library for quickly pseudolocalizing strings. [Pseudolocalization](http://en.wikipedia.org/wiki/Pseudolocalization) is a method for testing the internationalization aspects of your application by replacing your strings with altered versions that maintains string readability while including the most problematic characteristics including text length and character length. It also makes hard coded strings and improperly concatenated strings easy to spot so that they can be properly localized.

## Using with Node.js

    var pseudoloc = require('pseudoloc');

    pseudoloc.str('A test string with a %token%.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

## Using in a browser

    <script src="../pseudoloc.js" type="text/javascript"></script>
    <script type="text/javascript">

      pseudoloc.str('A test string with a %token%.')
      // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

    </script>

## Using from the commandline

_Pseudoloc_ includes a commandline interface to make it easy to incorporate it into your build process. Currently it supports passing in individual strings (great for trying things out) or passing in a valid `JSON` document that contains a set of keys and strings. Each of the strings in the file will then be pseudolocalized.

Note: Nodejs must be installed to use the commandline interface.

    ./bin/pseudoloc -string 'A test string with a %token%.'
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]


    // example.json
    {
      "string1": "this is the first string",
      "string2": "a string with a %token%",
      "string3": "a string with a %couple% of %tokens%"
    }

    ./bin/pseudoloc -readFile example.json -writeFile example-pseudo.json

    // example-pseudo.json
    {
      "string1": "[!!ţĥĩş ĭś ťĥě ƒĩŗśŧ şţřįƞĝ!!]",
      "string2": "[!!ȁ ŝťŗĩňğ ŵįťĥ ã %token%!!]",
      "string3": "[!!ȃ şťřīňğ ŵĩťħ ä %couple% ŏƒ %tokens%!!]"
    }

The commandline tool uses the same options as the library. For additional help and more examples:

    ./bin/pseudoloc --help

## Options

#### Prepend

Specifies the string that should be prepended to the beginning of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `[!!`.

    pseudoloc.option.prepend = '[##';
    pseudoloc.str('A test string with a %token%.')
    // [##Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.!!]

#### Append

Specifies the string that should be appended to the end of pseudolocalized strings. The prepended and appended strings help to locate strings that have been cut off or improperly concatenated together - localized strings should use tokens for data since different languages have different word orders.

Default is `!!]`.

    pseudoloc.option.append = '##]';
    pseudoloc.str('A test string with a %token%.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą %token%.##]

#### Delimiter, StartDelimiter, EndDelimiter

Specifies the token delimiter. Any characters between token delimiters will not be pseudolocalized. Tokens are used to replace data within localized strings. You can either specify a single delimiter or use startDelimiter and endDelimiter to specify the delimiters seperately.

Default is `%`.

    pseudoloc.option.delimiter = '$$';
    pseudoloc.str('A test string with a $$token$$.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą $$token$$.!!]

    pseudoloc.option.startDelimiter = '{{';
    pseudoloc.option.endDelimiter = '}}';
    pseudoloc.str('A test string with a {{token}}.')
    // [!!Á ţȇšŧ śťřīņğ ŵıţħ ą {{token}}.!!]

#### Extend

Extends the width of the string by the specified percentage. Useful if you will be localizing into languages such as German which can be 30% longer than English.

Default is `0`.

    pseudoloc.option.extend = 0.3; //30%
    pseudoloc.str('A test string with a %token%.')
    // [!!Ȃ ťēšť ŝťŕĩŉğ ŵĩťħ â %token%.        !!]


#### Override

Specifies an override character that all characters in the string will be replaced with. Used to easily spot unlocalized strings. Set to `undefined` to go back to regular pseudolocalization.

Default is `undefined`.

    pseudoloc.option.override = '_';
    pseudoloc.str('A test string with a %token%.')
    // [!!_____________________%token%_!!]

## Installation
Using npm:

    $ npm install pseudoloc

## Building

To build the minified javascript files for _pseudoloc_, run `npm install` to install dependencies and then:

    $ make build

## Running tests

To run the tests for _pseudoloc_, run `npm install` to install dependencies and then:

    $ make test

## Running benchmarks

To run the benchmarks for _pseudoloc_, run `npm install` to install dependencies and then:

    $ make benchmark