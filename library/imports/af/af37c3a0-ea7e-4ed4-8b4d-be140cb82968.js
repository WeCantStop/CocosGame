"use strict";
cc._RF.push(module, 'af37cOg6n5O1ItNvhQMuClo', 'itemTemplate');
// script/itemTemplate.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        id: 0,
        imageSprite: cc.SpriteFrame
    },

    init: function init(data) {
        this.id = data.id;
        this.imageSprite = data.imageSprite;

        this.node.getComponent(cc.Sprite).spriteFrame = data.imageSprite;
    }
});

cc._RF.pop();