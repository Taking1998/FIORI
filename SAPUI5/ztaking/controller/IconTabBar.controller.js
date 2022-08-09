sap.ui.define(
  [
    "ztaking/controller/BaseController",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
  ],
  function (BaseController, ObjectListItem, ObjectAttribute) {
    "use strict";

    BaseController.extend("ztaking.controller.IconTabBar", {
      onInit: function () {
        let oRouter = this.getRouter().getRoute("iconTabBar");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        let oModel = this.getView().getModel();
        oModel.read("/Meetups", {
          success: function (oData) {
            console.log(oData);
          },
        });
      },

      onInputSubmit: function (oEvent) {
        console.log(oEvent.getSource());
        console.log(this.byId("input"));
        oEvent.getSource().focus();
      },

      onButtonPress: function () {
        let oList = this.byId("list");
        oList.bindItems({
          path: "/Meetups",
          parameters: {
            custom: {
              first: "3",
            },
          },
          template: new ObjectListItem({
            title: "{Title}",
            number: {
              path: "EventDate",
              type: "sap.ui.model.type.DateTime",
              formatOptions: {
                style: "medium",
              },
            },
            attributes: [
              new ObjectAttribute({
                text: "{Description}",
              }),
            ],
          }),
        });
      },
    });
  }
);
