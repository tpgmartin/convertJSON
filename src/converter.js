function parse (input) {
    var yaml = "---\n",
        keys = Object.keys(input);

    if (!keys.length) {
        return null;
    }

    keys.map(function (key) {
        if (input[key] instanceof Array) {
            if (input[key].length === 0) {
                yaml += "\t" +  key + ": []";
            } else {
                yaml += "\t" +  key + ":\n";
                input[key].map(function (elem) {
                    yaml += "\t\t- '" +  elem + "'\n";
                });
            }
        } else if (input[key] instanceof Object) {
            if (Object.keys(input[keys]).length === 0) {
                yaml += "\t" +  key + ": {}";
            } else {
                yaml += "\t" +  key + ":\n";
                Object.keys(input[key]).map(function (elem) {
                    yaml += "\t\t" +  elem + ": '" + input[key][elem] + "'\n";
                });
            }
        } else {
            yaml += "\t" +  key + ": " + "'" + input[key] + "'";
        }
    });

    return yaml;
}

module.exports = {
    parse: parse
};