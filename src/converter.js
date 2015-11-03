var fs = require('fs');

var yaml;

function read (filename) {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
}

function write (filename, markup) {
    fs.writeFile(__dirname + filename, markup, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });
}

function parse (input) {

    var contents, isFile, keys;

    isFile = /\.[a-z]+$/.test(input);
    contents = isFile ? read(input) : input;

    keys = Object.keys(contents);

    if (!keys.length) return null;

    yaml = "---\n";

    keys.map(function (key) {
        if (contents[key] instanceof Array) {
            parseArray(key, contents[key], '');
        } else if (contents[key] instanceof Object) {
            parseObject(key, contents[key], '');
        } else {
            yaml += "\t" +  key + ": " + contents[key] + "\n";
        }
    });

    return yaml;
}

function parseObject (key, values, nesting) {
    var tabs = nesting + "\t";

    if (Object.keys(values).length === 0) {
        yaml += tabs +  key + ": {}\n";
    } else {
        if (nesting.length < 1) {
            yaml += tabs +  key + ":\n";
        }
        Object.keys(values).map(function (elem) {
            if (values[elem] instanceof Object) {
                yaml += tabs + "\t" +  elem + ":\n";
                parseObject(Object.keys(values[elem])[0], values[elem], nesting+"\t");
            } else {
                yaml += tabs + "\t" +  elem + ": " + values[elem] + "\n";
            }
        });
    }
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
                parseArray('', elem, nesting+"\t");
            } else {
                yaml += tabs + "\t- " +  elem + "\n";
            }
        });
    }
}

module.exports = {
    parse: parse,
    read: read,
    write: write
};