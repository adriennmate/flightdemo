sap.ui.define(
  [
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
  ],
  function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
    "use strict";

    return BaseController.extend(
      "cust.matea.sap.flight.zflight.controller.Airlines",
      {
        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit: function () {
          var oViewModel;

          // keeps the search state
          this._aTableSearchState = [];

          // Model used to manipulate control states
          oViewModel = new JSONModel();
          this.setModel(oViewModel, "AirlineView");
        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */
        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress: function (oEvent) {
          // The source is the list item that got pressed
          this._showObject(oEvent.getSource());
        },

        onSearchCarrid: function (oEvent) {
          if (oEvent.getParameters().refreshButtonPressed) {
            // Search field's 'refresh' button has been pressed.
            // This is visible if you select any main list item.
            // In this case no new search is triggered, we only
            // refresh the list binding.
            this.onRefresh();
          } else {
            var aTableSearchState = [];
            var sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
              aTableSearchState = [
                new Filter("Carrid", FilterOperator.Contains, sQuery),
              ];
            }
            this._applySearch(aTableSearchState);
          }
        },

        onSearchCarrname: function (oEvent) {
          if (oEvent.getParameters().refreshButtonPressed) {
            // Search field's 'refresh' button has been pressed.
            // This is visible if you select any main list item.
            // In this case no new search is triggered, we only
            // refresh the list binding.
            this.onRefresh();
          } else {
            var aTableSearchState = [];
            var sQuery = oEvent.getParameter("query");

            if (sQuery && sQuery.length > 0) {
              aTableSearchState = [
                new Filter("Carrname", FilterOperator.Contains, sQuery),
              ];
            }
            this._applySearch(aTableSearchState);
          }
        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh: function () {
          var oTable = this.byId("table");
          oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject: function (oItem) {
          this.getRouter().navTo("flightspilot", {
            objectId: oItem.getCells()[0].getTitle(),
          });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function (aTableSearchState) {
          var oTable = this.byId("table"),
            oViewModel = this.getModel("AirlineView");
          oTable.getBinding("items").filter(aTableSearchState, "Application");
          // changes the noDataText of the list in case there are no filter results
        },
      }
    );
  }
);
