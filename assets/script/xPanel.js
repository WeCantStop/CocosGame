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

    initWidth() {
        this.xPanelIcons = this.node.getChildren();
        const aveWidth = this.node.width / this.xPanelIcons.length;
        this.xPanelIcons.forEach(icon => {
            icon.width = aveWidth;
        });
    },

    hideAllContent() {
        common.hideAllContent()
        this.yPanel.active = false;
    },

    unSelectColor() {
        this.node.getChildren().forEach(child => {
            child.getChildByName('splash').color = common.setColorFunc(255, 255, 255);
        });
    },

    togglePanelWigdet() {
        let panelWidget = this.panelNode.getComponent(cc.Widget);
        let rotateTo = cc.rotateTo(.1, 180, 0);
        let rotateInit = cc.rotateTo(.1, 0, 0);
        panelWidget.enabled = true;
        if (!common.collapsePanel) {
            common.collapsePanel = true;
            panelWidget.bottom = -300;
            this.arrowNode.getChildByName('sprite').runAction(rotateTo);
        } else {
            common.collapsePanel = false;
            panelWidget.bottom = 0
            this.arrowNode.getChildByName('sprite').runAction(rotateInit);
        };
    },

    tabBarClickListener(tabBar, contentNodeName) {
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

    onLoad() {
        this.initWidth();
        common.xPanelData.forEach(i => {
            this.tabBarClickListener(i.nodeName, i.contentNodeName);
        });
    }
});
