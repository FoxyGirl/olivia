/* jshint browser: true */
;(function () {
  "use strict";
  
  /* Window Scrolling */
  var HEIGHT_SHOW = 50,  //min height for window scrollung 50px
      upTrigger,
      el = document.getElementById('toUp');
  //if window scrolling more than HEIGHT_SHOW to show toUp anchor
  el.style.display = (window.pageYOffset > HEIGHT_SHOW ? 'block' : 'none');
  upTrigger = (window.pageYOffset > HEIGHT_SHOW ? 'true' : 'false');
  window.onscroll = function () {
      el.style.display = (window.pageYOffset > HEIGHT_SHOW ? 'block' : 'none');
  };
  
  //set handler for click on scrolling anchor
  el.addEventListener('click', function(e) {
      e.preventDefault();
      if (!upTrigger) { return; }
      toUp();
  }, false);

  //function window scrolling
  function toUp() {    
    upTrigger = false;
    //speed depends from distance to top
    var speed = window.pageYOffset/10;
    window.scrollBy(0,-speed);
    if (window.pageYOffset > 0) { 
      requestAnimationFrame(toUp); 
    } else {
      upTrigger = true;
    }
  }  
  
})();