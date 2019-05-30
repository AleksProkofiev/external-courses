function Model(userStore) {
  this.books = [];
  this.state = [];
  this.history = [];
  this.flag = false;
  this.userStore = userStore;
}

Model.prototype.getHistory = function() {
  let historyList = [];
  let sortedArray = this.history.sort(function (a, b) {
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
    this.history.push(historyElement);
    if (this.userStore.get() === null) {
      this.userStore.set(this.history);
    } else {
      this.history = this.userStore.get();
      this.history.push(historyElement);
      this.userStore.set(this.history);
    }
  } else {
    if (this.userStore.get() !== null) {
      this.history = this.userStore.get();
    }
  }
};

Model.prototype.createBook = function({elem, value}) {
  let book = {
  id: (elem) ? elem.id : getUniqueId(),
  title: (elem) ? elem.title : getFirstCharInUpperCase(value.title),
  author: {firstName: (elem) ? elem.author.firstName : getFirstCharInUpperCase(value.author.firstName),
            lastName: (elem) ? elem.author.lastName : getFirstCharInUpperCase(value.author.lastName)},
  cost: (elem) ? elem.cost : value.cost,
  image_url: (elem) ? elem.image_url : value.image_url,
  rating: (elem) ? elem.rating : value.rating,
  categories: (elem) ? elem.rating : value.categories,
  createdAt: (elem) ? elem.createdAt : new Date().getTime(),
  updatedAt: (elem) ? elem.updatedAt : new Date().getTime()
  };
  this.books.push(book);
};

Model.prototype.changePropertyBook = function(id, property, value) {
  for (let i = 0; i < this.books.length; i++) {
    if (this.books[i].id === id) {
      this.books[i][property] = value;
    }
  }
};

Model.prototype.getData = function(typeData) {
  switch (typeData) {
    case "books":
      return this.books;
    case "state":
      return this.state;
    default:
      console.log("error");
  }
  return false;
};

Model.prototype.setBooks = function(value) {
  this.books = value;
};

Model.prototype.getFilteredBooks = function(value) {
  switch (value) {
    case "all_books":
    case "filter":
      this.flag = true;
      this.state = this.books.sort(function (a, b) {
        return a.id - b.id
      });
      break;
    case "most_recent":
      this.flag = true;
      this.state = this.books.sort(function (a, b) {
        return b.updatedAt - a.updatedAt
      });
      break;
    case "most_popular":
      this.flag = true;
      this.state = this.books.sort(function (a, b) {
        return b.rating - a.rating
      });
      break;
    case "free_books":
      this.flag = true;
      this.state = this.books.filter(function (item) {
        return item.cost <= 0;
      });
      break;
    case "close":
      return this.books;
    case "":
      return this.state;
    default:
      var collection = (this.flag) ? this.state : this.books;
      return collection.filter(function (item) {
        return (item.author.firstName.toLowerCase().indexOf(value) > -1
          || item.author.lastName.toLowerCase().indexOf(value) > -1
          || item.title.toLowerCase().indexOf(value) > -1)
      });
  }
  return this.state;
};