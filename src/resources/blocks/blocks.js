import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';
import Blockly from 'blockly/core'

const categoryPrefix = 'blocks_';
const categoryColor = '#7B7996';

function register() {
    // create dem blocks!!!
    registerBlock(`${categoryPrefix}create`, {
        message0: 'create block %1 id: %2 %3 text: %4 %5 type: %6 %7 end cap?: %8 %9 disable monitor?: %10 %11 branch count: %12 %13 inputs: %14 %15 function: %16 %17',
        args0: [
            {
                "type": "input_dummy"
            },
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
                "type": "field_input",
                "name": "TEXT",
                "text": "text",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [ "block", "COMMAND" ],
                    [ "reporter", "REPORTER" ],
                    [ "boolean", "BOOLEAN" ],
                    [ "conditional", "CONDITIONAL" ],
                    [ "loop", "LOOP" ],
                    [ "object (only available in ElectraMod, Unsandboxed and NitroBolt)", "OBJECT" ],
                    [ "array (only available in ElectraMod, Unsandboxed and NitroBolt)", "ARRAY" ],
                    [ "inline (only available in ElectraMod and Unsandboxed)", "INLINE" ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TERMINAL",
                "options": [
                    [ "false", 'false' ],
                    [ "true", 'true' ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "DISABLE_MONITOR",
                "options": [
                    [ "false", 'false' ],
                    [ "true", 'true' ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_number",
                "name": "BRANCH_COUNT",
                "value": 1,
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "INPUTS",
                "check": "BlockInput"
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
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const TEXT = block.getFieldValue('TEXT')
        const TERMINAL = block.getFieldValue('TERMINAL')
        const DISABLE_MONITOR = block.getFieldValue('DISABLE_MONITOR')
        const BRANCH_COUNT = block.getFieldValue('BRANCH_COUNT')
        const TYPE = block.getFieldValue('TYPE')
        const INPUTS = javascriptGenerator.statementToCode(block, 'INPUTS');
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        let code;

        code = `blocks.push({
            opcode: \`${ID}\`,
            blockType: Scratch.BlockType.${TYPE},`
            if ((TEXT.startsWith('["') && TEXT.endsWith('"]')) || (TEXT.startsWith("['") && TEXT.endsWith("']")) || (TEXT.startsWith("[`") && TEXT.endsWith("`]"))) {
                code += ('\n' + `text: ${TEXT},`)
            } else {
                code += ('\n' + `text: \`${TEXT}\`,`)
            }
            code += ('\n' + `arguments: { ${INPUTS} },`)
            if (TYPE === 'COMMAND' || TYPE === 'CONDITIONAL' || TYPE === 'LOOP') { 
                if (TERMINAL === 'true') {
                code += ('\n' + `isTerminal: true,`)
                }
            }
            if (TYPE === 'CONDITIONAL' || TYPE === 'LOOP') { 
                code += ('\n' + `branchCount: ${BRANCH_COUNT},`)
            }
            if (TYPE === 'REPORTER' || TYPE === 'BOOLEAN') { 
                if (DISABLE_MONITOR === 'true') {
                code += ('\n' + `disableMonitor: true,`)
                }
            }
            code = code.slice(0, -1);

        code += ('\n' + `});
            Extension.prototype[\`${ID}\`] = async (args, util) => { ${FUNC} };`);
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}createobject`, {
        message0: 'create object %1 id: %2 %3 text: %4 %5 type: %6 %7 function: %8 %9',
        args0: [
            {
                "type": "input_dummy"
            },
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
                "type": "field_input",
                "name": "TEXT",
                "text": "text",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [ "button", "BUTTON" ],
                    [ "label", "LABEL" ],
                ]
            },
            {
                "type": "input_dummy"
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
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const TEXT = block.getFieldValue('TEXT')
        const TYPE = block.getFieldValue('TYPE')
        const FUNC = javascriptGenerator.statementToCode(block, 'FUNC');
        
        let code;
        if (TYPE === 'BUTTON') {
        code = `blocks.push({
            opcode: \`${ID}\`,
            blockType: Scratch.BlockType.${TYPE},
            text: \`${TEXT}\`,
            disableMonitor: true
        });
        Extension.prototype[\`${ID}\`] = async (args, util) => { ${FUNC} };`;
        } else {
            code = `blocks.push({
                opcode: \`${ID}\`,
                blockType: Scratch.BlockType.${TYPE},
                text: \`${TEXT}\`,
                disableMonitor: true
            });`;  
        }
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}startbranch`, {
        message0: 'run branch %1 %2 loop? %3',
        args0: [
            {
                "type": "field_number",
                "name": "BRANCH",
                "value": 1,
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "LOOP",
                "options": [
                    [ "false", 'false' ],
                    [ "true", 'true' ],
                ]
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const BRANCH = block.getFieldValue('BRANCH')
        const LOOP = block.getFieldValue('LOOP')
        let code;

        if (LOOP === 'true') {
            code = `util.startBranch(${BRANCH}, true)`; 
        } else {
            code = `util.startBranch(${BRANCH})`;  
        }
        return `${code}\n`;
    })

    // create dem inputss!!!
    registerBlock(`${categoryPrefix}input`, {
        message0: 'create input %1 id: %2 %3 type: %4 %5 default: %6',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "field_input",
                "name": "ID",
                "text": "ID",
                "spellcheck": false
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "field_dropdown",
                "name": "TYPE",
                "options": [
                    [ "string", "STRING" ],
                    [ "number", "NUMBER" ],
                    [ "boolean", "BOOLEAN" ],
                    [ "object (only available in ElectraMod, Unsandboxed and NitroBolt)", "OBJECT" ],
                    [ "array (only available in ElectraMod, Unsandboxed and NitroBolt)", "ARRAY" ],
                    [ "color", "COLOR" ],
                    [ "costume", "COSTUME" ],
                    [ "sound", "SOUND" ],
                    [ "angle", "ANGLE" ],
                    [ "matrix", "MATRIX" ],
                    [ "note", "NOTE" ],
                    [ "empty", "empty" ],
                ]
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_value",
                "name": "DEFAULT",
            }
        ],
        nextStatement: "BlockInput",
        previousStatement: "BlockInput",
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const ID = block.getFieldValue('ID')
        const TYPE = block.getFieldValue('TYPE')
        const DEFAULT = javascriptGenerator.valueToCode(block, 'DEFAULT', javascriptGenerator.ORDER_ATOMIC);
        
        const code = `"${ID}": {
            type: Scratch.ArgumentType.${TYPE}, ${DEFAULT ? `
            defaultValue: ${DEFAULT},`: ''}
        },`;
        return `${code}\n`;
    })

    // get input
    registerBlock(`${categoryPrefix}get`, {
        message0: 'get %1',
        args0: [
            {
                "type": "field_input",
                "name": "NAME",
                "text": "INPUTID",
                "spellcheck": false
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = block.getFieldValue('NAME')
        return [`args["${NAME}"]`, javascriptGenerator.ORDER_ATOMIC];
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

        // return
        registerBlock(`${categoryPrefix}callhat`, {
            message0: 'call hat %1',
            args0: [
                {
                    "type": "field_input",
                    "name": "NAME",
                    "text": "HATID",
                    "spellcheck": false
                }
            ],
            previousStatement: null,
            nextStatement: null,
            inputsInline: true,
            colour: categoryColor,
        }, (block) => {
            const NAME = block.getFieldValue('NAME')
            const code = `Scratch.vm.runtime.startHats(\`\${Extension.prototype.getInfo().id}_${NAME}\`)`;
            return `${code}\n`;
        })
}
export default register;
