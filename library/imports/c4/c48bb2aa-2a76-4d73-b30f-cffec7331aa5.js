"use strict";
cc._RF.push(module, 'c48bbKqKnZNc7MPz/7HMxql', 'itemList');
// script/itemList.js

'use strict';

var _properties, _cc$Class;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var common = require('./common');
// 拿数据的 ItemList
var Item = cc.Class({
    name: 'Item',
    properties: {
        id: 0,
        imageSprite: cc.SpriteFrame
    }
});

cc.Class((_cc$Class = {
    extends: cc.Component,

    properties: (_properties = {
        items: {
            default: [],
            type: Item
        },
        canvasNode: cc.Node,
        largeThingPrefab: cc.Prefab,
        largeThingPanelPrefab: cc.Prefab,
        smallThingPrefab: cc.Prefab,
        smallThingPanelPrefab: cc.Prefab,
        itemPrefab: cc.Prefab,
        contentNode: cc.Node,
        scrollView: cc.Node,
        hairContentNode: cc.Node,
        femaleHairContentNode: cc.Node,
        legContentNode: cc.Node,
        faceContentNode: cc.Node,
        femaleFaceContentNode: cc.Node,
        maskContentNode: cc.Node,
        bodyContentNode: cc.Node,
        furnitureContentNode: cc.Node,
        smallFurnitureContentNode: cc.Node,
        defaultBodyContentNode: cc.Node,

        agengtingContentNode: cc.Node
    }, _defineProperty(_properties, 'defaultBodyContentNode', cc.Node), _defineProperty(_properties, 'bilishiContentNode', cc.Node), _defineProperty(_properties, 'baxiContentNode', cc.Node), _defineProperty(_properties, 'deguoContentNode', cc.Node), _defineProperty(_properties, 'faguoContentNode', cc.Node), _defineProperty(_properties, 'wulaguiContentNode', cc.Node), _defineProperty(_properties, 'putaoyaContentNode', cc.Node), _defineProperty(_properties, 'keluodiyaContentNode', cc.Node), _defineProperty(_properties, 'xibanyaContentNode', cc.Node), _defineProperty(_properties, 'spacing', 0), _properties),

    initContentBase: function initContentBase(path, node, spacing, touchFunc, thingType) {
        var self = this;

        var view = this[node].parent,
            loadingContent = void 0,
            loadingBall = void 0,
            countryNode = void 0;

        // 显示loading动画
        if (view.children.length > 1) {
            loadingContent = view.getChildByName('loading');
            loadingBall = loadingContent.getChildByName('loadingBall');
            countryNode = this[node].getChildByName('country');

            var rotateAction = cc.repeatForever(cc.rotateBy(1, 360));
            loadingContent.active = true;
            this[node].active = false;
            countryNode.active = false;
            loadingBall.runAction(rotateAction);
        }

        cc.loader.loadResDir(path, cc.SpriteFrame, function (err, SpriteFrame) {
            self[node].height = SpriteFrame.length * (spacing + self.spacing) + self.spacing;
            for (var i = 0; i < SpriteFrame.length; i++) {
                var item = void 0;
                if (thingType && thingType === 'large') {
                    item = cc.instantiate(self.largeThingPanelPrefab);
                } else if (thingType && thingType === 'small') {
                    item = cc.instantiate(self.smallThingPanelPrefab);
                } else {
                    item = cc.instantiate(self.itemPrefab);
                }
                self[node].addChild(item);
                item.getComponent('itemTemplate').init({
                    id: i + 1,
                    imageSprite: SpriteFrame[i]
                });

                item.on('touchend', touchFunc);
            }

            // 隐藏Loading动画
            if (loadingBall) {
                loadingContent.active = false;
                self[node].active = true;
                countryNode.active = true;
            }
        });
    },
    initDefaultBody: function initDefaultBody() {
        this.initContentBase('image/team-clothes/default', 'defaultBodyContentNode', 65, this.selectBody);
    },
    initBaxi: function initBaxi() {
        this.initContentBase('image/team-clothes/baxi', 'baxiContentNode', 65, this.selectBody);
    },
    initAgengting: function initAgengting() {
        this.initContentBase('image/team-clothes/agengting', 'agengtingContentNode', 65, this.selectBody);
    },
    initDeguo: function initDeguo() {
        this.initContentBase('image/team-clothes/deguo', 'deguoContentNode', 65, this.selectBody);
    },
    initFaguo: function initFaguo() {
        this.initContentBase('image/team-clothes/faguo', 'faguoContentNode', 65, this.selectBody);
    },
    initKeluodiya: function initKeluodiya() {
        this.initContentBase('image/team-clothes/keluodiya', 'keluodiyaContentNode', 65, this.selectBody);
    },
    initXibanya: function initXibanya() {
        this.initContentBase('image/team-clothes/xibanya', 'xibanyaContentNode', 65, this.selectBody);
    },
    initBilishi: function initBilishi() {
        this.initContentBase('image/team-clothes/bilishi', 'bilishiContentNode', 65, this.selectBody);
    },
    initPutaoya: function initPutaoya() {
        this.initContentBase('image/team-clothes/putaoya', 'putaoyaContentNode', 65, this.selectBody);
    },
    onLoad: function onLoad() {
        this.initContentBase('image/male/hair', 'hairContentNode', 70, this.selectHair);
        this.initContentBase('image/female/hair', 'femaleHairContentNode', 62, this.selectHair);
        this.initContentBase('image/leg', 'legContentNode', 60, this.selectLeg);
        this.initContentBase('image/male/face', 'faceContentNode', 52, this.selectFace);
        this.initContentBase('image/female/face', 'femaleFaceContentNode', 52, this.selectFace);
        this.initContentBase('image/mask', 'maskContentNode', 45, this.selectMask);

        this.initContentBase('image/large-things', 'furnitureContentNode', 72, this.selectFurniture, 'large');
        this.initContentBase('image/small-things', 'smallFurnitureContentNode', 64, this.selectFurniture, 'small');
    },
    selectLeg: function selectLeg() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('leg').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },
    selectBody: function selectBody() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('body').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },
    selectFace: function selectFace() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('face').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },
    selectHair: function selectHair() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('hair').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },
    selectMask: function selectMask() {
        if (!common.selectNode) return false;
        var selectMask = this.getComponent(cc.Sprite).spriteFrame,
            prevMask = common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame;
        if (selectMask === prevMask) {
            common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame = null;
        } else {
            common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
        }
    }
}, _defineProperty(_cc$Class, 'selectBody', function selectBody() {
    if (!common.selectNode) return false;
    common.selectNode.getChildByName('body').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
}), _defineProperty(_cc$Class, 'selectFurniture', function selectFurniture(e) {
    var itemListScript = cc.find('Canvas/itemList').getComponent('itemList');
    var targetSpriteFrame = e.target.getComponent(cc.Sprite).spriteFrame;

    var canvasNode = cc.find('Canvas'),
        stageNode = cc.find('Canvas/personSatge'),
        thingStageNode = cc.find('Canvas/thingStage'),
        newFurnitrue = void 0;

    if (e.target.name === 'smallThingPanelPrefab') {
        newFurnitrue = cc.instantiate(itemListScript.smallThingPrefab);
    } else {
        newFurnitrue = cc.instantiate(itemListScript.largeThingPrefab);
    }
    newFurnitrue.setPosition(canvasNode.width / 30 + cc.random0To1() * 40 - 20, canvasNode.height / 10 + cc.random0To1() * 40 - 10);
    newFurnitrue.getComponent(cc.Sprite).spriteFrame = targetSpriteFrame;
    // 控制尺寸
    if (e.target.name === 'smallThingPanelPrefab') {
        newFurnitrue.setScale(0.5);
    } else {
        newFurnitrue.setScale(0.5);
    }

    // 放置的位置 (窗户, 洞，挂画)
    if (targetSpriteFrame.name.indexOf('-back') > 0) {
        newFurnitrue.setLocalZOrder(++common.thingZOrder);
        thingStageNode.addChild(newFurnitrue);
    } else {
        newFurnitrue.setLocalZOrder(++common.personZOrder);
        stageNode.addChild(newFurnitrue);
    }

    newFurnitrue.getChildByName('frame').active = true;
    newFurnitrue.on(cc.Node.EventType.TOUCH_START, function (e) {
        newFurnitrue.setLocalZOrder(++common.personZOrder);
        newFurnitrue.initScale = e.currentTarget.scaleX;
        var scale = newFurnitrue.initScale + 0.05;
        newFurnitrue.setScale(scale);
        newFurnitrue.dispatchEvent(new cc.Event.EventCustom('selectNode', true));
        newFurnitrue.getChildByName('frame').active = true;
    }, this);

    newFurnitrue.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
        if (e.target === 'scale-btn') {
            return false;
        }
        var delta = e.touch.getDelta();
        this.x += delta.x;
        this.y += delta.y;
    }, this.node);

    newFurnitrue.on(cc.Node.EventType.TOUCH_END, function (e) {
        newFurnitrue.setScale(newFurnitrue.initScale);
    }, this);

    newFurnitrue.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
        this.node.setScale(newFurnitrue.initScale);
    }, this);

    // scale event
    newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_START, function (e) {
        e.stopPropagation();
    }, this.node);

    newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_MOVE, function (e) {
        e.stopPropagation();
        var rootNodeName = e.target._parent._parent,
            maxScale = void 0,
            minScale = void 0;
        var scaleRate = (1 - e.getStartLocation().y + e.getLocation().y) / 5000;
        newFurnitrue.initScale = scaleRate + newFurnitrue.scaleY;

        // 大物品 和小物品 的最大尺寸和最小尺寸不一样
        if (rootNodeName.name === 'smallThing') {
            maxScale = 1;
            minScale = 0.3;
        } else {
            maxScale = 1;
            minScale = 0.3;
        }
        newFurnitrue.initScale = newFurnitrue.initScale < minScale ? minScale : newFurnitrue.initScale;
        // newFurnitrue.initScale = newFurnitrue.initScale > maxScale ? maxScale : newFurnitrue.initScale;
        newFurnitrue.setScale(newFurnitrue.initScale);

        // 按钮缩放
        var scaleBtn = newFurnitrue.getChildByName('frame').getChildByName('scale-btn');
        var closeBtn = newFurnitrue.getChildByName('frame').getChildByName('close-btn');

        var result = scaleBtn.scaleY * (1 - scaleRate / newFurnitrue.initScale);
        if (result < 1) {
            result = 1;
        } else if (result > 1.5) {
            result = 1.5;
        }
        // cc.log(result);

        scaleBtn.setScale(result);
        closeBtn.setScale(result);
    }, this);

    newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_END, function (e) {
        e.stopPropagation();
    }, this);

    newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
        e.stopPropagation();
    }, this);

    newFurnitrue.getChildByName('frame').getChildByName('close-btn').on(cc.Node.EventType.TOUCH_END, function (e) {
        e.stopPropagation();
        newFurnitrue.destroy();
    }, this);

    newFurnitrue.dispatchEvent(new cc.Event.EventCustom('selectNode', true));
}), _cc$Class));

cc._RF.pop();