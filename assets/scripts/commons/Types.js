var math = require('mathjs');

var SymbolType = cc.Enum({
    Normal: -1,
    Wild: -1,
    FreeSpin: -1,
    Bonus: -1,
});

var LineType = cc.Enum({
    Normal: -1,
    BothSide: -1,
});

var LineSide = cc.Enum({
    Left: -1,
    Right: -1,
});

var Trigger = cc.Enum({
    Scatter: -1,
    Payline: -1,
});

function Symbol(id, type) {
    Object.defineProperties(this, {
        id: {
            value: id,
            writable: false
        },
        type: {
            value: type,
            writable: false
        }
    });
}

Symbol.prototype.toString = function() {
    let value;
    if (this.type > SymbolType.Normal) {
        value = SymbolType[this.type][0];
    } else {
        value = this.id.toString();
    }
    return value;
}

function Symbols(symbols) {
    Object.defineProperties(this, {
        symbols: {
            value: symbols,
            writable: false
        }
    });
}

Symbols.prototype.get = function(symbolId) {
    return this.symbols[symbolId - 1];
}

function Reel(id, symbols) {
    Object.defineProperties(this, {
        id: {
            value: id,
            writable: false
        },
        symbols: {
            value: symbols,
            writable: false
        },
        length: {
            get: function() {
                return this.symbols.length;
            }
        }
    });
}

Reel.prototype.spin = function(rowNum = 3) {
    let length = this.length;
    let index = math.randomInt(length);
    let endIndex = index + rowNum;
    if (endIndex > length) {
        return this.symbols.slice(index).concat(this.symbols.slice(0, endIndex - length));
    }
    return this.symbols.slice(index, endIndex);
}

function Line(id, coordinates) {
    Object.defineProperties(this, {
        id: {
            value: id,
            writable: false
        },
        coordinates: {
            value: coordinates,
            writable: false
        },
        length: {
            get: function() {
                return this.coordinates.length;
            }
        }
    });
}

function Lines(lines) {
    Object.defineProperties(this, {
        lines: {
            value: lines,
            writable: false
        }
    });
}

Lines.prototype.num = function(lineNum) {
    return this.lines.slice(0, lineNum);
}

function PayTable(config) {
    Object.defineProperties(this, {
        payouts: {
            value: config,
            writable: false
        }
    });
}

PayTable.prototype.getMultiple = function(symbolId, count) {
    return this.payouts[symbolId - 1][count];
}

PayTable.prototype.getMinCount = function(symbolId) {
    let payout = this.payouts[symbolId - 1];
    return Number(Object.keys(payout)[0]);
}

function LinePattern(line, symbol, count, multiple, winCoordinates) {
    Object.defineProperties(this, {
        line: {
            value: line,
            writable: false
        },
        symbol: {
            value: symbol,
            writable: false
        },
        count: {
            value: count,
            writable: false
        },
        multiple: {
            value: multiple,
            writable: false
        },
        winCoordinates: {
            value: winCoordinates,
            writable: false
        }
    });
}

LinePattern.prototype.compareTo = function(other) {
    if (!other) {
        return 1;
    }
    return this.multiple > other.multiple ? 1 : -1;
}

module.exports = {
    SymbolType, LineType, LineSide, Trigger, Symbol, Symbols, Reel, Line, Lines, PayTable, LinePattern
};