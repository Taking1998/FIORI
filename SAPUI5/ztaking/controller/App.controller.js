sap.ui.define(
  [
    "ztaking/controller/BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/base/Log",
    "sap/ui/util/Storage",
  ],
  function (BaseController, JSONModel, Log, Storage) {
    "use strict";
    var config;
    const themes = [
      "sap_horizon",
      "sap_horizon_dark",
      "sap_belize",
      "sap_fiori_3",
    ];

    var oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.session);

    return BaseController.extend("ztaking.controller.App", {
      onInit: function () {
        this.getView().setModel(new JSONModel(), "app");
        let appModel = this.getModel("app");
        appModel.setProperty("/notFound", "notFound");
        appModel.setProperty("/aboutRoute", "aboutRoute");
        appModel.setProperty("/iconTabBar", "iconTabBar");
        appModel.setProperty("/employeeList", "employeeList");
        appModel.setProperty("/test", "test");
        appModel.setProperty("/masterDetail", "masterDetail");
        appModel.setProperty("/log", "log");
        // let genericTiles = this.byId("hBox").getAggregation("items");
        // genericTiles.forEach((item) => item.setState("Loading"));
        // setTimeout(function () {
        //   genericTiles.forEach((item) => item.setState("Loaded"));
        // }, 1000);
        // this.byId("tile").setState("Loading");
        // setTimeout(() => this.byId("tile").setState("Loaded"), 2000);
        // Log.setLevel(Log.Level.INFO);
        config = {};
        // oStorage.put("username", "20037960");
        let oMyStorage = new Storage(Storage.Type.session, "taking");
        oMyStorage.put("key1", "value1");
        oMyStorage.put("key2", "value2");
        oMyStorage.put("key3", "value3");
        oMyStorage.put("key4", "value4");
        let oMyStorage1 = new Storage(Storage.Type.session, "taking");
        console.log(oMyStorage1.get("key1"));
      },

      onInputSubmit: function () {
        console.log("input");
        // console.log(sap.ui.getCore().getVersionInfo());
        // let log = Log.info("input", this.byId("input"));
        // console.log(Log.getLogger());
        // console.log(Log.getLogEntries());
      },

      onInput1Submit: function (oEvent) {
        let sValue = oEvent.getSource().getValue();
        this._setConfig();
      },

      _setConfig: function () {
        let config = {
          username: oStorage.get("username"),
          controllerName: this.getView().getControllerName(),
          startCommandTime: this._dateTimeFormat(new Date()),
        };
        config.field = "格口号";
        config.command = this.getCommandEnum().SUBMIT;
        config.remark = `扫描了${config.field}对应的输入框，执行了${config.command}操作`;
        config.isCallInterface = true;
        if (config.isCallInterface) {
          config.interfaceInfo = {
            interfaceNo: "EW5004",
            interfaceName: "ZEWM_XXXX",
            interfaceUrl: "",
          };
          config.requestData = { test: 1 };
          config.startCallInterfaceTime = this._dateTimeFormat(new Date());
          //调用EWM接口
          let oInput = {};
          let data = this.callInterface(oInput);
          config.responseData = data;
          config.endCallInterfaceTime = this._dateTimeFormat(new Date());
          fetch("https://jsonplaceholder.typicode.com/posts").then(
            (response) => {
              this.handleInterface(response);
              fetch("http://jsonplaceholder.typicode.com/albums/1/photos")
                .then((response) => response.json())
                .then((json) => {
                  console.log(json);
                });
            }
          );
        } else {
          config.interfaceInfo = null;
          config.requestData = null;
          config.responseData = null;
          config.startCallInterfaceTime = null;
          config.endCallInterfaceTime = null;
        }
        Log.info(JSON.stringify(config));
      },

      callInterface: function () {
        let data;
        fetch(
          "http://erp-dev.lp.com:8000/sap/opu/odata/sap/ZTJ_ODATA_TEST_SRV/StudentSet?$format=json"
        )
          .then((response) => {
            data = response.json();
            console.log(response.json());
          })
          .catch((error) => console.log(error));
        return data;
      },

      handleInterface: function (data) {
        // sap.m.MessageBox.success("success");
      },

      onInput2Submit: function () {
        // console.log(config);
        fetch(
          "http://erp-dev.lp.com:8000/sap/opu/odata/sap/ZTJ_ODATA_TEST_SRV/StudentSet?$format=json"
        )
          .then((response) => response.json())
          .then((json) => {
            console.log(json.d.results);
          });
      },

      onMenuAction: function (oEvent) {
        let oItem = oEvent.getParameter("item");
        let text = oItem.getProperty("text");
        let bFlag = themes.some((item) => {
          return item === text;
        });
        let core = sap.ui.getCore();
        if (bFlag) {
          let curTheme = core.getConfiguration().getTheme();
          if (text !== curTheme) {
            core.setThemeRoot(
              `${text}`,
              "https://sapui5.hana.ondemand.com/resources/"
            );
            core.applyTheme(text);
          }
        }
      },

      onChangeUrl: function () {
        this.navTo("notFound");
      },

      /**
       * 从主页跳转到 NotFound 界面
       */
      onNotChangeUrl: function () {
        this.getRouter().getTargets().display("notFound", {
          from: "app",
        });
      },
    });
  }
);
