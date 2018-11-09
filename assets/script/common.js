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
        },
        {
            nodeName: 'woman',
            contentNodeName: 'femaleContentNode'
        },
        {
            nodeName: 'bed',
            contentNodeName: 'furnitureContentNode'
        },
        {
            nodeName: 'beer',
            contentNodeName: 'smallFurnitureContentNode'
        },
        {
            nodeName: 'arrow',
            contentNodeName: 'contentNode'
        }
    ],
    yPanelData: [{
            nodeName: 'hat',
            contentNodeName: 'hairContentNode'
        },
        {
            nodeName: 'glass',
            contentNodeName: 'maskContentNode'
        },
        {
            nodeName: 'face',
            contentNodeName: 'faceContentNode'
        },
        {
            nodeName: 'body',
            contentNodeName: 'bodyContentNode'
        },
        {
            nodeName: 'leg',
            contentNodeName: 'legContentNode'
        }
    ],

    setColorFunc: function (r, g, b, a) {
        return new cc.Color(r, g, b, a);
    },

    removeAllFrame: function () {
        let personStage = cc.find('Canvas/personSatge');
        let thingStage = cc.find('Canvas/thingStage');
        let personStageNodes = personStage.getChildren();
        let thingStageNodes = thingStage.getChildren();

        personStageNodes.forEach(item => {
            if (item.name === 'defaultMale' || item.name === 'defaultFemale' || item.name === 'largeThing' || item.name === 'smallThing') {
                item.getChildByName('frame').active = false
            }
        });

        thingStageNodes.forEach(item => {
            if (item.name === 'largeThing' || item.name === 'smallThing') {
                item.getChildByName('frame').active = false
            }
        });

        this.selectNode = null;
    },

    hideAllContent: function () {
        let scrollViewNode = cc.find('Canvas/panel/scrollView'),
            views = scrollViewNode.getChildren();
        views.forEach(view => {
            view.getChildByName('content').active = false;
        })
    },

    unSelectorXIcon: function () {
        let yPanel = cc.find('Canvas/panel/x-panel');
        yPanel.getChildren().forEach(child => {
            child.getChildByName('splash').color = this.setColorFunc(255, 255, 255);
        })
    },

    unSelectorYIcon: function () {
        let yPanel = cc.find('Canvas/panel/y-panel');
        yPanel.getChildren().forEach(child => {
            child.getChildByName('splash').color = this.setColorFunc(220, 220, 220);
        })
    },

    selectHairIcon: function () {
        let hatNode = cc.find('Canvas/panel/y-panel/hat');
        hatNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectLargeThing: function () {
        let largeThingNode = cc.find('Canvas/panel/x-panel/bed');
        largeThingNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectSmallThing: function () {
        let smallThingNode = cc.find('Canvas/panel/x-panel/beer');
        smallThingNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    selectDefaultMan: function () {
        let defaultManNode = cc.find('Canvas/panel/x-panel/man');
        defaultManNode.getChildByName('splash').color = this.setColorFunc(235, 235, 235);
    },

    hideYpanel: function () {
        let yPanelNode = cc.find('Canvas/panel/y-panel');
        yPanelNode.active = false;
    }

}