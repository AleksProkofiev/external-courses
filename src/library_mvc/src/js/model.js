let model = {

  books: [],
  state: [],
  arrayHistory: [],
  flag: false,
  urlData: "https://rsu-library-api.herokuapp.com/books",

  getHistoryList: function (callback) {
    let historyList = [];
    let sortedArray = model.arrayHistory.sort(function (a, b) {
      return b.time - a.time
    });
    if (sortedArray.length < 3) {
      for (let i = 0; i < sortedArray.length; i++) {
        historyList.push(sortedArray[i]);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        historyList.push(sortedArray[i]);
      }
    }
    callback(historyList)
  },

  setActionHistory: function (action, details) {
    if (action && details) {
      let arrayHistoryElement = {};
      arrayHistoryElement.time = Date.now();
      arrayHistoryElement.type = action;
      arrayHistoryElement.details = details;
      model.arrayHistory.push(arrayHistoryElement);
      if (userStore.get() === null) {
        userStore.set(model.arrayHistory);
      } else {
        model.arrayHistory = userStore.get();
        model.arrayHistory.push(arrayHistoryElement);
        userStore.set(model.arrayHistory);
      }
    } else {
      if (userStore.get() !== null) {
        model.arrayHistory = userStore.get();
      }
    }
    model.getHistoryList(view._renderHistoryList);
  },

  setRating: function(event) {
    let dataElem = +event.target.getAttribute("data-elem");
    let id = +event.target.parentElement.parentElement.getAttribute("id");
    let tittle;
    for (let i = 0; i < model.books.length; i++) {
      if (model.books[i].id === id) {
        model.books[i].rating = dataElem;
        tittle = model.books[i].title;
      }
    }
    model.setActionHistory("setRating", [tittle, dataElem]);
  },

  getRating: function(event) {
    if (event.target.classList.contains("rating_star")) {
      let dataElem = event.target.getAttribute("data-elem");
      for (let i = 0; i < 5; i++) {
        event.target.parentElement.children[i].classList.remove("active_star");
      }
      for (let j = 0; j <= dataElem - 1; j++) {
        event.target.parentElement.children[j].classList.add("active_star");
      }
    }
  },

  validateInputValue: function(callback) {
  if (view.$form.elements.title.value !== ""
    && view.$form.elements.firstName.value !== ""
    && view.$form.elements.lastName.value !== ""
    && view.$form.elements.cost.value !== ""
    && !isNaN(+view.$form.elements.cost.value)) {
    view._showPrevent();
    model.createBook(view.$form);
    callback(model.books);
  } else {
    view._hidePrevent();
  }
  },

  createBook: function(value) {
    let book = {};
    book.id = getUniqueId();
    book.title = getFirstChatInUpperCase(value.elements.title.value);
    book.author = {firstName: getFirstChatInUpperCase(value.elements.firstName.value),
      lastName: getFirstChatInUpperCase(value.elements.lastName.value)};
    book.cost = value.elements.cost.value;
    book.image_url = value.elements.image_url.value;
    book.rating = value.elements.rating.value;
    book.categories = Array.from(document.querySelectorAll("input.checkbox:checked")).map(function (elem) {
      return elem.value;
    });
    book.createdAt = new Date().getTime();
    book.updatedAt = new Date().getTime();
    model.books.push(book);
    model.setActionHistory("addBook", [book.title, book.author.firstName, book.author.lastName]);
    view._clearAddBookForm();
  },

  fetchData: function (callback) {
    callApi(model.urlData, function(value){
      model.books = value;
      callback(model.books);
    });
  },

  getFilteredBooks: function (event, callback) {
      let currentTarget = event.target.value || event.target.id ;
      switch (currentTarget) {
        case "all_books":
        case "filter":
          model.flag = true;
          model.state = model.books.sort(function (a, b) {
            return a.id - b.id
          });
          break;
        case "most_recent":
          model.flag = true;
          model.state = model.books.sort(function (a, b) {
            return b.updatedAt - a.updatedAt
          });
          break;
        case "most_popular":
          model.flag = true;
          model.state = model.books.sort(function (a, b) {
            return b.rating - a.rating
          });
          break;
        case "free_books":
          model.flag = true;
          model.state = model.books.filter(function (item) {
            return item.cost <= 0;
          });
          break;
        case "close":
          callback(model.books);
          break;
        case "":
          callback(model.state);
          break;
        default:
          var collection = (model.flag) ? model.state : model.books;
          var temp = collection.filter(function (item) {
              return (item.author.firstName.toLowerCase().indexOf(currentTarget) > -1
                || item.author.lastName.toLowerCase().indexOf(currentTarget) > -1
                || item.title.toLowerCase().indexOf(currentTarget) > -1)
            });
            callback(temp);
            model.setActionHistory("filterSymbols", currentTarget);
            return;
      }
      model.setActionHistory("filter", currentTarget);
      callback(model.state);
  }
}



























