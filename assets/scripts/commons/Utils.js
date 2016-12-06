var Types = require('Types');
var Type = Types.SymbolType;
var Side = Types.LineSide;

function calculateLine(lineSymbols, paytable, lineType, bonusTrigger) {
    let linePatterns = [];
    let linePattern = _calculateLine(lineSymbols, paytable, Side.Left);
    if (lineType === Types.LineType.BothSide) {
        line.reverse();
        let reversedPattern = _calculateLine(lineSymbols, paytable, Side.Right);
        if (reversedPattern && reversedPattern.compareTo(linePattern) > 0) {
            linePattern = reversedPattern;
        }
    }
    if (linePattern) {
        linePatterns.push(linePattern);
    }
    if (bonusTrigger === Types.Trigger.Payline) {
        let line = lineSymbols.line;
        let markSymbolMap = new Map();
        lineSymbols.forEach((symbol, index) => {
            if (symbol.type === Type.Bonus) {
                let bonusCoordinates = markSymbolMap.get(symbol);
                if (!bonusCoordinates) {
                    bonusCoordinates = [];
                    markSymbolMap.put(symbol, bonusCoordinates);
                }
                bonusCoordinates.push(line.coordinates[index]);
            }
        });
        if (markSymbolMap.size > 0) {
            for (let [symbol, coordinates] of map.entries()) {
                let count = coordinates.length;
                let minCount = paytable.getMinCount(symbol.id);
                if (count >= minCount) {
                    let multiple = paytable.getMultiple(symbol.id, count);
                    let linePattern = new Types.LinePattern(line, symbol, count, multiple, coordinates);
                    linePatterns.push(linePattern);
                }
            }
        }
    }
    return linePatterns;
}

function _calculateLine(lineSymbols, paytable, side) {
    let markSymbol = lineSymbols[0];
    if (markSymbol.type <= Type.Wild) {
        let count = 1;
        for (let i = 1; i < lineSymbols.length; i++) {
            if (lineSymbols[i].id === markSymbol.id || lineSymbols[i].type === Type.Wild) {
                count++;
            } else if (markSymbol.type === Type.Wild && lineSymbols[i].type === Type.Normal) {
                markSymbol = lineSymbols[i];
                count++;
            } else {
                break;
            }
        }
        let minCount = paytable.getMinCount(markSymbol.id);
        if (count >= minCount) {
            let line = lineSymbols.line;
            let multiple = paytable.getMultiple(markSymbol.id, count);
            let winCoordinates = (side === Side.Left ? line.coordinates.slice(0, count) : line.coordinates.slice(line.length - count));
            let linePattern = new Types.LinePattern(line, markSymbol, count, multiple, winCoordinates);
            return linePattern;
        }
    }
}

function buildSymbols(config) {
    let symbols = config.map((elem, index) => new Types.Symbol(index + 1, elem));
    return new Types.Symbols(symbols);
}

function buildReels(config) {
    return config.map((elem, index) => new Types.Reel(index + 1, elem));
}

function buildLines(config) {
    let lines = config.map((elem, index) => new Types.Line(index + 1, elem));
    return new Types.Lines(lines);
}

function printMatrix(matrix) {
    let rowNum = matrix[0].length;
    let colNum = matrix.length;
    for (let i = rowNum; i > 0; i--) {
        let newRow = [];
        for (let j = 0; j < colNum; j++) {
            newRow.push(matrix[j][i-1].toString());
        }
        console.log(newRow);
    }
}

function c(x, y) {
    return {x, y};
}

module.exports = {
    calculateLine, buildSymbols, buildReels, buildLines, printMatrix, c
};