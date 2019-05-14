
loadBooks('https://rsu-library-api.herokuapp.com/books');

let books,
  state;

function loadBooks(url) {
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
        books = JSON.parse(xhr.responseText);
      } catch (e) {
        console.log("Server: " + e.message);
      }
      showBooks(books);
    }
  };
  xhr.send();
}

function showBooks(books) {
  if (Array.isArray(books)) {
    books.forEach((function (item, index) {
      createBook(books[index]);
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
  rating.addEventListener("mouseover", getRating);
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

// function setRating(event) {           //линтер не пропускает. при запуске раскомментить. исправлю позже
//   let dataElem = +event.target.getAttribute("data-elem");
//   let id = +event.target.parentElement.parentElement.getAttribute("id");
//   books.forEach(function (elem) {
//     if (elem.id === id) {
//       elem.rating = dataElem;
//     }
//   });
// }

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

//...............................sort..............................

const categories = document.querySelector(".sort__menu");
const buttonMostRecentBooks = document.querySelector("#most_recent");
buttonMostRecentBooks.addEventListener("click", showMostRecentBooks);
const buttonAllBooks = document.querySelector("#all_books");
buttonAllBooks.addEventListener("click", showAllBooks);
const buttonMostPopularBooks = document.querySelector("#most_popular");
buttonMostPopularBooks.addEventListener("click", showMostPopularBooks);
const buttonFreeBooks = document.querySelector("#free_books");
buttonFreeBooks.addEventListener("click", showFreeBooks);

function setClassActive() {
  let array = Array.from(categories.children);
  for (var i = 0; i < array.length; i++) {
    if (array[i].getAttribute("id") === (this.getAttribute("id"))) {
      continue;
    }
    array[i].classList.remove("active_category");
  }
  this.classList.toggle("active_category");
}

function showAllBooks() {
  state = books.sort(function (a, b) {
    return a.id - b.id
  });
  setClassActive.call(this);
  deleteBooks();
  showBooks(state);
}

function showMostRecentBooks() {
  state = books.sort(function (a, b) {
    return b.updatedAt - a.updatedAt
  });
  setClassActive.call(this);
  deleteBooks();
  showBooks(state);
}

function showMostPopularBooks() {
  state = books.sort(function (a, b) {
    return b.rating - a.rating
  });
  setClassActive.call(this);
  deleteBooks();
  showBooks(state);
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
}

function showMessageNotFound() {
  document.querySelector(".content_library").innerHTML = "No items match the search..."
}

function deleteBooks() {
  let library = document.querySelector(".content_library");
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
}

//........................filter..........................

const filterInput = document.querySelector("#filter");
filterInput.addEventListener("input", filter);
const filterButton = document.querySelector("#filter_button");
filterButton.addEventListener("click", deleteSearchText);

function hasClassActiveCategory() {
  return Array.from(categories.children).some(function (elem) {
    return elem.classList.contains("active_category");
  });
}

function filter() {
  let collection = hasClassActiveCategory() ? state : books;
  console.log(collection);
  showDeleteIcon();
  let value = filterInput.value.toLowerCase();
  let temp = collection.filter(function (item) {
         return (item.author.firstName.toLowerCase().indexOf(value) > -1
         || item.author.lastName.toLowerCase().indexOf(value) > -1
         || item.title.toLowerCase().indexOf(value) > -1)
  });
    deleteBooks();
    console.log(temp);
    showBooks(temp);
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
  console.log(dataElem);
  inputRating.setAttribute("value", dataElem);
}

function addBook(value) {
  let book = {};
  book.id = getRandomId();
  book.title = value.elements.title.value;
  book.author = {firstName: value.elements.firstName.value, lastName: value.elements.lastName.value};
  book.cost = value.elements.cost.value;
  book.image_url = value.elements.image_url.value;
  book.rating = value.elements.rating.value;
  book.categories = Array.from(document.querySelectorAll("input.checkbox:checked")).map(function (elem) {
    return elem.value;
  });
  book.createdAt = new Date().getTime();
  book.updatedAt = new Date().getTime();
  books.push(book);
  deleteBooks();
  showBooks(books);
  console.log(books);
}


// function getRandomId() {                 //линтер не пропускает. при запуске раскомментить. исправлю позже
//   let x = 1;
//   while (books.some(function (elem) {
//     return elem.id === x;
//   })) {
//     x++;
//   }
//   return x;
// }

function validateInputValue() {
  let prevent = document.querySelector(".prevent");
  let form = document.forms.book;
  if (form.elements.title.value !== ""
  && form.elements.firstName.value !== ""
  && form.elements.lastName.value !== ""
  && form.elements.cost.value !== ""
  ) {
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
