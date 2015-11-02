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
            console.log('1', key);
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

    console.log(yaml);
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
};

module.exports = {
    parse: parse
};