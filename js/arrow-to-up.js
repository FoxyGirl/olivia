(function () {
  "use strict";
  
  /* Scrolling Window*/
  var el = document.getElementById('toTop');	
  //если окно проскроллировано на 50px, показываем кнопку для прокрутки наверх
  el.style.display = (window.pageYOffset > '50' ? 'block' : 'none');		
  window.onscroll = function () {
      el.style.display = (window.pageYOffset > '50' ? 'block' : 'none');
  }	
  //обработчик клика по кнопки прокрутки
  el.addEventListener('click', function(e) {
      e.preventDefault();
      toUp();
  }, false);

  //функция прокрутки окна наверх
  function toUp() {
      //переменная скорость тем больше, чем больше промотали вниз
      var speed = window.pageYOffset/10;
      window.scrollBy(0,-speed);
      if (window.pageYOffset > 0) {requestAnimationFrame(toUp);}
      }		
  
})();