function History(storeName) {



  let arrayHistory = [];

  this.setAction = function (action, details) {

    console.log("ok");

    let arrayHistoryElement = {};
    arrayHistoryElement.time = Date.now();
    arrayHistoryElement.type = action;
    arrayHistoryElement.details = details;
    arrayHistory.push(arrayHistoryElement);
    if (userStore.get() === null) {
      storeName.set(arrayHistory);
    } else {
      arrayHistory = userStore.get();
      arrayHistory.push(arrayHistoryElement);
      userStore.set(arrayHistory);
    }
    };

  this.getHistoryList = function () {
    let historyList;
    let sortedArray = arrayHistory.sort(function (a, b) {
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
    return historyList;
  }
}

let userHistory = new History("userStore");

