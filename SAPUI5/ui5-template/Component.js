sap.ui.define(
  ["sap/ui/core/UIComponent", "sap/ui/core/mvc/XMLView"],
  function (UIComponent, XMLView) {
    "use strict";
    return UIComponent.extend("sap.taking.Component", {
      metadata: {
        manifest: "json",
        interfaces: ["sap.ui.core.IAsyncContentCreation"],
      },
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        this.getRouter().initialize();
      },
      // createContent: function () {},
    });
  }
);
