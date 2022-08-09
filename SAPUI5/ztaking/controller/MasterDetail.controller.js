sap.ui.define([
  "ztaking/controller/BaseController",
  function (BaseController) {
    "use strict";

    return BaseController.extend("ztaking.controller.MasterDetail", {
      onInit: function () {
        let oRouter = this.getRouter().getRoute("masterDetail");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        console.log("masterDetail");
      },
    });
  },
]);
