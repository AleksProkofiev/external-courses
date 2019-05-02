var inputItem = document.querySelector(".add_task__input");
inputItem.addEventListener("focus", setBorderColor);
var buttonAddTask = document.querySelector(".add_task__button");
buttonAddTask.addEventListener("click", prepareForAdd);
var confirmWindow = document.querySelector(".confirm_window");
confirmWindow.addEventListener("click", checkConfirm);
var list = document.querySelector(".tasks__ul");
var listLi;
var e;
function setBorderColor() {
    inputItem.style.borderColor = "#A0A1A1";
}
function showConfirmWindow() {
     confirmWindow.classList.toggle("show");
}
function createNewTask() {
    var newTask = document.createElement("li");
    newTask.innerHTML = "<span><label><input type='checkbox' class='checkbox'>"
        + inputItem.value.slice(0, 1).toUpperCase() + inputItem.value.slice(1)
        + "<span class='label-check__new-input'></span></label></span>"
        + "<i class='fa fa-times' aria-hidden='true'></i>";
    list.appendChild(newTask);
    inputItem.value = "";
    listLi = Array.from(document.getElementsByTagName("li"));
    listLi.forEach(function (elem) {
    elem.addEventListener("click", prepareForRemoval);
});
}
function removeTask() {
  listLi.forEach(function (elem) {
    if (elem.classList.contains("delete")) {
      elem.remove();
    }
  });
}
function checkConfirm(event) {
  if (event.target.classList.contains("button_ok")) {
    if (confirmWindow.classList.contains("confirm_delete")) {
      removeTask();
      showConfirmWindow();
    } else {
      createNewTask();
      showConfirmWindow();
    }
  } else if (event.target.classList.contains("button_no")) {
    if (confirmWindow.classList.contains("confirm_delete")) {
      showConfirmWindow();
      e.classList.remove("delete");
    } else {
      showConfirmWindow();
    }
  }
}
function prepareForAdd() {
  if (inputItem.value !== "") {
    confirmWindow.children[1].innerHTML =
      "Are you sure you want to add ToDo item: {" + inputItem.value + "}?";
    confirmWindow.classList.remove("confirm_delete");
    confirmWindow.classList.add("confirm_add");
    showConfirmWindow();
  } else {
    inputItem.style.borderColor = "red"
  }
}
function prepareForRemoval(event) {
  if (event.target.tagName === "I") {
    e = this;
    this.classList.toggle("delete");
    confirmWindow.classList.add("confirm_delete");
    confirmWindow.children[1].innerHTML =
      "Are you sure you want to delete ToDo item: {" + this.children[0].children[0].innerText + "}?";
    showConfirmWindow();
  }
}