sap.ui.define(["./BaseController"], function (BaseController) {
  "use strict";

  return BaseController.extend(
    "cust.matea.sap.flight.zflight.controller.NotFound",
    {
      /**
       * Navigates to the worklist when the link is pressed
       * @public
       */
      onLinkPressed: function () {
        this.getRouter().navTo("login");
      },
    }
  );
});
