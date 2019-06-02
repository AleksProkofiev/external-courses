
callApi('https://rsu-library-api.herokuapp.com/books', showBooks);
let books,
    state;

function callApi(url, callback) {
  let data;
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState !== 4) {
      return;
    }
    if (xhr.status !== 200) {
      console.log(xhr.status + ': ' + xhr.statusText);
    } else {
      try {
        data = JSON.parse(xhr.responseText);
        callback(data);
      } catch (e) {
        console.log("Server: " + e.message);
      }
    }
  };
  xhr.send();
}

function showBooks(arrayBooks) {
  books = arrayBooks;
  if (Array.isArray(books)) {
      books.forEach((function (item) {
      createBook(item);
    }))
  }
}

function createBook(item) {
  let library = document.querySelector(".content_library");

  let book = library.appendChild(document.createElement("div"));
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
  rating.addEventListener("mouseover", debounce(getRating, 50));
  rating.addEventListener("click", setRating);

  for (let i = 0; i < 5; i++) {
    let ratingStar = rating.appendChild(document.createElement("div"));
    ratingStar.classList.add("rating_star");
    ratingStar.setAttribute("data-elem", i + 1);
    if (i < item.rating) {
      ratingStar.classList.add("active_star");
    }
  }
}

function setRating(event) {
  let dataElem = +event.target.getAttribute("data-elem");
  let id = +event.target.parentElement.parentElement.getAttribute("id");
  let tittle;
  for (let i = 0; i < books.length; i++) {
    if (books[i].id === id) {
        books[i].rating = dataElem;
        tittle = books[i].title;
    }
  }
  history.setAction("setRating", tittle, dataElem);
}

function getRating(event) {
  if (event.target.classList.contains("rating_star")) {
    let dataElem = event.target.getAttribute("data-elem");
    for (let i = 0; i < 5; i++) {
      event.target.parentElement.children[i].classList.remove("active_star");
    }
    for (let j = 0; j <= dataElem - 1; j++) {
      event.target.parentElement.children[j].classList.add("active_star");
    }
  }
}

//...............................filter_menu..............................

const categories = document.querySelector(".filter_bar__menu");
categories.addEventListener("click", filterBooks);

function filterBooks(event) {
  let currentTarget = event.target.id;
    switch (currentTarget) {
      case "all_books":
        showAllBooks.call(this);
        break;
      case "most_recent":
        showMostRecentBooks.call(this);
        break;
      case "most_popular":
        showMostPopularBooks.call(this);
        break;
      case "free_books":
        showFreeBooks.call(this);
        break;
        default:
          console.log("error");
    }
}

function showAllBooks() {
  state = books.sort(function (a, b) {
    return a.id - b.id
  });
    showFilteredBooks.call(this);
    clearInput();
    history.setAction("filter", "All Books");
}

function showMostRecentBooks() {
    state = books.sort(function (a, b) {
        return b.updatedAt - a.updatedAt
    });
    showFilteredBooks.call(this);
    clearInput();
    history.setAction("filter", "Most Recent");
}

function showMostPopularBooks() {
  state = books.sort(function (a, b) {
    return b.rating - a.rating
  });
    showFilteredBooks.call(this);
    clearInput();
    history.setAction("filter", "Most Popular");
}

function showFreeBooks() {
  state = books.filter(function (item) {
    return item.cost <= 0;
  });
  setClassActive.call(this);
  if (state.length !== 0) {
    deleteBooks();
    showBooks(state);
  } else {
    showMessageNotFound();
  }
  clearInput();
  history.setAction("filter", "Free Books");
}

function showFilteredBooks() {
    setClassActive.call(this);
    deleteBooks();
    showBooks(state);
}

function setClassActive() {
    this.classList.toggle("active_category");
}

function showMessageNotFound() {
  document.querySelector(".content_library").innerHTML = "No items match the search..."
}

function deleteBooks() {
  let library = document.querySelector(".content_library");
  library.innerHTML = "";
}

//........................filter..........................

const filterInput = document.querySelector("#filter");
filterInput.addEventListener("input", debounce(filter, 500));
const filterButton = document.querySelector("#filter_button");
filterButton.addEventListener("click", deleteSearchText);

function hasClassActiveCategory() {
  return Array.from(categories.children).some(function (elem) {
    return elem.classList.contains("active_category");
  });
}

function filter() {
  let collection = hasClassActiveCategory() ? state : books;
  showDeleteIcon();
  let value = filterInput.value.toLowerCase();
  let temp = collection.filter(function (item) {
         return (item.author.firstName.toLowerCase().indexOf(value) > -1
         || item.author.lastName.toLowerCase().indexOf(value) > -1
         || item.title.toLowerCase().indexOf(value) > -1)
  });
    deleteBooks();
    showBooks(temp);
    history.setAction("filterSymbols", value);

}

function deleteSearchText() {
  hideDeleteIcon();
  clearInput();
  deleteBooks();
  if (hasClassActiveCategory()) {
    showBooks(state);
  } else {
    showBooks(books);
  }
}

function clearInput() {
  filterInput.value = "";
}

function showDeleteIcon() {
  filterButton.children[0].style.visibility = "hidden";
  filterButton.children[1].style.visibility = "visible";
}

function hideDeleteIcon() {
  filterButton.children[0].style.visibility = "visible";
  filterButton.children[1].style.visibility = "hidden";
}

//.............................addBook.................................

const containerPopUp = document.querySelector(".container_popUp-addBook");
const addRating = document.querySelector(".rating");
addRating.addEventListener("mouseover", getRating);
addRating.addEventListener("click", addBookRating);
const addBtn = document.querySelector(".add__button");
addBtn.addEventListener("click", showPopUp);
const pushBook = document.querySelector(".submit");
pushBook.addEventListener("click", validateInputValue);
const inputRating = document.querySelector("#rating");
const closePopUp = document.querySelector(".fa-times-circle-o");
closePopUp.addEventListener("click", showPopUp);

function showPopUp() {
  containerPopUp.classList.toggle("show");
}

function addBookRating(event) {
  let dataElem = +event.target.getAttribute("data-elem");
  inputRating.setAttribute("value", dataElem);
}

function addBook(value) {
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
  history.setAction("addBook", [book.title, book.author.firstName, book.author.lastName]);
  books.push(book);
  deleteBooks();
  showBooks(books);
}

function getUniqueId() {
  let number1 = new Date().getTime().toString().slice(-5);
  let number2 = getRandomNumberMinMax(10, 99);
  let uniqueId = number1 + number2;
  return +uniqueId;
}

function getRandomNumberMinMax(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateInputValue() {
  let prevent = document.querySelector(".prevent");
  let form = document.forms.book;
  if (form.elements.title.value !== ""
    && form.elements.firstName.value !== ""
    && form.elements.lastName.value !== ""
    && form.elements.cost.value !== ""
    && !isNaN(+form.elements.cost.value)) {
    prevent.classList.add("hide");
    addBook(form);
    form.elements.title.value = "";
    form.elements.firstName.value = "";
    form.elements.lastName.value = "";
    form.elements.cost.value = "";
  } else {
    prevent.classList.remove("hide");
  }
}

function getFirstChatInUpperCase (value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}