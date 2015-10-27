var assert = require('assert'),
    converter = require('../src/converter');

describe('converter', function() {
    it('should return null object if JSON object empty', function () {
        var input = {};

        var output = converter.parse(input);

        assert.equal(null, output);
    });
});