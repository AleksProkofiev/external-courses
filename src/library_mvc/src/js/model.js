function Model(userStore) {
  this.userStore = userStore;
  this.books = null;
  this.state = {
  books: null,
  history: null,
  search: null,
  curentFilter: null,
  }
}

Model.prototype.getHistory = function() {
  let historyList = [];
  let sortedArray = this.state.history.sort(function (a, b) {
    return b.time - a.time
  });
  if (sortedArray.length < 3) {
    for (let i = 0; i < sortedArray.length; i++) {
      historyList.push(sortedArray[i]);
    }
  } else {
    for (let i = 0; i < 3; i++) {
      historyList.push(sortedArray[i]);
    }
  }
  return(historyList);
};

Model.prototype.setActionHistory = function(action, details) {
  if (action && details) {
    let historyElement = {
    time: Date.now(),
    type: action,
    details: details
    };
    this.state.history.push(historyElement);
    if (this.userStore.get() === null) {
      this.userStore.set(this.state.history);
    } else {
      this.state.history = this.userStore.get();
      this.state.history.push(historyElement);
      this.userStore.set(this.state.history);
    }
  } else {
    if (this.userStore.get() !== null) {
      this.state.history = this.userStore.get();
    }
  }
};

Model.prototype.createBook = function(elem) {
  if (elem) {
    let book = {
      id: elem.id || getUniqueId(),
      title: elem.title,
      author: {
        firstName: elem.author.firstName,
        lastName: elem.author.lastName
      },
      cost: elem.cost,
      image_url: elem.image_url,
      rating: elem.rating,
      categories: elem.rating,
      createdAt: elem.createdAt || new Date().getTime(),
      updatedAt: elem.updatedAt || new Date().getTime()
    };
    this.books.push(book);
  }
};

Model.prototype.changePropertyBook = function(id, property, value) {
  let requiredBook = this.books.find((elem) => {
    return elem.id === id;
  })
  requiredBook[property] = value;
};

Model.prototype.getBookById = function(id) {
  return this.books.find((elem) => {
    return elem.id === id;
  })
};

Model.prototype.getData = function(typeData) {
  switch (typeData) {
    case "books":
      return this.books;
    case "state":
      return this.state.books;
    default:
      console.log("error");
  }
  return false;
};

Model.prototype.setBooks = function(value) {
  this.books = value;
};

Model.prototype.getFilteredBooks = function(value) {
  this.state.curentFilter = value;
  switch (this.state.curentFilter) {
    case "all_books":
    case "filter":
      this.state.search = true;
      this.state.books = this.books.sort(function (a, b) {
        return a.id - b.id
      });
      break;
    case "most_recent":
      this.state.search = true;
      this.state.books = this.books.sort(function (a, b) {
        return b.updatedAt - a.updatedAt
      });
      break;
    case "most_popular":
      this.state.search = true;
      this.state.books = this.books.sort(function (a, b) {
        return b.rating - a.rating
      });
      break;
    case "free_books":
      this.flag = true;
      this.state.books = this.books.filter(function (item) {
        return item.cost <= 0;
      });
      break;
    case "close":
      return this.books;
    case "":
      return this.state.books;
    default:
      var collection = (this.state.search) ? this.state.books : this.books;
      return collection.filter(function (item) {
        return (item.author.firstName.toLowerCase().indexOf(value) > -1
          || item.author.lastName.toLowerCase().indexOf(value) > -1
          || item.title.toLowerCase().indexOf(value) > -1)
      });
  }
  return this.state.books;
};