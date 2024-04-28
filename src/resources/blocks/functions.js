import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'functions_';
const categoryColor = '#FF6680';

function register() {
    // function
    registerBlock(`${categoryPrefix}create`, {
        message0: 'function %1 %2 %3',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        const code = `async function ${ID}() { ${FUNC} }`;
        return `${code}\n`;
    })

    // inline function
    registerBlock(`${categoryPrefix}inline`, {
        message0: 'inline function %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "FUNC"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        return [`await (async () => { ${FUNC} })()`, javascriptGenerator.ORDER_ATOMIC];
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

    // call
    registerBlock(`${categoryPrefix}call`, {
        message0: 'call %1',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const code = `${ID}()`;
        return `${code}\n`;
    })

    // call
    registerBlock(`${categoryPrefix}callreporter`, {
        message0: 'call %1',
        args0: [
            {
                "type": "field_input",
                "name": "ID",
                "text": "id",
                "spellcheck": false
            },
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        return [`${ID}()\n`, javascriptGenerator.ORDER_ATOMIC];
    })
}
export default register;
