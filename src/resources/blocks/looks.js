import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'looks_';
const categoryColor = '#9966ff';

function register() {
    registerBlock(`${categoryPrefix}stage`, {
        message0: 'stage',
        args0: [],
        output: "Looks",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`Scratch.vm.runtime._stageTarget`, javascriptGenerator.ORDER_ATOMIC];
    });

    // Register a 'say' block
    registerBlock(`${categoryPrefix}say`, {
        message0: 'say %1',
        args0: [
            {
                type: 'input_value',
                name: 'TEXT',
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: categoryColor,
        tooltip: 'Make the sprite say something',
        helpUrl: ''
    }, (block) => {
        var text = javascriptGenerator.valueToCode(block, 'TEXT', javascriptGenerator.ORDER_NONE) || '\'\'';
        return `console.log(${text});\n`;
    });

    // Register a 'set costume' block
    registerBlock(`${categoryPrefix}setCostume`, {
        message0: 'set costume to %1',
        args0: [
            {
                type: 'input_value',
                name: 'COSTUME',
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: categoryColor,
        tooltip: 'Set the costume of the sprite',
        helpUrl: ''
    }, (block) => {
        var costume = javascriptGenerator.valueToCode(block, 'COSTUME', javascriptGenerator.ORDER_NONE) || '\'\'';
        return `Scratch.vm.runtime._stageTarget.setCostume(${costume});\n`;
    });

    // Register a 'change color effect' block
    registerBlock(`${categoryPrefix}changeColorEffect`, {
        message0: 'change color effect by %1',
        args0: [
            {
                type: 'input_value',
                name: 'CHANGE',
            },
        ],
        previousStatement: null,
        nextStatement: null,
        colour: categoryColor,
        tooltip: 'Change the color effect of the sprite',
        helpUrl: ''
    }, (block) => {
        var change = javascriptGenerator.valueToCode(block, 'CHANGE', javascriptGenerator.ORDER_NONE) || '0';
        return `Scratch.vm.runtime._stageTarget.changeEffect('color', ${change});\n`;
    });

    // Add more blocks as needed
}

export default register;
