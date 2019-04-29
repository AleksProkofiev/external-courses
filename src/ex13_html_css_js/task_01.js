var inputItem = document.querySelector("#todo_list__add__input_item");
inputItem.addEventListener("focus", setBorderColor);
var buttonAddTask = document.querySelector("#todo_list__add_button");
buttonAddTask.addEventListener("click", showConfirmWindow);
var confirmWindow = document.querySelector("#todo_list__confirm_window");
confirmWindow.addEventListener("click", checkConfirm);
var list = document.querySelector("#todo_list__items__ul");
list.addEventListener("click", removeTask);
function setBorderColor() {
    inputItem.style.borderColor = "#A0A1A1";
}
function showConfirmWindow() {
  if (inputItem.value !== "") {
     confirmWindow.children[1].innerHTML =
          "Are you sure you want to add new ToDo item: {" + inputItem.value + "}?";
     confirmWindow.classList.toggle("show");
  } else {
     inputItem.style.borderColor = "red"
  }
}
function checkConfirm() {
  if (event.target.id === "confirmAdd_button_yes") {
      createNewTask();
      confirmWindow.classList.toggle("show");
  } else if (event.target.id === "confirmAdd_button_no") {
        confirmWindow.classList.toggle("show");
  }
}
function createNewTask() {
    var newTask = document.createElement("li");
    newTask.innerHTML = "<span><label><input type='checkbox' class='checkbox'>"
        + inputItem.value.slice(0, 1).toUpperCase() + inputItem.value.slice(1)
        + "<span class='label-check__new-input'></span></label></span>"
        + "<i class='fa fa-times' aria-hidden='true'></i>";
    list.appendChild(newTask);
    inputItem.value = "";
}
function removeTask(event) {
  if (event.target.tagName === "I") {
      var li = event.target.parentNode;
      li.remove();
  }
}