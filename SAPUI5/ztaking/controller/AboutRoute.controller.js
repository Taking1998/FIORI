sap.ui.define(["ztaking/controller/BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend("ztaking.controller.AboutRoute", {
    onInit: function () {
      let oRouter = this.getRouter().getRoute("aboutRoute");
      oRouter.attachPatternMatched(this._onObjectMatched, this);
    },

    _onObjectMatched: function () {},

    onChangeUrl: function () {
      this.navTo("home");
    },

    onNotChangeUrl: function () {
      this.getRouter().getTargets().display("home", {
        fromTarget: "aboutRoute",
      });
    },
  });
});
