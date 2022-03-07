sap.ui.define(
  [
    "sap/taking/controller/BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/taking/model/formatter",
  ],
  function (BaseController, Fragment, JSONModel, formatter) {
    "use strict";
    return BaseController.extend("sap.taking.controller.Home", {
      formatter: formatter,
      onInit: function () {
        // console.log("home");
        var oRouter, oTarget;
        oRouter = this.getRouter();
        oTarget = oRouter.getTarget("notFound");
        oTarget.attachDisplay(function (oEvent) {
          this._oData = oEvent.getParameter("data"); // store the data
        }, this);
      },

      onBeforeRendering: function () {
        let oModel = new JSONModel();
        this.getView().setModel(oModel, "info");
        oModel.setProperty("/test1", "X");
        oModel.setProperty("/test2", "");
      },
      onNavBack: function () {
        // in some cases we could display a certain target when the back button is pressed
        if (this._oData && this._oData.fromTarget) {
          this.getRouter().getTargets().display(this._oData.fromTarget);
          delete this._oData.fromTarget;
          return;
        }
        // call the parent's onNavBack
        BaseController.prototype.onNavBack.apply(this, arguments);
      },
      onDisplayNotFound: function () {
        this.getRouter().getTargets().display("notFound", {
          fromTarget: "home",
        });
      },
      onDisplayDataBinding: function () {
        this.getRouter().getTargets().display("dataBinding");
      },
      onOpenDialog: function () {
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "sap.taking.view.Hello",
          });
        }
        this.pDialog.then((oDialog) => oDialog.open());
      },
      onPress: function (param) {
        // console.log(this.getMetadata().getPublicMethods());
        // console.log(param);
      },
      hello: function () {},
      onChange: function (controller) {
        // console.log(controller);
      },
    });
  }
);
