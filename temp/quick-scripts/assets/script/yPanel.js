(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/script/yPanel.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f3d1zhpt5I0asYvDneL6tx', 'yPanel', __filename);
// script/yPanel.js

'use strict';

var common = require('./common');
cc.Class({
    extends: cc.Component,

    properties: {
        canvasNode: cc.Node,
        contentNode: cc.Node,
        hairContentNode: cc.Node,
        femaleHairContentNode: cc.Node,
        legContentNode: cc.Node,
        faceContentNode: cc.Node,
        femaleFaceContentNode: cc.Node,
        maskContentNode: cc.Node,
        scrollView: cc.Node,
        bodyContentNode: cc.Node
    },

    initHeight: function initHeight() {
        this.yPanelIcons = this.node.getChildren();
        var aveHeight = this.node.height / this.yPanelIcons.length;
        this.yPanelIcons.forEach(function (icon) {
            icon.height = aveHeight;
        });
    },
    unSelectColor: function unSelectColor() {
        this.node.getChildren().forEach(function (child) {
            child.getChildByName('splash').color = common.setColorFunc(220, 220, 220);
        });
    },
    tabBarClickListener: function tabBarClickListener(tabBar, contentNodeName) {
        this.node.getChildByName(tabBar).on(cc.Node.EventType.TOUCH_END, function (e) {
            common.unSelectorYIcon();
            common.hideAllContent();
            if (tabBar === 'face' && common.selectNode && common.selectNode.name === 'defaultFemale') {
                this.femaleFaceContentNode.active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this.femaleFaceContentNode;
            } else if (tabBar === 'hat' && common.selectNode && common.selectNode.name === 'defaultFemale') {
                this.femaleHairContentNode.active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this.femaleHairContentNode;
            } else if (tabBar === 'body') {
                if (!common.initContentFlag.default) {
                    common.initContentFlag.default = true;
                    cc.find('Canvas/itemList').getComponent('itemList').initDefaultBody();
                }
                this.canvasNode.getComponent('main').showCurrentCountry();
            } else {
                this[contentNodeName].active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this[contentNodeName];
            }
            e.target.getChildByName('splash').color = common.setColorFunc(235, 235, 235);
            common.showContent = this[contentNodeName];
        }, this);
    },
    onLoad: function onLoad() {
        var _this = this;

        this.initHeight();
        common.yPanelData.forEach(function (i) {
            _this.tabBarClickListener(i.nodeName, i.contentNodeName);
        });
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
        //# sourceMappingURL=yPanel.js.map
        