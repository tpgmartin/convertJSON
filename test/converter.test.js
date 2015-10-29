var assert = require('assert'),
    yaml = require('js-yaml'),
    fs = require('fs'),
    converter = require('../src/converter');

describe('converter', function() {
    it('should return null object if JSON object empty', function () {
        var input = {};

        var output = converter.parse(input);

        assert.equal(output, null);
    });

    it('should return correct yaml header for non-empty JSON', function () {
        var input = { "foo": "bar" };

        var output = converter.parse(input).split('\t')[0];

        assert.equal(output, "---\n");
    });

    it('should return correct yaml for JSON containing strings', function () {
        var input = { "foo": "bar" };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tfoo: 'bar'");
    });


    it('should return correct yaml for JSON containing empty array', function () {
        var input = { "emptyArray": [] };

        var output = converter.parse(input);

        assert.equal(output, "---\n\temptyArray: []");
    });


    it('should return correct yaml for JSON containing nonempty array', function () {
        var input = { "array": [ "foo", "bar" ] };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tarray:\n\t\t- 'foo'\n\t\t- 'bar'\n");
    });

    it('should return correct yaml for JSON containing empty object', function () {
        var input = { "emptyArray": {} };

        var output = converter.parse(input);

        assert.equal(output, "---\n\temptyArray: {}");
    });

    it('should return correct yaml for JSON containing nonempty object', function () {
        var input = { "object": { "foo": "hello", "bar": "there" } };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tobject:\n\t\tfoo: 'hello'\n\t\tbar: 'there'\n");
    });


});