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
        "cust.matea.sap.flight.zflight.controller.FlightReserv",
        {
          onSearchCityFrom: function(){
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
                this._configValueHelpDialogCityFrom();
                oValueHelpDialogFrom.open();
              }.bind(this)
            );
          },
          onSearchIataFrom: function(){
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
                this._configValueHelpDialogIataFrom();
                oValueHelpDialogFromIata.open();
              }.bind(this)
            );
          },
          onSearchCityTo:function(){
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
                this._configValueHelpDialogCityTo();
                oValueHelpDialogTo.open();
              }.bind(this)
            );
          },
          onSearchIataTo: function(){
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
                this._configValueHelpDialogIataTo();
                oValueHelpDialogToIata.open();
              }.bind(this)
            );
          },
          onRetur: function(){

          },
          onNotRetur: function(){

          },
          onSearch: function(){

          },
          onClear: function(){

          },

          _configValueHelpDialogCityFrom: function () {
            var sInputValueCityFrom = this.byId("cityFromInput").getValue(),
              oModel = this.getView().getModel(),
              aCityFrom = oModel.getBindings("/citySearchSet");
          },

          _configValueHelpDialogCityTo: function () {
            var sInputValueCityTo = this.byId("cityToInput").getValue(),
              oModel = this.getView().getModel(),
              aCityTo = oModel.getBindings("/citySearchSet");
          },
          
          _configValueHelpDialogIataFrom: function () {
            var sInputValueCityFrom = this.byId("iataFromInput").getValue(),
              oModel = this.getView().getModel(),
              aIataFrom = oModel.getBindings("/iataSearchSet");
          },

          _configValueHelpDialogIataTo: function () {
            var sInputValueCityTo = this.byId("iataToInput").getValue(),
              oModel = this.getView().getModel(),
              aIataTo = oModel.getBindings("/iataSearchSet");
          },

          handleValueHelpCloseCityFrom: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem"),
              oInput = this.byId("cityFromInput");
  
            oInput.setValue(oSelectedItem.getCells()[0].getTitle());
          },

          handleValueHelpCloseCityTo: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("selectedItem"),
              oInput = this.byId("cityToInput");
  
            oInput.setValue(oSelectedItem.getCells()[0].getTitle());
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
        }
      );
    }
  );
  