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

    it('should return correct yaml JSON containing strings', function () {
        var input = { "foo": "bar" };

        var output = converter.parse(input);

        assert.equal(output, "---\n\tfoo: 'bar'");
    });
});