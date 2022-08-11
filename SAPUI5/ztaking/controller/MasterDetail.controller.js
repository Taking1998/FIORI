sap.ui.define(
  ["ztaking/controller/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("ztaking.controller.MasterDetail", {
      onInit: function () {
        let oRouter = this.getRouter().getRoute("masterDetail");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        let peopleModel = new JSONModel(
          sap.ui.require.toUrl("ztaking/model/PeopleSet.json")
        );
        this.getView().setModel(peopleModel, "people");
        this.byId("defaultLayout").setSize("100%");
        this.byId("detailArea").setVisible(false);
        this.byId("defaultLayout").setResizable(false);
      },

      onRowSelectionChange: function (oEvent) {
        let oDetailArea = this.byId("detailArea"),
          oLayout = this.byId("defaultLayout"),
          oPeopleContext = oEvent.getParameters().rowContext;
        oDetailArea.setBindingContext(oPeopleContext, "people");
        oDetailArea.setVisible(true);
        oLayout.setSize("60%");
        oLayout.setResizable(true);
      },
    });
  }
);
