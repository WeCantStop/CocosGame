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

    initHeight() {
        this.yPanelIcons = this.node.getChildren();
        const aveHeight = this.node.height / this.yPanelIcons.length;
        this.yPanelIcons.forEach(icon => {
            icon.height = aveHeight;
        });
    },

    unSelectColor() {
        this.node.getChildren().forEach(child => {
            child.getChildByName('splash').color = common.setColorFunc(220, 220, 220);
        })
    },

    tabBarClickListener(tabBar, contentNodeName) {
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
            }
            else {
                this[contentNodeName].active = true;
                this.scrollView.getComponent(cc.ScrollView).content = this[contentNodeName];
            }
            e.target.getChildByName('splash').color = common.setColorFunc(235, 235, 235);
            common.showContent = this[contentNodeName];
        }, this);
    },

    onLoad() {
        this.initHeight();
        common.yPanelData.forEach(i => {
            this.tabBarClickListener(i.nodeName, i.contentNodeName);
        })
    }
});
