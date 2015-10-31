var yaml;

function parse (input) {
    var keys = Object.keys(input);
    yaml = "---\n";


    if (!keys.length) {
        return null;
    }

    keys.map(function (key) {
        if (input[key] instanceof Array) {
            parseArray(key, input[key], '');
        } else if (input[key] instanceof Object) {
            if (Object.keys(input[keys]).length === 0) {
                yaml += "\t" +  key + ": {}\n";
            } else {
                yaml += "\t" +  key + ":\n";
                Object.keys(input[key]).map(function (elem) {
                    yaml += "\t\t" +  elem + ": '" + input[key][elem] + "'\n";
                });
            }
        } else {
            yaml += "\t" +  key + ": " + input[key] + "\n";
        }
    });

    return yaml;
}

function parseArray (key, values, nesting) {
    var tabs = nesting + "\t";

    if (values.length === 0) {
        yaml += tabs +  key + ": []\n";
    } else {
        if (key.length === 0) {
            yaml += tabs + "-\n";
        } else {
            yaml += tabs +  key + ":\n";
        }

        values.map(function (elem) {
            if (elem instanceof Array) {
                parseArray('', elem, "\t");
            } else {
                yaml += tabs + "\t- " +  elem + "\n";
            }
        });
    }
};

module.exports = {
    parse: parse
};