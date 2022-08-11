sap.ui.define(
  [
    "ztaking/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/m/ObjectListItem",
    "sap/m/ObjectAttribute",
  ],
  function (BaseController, JSONModel, ObjectListItem, ObjectAttribute) {
    "use strict";

    BaseController.extend("ztaking.controller.IconTabBar", {
      onInit: function () {
        let oRouter = this.getRouter().getRoute("iconTabBar");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        // let oModel = this.getView().getModel();
        // oModel.read("/Meetups", {
        //   success: function (oData) {
        //     console.log(oData);
        //   },
        // });
        this.getView().setModel(new JSONModel(), "info");
        let fact = [{ type: 1 }, { type: true }, { type: "123" }];
        let infoModel = this.getView().getModel("info");
        infoModel.setProperty("/fact", fact);
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

      createContent: function (sId, oContext) {
        let type = oContext.getProperty("type");
        console.log(typeof type);
        switch (typeof type) {
          case "string":
            return new sap.m.Text(sId, {
              text: {
                path: "info>type",
              },
            });
          case "number":
            return new sap.m.Input(sId, {
              value: {
                path: "info>type",
              },
            });
          case "boolean":
            return new sap.m.CheckBox(sId, {
              selected: {
                path: "info>type",
              },
            });
        }
      },
    });
  }
);
