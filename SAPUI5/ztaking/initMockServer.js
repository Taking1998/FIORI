sap.ui.define(
  ["ztaking/localService/mockserver", "sap/m/MessageBox"],
  function (mockserver, MessageBox) {
    "use strict";

    mockserver.init().catch((oError) => {
      MessageBox.error(oError.message);
    });
    sap.ui.require(["sap/ui/core/ComponentSupport"]);
  }
);
