function History() {
  let arrayHistory = [];
  let historyList = document.querySelector(".sidebar__history_list");

  this.setAction = function (action, details) {
    let arrayHistoryElement = {};
    arrayHistoryElement.time = Date.now();
    arrayHistoryElement.type = action;
    arrayHistoryElement.details = details;
    arrayHistory.push(arrayHistoryElement);
    this.clearHistoryList();
    if (userStorage.get() === null) {
      this.showHistoryList(arrayHistory);
        userStorage.set(arrayHistory);
    } else {
      arrayHistory = userStorage.get();
      arrayHistory.push(arrayHistoryElement);
      this.showHistoryList(arrayHistory);
      userStorage.set(arrayHistory);
    }
    };

    this.showHistoryList = function (array) {
      let sortedArray = array.sort(function (a, b) {
        return b.time - a.time
      });
      if (sortedArray.length < 3) {
        for (let i = 0; i < sortedArray.length; i++) {
          this.createHistoryItem(sortedArray[i]);
        }
      } else {
        for (let i = 0; i < 3; i++) {
          this.createHistoryItem(sortedArray[i]);
        }
      }
    };

    this.createHistoryItem = function (elem) {
      let flag = elem.type;
      let action = historyList.appendChild(document.createElement("div"));
      action.classList.add("history_list__elem");
      switch (flag) {

        case "addBook":
          action.innerHTML = "<p>You added<span>" + elem.details[0] + "</span>"
            + "<p>by<span>" + elem.details[1] + " " + elem.details[2] + "</span></p>"
            + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
          break;

        case "filter":
          action.innerHTML = "<p>You were looking for books marked<span>" + elem.details + "</span>"
            + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
          break;

        case "filterSymbols":
          action.innerHTML = "<p>You searched for the book characters<span>" + elem.details + "</span>"
            + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
          break;

        case "getRating":
          action.innerHTML = "<p>You changed the rating of the book<span>" + elem.details[0] + "</span>"
            + "<p>to<span>" + elem.details[1] + "</span></p>"
            + "<p><span>" + this.getTimeDifference(elem.time) + "</span></p>";
          break;
          default:
            console.log("error");
      }
    };

    this.getTimeDifference = function (time) {
      let timeDifference = new Date().getTime() - time;
      let output;
      if (+timeDifference < 60000) {
         output = Math.floor(+timeDifference / 1000) + " seconds ago";

      } else if (+timeDifference > 60000 && +timeDifference < 3600000) {
         output = Math.floor(+timeDifference / 60000) + " minutes ago";

      } else if (+timeDifference > 3600000 && +timeDifference < 86400000) {
         output = Math.floor(+timeDifference / 3600000) + " hours ago";

      } else if (+timeDifference > 86400000) {
         output = Math.floor(+timeDifference / 86400000) + " days ago";
      }
      return output;
    };

    this.clearHistoryList = function () {
        historyList.innerHTML = "";
    };
}

let history = new History();