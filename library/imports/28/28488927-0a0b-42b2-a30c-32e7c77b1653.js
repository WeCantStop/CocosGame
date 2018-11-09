"use strict";
cc._RF.push(module, '28488knCgtCsqMMMufHexZT', 'xPanel');
// script/xPanel.js

'use strict';

var common = require('./common');
cc.Class({
    extends: cc.Component,

    properties: {
        contentNode: cc.Node,
        femaleContentNode: cc.Node,
        yPanel: cc.Node,
        hairContentNode: cc.Node,
        legContentNode: cc.Node,
        faceContentNode: cc.Node,
        maskContentNode: cc.Node,
        bodyContentNode: cc.Node,
        furnitureContentNode: cc.Node,
        smallFurnitureContentNode: cc.Node,
        scrollView: cc.Node,
        panelNode: cc.Node,
        arrowNode: cc.Node
    },

    initWidth: function initWidth() {
        this.xPanelIcons = this.node.getChildren();
        var aveWidth = this.node.width / this.xPanelIcons.length;
        this.xPanelIcons.forEach(function (icon) {
            icon.width = aveWidth;
        });
    },
    hideAllContent: function hideAllContent() {
        common.hideAllContent();
        this.yPanel.active = false;
    },
    unSelectColor: function unSelectColor() {
        this.node.getChildren().forEach(function (child) {
            child.getChildByName('splash').color = common.setColorFunc(255, 255, 255);
        });
    },
    togglePanelWigdet: function togglePanelWigdet() {
        var panelWidget = this.panelNode.getComponent(cc.Widget);
        var rotateTo = cc.rotateTo(.1, 180, 0);
        var rotateInit = cc.rotateTo(.1, 0, 0);
        panelWidget.enabled = true;
        if (!common.collapsePanel) {
            common.collapsePanel = true;
            panelWidget.bottom = -300;
            this.arrowNode.getChildByName('sprite').runAction(rotateTo);
        } else {
            common.collapsePanel = false;
            panelWidget.bottom = 0;
            this.arrowNode.getChildByName('sprite').runAction(rotateInit);
        };
    },
    tabBarClickListener: function tabBarClickListener(tabBar, contentNodeName) {
        this.node.getChildByName(tabBar).on(cc.Node.EventType.TOUCH_END, function (e) {
            if (e.target.name === 'arrow') {
                this.togglePanelWigdet();
            } else {
                if (common.collapsePanel) this.togglePanelWigdet();
                if (tabBar !== 'man' && tabBar !== 'woman') {
                    this.scrollView.getComponent(cc.ScrollView).content = this[contentNodeName];
                }
                common.removeAllFrame();
                this.hideAllContent();
                common.unSelectorXIcon();
                this[contentNodeName].active = true;
                e.target.getChildByName('splash').color = common.setColorFunc(235, 235, 235);
                common.showContent = this[contentNodeName];
            };
        }, this);
    },
    onLoad: function onLoad() {
        var _this = this;

        this.initWidth();
        common.xPanelData.forEach(function (i) {
            _this.tabBarClickListener(i.nodeName, i.contentNodeName);
        });
    }
});

cc._RF.pop();