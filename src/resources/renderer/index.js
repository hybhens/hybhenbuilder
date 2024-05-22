import Blockly from 'blockly/core'

class CustomConstantProvider extends Blockly.zelos.ConstantProvider {
    init() {
        super.init()

        this.ROUNDEL = this.makeRoundel()
        this.ROUNDEDINVERTED = this.makeRoundedInverted()
        this.RHOMBUS = this.makeRhombus()
    }

    makeSquared() {
        const radius = this.CORNER_RADIUS * 2.4;

        function makeMainPath(height, up, right) {
          const innerHeight = height - radius * 2;
          const sweep = right === up ? '0' : '1';
          return (
            Blockly.utils.svgPaths.arc(
              'a',
              '0 0,' + sweep,
              radius,
              Blockly.utils.svgPaths.point((right ? 1 : -1) * radius, (up ? -1 : 1) * radius),
            ) +
            Blockly.utils.svgPaths.lineOnAxis('v', (up ? -1 : 1) * innerHeight) +
            Blockly.utils.svgPaths.arc(
              'a',
              '0 0,' + sweep,
              radius,
              Blockly.utils.svgPaths.point((right ? -1 : 1) * radius, (up ? -1 : 1) * radius),
            )
          );
        }
    
        return {
          type: this.SHAPES.SQUARE,
          isDynamic: true,
          width(_height) {
            return radius;
          },
          height(height) {
            return height;
          },
          connectionOffsetY(connectionHeight) {
            return connectionHeight / 2;
          },
          connectionOffsetX(connectionWidth) {
            return -connectionWidth;
          },
          pathDown(height) {
            return makeMainPath(height, false, false);
          },
          pathUp(height) {
            return makeMainPath(height, true, false);
          },
          pathRightDown(height) {
            return makeMainPath(height, false, true);
          },
          pathRightUp(height) {
            return makeMainPath(height, false, true);
          },
        };
      }

    makeRoundedInverted() {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const maxHeight = maxWidth * 2;

        function makeMainPath(blockHeight, up, right) {
            const remainingHeight = blockHeight > maxHeight ? blockHeight - maxHeight : 0;
            const height = blockHeight > maxHeight ? maxHeight : blockHeight;
            const radius = height / 2;
            return (
                Blockly.utils.svgPaths.lineOnAxis('h', (right ? 1 : -1) * radius) +
                Blockly.utils.svgPaths.arc(
                    'a',
                    '0 0,0',
                    radius,
                    Blockly.utils.svgPaths.point((up ? .5 : -.5) * radius, (up ? -1 : 1) * radius),
                ) +
                Blockly.utils.svgPaths.lineOnAxis('v', (right ? 1 : -1) * remainingHeight) +
                Blockly.utils.svgPaths.arc(
                    'a',
                    '0 0,0',
                    radius,
                    Blockly.utils.svgPaths.point((up ? -.5 : .5) * radius, (up ? -1 : 1) * radius),
                ) +
                Blockly.utils.svgPaths.lineOnAxis('h', (right ? -1 : 1) * radius)
            );
        }

        return {
            type: this.SHAPES.HEXAGONAL,
            isDynamic: true,
            width(height) {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height) {
                return height;
            },
            connectionOffsetY(connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth) {
                return -connectionWidth;
            },
            pathDown(height) {
                return makeMainPath(height, false, false);
            },
            pathUp(height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height) {
                return makeMainPath(height, false, true);
            },
        };
    }

