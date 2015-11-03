var assert = require('assert'),
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

        assert.equal(output, "---\n\tfoo: bar\n");
    });


    it('should return correct yaml for JSON containing empty array', function () {
        var input = { "emptyArray": [] };

        var output = converter.parse(input);

        assert.equal(output, "---\n\temptyArray: []\n");
    });


    it('should return correct yaml for JSON containing nonempty array', function () {
        var input = { "array": [ "foo", "bar" ] };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tarray:\n\t\t- foo\n\t\t- bar\n");
    });

    it('should return correct yaml for JSON containing nonempty nested array', function () {
        var input = { "array": [ [ 1, 2 ], 3 ] };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tarray:\n\t\t-\n\t\t\t- 1\n\t\t\t- 2\n\t\t- 3\n");
    });

    it('should return correct yaml for JSON containing empty object', function () {
        var input = { "emptyObject": {} };

        var output = converter.parse(input);

        assert.equal(output, "---\n\temptyObject: {}\n");
    });

    it('should return correct yaml for JSON containing nonempty object', function () {
        var input = { "object": { "foo": "hello", "bar": "there" } };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tobject:\n\t\tfoo: hello\n\t\tbar: there\n");
    });

    it('should return correct yaml for JSON containing nonempty nested object', function () {
        var input = { "object": { "foo": { "colour": "blue" }, "bar": "hey" } };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tobject:\n\t\tfoo:\n\t\t\tcolour: blue\n\t\tbar: hey\n");
    });

    it('should return correct yaml for JSON containing undefined or null value', function () {
        var input = { "undefinedValue": undefined };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tundefinedValue: undefined\n");
    });

    it('should read from basic yaml file', function () {
        var input = './test/simple.yml';

        var output = converter.read(input);

        assert.equal(output, "hello");
    });
});
