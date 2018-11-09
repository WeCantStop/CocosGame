(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/itemTemplate.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'af37cOg6n5O1ItNvhQMuClo', 'itemTemplate', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=itemTemplate.js.map
        