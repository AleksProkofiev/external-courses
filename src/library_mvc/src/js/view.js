let view = {

  $library: document.querySelector(".content_library"),
  $categories: document.querySelector(".filter_bar__menu"),
  $filterButton: document.querySelector("#filter_button"),
  $filterInput: document.querySelector("#filter"),
  $containerPopUp: document.querySelector(".container_popUp-addBook"),
  $addRating: document.querySelector(".rating"),
  $addBookBtn: document.querySelector(".add__button"),
  $pushBook: document.querySelector(".submit"),
  $inputRating: document.querySelector("#rating"),
  $closePopUp: document.querySelector(".fa-times-circle-o"),
  $prevent: document.querySelector(".prevent"),
  $form: document.forms.book,
  $historyList: document.querySelector(".sidebar__history_list"),

  _clearHistoryList: function() {
    view.$historyList.innerHTML = "";
  },

  _renderHistoryList: function(arrayHistory) {
    view._clearHistoryList();
    arrayHistory.forEach(function (elem) {
      view._createDOMHistoryItem(elem);
    })
  },

  _createDOMHistoryItem: function (elem) {
    let flag = elem.type;
    let action = view.$historyList.appendChild(document.createElement("div"));
    action.classList.add("history_list__elem");
    switch (flag) {
      case "addBook":
        action.innerHTML = "<p>You added<span>" + elem.details[0] + "</span>"
          + "<p>by<span>" + elem.details[1] + " " + elem.details[2] + "</span></p>"
          + "<p><span>" + getTimeDifference(elem.time) + "</span></p>";
        break;

      case "filter":
        action.innerHTML = "<p>You were looking for books marked<span>" + elem.details + "</span>"
          + "<p><span>" + getTimeDifference(elem.time) + "</span></p>";
        break;

      case "filterSymbols":
        action.innerHTML = "<p>You searched for the book characters<span>" + elem.details + "</span>"
          + "<p><span>" + getTimeDifference(elem.time) + "</span></p>";
        break;

      case "setRating":
        action.innerHTML = "<p>You changed the rating of the book<span>" + elem.details[0] + "</span>"
          + "<p>to<span>" + elem.details[1] + "</span></p>"
          + "<p><span>" + getTimeDifference(elem.time) + "</span></p>";
        break;
      default:
        console.log("error");
    }
  },

  _clearAddBookForm: function() {
    view.$form.elements.title.value = "";
    view.$form.elements.firstName.value = "";
    view.$form.elements.lastName.value = "";
    view.$form.elements.cost.value = "";
  },

  _showPrevent: function() {
    view.$prevent.classList.add("hide");
  },

  _hidePrevent: function() {
    view.$prevent.classList.remove("hide");
  },

  _showBookRating: function (event) {
  let dataElem = +event.target.getAttribute("data-elem");
  view.$inputRating.setAttribute("value", dataElem);
  },

  _showPopUp: function () {
  view.$containerPopUp.classList.toggle("show");
  },

  _renderBooks: function (arrayBooks) {
    view._clearLibrary();
    if (Array.isArray(arrayBooks)) {
      if (arrayBooks.length === 0) {
        view._showMessageNotFound();
        return;
      }
      arrayBooks.forEach((function (item) {
        view._createDOMBook(item);
      }))
    }
  },

  _createDOMBook: function(item) {

    let book = view.$library.appendChild(document.createElement("div"));
    book.classList.add("library_item");
    book.id = item.id;

    let img = book.appendChild(document.createElement("img"));
    img.classList.add("library_item__img");
    img.src = item.image_url;

    let nameBook = book.appendChild(document.createElement("p"));
    nameBook.classList.add("library_item__name");
    nameBook.innerHTML = item.title;

    let nameAuthor = book.appendChild(document.createElement("p"));
    nameAuthor.classList.add("library_item__author");
    nameAuthor.innerHTML = "by " + item.author.firstName + " " + item.author.lastName;

    let rating = book.appendChild(document.createElement("div"));
    rating.classList.add("rating");
    rating.addEventListener("mouseover", debounce(model.getRating, 50));
    rating.addEventListener("click", model.setRating);

    for (let i = 0; i < 5; i++) {
      let ratingStar = rating.appendChild(document.createElement("div"));
      ratingStar.classList.add("rating_star");
      ratingStar.setAttribute("data-elem", i + 1);
      if (i < item.rating) {
        ratingStar.classList.add("active_star");
      }
    }
  },

  _clearLibrary: function () {
    view.$library.innerHTML = "";
  },

  _clearInput: function() {
    view.$filterInput.value = "";
  },

  _showIconClear: function () {
    view.$filterButton.children[0].style.visibility = "hidden";
    view.$filterButton.children[1].style.visibility = "visible";
  },

  _hideDeleteIcon: function () {
    view.$filterButton.children[0].style.visibility = "visible";
    view.$filterButton.children[1].style.visibility = "hidden";
  },

  _showMessageNotFound: function () {
  view.$library.innerHTML = "No items match the search..."
  }
}
























