function View() {
  this.$library = document.querySelector(".content_library");
  this.$categories = document.querySelector(".filter_bar__menu");
  this.$filterButton = document.querySelector("#filter_button");
  this.$filterInput = document.querySelector("#filter");
  this.$containerPopUp = document.querySelector(".container_popUp-addBook");
  this.$addRating = document.querySelector(".rating");
  this.$addBookBtn = document.querySelector(".add__button");
  this.$pushBookBtn = document.querySelector(".submit");
  this.$addBookCategories = document.querySelectorAll("input.checkbox:checked");
  this.$addBookRating = document.querySelector("#rating");
  this.$closePopUp = document.querySelector(".fa-times-circle-o");
  this.$prevent = document.querySelector(".prevent");
  this.$form = document.forms.book;
  this.$historyList = document.querySelector(".sidebar__history_list");

  this.$closePopUp.addEventListener("click", () => {
    this._showPopUp();
  });
  this.$library.addEventListener("mouseover", () => {
    this.ratingHover(event);
  });
}

View.prototype._clearAddBookField = function() {
  this.$form.elements.title.value = "";
  this.$form.elements.firstName.value = "";
  this.$form.elements.lastName.value = "";
  this.$form.elements.cost.value = "";
};

View.prototype._showPrevent = function() {
  this.$prevent.classList.remove("hide");
};

View.prototype._getDataAddBook = function() {
  let dataAddBook = {
    cost: this.$form.elements.cost.value,
    title: getFirstCharInUpperCase(this.$form.elements.title.value),
    author: {firstName: getFirstCharInUpperCase(this.$form.elements.firstName.value),
             lastName: getFirstCharInUpperCase(this.$form.elements.lastName.value)},
    image_url: this.$form.elements.image_url.value,
    rating: this.$form.elements.rating.value,
    categories: Array.from(this.$addBookCategories).map(function (elem) {
      return elem.value;
    }),
  };
  return dataAddBook;
};

View.prototype._showAddBookRating = function(value) {
  this.$addBookRating.setAttribute("value", value);
};


View.prototype._showPopUp = function() {
  this.$containerPopUp.classList.toggle("show");
};

View.prototype._clearHistoryList = function() {
  this.$historyList.innerHTML = "";
};

View.prototype._renderHistoryList = function(arrayHistory) {
  this._clearHistoryList();
  arrayHistory.forEach((elem) => {
    this._createDOMHistoryItem(elem);
  })
};

View.prototype._createDOMHistoryItem = function (elem) {
  let flag = elem.type;
  let action = this.$historyList.appendChild(document.createElement("div"));
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
};

View.prototype._showIconClear = function() {
  this.$filterButton.children[0].style.visibility = "hidden";
  this.$filterButton.children[1].style.visibility = "visible";
};

View.prototype._hideDeleteIcon = function() {
  this.$filterButton.children[0].style.visibility = "visible";
  this.$filterButton.children[1].style.visibility = "hidden";
};

View.prototype._clearInput = function() {
  this.$filterInput.value = "";
};

View.prototype._clearLibrary = function() {
  this.$library.innerHTML = "";
};

View.prototype._showMessageNotFound = function() {
  this.$library.innerHTML = "No items match the search..."
};

View.prototype._renderBooks = function (arrayBooks) {
  this._clearLibrary();
  if (Array.isArray(arrayBooks)) {
    if (arrayBooks.length === 0) {
      this._showMessageNotFound();
      return;
    }
    arrayBooks.forEach((item) => {
      this._createDOMBook(item);
    })
  }
};

View.prototype._createDOMBook = function(item) {

  let book = this.$library.appendChild(document.createElement("div"));
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
  for (let i = 0; i < 5; i++) {
    let ratingStar = rating.appendChild(document.createElement("div"));
    ratingStar.classList.add("rating_star");
    ratingStar.setAttribute("data-elem", i + 1);
    if (i < item.rating) {
      ratingStar.classList.add("active_star");
    }
  }
};

View.prototype.ratingHover = function(event) {
  if (event.target.classList.contains("rating_star")) {
    let dataElem = event.target.getAttribute("data-elem");
    for (let i = 0; i < 5; i++) {
      event.target.parentElement.children[i].classList.remove("active_star");
    }
    for (let j = 0; j <= dataElem - 1; j++) {
      event.target.parentElement.children[j].classList.add("active_star");
    }
  }
};
