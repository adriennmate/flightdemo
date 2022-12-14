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
          this.byId("pilotDialog").close();
          var oInputCode = this.byId("pilotInput");
          oInputCode.resetProperty("value");
          var oInputPw = this.byId("passwordInput");
          oInputPw.resetProperty("value");
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

          this.Airline = oSelectedItem.getCells()[1].getText();

          if (!oSelectedItem) {
            oInput.resetProperty("value");
            return;
          }
          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
        },

        onTraveller: function () {
          this.getRouter().navTo("flightreserv");
        },

        onLoginPilot: function (sAirline) {
          var sInputValue = this.byId("pilotInput").getValue();
          var sPasswod = this.byId("passwordInput").getValue();
          if (sInputValue === "") {
            sap.m.MessageBox.error("K??rem adja meg a pil??tak??dj??t!", {
              title: "Error",
              initialFocus: null,
            });
          } else {
            var sJelszo = this.getView()
              .getModel()
              .getObject("/pilotAirlineSet('" + sInputValue + "')").PJelszo;
            if (sJelszo !== sPasswod) {
              sap.m.MessageBox.error("Rossz jelsz??!", {
                title: "Error",
                initialFocus: null,
              });
              var oInputPw = this.byId("passwordInput");
              oInputPw.resetProperty("value");
            } else {
              this.getRouter().navTo("flightspilot", {
                objectId: this.Airline,
              });
            }
          }
        },
      }
    );
  }
);
