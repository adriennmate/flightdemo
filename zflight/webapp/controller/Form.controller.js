sap.ui.define(
  ["./BaseController", "sap/ui/model/json/JSONModel"],
  function (BaseController, JSONModel) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Form",
      {
        onInit: function () {
          var i, aRow;
          var mySavedVar = sap.ui.getCore().myGlobalVar;
          if (mySavedVar.length) {
            for (i = 0; i < mySavedVar.length; i++) {
              aRow = mySavedVar[i];
            }
          }
          var oViewModel;
          oViewModel = new JSONModel({});

          this.setModel(oViewModel, "Form");
        },
      }
    );
  }
);
