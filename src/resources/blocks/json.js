import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'json_';
const categoryColor = '#5755D4';

function register() {
    // check if a string is json
    registerBlock(`${categoryPrefix}validate`, {
        message0: 'is %1 valid JSON?',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "String"
            }
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_ATOMIC);
        return [`await (async () => { try { JSON.parse(${INPUT || '"{}"'}); return true; } catch { return false; } })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // convert string to json
    registerBlock(`${categoryPrefix}tojson`, {
        message0: 'string %1 to JSON',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "String"
            }
        ],
        output: ["JSONArray", "JSONObject"],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_ATOMIC);
        return [`await (async () => { try { return JSON.parse(${INPUT || '"{}"'}); } catch { return false; } })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // convert json to string
    registerBlock(`${categoryPrefix}tostring`, {
        message0: 'JSON %1 to string',
        args0: [
            {
                "type": "input_value",
                "name": "INPUT",
                "check": ["JSONArray", "JSONObject"]
            }
        ],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const INPUT = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_ATOMIC);
        return [`JSON.stringify(${INPUT || "{}"})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // insert
    registerBlock(`${categoryPrefix}arrayinsert`, {
        message0: 'insert %1 at end of %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        return [`(${X || "[]"}.push(${Y || '""'}))`, javascriptGenerator.ORDER_ATOMIC];
    })

    // set
    registerBlock(`${categoryPrefix}arrayset`, {
        message0: 'set %1 to %2 in array %3',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
            },
            {
                "type": "input_value",
                "name": "Z",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        const Z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC);
        return [`await (async () => { var z = ${Z}; z[${X}] = ${Y}; return z })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // merge
    registerBlock(`${categoryPrefix}arraymerge`, {
        message0: 'merge array %1 with %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONArray"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        return [`${X}.concat(${Y})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get
    registerBlock(`${categoryPrefix}arrayget`, {
        message0: 'get %1 from array %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "Number"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONArray"
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        return [`${X || "[]"}[${Y || 0}]`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get
    registerBlock(`${categoryPrefix}arraylength`, {
        message0: 'length of array %1',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONArray"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        return [`${X || "[]"}.length`, javascriptGenerator.ORDER_ATOMIC];
    })

    // set
    registerBlock(`${categoryPrefix}objectset`, {
        message0: 'set %1 to %2 in object %3',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "Y",
            },
            {
                "type": "input_value",
                "name": "Z",
                "check": "JSONObject"
            },
        ],
        output: "JSONObject",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        const Z = javascriptGenerator.valueToCode(block, 'Z', javascriptGenerator.ORDER_ATOMIC);
        return [`await (async () => { var z = ${Z}; z[${X}] = ${Y}; return z })()`, javascriptGenerator.ORDER_ATOMIC];
    })

    // get
    registerBlock(`${categoryPrefix}objectget`, {
        message0: 'get %1 from object %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "String"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONObject"
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        return [`${X || "{}"}[${Y || 0}]`, javascriptGenerator.ORDER_ATOMIC];
    })

    // keys
    registerBlock(`${categoryPrefix}objectkeys`, {
        message0: 'keys of object %1',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONObject"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        return [`Object.keys(${X})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // values
    registerBlock(`${categoryPrefix}objectvalues`, {
        message0: 'values of object %1',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONObject"
            },
        ],
        output: "JSONArray",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        return [`Object.values(${X})`, javascriptGenerator.ORDER_ATOMIC];
    })

    // merge
    registerBlock(`${categoryPrefix}objectmerge`, {
        message0: 'merge object %1 with %2',
        args0: [
            {
                "type": "input_value",
                "name": "X",
                "check": "JSONObject"
            },
            {
                "type": "input_value",
                "name": "Y",
                "check": "JSONObject"
            },
        ],
        output: "JSONObject",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const X = javascriptGenerator.valueToCode(block, 'X', javascriptGenerator.ORDER_ATOMIC);
        const Y = javascriptGenerator.valueToCode(block, 'Y', javascriptGenerator.ORDER_ATOMIC);
        return [`{...${X}, ...${Y}}`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
