var fs = require('fs');

var yaml;

function read (filename) {
    fs.readFile(__dirname + filename, 'utf8', function (err, data) {
       if (err) {
           return console.log(err);
       }
        console.log(JSON.stringify(data));
        return data;
    });
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
    var keys = Object.keys(input);
    yaml = "---\n";


    if (!keys.length) {
        return null;
    }

    keys.map(function (key) {
        if (input[key] instanceof Array) {
            parseArray(key, input[key], '');
        } else if (input[key] instanceof Object) {
            parseObject(key, input[key], '');
        } else {
            yaml += "\t" +  key + ": " + input[key] + "\n";
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