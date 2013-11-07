var pseudoloc = require('../index'),
    should = require('should');

describe('pseudoloc.str', function() {

  afterEach(function() {
    pseudoloc.reset();
  });

  it('should exist', function() {
    should.exist(pseudoloc.str);
  });

  it('should produce a pseudolocalized version', function() {
    pseudoloc.str('test string').should.not.eql('test string');
  });

  it('should produce a string longer than original', function() {
    pseudoloc.str('test string').length.should.be.above(11);
  });

  it('should produce unique versions of the string each time', function() {
    var s1 = pseudoloc.str('test string'),
        s2 = pseudoloc.str('test string');

    s1.should.not.eql(s2);
  });

  it('should not pseudolocalize escaped strings', function() {
    var s1 = pseudoloc.str('test %this% string');
    s1.indexOf('%this%').should.not.eql(-1);
  });

  it('should not pseudolocalize multiple escaped strings', function() {
    var s1 = pseudoloc.str('test %this% string %has% escapes.');

    s1.indexOf('%this%').should.not.eql(-1);
    s1.indexOf('%has%').should.not.eql(-1);
    s1.indexOf('string').should.eql(-1);
  });

  it('should use the specified delimiter for escaped string', function() {
    pseudoloc.option.delimiter = '~';
    var s1 = pseudoloc.str('test ~this~ string');

    s1.indexOf('~this~').should.not.eql(-1);
  });

  it('should use the specified start and end delimiter for escaped string', function() {
    pseudoloc.option.startDelimiter = '{{';
    pseudoloc.option.endDelimiter = '}}';
    var s1 = pseudoloc.str('test{{this two}}string');

    s1.indexOf('{{this two}}').should.not.eql(-1);
  });

  it('should support multicharacter delimiters', function() {
    pseudoloc.option.delimiter = '%%';
    var s1 = pseudoloc.str('test %%this%% string');

    s1.indexOf('%%this%%').should.not.eql(-1);
  });

  it('should pad the string be the specified pad amount', function() {
    pseudoloc.option.extend = 0.2;
    var s1 = pseudoloc.str('this is a test string');

    s1.length.should.eql(31);
  });

  it('should support a custom start token', function() {
    pseudoloc.option.prepend = 'start';
    var s1 = pseudoloc.str('this is a test string');

    s1.indexOf('start').should.eql(0);
  });

  it('should support a custom end token', function() {
    pseudoloc.option.append = 'end';
    var s1 = pseudoloc.str('this is a test string');

    s1.indexOf('end').should.eql(s1.length-3);
  });

  it('should replace with specific char specified in override', function() {
    pseudoloc.option.prepend = '';
    pseudoloc.option.append = '';
    pseudoloc.option.override = '_';

    var s1 = pseudoloc.str('this is a test string', true);
    s1.should.eql('_____________________');
  });

});