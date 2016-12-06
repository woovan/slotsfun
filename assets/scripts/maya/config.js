var Utils = require('Utils');
var Types = require('Types');
var Type = Types.SymbolType;

const RowNum = 3;
const LineType = Types.LineType.Normal;
const FreeSpinTrigger = Types.Trigger.Scatter;
const BonusTrigger = Types.Trigger.Payline;

const Lines = require('Lines3x5').num(30);

const Symbols = Utils.buildSymbols([
    ...new Array(10).fill(Type.Normal),
    Type.Wild,
    Type.FreeSpin,
    Type.Bonus
]);

const Reels = Utils.buildReels([
    [1, 2, 3, 4, 5, 6, 1, 7, 1, 2, 3, 11, 4, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 11, 5, 6, 7, 11, 1, 2, 3, 1,4, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 11, 6, 7, 1, 2, 3, 4, 11, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 8, 9, 10, 11, 12, 13],
    [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 8, 9, 10, 11, 12, 13]
]);

const PayTable = new Types.PayTable([
    {3 : 100, 4 : 300, 5 : 1000},
    {3 : 50, 4 : 150, 5 : 500},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20},
    {3 : 1, 4 : 5, 5 : 20}
]);

module.exports = {
    RowNum, Lines, Reels, Symbols, PayTable
};