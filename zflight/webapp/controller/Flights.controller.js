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
      "cust.matea.sap.flight.zflight.controller.Flights",
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

          // Model used to manipulate control states
          oViewModel = new JSONModel();
          this.setModel(oViewModel, "FlightView");
          this.getRouter()
            .getRoute("flightspilot")
            .attachPatternMatched(this._onObjectMatched, this);
        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack: function () {
          // eslint-disable-next-line sap-no-history-manipulation
          history.go(-1);
        },

        onSearchConnid: function (oEvent) {
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
                new Filter("Connid", FilterOperator.Contains, sQuery),
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
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */

        _onObjectMatched: function (oEvent) {
          var aTableSearchState = [];
          var sObjectId = oEvent.getParameter("arguments").objectId;
          aTableSearchState = [
            new Filter("Carrid", FilterOperator.EQ, sObjectId),
          ];
          this._bindView(aTableSearchState);
        },

        _bindView: function (aTableSearchState) {
          var oTable = this.byId("tableflights"),
            oViewModel = this.getModel("FlightView");
          oTable.getBinding("items").filter(aTableSearchState, "Application");
        },

        _applySearch: function (aTableSearchState) {
          var oTable = this.byId("tableflights"),
            oViewModel = this.getModel("FlightView");
          oTable.getBinding("items").filter(aTableSearchState, "Application");
        },
      }
    );
  }
);
