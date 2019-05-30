function callApi(url, callback) {
  let data;
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
        data = JSON.parse(xhr.responseText);
        callback(data);
      } catch (e) {
        console.log("Server: " + e.message);
      }
    }
  };
  xhr.send();
}
