/* jshint browser: true */
;(function () {
  /* Window Scrolling */
  "use strict";  
  /** @constant
   * @type {number} HEIGHT_SHOW : min height for window scrolling 50px
   */
  var HEIGHT_SHOW = 50,
  /** trigger for using function toUp in callback
   *  @type {boolean}
   */
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
  /** @function toUp
   *  To scroll window to up using requestAnimationFrame
   *  Change upTrigger according condition (window.pageYOffset > 0) ? false : true
   */
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