let controller = {

  getData: function () {
    model.fetchData(view._renderBooks);
  },

  filterBooks: function (event) {
    model.getFilteredBooks(event, view._renderBooks);
    view._showIconClear();
  },

  clearInputFieldClick: function (event) {
    view._clearInput();
    model.getFilteredBooks(event, view._renderBooks);
    view._hideDeleteIcon();
  },

  prepareFieldNewBook: function () {
    view._showPopUp();
  },

  pushNewBook: function () {
    model.validateInputValue(view._renderBooks);
    model.getHistoryList(view._renderHistoryList);
  }
}

























// (function (window) {
//   'use strict';
//
//   function Controller(model, view) {
//
//
//     var self = this;
//     self.model = model;
//     self.view = view;
//   }
//
//   Controller.prototype.onNumber = function () {
//     self.getSum(2, 3);
//   }
//
//
//
//   window.app = window.app || {};
//   window.app.Controller = Controller;
// })(window);