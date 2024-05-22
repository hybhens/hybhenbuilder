import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'functions_';
const categoryColor = '#FF6680';

function register() {
    // define func
    registerBlock(`${categoryPrefix}define`, {
        message0: 'define %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        output: "Function",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        return [`(async (functionArg) => { ${BLOCKS} })`, javascriptGenerator.ORDER_NONE];
    })

    // return
    registerBlock(`${categoryPrefix}return`, {
        message0: 'return %1',
        args0: [
            {
                "type": "input_value",
                "name": "VALUE",
            }
        ],
        previousStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const VALUE = javascriptGenerator.valueToCode(block, 'VALUE', javascriptGenerator.ORDER_ATOMIC);
        const code = `return ${VALUE || ''}`;
        return `${code}\n`;
    })

    // execute
    registerBlock(`${categoryPrefix}execute_a`, {
        message0: 'execute %1 with %2',
        args0: [
            {
                "type": "input_value",
                "name": "FUNC",
                "check": "Function"
            },
            {
                "type": "input_value",
                "name": "ARG"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const FUNC = javascriptGenerator.valueToCode(block, 'FUNC', javascriptGenerator.ORDER_ATOMIC);
        const ARG = javascriptGenerator.valueToCode(block, 'ARG', javascriptGenerator.ORDER_ATOMIC);
        const code = `${FUNC || "()=>{}"}(${ARG});`;
        return `${code}\n`;
    })
    registerBlock(`${categoryPrefix}execute_b`, {
        message0: 'execute %1 with %2',
        args0: [
            {
                "type": "input_value",
                "name": "FUNC",
                "check": "Function"
            },
            {
                "type": "input_value",
                "name": "ARG"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const FUNC = javascriptGenerator.valueToCode(block, 'FUNC', javascriptGenerator.ORDER_ATOMIC);
        const ARG = javascriptGenerator.valueToCode(block, 'ARG', javascriptGenerator.ORDER_ATOMIC);
        return [`(${FUNC || "()=>{}"}(${ARG}))`, javascriptGenerator.ORDER_NONE];
    })

    //arg
    registerBlock(`${categoryPrefix}arg`, {
        message0: 'function argument',
        args0: [],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`functionArg`, javascriptGenerator.ORDER_NONE];
    })
}
export default register;