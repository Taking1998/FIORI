sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/base/Log",
    "sap/ui/core/format/DateFormat",
    "sap/ui/util/Storage",
  ],
  function (
    Controller,
    UIComponent,
    History,
    MessageToast,
    Log,
    DateFormat,
    Storage
  ) {
    "use strict";

    return Controller.extend("ztaking.controller.BaseController", {
      /**
       * 视图初始化，仅调用一次
       */
      onInit: function () {
        Log.setLevel(Log.level.ALL);
        let oMyStorage = new Storage(Storage.Type.session, "taking");
        oMyStorage.put("username", "20037960");
        console.log("Hello");
      },

      /**
       * 视图渲染前调用
       */
      onBeforeRendering: function () {},

      /**
       * 视图渲染后调用
       */
      onAfterRendering: function () {},

      /**
       * 视图被摧毁，仅调用一次
       */
      onExit: function () {},

      getCommandEnum: function () {
        return {
          PRESS: "PRESS",
          SUBMIT: "SUBMIT",
          CHANGE: "CHANGE",
        };
      },

      _LogUserCommand: function (config, remark) {
        // 用户名，于具体操作时间，执行了什么方法，是否调用接口，调用的接口名，返回的数据
        config.startTime = DateFormat.getDateTimeInstance({
          pattern: "YYYY-MM-dd HH:mm:ss",
        }).format(config.startTime);
        config.remark = remark;
        console.log(JSON.stringify(config));
      },

      onButtonPress: function (oEvent) {
        let text = oEvent.getSource().getText();
        console.log(text);
      },

      _dateTimeFormat: function (dateTime) {
        return DateFormat.getDateTimeInstance({
          pattern: "YYYY-MM-dd HH:mm:ss",
        }).format(dateTime);
      },

      /**
       * 获取当前路由对象
       * @returns
       */
      getRouter: function () {
        return UIComponent.getRouterFor(this);
      },

      getModel: function (modelName) {
        return this.getView().getModel(modelName);
      },

      /**
       * 封装的跳转路由方法
       * @param {*} route
       */
      navTo: function (route) {
        let oRouter = this.getOwnerComponent().getRouter();
        oRouter.navTo(route);
      },

      navigateToSection: function (oEvent) {
        var sKey = oEvent.getParameter("key"),
          oItem;

        if (!sKey) {
          oItem = oEvent.getParameter("selectedItem");
          oItem && (sKey = oItem.getKey());
        }

        oEvent.preventDefault();
        if (sKey && sKey !== "home") {
          this.getRouter().navTo(sKey, {});
        } else {
          this.getRouter().navTo("welcome", {});

          this._setHeaderSelectedKey("home");
        }
      },

      _setHeaderSelectedKey: function (sKey) {
        this._selectHeader.setSelectedKey(sKey);
        this._tabHeader.setSelectedKey(sKey);
        this._sKey = sKey;
      },

      onNavBack: function () {
        var oHistory, sPreviousHash;

        oHistory = History.getInstance();
        sPreviousHash = oHistory.getPreviousHash();

        if (sPreviousHash !== undefined) {
          window.history.go(-1);
        } else {
          this.getRouter().navTo("", {}, true /*no history*/);
        }
      },
    });
  }
);