// (function (window) {
//   'use strict';

  /**
   * Creates a new Model instance and hooks up the storage.
   *
   * @constructor
   * @param {object} storage A reference to the client side storage class
   *
   * Создает новый экземпляр модели и подключает хранилище.
   *
   * @конструктор
   * @ param {object} storage ссылка на класс хранения на стороне клиента
   */
  // function Model() {
  //   this.url = "https://rsu-library-api.herokuapp.com/books";
  //   this.books;
  //   this.state;
  //   this.number = 0;
  //
  // }
  //
  // Model.prototype.getData = function() {
  //   callApi(this.url, this._showBooks);
  // }
  //
  // Model.prototype.getSum = function (num1, num2) {
  //   this.number = num1 + num2;
  //   let res = this.number;
  //   View._showNumber(res);
  //
  // }













// function History() {
//   let arrayHistory = [];
//   let historyList = document.querySelector(".sidebar__history_list");
//
//   this.setAction = function (action, details) {
//     let arrayHistoryElement = {};
//     arrayHistoryElement.time = Date.now();
//     arrayHistoryElement.type = action;
//     arrayHistoryElement.details = details;
//     arrayHistory.push(arrayHistoryElement);
//     this.clearHistoryList();
//     if (userStorage.get() === null) {
//       this.showHistoryList(arrayHistory);
//       userStorage.set(arrayHistory);
//     } else {
//       arrayHistory = userStorage.get();
//       arrayHistory.push(arrayHistoryElement);
//       this.showHistoryList(arrayHistory);
//       userStorage.set(arrayHistory);
//     }
//   };
//
//   this.showHistoryList = function (array) {
//     let sortedArray = array.sort(function (a, b) {
//       return b.time - a.time
//     });
//     if (sortedArray.length < 3) {
//       for (let i = 0; i < sortedArray.length; i++) {
//         this.createHistoryItem(sortedArray[i]);
//       }
//     } else {
//       for (let i = 0; i < 3; i++) {
//         this.createHistoryItem(sortedArray[i]);
//       }
//     }
//   };
//
//   this.createHistoryItem = function (elem) {
//     let flag = elem.type;
//     let action = historyList.appendChild(document.createElement("div"));
//     action.classList.add("history_list__elem");
//     switch (flag) {
//
//       case "addBook":
//         action.innerHTML = "<p>You added<span>" + elem.details[0] + "</span>"
//           + "<p>by<span>" + elem.details[1] + " " + elem.details[2] + "</span></p>"
//           + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
//         break;
//
//       case "filter":
//         action.innerHTML = "<p>You were looking for books marked<span>" + elem.details + "</span>"
//           + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
//         break;
//
//       case "filterSymbols":
//         action.innerHTML = "<p>You searched for the book characters<span>" + elem.details + "</span>"
//           + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
//         break;
//
//       case "getRating":
//         action.innerHTML = "<p>You changed the rating of the book<span>" + elem.details[0] + "</span>"
//           + "<p>to<span>" + elem.details[1] + "</span></p>"
//           + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
//         break;
//       default:
//         console.log("error");
//     }
//   };



//   this.clearHistoryList = function () {
//     historyList.innerHTML = "";
//   };
// }

// let history = new History();

//   window.app = window.app || {};
//   window.app.Model = Model;
// })(window);