(function () {
  "use strict";
  
  /* Window Scrolling */
  var HEIGHT_SHOW = 50;  
  var el = document.getElementById('toUp');
  //if window scrolling more than HEIGHT_SHOW show anchor to up
  el.style.display = (window.pageYOffset > HEIGHT_SHOW ? 'block' : 'none');		
  window.onscroll = function () {
      el.style.display = (window.pageYOffset > HEIGHT_SHOW ? 'block' : 'none');
  }	
  //обработчик клика по кнопки прокрутки
  el.addEventListener('click', function(e) {
      e.preventDefault();
      toUp();
  }, false);

  //function window scrolling
  function toUp() {
    //переменная скорость тем больше, чем больше промотали вниз
    var speed = window.pageYOffset/10;
    window.scrollBy(0,-speed);
    if (window.pageYOffset > 0) {requestAnimationFrame(toUp);}
  }	
  
})();