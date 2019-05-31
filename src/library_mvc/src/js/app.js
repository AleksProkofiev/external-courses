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
      this.controller.addNewBook(event.target.className);
    });
    this.view.$pushBookBtn.addEventListener("click", () => {
      this.controller.addNewBook(event.target.className);
    });
    this.view.$addRating.addEventListener("mouseover", debounce((event) => {
      this.view.ratingHover(event);
    },delayValue));
    this.view.$addRating.addEventListener("click", () => {

      this.controller.addBookRating(+event.target.getAttribute("data-elem"));
    });
    this.view.$library.addEventListener("click", () => {
      this.controller.setRating(event);
    });
    // this.view.$library.addEventListener("mouseover", () => {
    //   this.controller.ratingHover(event.target.className);
    // });
    this.view.$categories.addEventListener("click", () => {
      this.controller.filterBooks(event.target.value || event.target.id);
    });
    this.view.$filterInput.addEventListener("input", debounce((event) => {
      this.controller.filterBooks(event.target.value || event.target.id);
    },delayValue));
    this.view.$filterButton.addEventListener("click", () => {
      this.controller.clearFilterInputField();
    });

  };

  let booksLibrary = new Library();

}());