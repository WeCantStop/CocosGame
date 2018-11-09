"use strict";
cc._RF.push(module, 'b1670MwpNRKDrp0SLY4tDuO', 'main');
// script/main.js

'use strict';

var common = require('./common');
cc.Class({
    extends: cc.Component,

    properties: {
        panelNode: cc.Node,
        cameraNode: cc.Node,
        yPanel: cc.Node,
        defaultManContentNode: cc.Node,
        hairContentNode: cc.Node,
        femaleHairContentNode: cc.Node,
        largeThingContentNode: cc.Node,
        smallThingContentNode: cc.Node,
        QRNode: cc.Node,
        scrollView: cc.Node,

        countrysNode: cc.Node,
        default: cc.Node,
        baxi: cc.Node,
        deguo: cc.Node,
        faguo: cc.Node,
        agengting: cc.Node,
        wulagui: cc.Node,
        putaoya: cc.Node,
        keluodiya: cc.Node,
        bilishi: cc.Node,
        xibanya: cc.Node,

        stageNode: cc.Node,
        malePrefab: cc.Prefab,
        malePrefab2: cc.Prefab,
        malePrefab3: cc.Prefab,
        femalePrefab: cc.Prefab,
        femalePrefab2: cc.Prefab,
        femalePrefab3: cc.Prefab
    },

    handlePhoto: function handlePhoto() {
        var self = this;
        // 隐藏相关元素
        this.panelNode.active = false;
        this.cameraNode.active = false;
        common.removeAllFrame();

        // let QRAction = cc.moveBy(0.6, 0, 210).easing(cc.easeIn(3.0));
        var QRAction = cc.fadeIn(1.0);
        var callback = cc.callFunc(function () {
            self.getImage();
        });

        this.QRNode.runAction(cc.sequence(QRAction, callback));
    },
    getImage: function getImage() {
        var _this = this;

        // 截图方案一 (有闪屏)
        document.getElementById('Cocos2dGameContainer').style.background = '#FFF';
        var canvasNode = document.getElementById("GameCanvas");
        canvasNode.style.display = 'none';
        setTimeout(function () {
            var base64 = canvasNode.toDataURL("image/png");
            var canvas = cc.find("Canvas").getComponent(cc.Canvas);
            var vsbSize = cc.view.getVisibleSize();
            var designSize = canvas.designResolution;
            var scaleW = vsbSize.width / designSize.width;
            var scaleH = vsbSize.height / designSize.height;
            var fitScale = Math.min(scaleW, scaleH);
            var gameDiv = document.getElementById('Cocos2dGameContainer');
            var bigImg = document.createElement("img");
            bigImg.id = 'share';
            bigImg.src = base64;
            bigImg.alt = 'shareImg';
            bigImg.width = parseInt(gameDiv.style.width.replace(/px/, '')) * fitScale;
            bigImg.height = parseInt(gameDiv.style.height.replace(/px/, '')) * fitScale;
            bigImg.style.position = 'absolute';
            bigImg.style.top = "0px";
            bigImg.style.left = parseInt(gameDiv.style.width.replace(/px/, '')) / 2 - bigImg.width / 2 + "px";
            gameDiv.appendChild(bigImg);
            // 截完图片 触发事件
            PubSub.publish('MAKE_IMG_SUCCESS', base64);
        }, 1);
    },
    modify: function modify() {
        var _this2 = this;

        PubSub.subscribe('MAKE_IMG_MODIFY', function () {
            _this2.panelNode.active = true;
            _this2.cameraNode.active = true;
            var QRAction = cc.fadeOut(1.0);
            _this2.QRNode.runAction(QRAction);
        });
    },


    // 选择的节点
    selectNodeListener: function selectNodeListener() {
        this.node.on('selectNode', function (event) {
            this.selectNode = event.target;
            // 选择 男性 女性 物品(大小)
            if (this.selectNode.name === 'defaultMale') {
                // 男性
                if (common.selectNode && common.selectNode.name === 'defaultMale') {
                    common.removeAllFrame();
                    event.target.getChildByName('frame').active = true;
                } else {
                    common.removeAllFrame();
                    event.target.getChildByName('frame').active = true;
                    this.yPanel.active = true;
                    common.hideAllContent();
                    this.hairContentNode.active = true;
                    this.scrollView.getComponent(cc.ScrollView).content = this.hairContentNode;
                    common.unSelectorYIcon();
                    common.unSelectorXIcon();
                    common.selectHairIcon();
                }
            } else if (this.selectNode.name === 'defaultFemale') {
                // 女性
                if (common.selectNode && common.selectNode.name === 'defaultFemale') {
                    common.removeAllFrame();
                    event.target.getChildByName('frame').active = true;
                } else {
                    common.removeAllFrame();
                    event.target.getChildByName('frame').active = true;
                    this.yPanel.active = true;
                    common.hideAllContent();
                    this.femaleHairContentNode.active = true;
                    this.scrollView.getComponent(cc.ScrollView).content = this.femaleHairContentNode;
                    common.unSelectorYIcon();
                    common.unSelectorXIcon();
                    common.selectHairIcon();
                }
            } else if (this.selectNode.name === 'largeThing') {
                common.removeAllFrame();
                event.target.getChildByName('frame').active = true;
                this.yPanel.active = false;
                common.unSelectorXIcon();
                common.selectLargeThing();
                common.hideAllContent();
                this.largeThingContentNode.active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this.largeThingContentNode;
            } else {
                common.removeAllFrame();
                event.target.getChildByName('frame').active = true;
                this.yPanel.active = false;
                common.unSelectorXIcon();
                common.selectSmallThing();
                common.hideAllContent();
                this.smallThingContentNode.active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this.smallThingContentNode;
            }
            common.selectNode = this.selectNode;
        }, this);
    },

    showCurrentCountry: function showCurrentCountry() {
        common.hideAllContent();
        this[common.selectedCountry].active = true;
        this.scrollView.getComponent(cc.ScrollView).content = this[common.selectedCountry];
    },
    showCountry: function showCountry() {
        common.hideAllContent();
        this.countrysNode.active = true;
        this.scrollView.getComponent(cc.ScrollView).content = this.countrysNode;
    },
    selectCountry: function selectCountry(e, country) {
        switch (country) {
            case 'baxi':
                {
                    if (!common.initContentFlag.baxi) {
                        common.initContentFlag.baxi = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initBaxi();
                    }
                }
                break;
            case 'agengting':
                {
                    if (!common.initContentFlag.agengting) {
                        common.initContentFlag.agengting = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initAgengting();
                    }
                }
                break;
            case 'deguo':
                {
                    if (!common.initContentFlag.deguo) {
                        common.initContentFlag.deguo = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initDeguo();
                    }
                }
                break;
            case 'faguo':
                {
                    if (!common.initContentFlag.faguo) {
                        common.initContentFlag.faguo = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initFaguo();
                    }
                }
                break;
            case 'keluodiya':
                {
                    if (!common.initContentFlag.keluodiya) {
                        common.initContentFlag.keluodiya = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initKeluodiya();
                    }
                }
                break;
            case 'xibanya':
                {
                    if (!common.initContentFlag.xibanya) {
                        common.initContentFlag.xibanya = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initXibanya();
                    }
                }
                break;
            case 'bilishi':
                {
                    if (!common.initContentFlag.bilishi) {
                        common.initContentFlag.bilishi = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initBilishi();
                    }
                }
                break;
            case 'putaoya':
                {
                    if (!common.initContentFlag.putaoya) {
                        common.initContentFlag.putaoya = true;
                        cc.find('Canvas/itemList').getComponent('itemList').initPutaoya();
                    }
                }
                break;
        }
        common.selectedCountry = country;
        this.showCurrentCountry();
    },


    // 创建人物
    createNewPerson: function createNewPerson(e, type) {

        var prefabType = void 0;

        switch (type) {
            case 'male-01':
                prefabType = this.malePrefab;break;
            case 'male-02':
                prefabType = this.malePrefab2;break;
            case 'male-03':
                prefabType = this.malePrefab3;break;
            case 'female-01':
                prefabType = this.femalePrefab;break;
            case 'female-02':
                prefabType = this.femalePrefab2;break;
            case 'female-03':
                prefabType = this.femalePrefab3;break;
        }

        var newPerson = cc.instantiate(prefabType);
        // 替换物品
        // this.replaceClothes(newPerson, type);
        newPerson.setPosition(this.node.width / 30 + cc.random0To1() * 40 - 20, this.node.height / 10 + cc.random0To1() * 40 - 10);
        this.stageNode.addChild(newPerson);
        newPerson.setLocalZOrder(++common.personZOrder);
        common.removeAllFrame();
        newPerson.dispatchEvent(new cc.Event.EventCustom('selectNode', true));
    },
    onLoad: function onLoad() {
        // 样式上默认选中 male
        common.selectDefaultMan();

        this.selectNodeListener();
        // 监听移除frame
        this.node.getChildByName('background').on(cc.Node.EventType.TOUCH_END, function () {
            common.removeAllFrame();
            common.unSelectorXIcon();
            common.selectDefaultMan();
            common.hideAllContent();
            common.hideYpanel();
            this.defaultManContentNode.active = true;
            // this.scrollView.getComponent(cc.ScrollView).content = this.defaultManContentNode;
        }, this);

        // 监听重新编辑按钮点击
        // this.modify();

        this.countrysNode.children.forEach(function (country, index) {
            country.children[0].color = common.setColorFunc(0, 0, 0);
        });
    }
});

cc._RF.pop();