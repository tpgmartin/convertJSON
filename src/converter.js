function parse (input) {
    var yaml = "---\n",
        keys = Object.keys(input);

    if (!keys.length) {
        return null;
    }

    keys.map(function (key) {
       yaml += "\t" +  key + ": " + "'" + input[key] + "'";
    });

    return yaml;
}

module.exports = {
    parse: parse
};