// (function (window) {
//   'use strict';

  /**
   * View that abstracts away the browser's DOM completely.
   * It has two simple entry points:
   *
   *   - bind(eventName, handler)
   *     Takes a todo application event and registers the handler
   *   - render(command, parameterObject)
   *     Renders the given command with the options
   *
   *     Просмотр, который полностью абстрагирует DOM браузера.
   * Он имеет две простые точки входа :
   *
   * - bind(имя события, обработчик)
   * Принимает событие приложения todo и регистрирует обработчик
   * - *- render (команда, объект параметра)
   * Отображает данную команду с параметрами
   *
   *
   */
//   function View() {
//
//     this.$library = document.querySelector(".content_library");
//
//     // this.$todoList = qs('.todo-list');
//     // this.$todoItemCounter = qs('.todo-count');
//     // this.$clearCompleted = qs('.clear-completed');
//     // this.$main = qs('.main');
//     // this.$footer = qs('.footer');
//     // this.$toggleAll = qs('.toggle-all');
//     // this.$newTodo = qs('.new-todo');
//   }
//
//   View.prototype._showNumber = function(number) {
//     this.$library.innerHTML = number;
//   }
//
//   View.prototype._showBooks = function(arrayBooks) {
//     books = arrayBooks;                                 //закинуть в модель
//     if (Array.isArray(books)) {
//       books.forEach((function (item) {
//         this._createBook(item);
//       }))
//     }
//   }
//
//   View.prototype._createBook = function(item) {
//
//     let book = library.appendChild(document.createElement("div"));
//     book.classList.add("library_item");
//     book.id = item.id;
//
//     let img = book.appendChild(document.createElement("img"));
//     img.classList.add("library_item__img");
//     img.src = item.image_url;
//
//     let nameBook = book.appendChild(document.createElement("p"));
//     nameBook.classList.add("library_item__name");
//     nameBook.innerHTML = item.title;
//
//     let nameAuthor = book.appendChild(document.createElement("p"));
//     nameAuthor.classList.add("library_item__author");
//     nameAuthor.innerHTML = "by " + item.author.firstName + " " + item.author.lastName;
//
//     let rating = book.appendChild(document.createElement("div"));
//     rating.classList.add("rating");
//     rating.addEventListener("mouseover", debounce(getRating, 50));
//     rating.addEventListener("click", setRating);
//
//     for (let i = 0; i < 5; i++) {
//       let ratingStar = rating.appendChild(document.createElement("div"));
//       ratingStar.classList.add("rating_star");
//       ratingStar.setAttribute("data-elem", i + 1);
//       if (i < item.rating) {
//         ratingStar.classList.add("active_star");
//       }
//     }
//   }
//
//
//   window.app = window.app || {};
//   window.app.View = View;
// }(window));