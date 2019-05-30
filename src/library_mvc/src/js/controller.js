function Controller(model, view) {
  this.model = model;
  this.view = view;
}

Controller.prototype.dispatcherHistory = function (action, details) {
  this.model.setActionHistory(action, details);
  this.view._renderHistoryList(this.model.getHistory());
};

Controller.prototype.addBookRating = function (event) {
  let rating = +event.target.getAttribute("data-elem");
  this.view._showAddBookRating(rating);
};

Controller.prototype.addNewBook = function(event) {
  if (event.target.classList.contains("add__button")) {
    this.view._showPopUp();
  } else {
    let temp = this.view._getDataAddBook();
    if (this.validateAddBook(temp)) {
      this.model.createBook({value: temp});
      this.view._renderBooks(this.model.getData("books"));
      this.view._clearAddBookField();
      this.dispatcherHistory("addBook", [temp.title, temp.author.firstName, temp.author.lastName]);
    } else {
      this.view._showPrevent();
    }
  }
};

Controller.prototype.validateAddBook = function(value) {
  return (value.title !== ""
    && value.author.firstName !== ""
    && value.author.lastName !== ""
    && value.cost !== ""
    && !isNaN(+value.cost));
};

Controller.prototype.clearFilterInputField = function () {
  this.view._clearInput();
  this.view._renderBooks(this.model.getData("state"));
  this.view._hideDeleteIcon();
};

Controller.prototype.filterBooks = function(event) {
  let currentFilter = event.target.value || event.target.id ;
  if (event.target.value === "") {
    this.view._hideDeleteIcon();
  }
  if (event.target.value) {
    this.view._showIconClear();
  }
  let filteredBooks = this.model.getFilteredBooks(currentFilter);
  this.view._renderBooks(filteredBooks);
  this.dispatcherHistory("filter", currentFilter);
};

Controller.prototype.ratingHover = function(event) {
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

Controller.prototype.setRating = function(event) {
  if (event.target.classList.contains("rating_star")) {
    let rating = event.target.getAttribute("data-elem");
    let id = +event.target.parentElement.parentElement.getAttribute("id");
    this.model.changePropertyBook(id, "rating", rating);
    this.view._renderBooks(this.model.getData("books"));
    for (let i = 0; i < 5; i++) {
      event.target.parentElement.children[i].classList.remove("active_star");
    }
    for (let j = 0; j <= rating - 1; j++) {
      event.target.parentElement.children[j].classList.add("active_star");
    }
  }
};

Controller.prototype.fetchData = function () {
  callApi("https://rsu-library-api.herokuapp.com/books", (value) => {
    this.model.setBooks(value);
    this.view._renderBooks(this.model.getData("books"));
  })
};