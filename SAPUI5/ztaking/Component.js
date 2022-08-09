sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/core/mvc/XMLView", "sap/base/Log"],
  function (UIComponent, JSONModel, Log) {
    "use strict";

    return UIComponent.extend("ztaking.Component", {
      metadata: {
        manifest: "json",
      },

      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
        // 设置日志级别
        Log.setLevel(Log.Level.INFO);
      },
    });
  }
);
