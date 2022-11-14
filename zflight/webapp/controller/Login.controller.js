sap.ui.define(
  ["./BaseController", "sap/ui/core/Fragment"],
  function (BaseController, Fragment) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Login",
      {
        onPilot: function () {
          // create dialog lazily
          if (!this.pDialog) {
            this.pDialog = this.loadFragment({
              name: "cust.matea.sap.flight.zflight.view.LoginPilotDialog",
            });
          }
          this.pDialog.then(function (oDialog) {
            oDialog.open();
          });
        },
      }
    );
  }
);
