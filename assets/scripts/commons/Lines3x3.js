var Utils = require('Utils');
var c = Utils.c;

const Lines = Utils.buildLines([
    [c(0, 1), c(1, 1), c(2, 1)],
    [c(0, 2), c(1, 2), c(2, 2)],
    [c(0, 0), c(1, 0), c(2, 0)],
    [c(0, 2), c(1, 1), c(2, 0)],
    [c(0, 0), c(1, 1), c(2, 2)],
    [c(0, 2), c(1, 1), c(2, 2)],
    [c(0, 0), c(1, 1), c(2, 0)],
    [c(0, 1), c(1, 2), c(2, 1)],
    [c(0, 1), c(1, 0), c(2, 1)]
]);

module.exports = Lines;