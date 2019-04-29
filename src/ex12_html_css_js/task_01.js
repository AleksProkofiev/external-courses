setElementDimensions();
window.addEventListener("resize", setElementDimensions);
function setElementDimensions() {
  var width = document.documentElement.clientWidth;
  var height = document.documentElement.clientHeight;
  var block = document.getElementsByTagName("article")[0];
  block.style.width = (width / 50) +"%";
  block.style.height = (height / 50) +"%";
}