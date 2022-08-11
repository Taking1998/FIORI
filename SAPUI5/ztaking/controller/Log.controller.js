sap.ui.define(
  [
    "ztaking/controller/BaseController",
    "sap/ui/util/Storage",
    "sap/ui/model/json/JSONModel",
  ],
  function (BaseController, Storage, JSONModel) {
    "use strict";
    var oMyStorage = new Storage(Storage.Type.session, "taking");
    return BaseController.extend("ztaking.controller.Log", {
      onInit: function () {
        let oRouter = this.getRouter().getRoute("log");
        oRouter.attachPatternMatched(this._onObjectMatched, this);
      },

      _onObjectMatched: function () {
        this.config = {};
        oMyStorage.put("username", "20037960");
        this.getView().setModel(new JSONModel(), "log");
        this.byId("defaultLayout").setSize("100%");
        this.byId("detailArea").setVisible(false);
        this.byId("defaultLayout").setResizable(false);
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
        let oDisplayLayout = this.byId("defaultLayout"),
          oDetailArea = this.byId("detailArea"),
          oContext = oEvent.getParameters().rowContext;
        oDetailArea.setBindingContext(oContext, "log");
        oDetailArea.setVisible(true);
        oDisplayLayout.setSize("60%");
        oDisplayLayout.setResizable(true);
      },

      onPress: function (oEvent) {
        // 0-false 1-true
        this._setConfig("回车", "备注", 1);
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
        if (isCallInterface) {
          this._handleCall();
        } else {
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
            config.PROCESSTIME = end - start;
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
