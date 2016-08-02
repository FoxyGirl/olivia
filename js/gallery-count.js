/* jshint browser: true */
;(function () {
  "use strict";
  
  var countLine;  
  var gallery = document.getElementById('galleryCount');
  var contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item');

  // controls
  var controlBlock = document.getElementById('scrGalControls');
  var controls = controlBlock.getElementsByTagName('i');
    
  resizeSlider();
  
  window.addEventListener('resize', resizeSlider);
  controlBlock.addEventListener('click', changeSlider);
  
  //перестроение слайдера
  function resizeSlider() {
    
    var contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item');

    var item = contentBlock[0];
    
    //ширина 1-го элемента
    var itemWidth = item.clientWidth;

    var itemComputedStyle = getStyle(contentBlock[0]);
    var itemMargin = parseInt(itemComputedStyle.marginLeft, 10);

    //ширина всего блока 1-го элемента
    itemWidth += 2 * itemMargin;
    
    //ширина доступного окна 
    var windowWidth = document.documentElement.clientWidth;
    
    //ширина галлереи
    var galleryWidth = gallery.clientWidth;
    galleryWidth += 2 * itemMargin;

    countLine = Math.floor(galleryWidth / itemWidth);
 
    var activeControl = 1;
    controlBlock.querySelector('.active').classList.remove('active');
    controls[activeControl - 1].classList.add('active');
    
    showItems(countLine, activeControl, contentBlock);
    
    var countContr = Math.ceil(contentBlock.length / countLine);
        
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
        
        showItems(countLine, activeControl, contentBlock);
      }
  }
  
  function showItems(countLine, activeControl, contentBlock) {
    var start = (activeControl - 1) * countLine;
    var end = activeControl * countLine - 1;
    
     // показали нужные блоки и спрятали лишние 
    for (var i = 0, length = contentBlock.length; i < length; i++ ) {      
      if  ( ( i >= start ) && ( i <= end ) )
      {
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