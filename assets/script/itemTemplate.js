
cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        imageSprite: cc.SpriteFrame
    },

    init(data) {
        this.id = data.id;
        this.imageSprite = data.imageSprite;

        this.node.getComponent(cc.Sprite).spriteFrame = data.imageSprite;
    }
});
