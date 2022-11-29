sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Form",
      {
        onInit: function () {
          var oViewModel;
          oViewModel = new JSONModel();

          this.setModel(oViewModel, "Form");
        },
      }
    );
  }
);
