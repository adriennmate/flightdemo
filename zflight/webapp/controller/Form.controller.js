sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Form",
      {
        onInit: function () {
          const myRoute = this.getOwnerComponent().getRouter().getRoute("form");
          myRoute.attachPatternMatched(this.onMyRoutePatternMatched, this);
        },

        onMyRoutePatternMatched(event) {
          var oViewModel;
          oViewModel = new JSONModel();
          this.setModel(oViewModel, "formView");
          var oFlights = sap.ui.getCore().getModel("Form");
          if (oFlights) {
            this.byId("formFlightData").setVisible(true);
            this.byId("onBack").setVisible(false);
            if (oFlights.oData["flights"][0]) {
              var oFlightsFrom = oFlights.oData["flights"][0];
              var oFrom = new JSONModel(oFlightsFrom);
              this.getView().setModel(oFrom, "flightsFrom");
            } else {
              this.byId("flightsDataFrom").setVisible(false);
            }
            if (oFlights.oData["flights"][1]) {
              var oFlightsBack = oFlights.oData["flights"][1];
              var oBack = new JSONModel(oFlightsBack);
              this.getView().setModel(oBack, "flightsBack");
            } else {
              this.byId("flightsDataBack").setVisible(false);
            }
          } else {
            this.byId("formFlightData").setVisible(false);
          }
        },

        onNavBack: function () {
          // eslint-disable-next-line sap-no-history-manipulation
          history.go(-1);
        },
      }
    );
  }
);
