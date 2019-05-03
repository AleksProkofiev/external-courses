var topMenu = document.getElementById("top-menu");
topMenu.addEventListener("click", showItems);
topMenu.addEventListener("mouseover", showShadow);
topMenu.addEventListener("mouseout", showShadow);
var menuItemsArray = Array.from(document.getElementsByClassName("menu-item"));
menuItemsArray.forEach(function (elem) {
    elem.addEventListener("mouseover", setBg);
    elem.addEventListener("mouseout", setBg);
});
function setBg() {
  this.classList.toggle("blueBg")
}
function showItems() {
  menuItemsArray.forEach(function (elem) {
    elem.classList.toggle("hide_elem")
  })
}
function showShadow() {
  topMenu.classList.toggle("shadow");
}
















// console.log(topMenu);

// document.write("ok");
