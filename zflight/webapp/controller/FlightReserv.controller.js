sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/core/format/DateFormat",
  ],
  function (
    BaseController,
    JSONModel,
    Fragment,
    Filter,
    FilterOperator,
    DateFormat
  ) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.FlightReserv",
      {
        onInit: function () {
          var oViewModel;
          oViewModel = new JSONModel();

          this.setModel(oViewModel, "FlightReservView");
          var oInputIataFrom = this.byId("iataFromInput");
          oInputIataFrom.setEnabled(false);
          var oInputIataTo = this.byId("iataToInput");
          oInputIataTo.setEnabled(false);
          var oButtonRet = this.byId("returButton");
          oButtonRet.setEnabled(false);
          var oTable = this.byId("tableflightreserv");
          oTable.setVisible(false);
          var oButtonSubmit = this.byId("submitButton");
          oButtonSubmit.setVisible(false);
        },

        getGroup: function (oContext) {
          var sDate = new Date(oContext.getProperty("Fldate"));
          var sDateFormat = DateFormat.getDateInstance({
            pattern: "yyyy.MM.dd",
          });
          var sDatum = sDateFormat.format(sDate);
          var sOda = oContext.getProperty("Cityfrom");
          var sVissza = oContext.getProperty("Cityto");
          return {
            key: sDatum,
            text: sOda + " -> " + sVissza,
          };
        },
        getGroupHeader: function (oGroup) {
          return new sap.m.GroupHeaderListItem({
            title: oGroup.text,
            upperCase: false,
          });
        },

        onSubmit: function () {
          this.getRouter().navTo("form");
        },

        onSelection: function () {
          var aSelectedItems,
            i,
            j,
            aFlight,
            aConnid,
            aFldate,
            aButtonSubmit,
            aDate,
            aDateFormat,
            aDatum;
          var oItems, j, oConnid, oFldate, oDate, oDateFormat, oDatum, a;

          aSelectedItems = this.byId("tableflightreserv").getSelectedItems();
          oItems = this.byId("tableflightreserv").getItems();

          for (a = 0; a < oItems.length; a++) {
            if (oItems[a]._bGroupHeader == false) {
              oItems[a]
                .getMultiSelectControl(/* bCreateIfNotExist = */ true)
                .setVisible(true);
            }
          }

          if (aSelectedItems.length) {
            aButtonSubmit = this.byId("submitButton");
            aButtonSubmit.setVisible(true);
            for (i = 0; i < aSelectedItems.length; i++) {
              aFlight = aSelectedItems[i];
              aConnid = aFlight.getBindingContext().getProperty("Connid");
              aFldate = aFlight.getBindingContext().getProperty("Fldate");
              aDate = new Date(aFldate);
              aDateFormat = DateFormat.getDateInstance({
                pattern: "yyyy.MM.dd",
              });
              aDatum = aDateFormat.format(aDate);
              for (j = 0; j < oItems.length; j++) {
                if (oItems[j]._bGroupHeader == false) {
                  oConnid = oItems[j].getBindingContext().getProperty("Connid");
                  oFldate = oItems[j].getBindingContext().getProperty("Fldate");
                  oDate = new Date(oFldate);
                  oDateFormat = DateFormat.getDateInstance({
                    pattern: "yyyy.MM.dd",
                  });
                  oDatum = oDateFormat.format(oDate);
                  if (aDatum == oDatum && aConnid !== oConnid) {
                    oItems[j]
                      .getMultiSelectControl(/* bCreateIfNotExist = */ true)
                      .setVisible(false);
                  }
                }
              }
            }
          } else {
            var oButtonSubmit = this.byId("submitButton");
            oButtonSubmit.setVisible(false);
          }
        },

        onSearchCityFrom: function () {
          var oView = this.getView();

          if (!this._pValueHelpDialogFrom) {
            this._pValueHelpDialogFrom = Fragment.load({
              id: oView.getId(),
              name: "cust.matea.sap.flight.zflight.view.CityFromSearch",
              controller: this,
            }).then(function (oValueHelpDialogFrom) {
              oView.addDependent(oValueHelpDialogFrom);
              return oValueHelpDialogFrom;
            });
          }
          this._pValueHelpDialogFrom.then(
            function (oValueHelpDialogFrom) {
              oValueHelpDialogFrom.open();
            }.bind(this)
          );
        },
        onSearchIataFrom: function () {
          var oView = this.getView();

          if (!this._pValueHelpDialogFromIata) {
            this._pValueHelpDialogFromIata = Fragment.load({
              id: oView.getId(),
              name: "cust.matea.sap.flight.zflight.view.IataFrom",
              controller: this,
            }).then(function (oValueHelpDialogFromIata) {
              oView.addDependent(oValueHelpDialogFromIata);
              return oValueHelpDialogFromIata;
            });
          }
          this._pValueHelpDialogFromIata.then(
            function (oValueHelpDialogFromIata) {
              oValueHelpDialogFromIata.open();
              this._filteringIataFrom();
            }.bind(this)
          );
        },
        onSearchCityTo: function () {
          var oView = this.getView();

          if (!this._pValueHelpDialogTo) {
            this._pValueHelpDialogTo = Fragment.load({
              id: oView.getId(),
              name: "cust.matea.sap.flight.zflight.view.CityToSearch",
              controller: this,
            }).then(function (oValueHelpDialogTo) {
              oView.addDependent(oValueHelpDialogTo);
              return oValueHelpDialogTo;
            });
          }
          this._pValueHelpDialogTo.then(
            function (oValueHelpDialogTo) {
              oValueHelpDialogTo.open();
            }.bind(this)
          );
        },
        onSearchIataTo: function () {
          var oView = this.getView();

          if (!this._pValueHelpDialogToIata) {
            this._pValueHelpDialogToIata = Fragment.load({
              id: oView.getId(),
              name: "cust.matea.sap.flight.zflight.view.IataTo",
              controller: this,
            }).then(function (oValueHelpDialogToIata) {
              oView.addDependent(oValueHelpDialogToIata);
              return oValueHelpDialogToIata;
            });
          }
          this._pValueHelpDialogToIata.then(
            function (oValueHelpDialogToIata) {
              oValueHelpDialogToIata.open();
              this._filteringIataTo();
            }.bind(this)
          );
        },
        onRetur: function () {
          var oButtonNotRet = this.byId("notReturButton");
          oButtonNotRet.setEnabled(true);
          var oButtonRet = this.byId("returButton");
          oButtonRet.setEnabled(false);
          var oDateBack = this.byId("dateFromBackDp");
          oDateBack.setEnabled(true);
        },
        onNotRetur: function () {
          var oButtonNotRet = this.byId("notReturButton");
          oButtonNotRet.setEnabled(false);
          var oButtonRet = this.byId("returButton");
          oButtonRet.setEnabled(true);
          var oDateBack = this.byId("dateFromBackDp");
          oDateBack.setEnabled(false);
          oDateBack.resetProperty("value");
        },
        onClear: function () {
          var oInputCityFrom = this.byId("cityFromInput");
          oInputCityFrom.resetProperty("value");

          var oInputCityTo = this.byId("cityToInput");
          oInputCityTo.resetProperty("value");

          var oInputIataFrom = this.byId("iataFromInput");
          oInputIataFrom.resetProperty("value");
          oInputIataFrom.setEnabled(false);

          var oInputIataTo = this.byId("iataToInput");
          oInputIataTo.resetProperty("value");
          oInputIataTo.setEnabled(false);

          var oDateBack = this.byId("dateFromBackDp");
          oDateBack.resetProperty("value");
          oDateBack.setEnabled(true);

          var oDate = this.byId("dateFromDp");
          oDate.resetProperty("value");

          var oButtonNotRet = this.byId("notReturButton");
          oButtonNotRet.setEnabled(true);
          var oButtonRet = this.byId("returButton");
          oButtonRet.setEnabled(false);

          var oTable = this.byId("tableflightreserv");
          oTable.setVisible(false);

          var oButtonSubmit = this.byId("submitButton");
          oButtonSubmit.setVisible(false);
        },

        handleValueHelpCloseCityFrom: function (oEvent) {
          var oSelectedItem = oEvent.getParameter("selectedItem"),
            oInput = this.byId("cityFromInput");

          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
          if (oSelectedItem !== "") {
            var oInputIataFrom = this.byId("iataFromInput");
            oInputIataFrom.setEnabled(true);
          }
        },

        handleValueHelpCloseCityTo: function (oEvent) {
          var oSelectedItem = oEvent.getParameter("selectedItem"),
            oInput = this.byId("cityToInput");

          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
          if (oSelectedItem !== "") {
            var oInputIataTo = this.byId("iataToInput");
            oInputIataTo.setEnabled(true);
          }
        },

        handleValueHelpCloseIataFrom: function (oEvent) {
          var oSelectedItem = oEvent.getParameter("selectedItem"),
            oInput = this.byId("iataFromInput");

          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
        },

        handleValueHelpCloseIataTo: function (oEvent) {
          var oSelectedItem = oEvent.getParameter("selectedItem"),
            oInput = this.byId("iataToInput");

          oInput.setValue(oSelectedItem.getCells()[0].getTitle());
        },

        handleSearchCity: function (oEvent) {
          var sValue = oEvent.getParameter("value");
          var oFilter = new Filter("City", FilterOperator.Contains, sValue);
          var oBinding = oEvent.getSource().getBinding("items");
          oBinding.filter([oFilter]);
        },

        handleSearchIata: function (oEvent) {
          var sValue = oEvent.getParameter("value");
          var oFilter = new Filter("Airport", FilterOperator.Contains, sValue);
          var oBinding = oEvent.getSource().getBinding("items");
          oBinding.filter([oFilter]);
        },

        _filteringIataFrom: function () {
          var sCityFrom = this.byId("cityFromInput").getValue();
          if (sCityFrom !== "") {
            var aFilter = [];
            aFilter = [new Filter("City", FilterOperator.Contains, sCityFrom)];

            var oTable = this.byId("iataFrom");
            oTable.getBinding("items").filter(aFilter, "Application");
          }
        },

        _filteringIataTo: function () {
          var sCityTo = this.byId("cityToInput").getValue();
          if (sCityTo !== "") {
            var aFilter = [];
            aFilter = [new Filter("City", FilterOperator.Contains, sCityTo)];

            var oTable = this.byId("iataTo");
            oTable.getBinding("items").filter(aFilter, "Application");
          }
        },
        onSearch: function (oEvent) {
          /*Adatok lekérése*/
          var aTableSearchState = [];
          var oTable = this.byId("tableflightreserv");
          var sCityFrom = this.byId("cityFromInput").getValue();
          var sIataFrom = this.byId("iataFromInput").getValue();
          var sCityTo = this.byId("cityToInput").getValue();
          var sIataTo = this.byId("iataToInput").getValue();
          var sDateFrom = this.byId("dateFromDp").getDateValue();
          var sDateFromBack = this.byId("dateFromBackDp").getDateValue();
          var oButtonRet = this.byId("returButton");

          if (oButtonRet.getEnabled() == true) {
            if (
              sCityFrom === "" ||
              sIataFrom === "" ||
              sCityTo === "" ||
              sIataTo === "" ||
              sDateFrom == null
            ) {
              sap.m.MessageBox.error(
                "A csillaggal jelölt mezők kitöltése kötelező!",
                {
                  title: "Error",
                  initialFocus: null,
                }
              );
            } else {
              var oTempDateFrom = new Date(
                sDateFrom.setHours("00", "00", "00", "00")
              );
              oTempDateFrom = new Date(
                oTempDateFrom.getTime() +
                  oTempDateFrom.getTimezoneOffset() * -60000
              );
              aTableSearchState = [
                new Filter("Cityfrom", FilterOperator.Contains, sCityFrom),
                new Filter("Airpfrom", FilterOperator.Contains, sIataFrom),
                new Filter("Cityto", FilterOperator.Contains, sCityTo),
                new Filter("Airpto", FilterOperator.Contains, sIataTo),
                new Filter("Fldate", FilterOperator.EQ, oTempDateFrom),
              ];
              oTable.setVisible(true);
            }
          } else if (oButtonRet.getEnabled() == false) {
            if (
              sCityFrom === "" ||
              sIataFrom === "" ||
              sCityTo === "" ||
              sIataTo === "" ||
              sDateFrom == null ||
              sDateFromBack == null
            ) {
              sap.m.MessageBox.error(
                "A csillaggal jelölt mezők kitöltése kötelező!",
                {
                  title: "Error",
                  initialFocus: null,
                }
              );
            } else {
              var oTempDateFrom = new Date(
                sDateFrom.setHours("00", "00", "00", "00")
              );
              oTempDateFrom = new Date(
                oTempDateFrom.getTime() +
                  oTempDateFrom.getTimezoneOffset() * -60000
              );
              var oTempDateFromBack = new Date(
                sDateFromBack.setHours("00", "00", "00", "00")
              );
              oTempDateFromBack = new Date(
                oTempDateFromBack.getTime() +
                  oTempDateFromBack.getTimezoneOffset() * -60000
              );
              aTableSearchState = [
                new Filter("Cityfrom", FilterOperator.Contains, sCityFrom),
                new Filter("Airpfrom", FilterOperator.Contains, sIataFrom),
                new Filter("Cityto", FilterOperator.Contains, sCityTo),
                new Filter("Airpto", FilterOperator.Contains, sIataTo),
                new Filter("Fldate", FilterOperator.EQ, oTempDateFrom),
                new Filter("Fldateback", FilterOperator.EQ, oTempDateFromBack),
              ];
              oTable.setVisible(true);
            }
          }

          oTable.getBinding("items").filter(aTableSearchState, "Application");
          oTable._getSelectAllCheckbox().setVisible(false);
        },
      }
    );
  }
);
