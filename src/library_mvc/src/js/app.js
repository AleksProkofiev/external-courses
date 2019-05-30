(function () {

  function Library() {
    this.userStore = new Store("userHistory");
    this.model = new Model(this.userStore);
    this.view = new View();
    this.controller = new Controller(this.model, this.view);
    this.call();
    this.bind()
  }

  Library.prototype.call = function () {
    this.controller.fetchData();
    this.controller.dispatcherHistory();
  };

  Library.prototype.bind = function () {
    this.view.$closePopUp.addEventListener("click", () => {
      this.view._showPopUp();
    });
    this.view.$addBookBtn.addEventListener("click", () => {
      this.controller.addNewBook(event);
    });
    this.view.$pushBookBtn.addEventListener("click", () => {
      this.controller.addNewBook(event);
    });
    this.view.$addRating.addEventListener("mouseover", debounce((event) => {
      this.controller.ratingHover(event);
    },500));
    this.view.$addRating.addEventListener("click", () => {
      this.controller.addBookRating(event);
    });
    this.view.$library.addEventListener("click", () => {
      this.controller.setRating(event);
    });
    this.view.$library.addEventListener("mouseover", () => {
      this.controller.ratingHover(event);
    });
    this.view.$categories.addEventListener("click", () => {
      this.controller.filterBooks(event);
    });
    this.view.$filterInput.addEventListener("input", debounce((event) => {
      this.controller.filterBooks(event);
    },500));
    this.view.$filterButton.addEventListener("click", () => {
      this.controller.clearFilterInputField();
    });

  };

  let booksLibrary = new Library();

}());