const common = require('./common');
// 拿数据的 ItemList
var Item = cc.Class({
    name: 'Item',
    properties: {
        id: 0,
        imageSprite: cc.SpriteFrame
    }
});

cc.Class({
    extends: cc.Component,

    properties: {
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

        agengtingContentNode: cc.Node,
        defaultBodyContentNode: cc.Node,
        bilishiContentNode: cc.Node,
        baxiContentNode: cc.Node,
        deguoContentNode: cc.Node,
        faguoContentNode: cc.Node,
        wulaguiContentNode: cc.Node,
        putaoyaContentNode: cc.Node,
        keluodiyaContentNode: cc.Node,
        xibanyaContentNode: cc.Node,
        spacing: 0
    },

    initContentBase(path, node, spacing, touchFunc, thingType) {
        var self = this;

        let view = this[node].parent,
            loadingContent,
            loadingBall,
            countryNode;

        // 显示loading动画
        if (view.children.length > 1) {
            loadingContent = view.getChildByName('loading');
            loadingBall = loadingContent.getChildByName('loadingBall');
            countryNode = this[node].getChildByName('country');

            let rotateAction = cc.repeatForever(cc.rotateBy(1, 360));
            loadingContent.active = true;
            this[node].active = false;
            countryNode.active = false;
            loadingBall.runAction(rotateAction);
        }

        cc.loader.loadResDir(path, cc.SpriteFrame, function (err, SpriteFrame) {
            self[node].height = SpriteFrame.length * (spacing + self.spacing) + self.spacing;
            for (let i = 0; i < SpriteFrame.length; i++) {
                let item;
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

                item.on('touchend', touchFunc)
            }

            // 隐藏Loading动画
            if (loadingBall) {
                loadingContent.active = false;
                self[node].active = true;
                countryNode.active = true;
            }
        })
    },

    initDefaultBody() {
        this.initContentBase('image/team-clothes/default', 'defaultBodyContentNode', 65, this.selectBody);
    },

    initBaxi() {
        this.initContentBase('image/team-clothes/baxi', 'baxiContentNode', 65, this.selectBody);
    },

    initAgengting() {
        this.initContentBase('image/team-clothes/agengting', 'agengtingContentNode', 65, this.selectBody);
    },

    initDeguo() {
        this.initContentBase('image/team-clothes/deguo', 'deguoContentNode', 65, this.selectBody);
    },

    initFaguo() {
        this.initContentBase('image/team-clothes/faguo', 'faguoContentNode', 65, this.selectBody);
    },

    initKeluodiya() {
        this.initContentBase('image/team-clothes/keluodiya', 'keluodiyaContentNode', 65, this.selectBody);
    },

    initXibanya() {
        this.initContentBase('image/team-clothes/xibanya', 'xibanyaContentNode', 65, this.selectBody);
    },

    initBilishi() {
        this.initContentBase('image/team-clothes/bilishi', 'bilishiContentNode', 65, this.selectBody);
    },

    initPutaoya() {
        this.initContentBase('image/team-clothes/putaoya', 'putaoyaContentNode', 65, this.selectBody);
    },


    onLoad() {
        this.initContentBase('image/male/hair', 'hairContentNode', 70, this.selectHair);
        this.initContentBase('image/female/hair', 'femaleHairContentNode', 62, this.selectHair);
        this.initContentBase('image/leg', 'legContentNode', 60, this.selectLeg);
        this.initContentBase('image/male/face', 'faceContentNode', 52, this.selectFace);
        this.initContentBase('image/female/face', 'femaleFaceContentNode', 52, this.selectFace);
        this.initContentBase('image/mask', 'maskContentNode', 45, this.selectMask);

        this.initContentBase('image/large-things', 'furnitureContentNode', 72, this.selectFurniture, 'large');
        this.initContentBase('image/small-things', 'smallFurnitureContentNode', 64, this.selectFurniture, 'small');
    },

    selectLeg() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('leg').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },

    selectBody() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('body').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },

    selectFace() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('face').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },

    selectHair() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('hair').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },

    selectMask() {
        if (!common.selectNode) return false;
        let selectMask = this.getComponent(cc.Sprite).spriteFrame,
            prevMask = common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame;
        if (selectMask === prevMask) {
            common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame = null;
        } else {
            common.selectNode.getChildByName('mask').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
        }
    },

    selectBody() {
        if (!common.selectNode) return false;
        common.selectNode.getChildByName('body').getComponent(cc.Sprite).spriteFrame = this.getComponent(cc.Sprite).spriteFrame;
    },

    selectFurniture(e) {
        let itemListScript = cc.find('Canvas/itemList').getComponent('itemList');
        let targetSpriteFrame = e.target.getComponent(cc.Sprite).spriteFrame;

        let canvasNode = cc.find('Canvas'),
            stageNode = cc.find('Canvas/personSatge'),
            thingStageNode = cc.find('Canvas/thingStage'),
            newFurnitrue;

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

        }, this)

        newFurnitrue.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            if (e.target === 'scale-btn') {
                return false;
            }
            let delta = e.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }, this.node)

        newFurnitrue.on(cc.Node.EventType.TOUCH_END, function (e) {
            newFurnitrue.setScale(newFurnitrue.initScale);
        }, this)

        newFurnitrue.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.node.setScale(newFurnitrue.initScale);
        }, this)

        // scale event
        newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        }, this.node)

        newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            e.stopPropagation();
            let rootNodeName = e.target._parent._parent,
                maxScale, minScale;
            let scaleRate = (1 - e.getStartLocation().y + e.getLocation().y) / 5000;
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
            let scaleBtn = newFurnitrue.getChildByName('frame').getChildByName('scale-btn');
            let closeBtn = newFurnitrue.getChildByName('frame').getChildByName('close-btn');

            let result = scaleBtn.scaleY * (1 - scaleRate / newFurnitrue.initScale);
            if (result < 1) {
                result = 1;
            } else if (result > 1.5) {
                result = 1.5;
            }
            // cc.log(result);

            scaleBtn.setScale(result);
            closeBtn.setScale(result);

        }, this)

        newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_END, function (e) {
            e.stopPropagation();
        }, this)

        newFurnitrue.getChildByName('frame').getChildByName('scale-btn').on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            e.stopPropagation();
        }, this)

        newFurnitrue.getChildByName('frame').getChildByName('close-btn').on(cc.Node.EventType.TOUCH_END, function (e) {
            e.stopPropagation();
            newFurnitrue.destroy();
        }, this)

        newFurnitrue.dispatchEvent(new cc.Event.EventCustom('selectNode', true));
    },

});
