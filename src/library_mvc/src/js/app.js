(function () {

  let app = {
    init: function () {
      this.main();
      this.events();
    },
    main: function () {

    },
    events: function() {
      window.onload = controller.getData();
      window.onload = model.setActionHistory();

      view.$categories.addEventListener("click", function (event) {
        controller.filterBooks(event);
      });

      view.$filterInput.addEventListener("input", debounce(function (event) {
        controller.filterBooks(event);
      }, 500));

      view.$filterButton.addEventListener("click", function (event) {
        controller.clearInputFieldClick(event);
      });

      view.$addBookBtn.addEventListener("click", function () {
        controller.prepareFieldNewBook();
      });

      view.$addRating.addEventListener("mouseover", model.getRating);
      view.$addRating.addEventListener("click", view._showBookRating);
      view.$pushBook.addEventListener("click", controller.pushNewBook);
      view.$closePopUp.addEventListener("click", view._showPopUp);
    }
  }
  app.init();
}());