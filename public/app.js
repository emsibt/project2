const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});
document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else header.style.backgroundColor = "transparent";
});
menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});
document.addEventListener("DOMContentLoaded", function () {
  try {
    var db = firebase.database();
    var fan = db.ref("FAN");
    var stop = document.getElementById("stop");
    var low = document.getElementById("low");
    var medium = document.getElementById("second");
    var high = document.getElementById("third");
    stop.addEventListener("click", function () {
      fan.set("0");
    });
    low.addEventListener("click", function () {
      fan.set("1");
    });
    medium.addEventListener("click", function () {
      fan.set("2");
    });
    high.addEventListener("click", function () {
      fan.set("3");
    });
    var timerBtn = document.getElementById("timerBtnStart");
    let bar,myTimeOut;
    timerBtn.addEventListener("click", function () {
      var time = parseInt(document.getElementById("time").value);
      const progressBar = document.getElementsByClassName("progress-bar")[0];
      stop.click();
      disableControl();
      progressBar.style.setProperty("--width", 0);
      if (!bar) {
        bar = setInterval(() => {
          const computedStyle = getComputedStyle(progressBar);
          const width = parseFloat(computedStyle.getPropertyValue("--width"));
          progressBar.style.setProperty("--width", width + 0.1);
        //   console.log(time / 1000);
        }, time / 1000);
      }
      myTimeOut = setTimeout(function () {
        enableControl();
        high.click();
        stopProgressBar();
      }, time);
      var stopTimerBtn = document.getElementById("timerBtnStop")
      stopTimerBtn.addEventListener('click', function(){
        enableControl();
        stopProgressBar();
        clearTimeout(myTimeOut)
      })
    });
    function stopProgressBar() {
      clearInterval(bar);
      bar = null;
    }
    function disableControl() {
      stop.disabled = true;
      low.disabled = true;
      medium.disabled = true;
      high.disabled = true;
    }
    function enableControl() {
      stop.disabled = false;
      low.disabled = false;
      medium.disabled = false;
      high.disabled = false;
    }
  } catch (error) {
    console.log(error);
  }
});
