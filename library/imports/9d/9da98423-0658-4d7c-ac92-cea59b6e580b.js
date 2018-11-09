"use strict";
cc._RF.push(module, '9da98QjBlhNfKySzqWbblgL', 'defaultPerson');
// script/defaultPerson.js

'use strict';

var common = require('./common');

cc.Class({
    extends: cc.Component,

    properties: {
        closeBtn: cc.Node,
        scaleBtn: cc.Node,
        frameNode: cc.Node,
        initScale: {
            default: 0,
            type: cc.Float
        },
        scaleRadio: {
            default: 5000,
            type: cc.Integer
        },
        minScale: {
            default: 0.6,
            type: cc.Float
        },
        maxScale: {
            default: 1.5,
            type: cc.Float
        }
    },

    // 选中 Node 事件
    handleRootNodeClick: function handleRootNodeClick() {
        this.frameNode.active = true;
        this.node.dispatchEvent(new cc.Event.EventCustom('selectNode', true));
    },

    // 移除 Node事件    
    handleRemoveRootNode: function handleRemoveRootNode() {
        var defaultMaleContent = cc.find('Canvas/panel/scrollView/view-male/content'),
            scrollView = cc.find('Canvas/panel/scrollView');
        common.hideAllContent();
        common.unSelectorXIcon();
        common.selectDefaultMan();
        common.hideYpanel();
        defaultMaleContent.active = true;
        scrollView.getComponent(cc.ScrollView).content = defaultMaleContent;
        this.node.destroy();
    },

    onLoad: function onLoad() {
        this.frameNode.active = false;

        // dragger event
        this.node.on(cc.Node.EventType.TOUCH_START, function (e) {
            this.node.setLocalZOrder(++common.personZOrder);
            this.initScale = e.currentTarget.scaleX;
            var scale = this.initScale + 0.05;
            this.node.setScale(scale);
            this.handleRootNodeClick();
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            if (e.target === 'scale-btn') {
                return false;
            }
            var delta = e.touch.getDelta();
            this.x += delta.x;
            this.y += delta.y;
        }, this.node);

        this.node.on(cc.Node.EventType.TOUCH_END, function (e) {
            this.node.setScale(this.initScale);
        }, this);

        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            this.node.setScale(this.initScale);
        }, this);

        // scale event
        this.scaleBtn.on(cc.Node.EventType.TOUCH_START, function (e) {
            e.stopPropagation();
        }, this.node);

        this.scaleBtn.on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            e.stopPropagation();
            var scaleRate = (1 - e.getStartLocation().y + e.getLocation().y) / this.scaleRadio;
            this.initScale = scaleRate + this.initScale;
            this.initScale = this.initScale < this.minScale ? this.minScale : this.initScale;
            // this.initScale = this.initScale > this.maxScale ? this.maxScale : this.initScale;
            this.node.setScale(this.initScale);
        }, this);

        this.scaleBtn.on(cc.Node.EventType.TOUCH_END, function (e) {
            e.stopPropagation();
        }, this);

        this.scaleBtn.on(cc.Node.EventType.TOUCH_CANCEL, function (e) {
            e.stopPropagation();
        }, this);
    },
    update: function update(dt) {}
});

cc._RF.pop();