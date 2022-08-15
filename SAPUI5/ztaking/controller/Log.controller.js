sap.ui.define(
  [
    "ztaking/controller/BaseController",
    "sap/ui/util/Storage",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "ztaking/model/formatter",
  ],
  function (BaseController, Storage, JSONModel, Fragment, formatter) {
    "use strict";
    var oMyStorage = new Storage(Storage.Type.session, "taking");
    return BaseController.extend("ztaking.controller.Log", {
      formatter: formatter,
      onInit: function () {
        let oRouter = this.getRouter().getRoute("log");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        var that = this;
        this.config = {};
        oMyStorage.put("username", "20037960");
        // 初始化JSONModel
        this.getView().setModel(new JSONModel(), "log");
        setTimeout(() => {
          let option = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              USERNAME: "",
              CONTROLNAME: "",
              STARTDATE: "",
              ENDDATE: "",
            }),
          };
          fetch("http://172.16.5.198:8042/operatelog/getloglist.ashx", option)
            .then((response) => response.json())
            .then((data) => {
              let logModel = this.getView().getModel("log");
              console.log(data);
              logModel.setProperty("/logData", data.items);
            })
            .catch((e) => console.log(e));
        }, 500);
      },

      onRowSelectionChange: function (oEvent) {
        let that = this;
        let index = oEvent.getSource().getSelectedIndex();
        if (!this.byId("logDetailDialog")) {
          Fragment.load({
            id: this.getView().getId(),
            name: "ztaking.view.LogDetail",
            controller: this,
          }).then(function (oDialog) {
            that.getView().addDependent(oDialog);
            that.initLogDetailDialog(index);
            oDialog.open();
          });
        } else {
          this.initLogDetailDialog(index);
          this.byId("logDetailDialog").open();
        }
      },

      initLogDetailDialog: function (index) {
        let logModel = this.getView().getModel("log");
        let logData = logModel.getProperty("/logData");
        let item = logData[index];
        console.log(item);
        logModel.setProperty("/INTERFACEINFO", item.INTERFACEINFO);
        logModel.setProperty("/REQUESTDATA", item.REQUESTDATA);
        logModel.setProperty("/RESPONSEDATA", item.RESPONSEDATA);
      },

      onDialogClose: function () {
        this.byId("logDetailDialog").close();
      },

      onPress: function (oEvent) {
        // 0-false 1-true
        this._setConfig("回车", "备注", 1);
        this._handleCall();
      },

      _setConfig: function (command, remark, isCallInterface) {
        this.config = {
          USERNAME: oMyStorage.get("username"),
          CONTROLNAME: this.getView().getControllerName(),
          COMMAND: command,
          REMARK: remark,
          ISCALLINTERFACE: isCallInterface,
          INTERFACEINFO: "",
          REQUESTDATA: "",
          RESPONSEDATA: "",
          STARTCOMMANDTIME: this._dateTimeFormat(new Date()),
          ENDCOMMANDTIME: "",
          PROCESSTIME: "",
          STARTCALLINTERFACETIME: "",
          ENDCALLINTERFACETIME: "",
        };
        if (!isCallInterface) {
          this._handleNotCall();
        }
      },

      /**
       * 处理不调用接口的日志记录
       */
      _handleNotCall: function () {
        this.config.ENDCOMMANDTIME = this._dateTimeFormat(new Date());
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(config),
        };
        fetch("http://172.16.5.198:8042/operatelog/addlog.ashx", options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            config = {};
          })
          .catch((e) => console.log(e));
      },

      /**
       * 处理调用接口的日志记录
       */
      _handleCall: function () {
        this.config.INTERFACEINFO = {
          interfaceNo: "EW5004",
          interfaceName: "ZEWM_XXXX",
          interfaceUrl: "",
        };
        let myInfo = [
          {
            PARAM: "I_LGNUM",
            VALUE: "LP20",
          },
          {
            PARAM: "I_USER",
            VALUE: oMyStorage.get("username"),
          },
        ];
        this.config.REQUESTDATA = myInfo;
        let options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            param: { size: 5 },
          }),
        };
        this.config.STARTCALLINTERFACETIME = this._dateTimeFormat(new Date());
        let start = performance.now(),
          end;
        fetch("http://localhost:8080/employee/getAllEmployees", options)
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            this.config.RESPONSEDATA = data;
          })
          .then(() => {
            end = performance.now();
            this.config.ENDCALLINTERFACETIME = this._dateTimeFormat(new Date());
            this.config.PROCESSTIME = (end - start) / 1000;
            this.config.ENDCOMMANDTIME = this._dateTimeFormat(new Date());
            let options1 = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.config),
            };
            fetch("http://172.16.5.198:8042/operatelog/addlog.ashx", options1)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                this.config = {};
              })
              .catch((e) => console.log(e));
          });
      },
    });
  }
);
