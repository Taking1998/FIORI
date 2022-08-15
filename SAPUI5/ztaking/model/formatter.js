sap.ui.define([], function () {
  "use strict";
  return {
    msgtyFormat: function (msgty) {
      let res;
      switch (msgty) {
        case "E":
          res = "Error";
          break;
        case "S":
          res = "Success";
          break;
        case "I":
          res = "Information";
          break;
        case "W":
          res = "Warning";
          break;
        default:
          res = "None";
          break;
      }
      return res;
    },
  };
});
