var pseudoloc = require('../index'),
  should = require('should');
var originalObj, modifiedObj;

describe('pseudoloc.obj', function() {

  beforeEach(function() {
    originalObj = { test: 'test {{some}} string', int: 1, inner: { innerTest: 'second test', regexp: /regexp/ } };
    modifiedObj = { test: 'test {{some}} string', int: 1, inner: { innerTest: 'second test', regexp: /regexp/ } };
  });

  afterEach(function() {
    pseudoloc.reset();
  });

  it('should exist', function() {
    should.exist(pseudoloc.obj);
  });

  it('should have same keys', function() {
    var obj = pseudoloc.obj(modifiedObj);
    obj.should.have.property('test');
    obj.should.have.property('int');
    obj.should.have.property('inner');
    obj.inner.should.have.property('innerTest');
    obj.inner.should.have.property('regexp');
  });

  it('should produce a pseudolocalized version of strings', function() {
    var obj = pseudoloc.obj(modifiedObj);
    obj.should.have.property('test').eql(pseudoloc.str(originalObj.test));
    obj.inner.should.have.property('innerTest').eql(pseudoloc.str(originalObj.inner.innerTest));
  });

  it('should not modify non strings', function() {
    var obj = pseudoloc.obj(modifiedObj);
    obj.should.have.property('int').eql(originalObj.int);
    obj.inner.should.have.property('regexp').eql(originalObj.inner.regexp);
  });

  it('should use options', function() {
    pseudoloc.option.startDelimiter = '{{';
    pseudoloc.option.endDelimiter = '}}';
    var obj = pseudoloc.obj(modifiedObj);
    obj.test.indexOf('{{some}}').should.not.eql(-1);
  });

});
