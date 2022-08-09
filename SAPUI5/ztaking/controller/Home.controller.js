sap.ui.define(
  ["ztaking/controller/BaseController", "sap/base/Log", "sap/m/MessageToast"],
  function (BaseController, Log, MessageToast) {
    "use strict";

    return BaseController.extend("ztaking.controller.Home", {
      onInit: function () {
        let oRouter = this.getRouter();
        let oTarget = oRouter.getTarget("home");
        oTarget.attachDisplay((oEvent) => {
          this._home = oEvent.getParameter("data");
        }, this);
      },

      onNavBack: function () {
        if (this._home && this._home.fromTarget) {
          this.getRouter().getTargets().display(this._home.fromTarget);
          delete this._home;
          return;
        }
        BaseController.prototype.onNavBack.apply(this, arguments);
      },

      _onObjectMatched: function () {
        Log.info("home");
      },

      onFileNameLengthExceeded: function () {
        MessageToast.show("上传的文件名字长度超出限制");
      },

      onFileSizeExceeded: function () {
        MessageToast.show("上传的文件大小超出限制");
      },

      onFileRename: function () {
        MessageToast.show("修改上传文件名成功");
      },
    });
  }
);
