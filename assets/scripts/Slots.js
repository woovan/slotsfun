var math = require('mathjs');
var config = require('config');
var SlotMachine = require('SlotMachine');
var Utils = require('Utils');

cc.Class({
    extends: cc.Component,

    properties: {
        lineNum: {
            default: 30,
            type: 'Integer',
        },
    },
    
    // properties: () => ({
    //     config: require('config')
    // }),

    // use this for initialization
    onLoad: function () {
        this.slot = new SlotMachine(config);
        let matrix = this.slot.spin();
        Utils.printMatrix(matrix);
        let winPatterns = this.slot.calculate(matrix);
        console.log(winPatterns);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
