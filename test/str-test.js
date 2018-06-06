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

    it('should produce consistent versions of the string each time', function() {
        var s1 = pseudoloc.str('test string'),
            s2 = pseudoloc.str('test string');

        s1.should.eql(s2);
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
    
    it('should support multiple delimiter pairs', function() {
        pseudoloc.option.delimiters = [
            { both: '%%' },
            { full: '%[sd]' },
            { start: '%\\(', end: '\\)[sd]' },
            { start: '<\\/?', end: '>' },
            { start: '<', end: '\\/>' },
            { start: '{{', end: '}}' }
        ];
        var s1 = pseudoloc.str('%%value%%');
        s1.indexOf('%%value%%').should.not.eql(-1);
  
        var s2 = pseudoloc.str('%d files');
        s2.indexOf('%d').should.not.eql(-1);
        s2.indexOf('files').should.eql(-1);

        var s3 = pseudoloc.str('%s files');
        s3.indexOf('%s').should.not.eql(-1);
        s3.indexOf('files').should.eql(-1);

        var s4 = pseudoloc.str('Hello %(userName)s!');
        s4.indexOf('%(userName)s').should.not.eql(-1);
        s4.indexOf('Hello').should.eql(-1);

        var s5 = pseudoloc.str('%(count)d tacos!');
        s5.indexOf('%(count)d').should.not.eql(-1);
        s5.indexOf('tacos').should.eql(-1);

        var s6 = pseudoloc.str('this is <b>bold</b> text');
        s6.indexOf('<b>').should.not.eql(-1);
        s6.indexOf('</b>').should.not.eql(-1);
        s6.indexOf('bold').should.eql(-1);

        var s7 = pseudoloc.str('this is <MyCoolTag/> stuff');
        s7.indexOf('<MyCoolTag/>').should.not.eql(-1);
        s7.indexOf('stuff').should.eql(-1);

        var s8 = pseudoloc.str('remove %(user)s from <ProjectPicker/> <span>on</span> <b>%(date)s</b>');
        s8.indexOf('%(user)s').should.not.eql(-1);
        s8.indexOf('<ProjectPicker/>').should.not.eql(-1);
        s8.indexOf('<span>').should.not.eql(-1);
        s8.indexOf('</span>').should.not.eql(-1);
        s8.indexOf('<b>').should.not.eql(-1);
        s8.indexOf('%(date)s').should.not.eql(-1);
        s8.indexOf('</b>').should.not.eql(-1);
        s8.indexOf('remove').should.eql(-1);
        s8.indexOf('from').should.eql(-1);
        s8.indexOf('on').should.eql(-1);
    });

    it('should pad the string by the specified pad amount', function() {
        pseudoloc.option.extend = 0.2;
        var sInput = 'this is a test string';
        var s1 = pseudoloc.str(sInput);
        var lenInput = sInput.length;
        s1.length.should.eql(32); // lazy accounting for double-byte padding characters
    });

    it('should support a custom start token', function() {
        pseudoloc.option.prepend = 'start';
        var s1 = pseudoloc.str('this is a test string');

        s1.indexOf('start').should.eql(0);
    });

    it('should support a custom end token', function() {
        pseudoloc.option.append = 'end';
        var s1 = pseudoloc.str('this is a test string');

        s1.indexOf('end').should.eql(s1.length - 3);
    });

    it('should replace with specific char specified in override', function() {
        pseudoloc.option.prepend = '';
        pseudoloc.option.append = '';
        pseudoloc.option.override = '_';

        var s1 = pseudoloc.str('this is a test string', true);
        s1.should.eql('_____________________');
    });

});
