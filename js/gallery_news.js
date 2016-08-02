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
  
  window.addEventListener('resize', resizeSlider);
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
    for (var i = countContr, length = controls.length; i < length; i++) {
      controls[i].style.display = 'none';    
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
  
})();