var clicked = false;

document.querySelector(".down")?.addEventListener("click", function () {
  if (clicked == false) {
    document.querySelector(".profile-menu").style.visibility = "visible";
    clicked = true;
  } else {
    document.querySelector(".profile-menu").style.visibility = "hidden";
    clicked = false;
  }
});

document.querySelector(".flash-btn-close")?.addEventListener("click", () => {
  document.querySelector(".flash").style.display = "none";
});

// Popup of Filter added
var filclick = false;
var closeclick = false;

document.querySelector(".tune")?.addEventListener("click", function () {
  if (filclick == false) {
    document.querySelector(".popUp").style.visibility = "visible";
    filclick = true;
    closeclick = true;
  }
});

document.querySelector(".close")?.addEventListener("click", function () {
  if (closeclick == true) {
    document.querySelector(".popUp").style.visibility = "hidden";
    closeclick = false;
    filclick = false;
  }
});
