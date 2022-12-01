sap.ui.define(
  ["./BaseController", , "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Form",
      {
        onInit: function () {
          var oViewModel;
          oViewModel = new JSONModel();
          this.setModel(oViewModel, "formView");
          var oFlights = sap.ui.getCore().getModel("Form");
          var oFlightsFrom = oFlights.oData["flights"][0];
          var oFrom = new JSONModel(oFlightsFrom);
          this.getView().setModel(oFrom, "flightsFrom");
          if (oFlights.oData["flights"][1]) {
            var oFlightsBack = oFlights.oData["flights"][1];
            var oBack = new JSONModel(oFlightsBack);
            this.getView().setModel(oBack, "flightsBack");
          } else {
            this.byId("flightsDataBack").setVisible(false);
          }
        },

        onBeforeRendering: function () {
          var a = 5;
        },

        onNavBack: function () {
          // eslint-disable-next-line sap-no-history-manipulation
          history.go(-1);
        },
      }
    );
  }
);
