sap.ui.define(
  [
    "./BaseController",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, Fragment, Filter, FilterOperator) {
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

        onCloseDialog: function () {
          // note: We don't need to chain to the pDialog promise, since this event-handler
          // is only called from within the loaded dialog itself.
          this.byId("pilotDialog").close();
        },

        onSearchPilot: function () {
          var oView = this.getView();

          if (!this._pValueHelpDialog) {
            this._pValueHelpDialog = Fragment.load({
              id: oView.getId(),
              name: "cust.matea.sap.flight.zflight.view.ValueHelp",
              controller: this,
            }).then(function (oValueHelpDialog) {
              oView.addDependent(oValueHelpDialog);
              return oValueHelpDialog;
            });
          }
          this._pValueHelpDialog.then(
            function (oValueHelpDialog) {
              this._configValueHelpDialog();
              oValueHelpDialog.open();
            }.bind(this)
          );
        },

        handleSearch: function (oEvent) {
          var sValue = oEvent.getParameter("value");
          var oFilter = new Filter("PCode", FilterOperator.Contains, sValue);
          var oBinding = oEvent.getSource().getBinding("items");
          oBinding.filter([oFilter]);
        },

        _configValueHelpDialog: function () {
          var sInputValue = this.byId("pilotInput").getValue(),
            oModel = this.getView().getModel(),
            aPilot = oModel.getBindings("/pilotSearchSet");

          aPilot.forEach(function (oPilot) {
            oPilot.selected = oPilot.PCode === sInputValue;
          });
          oModel.setProperty("/pilotSearchSet", aPilot);
        },

        handleValueHelpClose: function (oEvent) {
          var oSelectedItem = oEvent.getParameter("selectedItem"),
            oInput = this.byId("pilotInput");

          if (!oSelectedItem) {
            oInput.resetProperty("value");
            return;
          }

          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
        },

        onTraveller: function () {
          this.getRouter().navTo("airlines");
        },

        onLoginPilot: function () {
          this.getRouter().navTo("flights");
        },
      }
    );
  }
);