    makeRoundel() {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const maxHeight = maxWidth * 2;

        function makeMainPath(blockHeight, up, right) {
            const remainingHeight = blockHeight > maxHeight ? blockHeight - maxHeight : 0;
            const height = blockHeight > maxHeight ? maxHeight : blockHeight;
            const radius = height / 2;
            return (
                Blockly.utils.svgPaths.arc(
                    'a',
                    '0 0,1',
                    radius,
                    Blockly.utils.svgPaths.point((up ? -.5 : .5) * radius, (up ? -.5 : .5) * radius),
                ) +
                Blockly.utils.svgPaths.lineOnAxis('h', (right ? .5 : -.5) * radius) +
                Blockly.utils.svgPaths.lineOnAxis('v', (up ? -1 : 1) * radius) +
                Blockly.utils.svgPaths.lineOnAxis('v', (right ? 1 : -1) * remainingHeight) +
                Blockly.utils.svgPaths.lineOnAxis('h', (right ? -.5 : .5) * radius) +
                Blockly.utils.svgPaths.arc(
                    'a',
                    '0 0,1',
                    radius,
                    Blockly.utils.svgPaths.point((up ? .5 : -.5) * radius, (up ? -.5 : .5) * radius),
                )
            );
        }

        return {
            type: this.SHAPES.ROUND,
            isDynamic: true,
            width(height) {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height) {
                return height;
            },
            connectionOffsetY(connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth) {
                return -connectionWidth;
            },
            pathDown(height) {
                return makeMainPath(height, false, false);
            },
            pathUp(height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height) {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height) {
                return makeMainPath(height, false, true);
            },
        };
    }

    makeRhombus() {
        const maxWidth = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;

        function makeMainPath(height, up, right) {
            const halfHeight = height / 2;
            const width = halfHeight > maxWidth ? maxWidth : halfHeight;
            const forward = up ? -1 : 1;
            const direction = right ? -1 : 1;
            const dy = (forward * height) / 2;
            return (
                /*Blockly.utils.svgPaths.lineTo(-direction * width, dy) +
                Blockly.utils.svgPaths.lineTo(direction * width, dy)*/
                Blockly.utils.svgPaths.lineTo(0, dy * 0.58) +
                Blockly.utils.svgPaths.lineTo(-direction * width * (1 - 0.5 / 0.7), dy * -0.28) +
                Blockly.utils.svgPaths.lineTo(-direction * width * (0.5 / 0.7), dy * 0.7) +
                Blockly.utils.svgPaths.lineTo(-direction * width * -(0.5 / 0.7), dy * 0.7) +
                Blockly.utils.svgPaths.lineTo(-direction * width * -(1 - 0.5 / 0.7), dy * -0.28) + 
                Blockly.utils.svgPaths.lineTo(0, dy * 0.58)
            );
        }

        var this2 = this

        return {
            type: this.SHAPES.HEXAGONAL,
            isDynamic: true,
            width(height) {
                const halfHeight = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height) {
                return height;
            },
            connectionOffsetY(connectionHeight) {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth) {
                return -connectionWidth;
            },
            pathDown(height) {
                return makeMainPath(height, false, false);
            },
            pathUp(height) {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height) {
                return this2.ROUNDED.pathRightDown(height)
            },
            pathRightUp(height) {
                return this2.ROUNDED.pathRightUp(height)
            },
        };
    }

    /**
     * @param {Blockly.RenderedConnection} connection
     */
    shapeFor(connection) {
        let checks = connection.getCheck();
        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }
        if (connection.type == Blockly.ConnectionType.INPUT_VALUE || connection.type == Blockly.ConnectionType.OUTPUT_VALUE) {
            if (checks && checks.indexOf('Function') !== -1) {
                return this.RHOMBUS;
            } else if (checks && checks.indexOf('Sprite') !== -1) {
                return this.SQUARED;
            } else if (checks && checks.indexOf('JSONObject') !== -1) {
                return this.ROUNDEL;
            } else if (checks && checks.indexOf('JSONArray') !== -1) {
                return this.ROUNDEDINVERTED;
            }
        }
        return super.shapeFor(connection)
    }
}

export default class Renderer extends Blockly.zelos.Renderer {
    constructor() {
        super();
    }

    makeConstants_() {
        return new CustomConstantProvider();
    }
}