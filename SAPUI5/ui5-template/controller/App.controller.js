sap.ui.define(
  ["sap/taking/controller/BaseController", "sap/base/Log"],
  function (BaseController, Log) {
    "use strict";
    return BaseController.extend("sap.taking.controller.App", {
      onInit: function () {
        // 显示index.html的配置参数信息
        // console.log(window["sap-ui-config"]);
      },
      onBeforeRendering: function () {},
      onAfterRendering: function () {},

      onExit: function () {},

      usernameChange: function (oEvent) {},

      onOpenDialog: function () {
        // create dialog lazily
        if (!this.pDialog) {
          this.pDialog = this.loadFragment({
            name: "sap.taking.view.HelloDialog",
          });
        }
        this.pDialog.then(function (oDialog) {
          oDialog.open();
        });
      },
    });
  }
);
