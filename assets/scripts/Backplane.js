cc.Class({
    extends: cc.Component,

    properties: {
        vertical: {
            default: null,
            type: cc.SpriteFrame
        },
        leftBorder: 0,
        rightBorder: 0,
        reelCount: 5
    },

    onLoad: function () {
        let lineCount = this.reelCount - 1;
        let lineWidth = this.vertical.getOriginalSize().width;
        let planeWidth = this.node.width - this.leftBorder - this.rightBorder;
        let lineSpacing = planeWidth/this.reelCount - lineWidth/2;
        console.log('lineWidth:' + lineWidth);
        console.log('planeWidth:' + planeWidth);
        console.log('lineSpacing:' + lineSpacing);
        
        for (let i = 0; i < lineCount; i++) {
            let node = new cc.Node('vertical' + i);
            let sp = node.addComponent(cc.Sprite);

            sp.spriteFrame = this.vertical;
            node.parent = this.node;
            let x = this.leftBorder + lineSpacing * (i + 1);
            node.setPosition(x, 0);
        }
    },

});
