sap.ui.define(
  ["ztaking/controller/BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend("ztaking.controller.EmployeeListData", {
      onInit: function () {
        let employeeModel = new JSONModel(
          sap.ui.require.toUrl("ztaking/model/EmployeeList.json")
        );
        this.getView().setModel(employeeModel, "employee");
      },
    });
  }
);
