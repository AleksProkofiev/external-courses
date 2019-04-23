window.onload = function () {

var topMenu = document.getElementById("top-menu");
var menuItems = document.getElementsByClassName("menu-item");

topMenu.addEventListener("click", showItems);
topMenu.addEventListener("mouseover", showShadow);
topMenu.addEventListener("mouseout", showShadow);

Array.from(menuItems, function (elem) {
  elem.addEventListener("mouseover", setBg);
  elem.addEventListener("mouseout", setBg);
});

  function setBg() {
    this.classList.toggle("blueBg")
  }

  function showItems() {
    Array.from(menuItems,function (elem) {
      elem.classList.toggle("hide_elem")
    })
  }

  function showShadow() {
    topMenu.classList.toggle("shadow");
  }

};
















// console.log(topMenu);

// document.write("ok");
