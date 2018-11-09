"use strict";
cc._RF.push(module, '0261bhxL61ELoQ4x8u7yXnz', 'common');
// script/common.js

'use strict';

// 公共数据和方法
module.exports = {
    selectNode: null,
    selectedCountry: 'default',
    showContent: null,
    personZOrder: 1,
    thingZOrder: 1,
    collapsePanel: false,

    initContentFlag: {
        default: false,

        baxi: false,
        deguo: false,
        faguo: false,
        xibanya: false,
        putaoya: false,
        keluodiya: false,
        bilishi: false,
        agengting: false
    },

    xPanelData: [{
        nodeName: 'man',
        contentNodeName: 'contentNode'
    }, {
        nodeName: 'woman',
        contentNodeName: 'femaleContentNode'
    }, {
        nodeName: 'bed',
        contentNodeName: 'furnitureContentNode'
    }, {
        nodeName: 'beer',
        contentNodeName: 'smallFurnitureContentNode'
    }, {
        nodeName: 'arrow',
        contentNodeName: 'contentNode'
    }],
    yPanelData: [{
        nodeName: 'hat',
        contentNodeName: 'hairContentNode'
    }, {
        nodeName: 'glass',
        contentNodeName: 'maskContentNode'
    }, {
        nodeName: 'face',
        contentNodeName: 'faceContentNode'
    }, {
        nodeName: 'body',
        contentNodeName: 'bodyContentNode'
    }, {
        nodeName: 'leg',
        contentNodeName: 'legContentNode'
    }],

    setColorFunc: function setColorFunc(r, g, b, a) {
        return new cc.Color(r, g, b, a);
    },

    removeAllFrame: function removeAllFrame() {
        var personStage = cc.find('Canvas/personSatge');
        var thingStage = cc.find('Canvas/thingStage');
        var personStageNodes = personStage.getChildren();
        var thingStageNodes = thingStage.getChildren();

        personStageNodes.forEach(function (item) {
            if (item.name === 'defaultMale' || item.name === 'defaultFemale' || item.name === 'largeThing' || item.name === 'smallThing') {
                item.getChildByName('frame').active = false;
            }
        });

        thingStageNodes.forEach(function (item) {
            if (item.name === 'largeThing' || item.name === 'smallThing') {
                item.getChildByName('frame').active = false;
            }
        });

        this.selectNode = null;
    },

    hideAllContent: function hideAllContent() {
        var scrollViewNode = cc.find('Canvas/panel/scrollView'),
            views = scrollViewNode.getChildren();
        views.forEach(function (view) {
            view.getChildByName('content').active = false;
        });
    },

    unSelectorXIcon: function unSelectorXIcon() {
        var _this = this;

        var yPanel = cc.find('Canvas/panel/x-panel');
        yPanel.getChildren().forEach(function (child) {
            child.getChildByName('splash').color = _this.setColorFunc(255, 255, 255);
        });
    },

    unSelectorYIcon: function unSelectorYIcon() {
        var _this2 = this;

        var yPanel = cc.find('Canvas/panel/y-panel');
        yPanel.getChildren().forEach(function (child) {
            child.getChildByName('splash').color = _this2.setColorFunc(220, 220, 220);
        });
    },

    selectHairIcon: function selectHairIcon() {
        var hatNode = cc.find('Canvas/panel/y-panel/hat');
        hatNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectLargeThing: function selectLargeThing() {
        var largeThingNode = cc.find('Canvas/panel/x-panel/bed');
        largeThingNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectSmallThing: function selectSmallThing() {
        var smallThingNode = cc.find('Canvas/panel/x-panel/beer');
        smallThingNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectDefaultMan: function selectDefaultMan() {
        var defaultManNode = cc.find('Canvas/panel/x-panel/man');
        defaultManNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    hideYpanel: function hideYpanel() {
        var yPanelNode = cc.find('Canvas/panel/y-panel');
        yPanelNode.active = false;
    }

};

cc._RF.pop();