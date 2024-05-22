import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'sprites_';
const categoryColor = '#4C97FF';

function register() {
    registerBlock(`${categoryPrefix}stage`, {
        message0: 'stage',
        args0: [],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`Scratch.vm.runtime._stageTarget`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}getsprite`, {
        message0: 'get sprite named %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "String"
            },
        ],
        output: "Sprite",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`Scratch.vm.runtime.getSpriteTargetByName("${SPRITE}")`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}isstage`, {
        message0: 'is %1 stage',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`(${SPRITE || "undefined"} !== undefined ? ${SPRITE}.isStage : false)`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getx`, {
        message0: 'x of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`(${SPRITE || "undefined"} !== undefined ? ${SPRITE}.x : 0)`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}gety`, {
        message0: 'y of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`(${SPRITE || "undefined"} !== undefined ? ${SPRITE}.y : 0)`, javascriptGenerator.ORDER_ATOMIC]
    })

    registerBlock(`${categoryPrefix}getdir`, {
        message0: 'direction of %1',
        args0: [
            {
                "type": "input_value",
                "name": "SPRITE",
                "check": "Sprite"
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const SPRITE = javascriptGenerator.valueToCode(block, 'SPRITE', javascriptGenerator.ORDER_ATOMIC);
        return [`(${SPRITE || "undefined"} !== undefined ? ${SPRITE}.direction : 0)`, javascriptGenerator.ORDER_ATOMIC]
    })
}

export default register;