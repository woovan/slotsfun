var Utils = require('Utils');

function SlotMachine(config) {
    Object.defineProperties(this, {
        config: {
            value: config,
            writable: false
        }
    });
}

SlotMachine.prototype.spin = function () {
    let reels = this.config.Reels;
    let matrix = reels.map(reel => reel.spin(this.config.RowNum));
    let symbolMatrix = matrix.map(col => {
        return col.map(id => this.config.Symbols.get(id));
    });
    return symbolMatrix;
}

SlotMachine.prototype.calculate = function (matrix) {
    let lines = this.config.Lines;
    let symbolLines = lines.map(line => {
        let lineSymbols = line.coordinates.map(c => matrix[c.x][c.y]);
        lineSymbols.line = line;
        return lineSymbols;
    });
    let winPatterns = [];
    symbolLines.forEach(line => {
        let linePatterns = Utils.calculateLine(line, this.config.PayTable);
        if (linePatterns.length > 0) {
            winPatterns.push(...linePatterns);
        }
    });
    return winPatterns;
}

module.exports = SlotMachine;