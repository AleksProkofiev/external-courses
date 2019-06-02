 function getTimeDifference (time) {
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
