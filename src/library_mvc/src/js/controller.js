function Controller(model, view) {
  this.model = model;
  this.view = view;
}

Controller.prototype.dispatchToHistory = function (action, details) {
  this.model.setActionHistory(action, details);
  this.view._renderHistoryList(this.model.getHistory());
};

Controller.prototype.addBookRating = function (value) {
  this.view._showAddBookRating(value);
};

Controller.prototype.addNewBook = function(value) {
  if (value === "add__button") {
    this.view._showPopUp();
  } else {
    let temp = this.view._getDataAddBook();
    if (this.validateAddBook(temp)) {
      this.model.createBook(temp);
      this.view._renderBooks(this.model.getData("books"));
      this.view._clearAddBookField();
      this.dispatchToHistory("addBook", [temp.title, temp.author.firstName, temp.author.lastName]);
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

Controller.prototype.filterBooks = function(value) {
  let search = value;
  if (search === "filter") {
    this.view._hideDeleteIcon();
  } else if (search !== "filter" && search !== "all_books" && search !== "most_recent"
    && search !== "most_popular" && search !== "free_books") {
    this.view._showIconClear();
  }
  let filteredBooks = this.model.getFilteredBooks(search);
  this.view._renderBooks(filteredBooks);
  this.dispatchToHistory("filter", search);
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