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
    this.controller.dispatchToHistory();
  };

  Library.prototype.bind = function () {
    const delayValue = 500;
    this.view.$addBookBtn.addEventListener("click", () => {
      let buttonType = event.target.className;
      this.controller.addNewBook(buttonType);
    });
    this.view.$pushBookBtn.addEventListener("click", () => {
      let buttonType = event.target.className;
      this.controller.addNewBook(buttonType);
    });
    this.view.$addRating.addEventListener("click", () => {
      let rating = +event.target.getAttribute("data-elem");
      this.controller.addBookRating(rating);
    });
    this.view.$library.addEventListener("click", () => {
      let clickElem = event;
      this.controller.setRating(clickElem);
    });
    this.view.$categories.addEventListener("click", () => {
      let currentFilter = event.target.value || event.target.id;
      this.controller.filterBooks(currentFilter);
    });
    this.view.$filterInput.addEventListener("input", debounce((event) => {
      let currentFilter = event.target.value || event.target.id;
      this.controller.filterBooks(currentFilter);
    },delayValue));
    this.view.$filterButton.addEventListener("click", () => {
      this.controller.clearFilterInputField();
    });

  };

  let booksLibrary = new Library();

}());