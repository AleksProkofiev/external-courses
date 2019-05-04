loadBooks();
function getRating() {
  var object = {};
  for (var i = 0; i < 5; i++) {
    this.parentElement.children[i].removeEventListener("mousemove", selectStar);
    this.parentElement.children[i].removeEventListener("mouseleave", resetSelectStars);
    this.parentElement.children[i].removeEventListener("mouseover", selectPreviousStar);
  }
  var name = this.parentElement.parentElement.children[1].innerHTML;
  object[name] = this.getAttribute("data-elem");
}
function resetSelectStars() {
  for (var i = 0; i < 5; i++) {
    this.parentElement.children[i].children[0].style.width = 0;
   }
}
function selectPreviousStar() {
  for (var i = 0; i < this.getAttribute("data-elem") - 1; i++) {
    this.parentElement.children[i].children[0].style.width = 11 + "px";
  }
}
function selectStar(event) {
  var eventWidth = event.offsetX === undefined ? event.layerX : event.offsetX;
  if (eventWidth < 12 && eventWidth > 0) {
    this.children[0].style.width = eventWidth + "px";
  }
}
function loadBooks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://rsu-library-api.herokuapp.com/books', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      try {
        var books = JSON.parse(xhr.responseText);
      } catch (e) {
        console.log("Server: " + e.message);
      }
      createBook(books);
    }
  };
  xhr.send();
}
function createBook(books) {
  books.forEach((function (item) {
      var library = document.querySelector(".content_library");
      var book = library.appendChild(document.createElement("div"));
      book.classList.add("library_item");
      var img = book.appendChild(document.createElement("img"));
      img.classList.add("library_item__img");
      img.src = item.image_url;
      var nameBook = book.appendChild(document.createElement("p"));
      nameBook.classList.add("library_item__name");
      nameBook.innerHTML = item.title;
      var nameAuthor = book.appendChild(document.createElement("p"));
      nameAuthor.classList.add("library_item__author");
      nameAuthor.innerHTML = "by " + item.author.firstName + " " + item.author.lastName;
      var rating = book.appendChild(document.createElement("div"));
      rating.classList.add("rating");
      for (var i = 0; i < 5; i++) {
        var ratingStar = rating.appendChild(document.createElement("div"));
        ratingStar.classList.add("rating_star");
        ratingStar.setAttribute("data-elem", i + 1);
        ratingStar.addEventListener("mousemove", selectStar);
        ratingStar.addEventListener("mouseleave", resetSelectStars);
        ratingStar.addEventListener("mouseover", selectPreviousStar);
        ratingStar.addEventListener("click", getRating);
        var yellowBlock = ratingStar.appendChild(document.createElement("div"));
        yellowBlock.classList.add("yellow_block");
        if (i < item.rating) {
          yellowBlock.classList.add("active_star");
        }
        var ratingStarBack = ratingStar.appendChild(document.createElement("div"));
        ratingStarBack.classList.add("rating_star__back");
        ratingStarBack.innerHTML = "✪";
        var ratingStarFront = ratingStar.appendChild(document.createElement("div"));
        ratingStarFront.classList.add("rating_star__front");
        ratingStarFront.innerHTML = "☆";
      }
    }))
}
