/* jshint browser: true */
;(function () {
  "use strict";
  
  var countNews;
  var gallery = document.getElementById('galleryNews');
  var contentBlock = gallery.getElementsByClassName('blog-post-slider-item');
  
  //controls
  var controlBlock = document.getElementById('newsGalControls');
  var controls = controlBlock.getElementsByTagName('i');
  
  resizeSlider();
  
  //window.addEventListener('resize', resizeSlider);
  
  var debounceResizeBlog = debounce(resizeSlider, 200, false);
  window.addEventListener('resize', debounceResizeBlog);
  controlBlock.addEventListener('click', changeSlider);
  
  //перестроение слайдера
  function resizeSlider() {      
    //ширина доступного окна 
    var windowWidth = document.documentElement.clientWidth;

    countNews = ( windowWidth > 850 ) ? 6 : 3;    
    
    //высота блока
    var itemComputedStyle = getStyle(contentBlock[0]);
    var itemHeight = parseInt(itemComputedStyle.height, 10);
    var itemMarginB = parseInt(itemComputedStyle.marginBottom, 10);

    var galleryHeight = 3 * (itemHeight + itemMarginB);
    gallery.style.height =  galleryHeight + 'px';
     
    var activeControl = 1;
    controlBlock.querySelector('.active').classList.remove('active');
    controls[activeControl - 1].classList.add('active');
    
    showItems(countNews, activeControl, contentBlock);
    
    var countContr = Math.ceil(contentBlock.length / countNews);
        
    //добавить недостающие контролы
    while (controls.length < countContr) {
      var controlNew = document.createElement('i');
      controlNew.setAttribute('data-toggler', (controls.length + 1));
      controlBlock.appendChild(controlNew);
    }
    
    // показали нужные контролы
    for (var i = 0; i < countContr; i++) {
      controls[i].style.display = '';    
    }

    // спрятали лишние контролы
    for (var j = countContr, length = controls.length; j < length; j++) {
      controls[j].style.display = 'none';    
    }
    
  }  
  
  function changeSlider(e) {
    var targetElem = e.target;
    if (targetElem.tagName != 'I')  
      {return; } else {
        var activeControl = targetElem.getAttribute('data-toggler');
        controlBlock.querySelector('.active').classList.remove('active');
        controls[activeControl - 1].classList.add('active');
        
        showItems(countNews, activeControl, contentBlock);
      }
  }
  
  function showItems(countLine, activeControl, contentBlock) {
    var start = (activeControl - 1) * countLine;
    var end = activeControl * countLine - 1;

    // показали нужные блоки и спрятали лишние 
    for (var i = 0, length = contentBlock.length; i < length; i++ ) {      
      if  ( ( i >= start ) && ( i <= end ) ) {
        contentBlock[i].style.display = ''; 
      } else {
        contentBlock[i].style.display = 'none'; 
      }         
    }
  }
  
  //кросс-браузерное получение стилей элемента (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  /** @function debounce
   * @param {function} func : function for execute one time in wait milliseconds 
   * @param {Number} wait : milliseconds 
   * @param {Boolean} immediate : trigger the function on the leading edge, 
   * instead of the trailing
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
  }  
  
})();