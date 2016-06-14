(function() {
  "use strict"
  
  var gallery = document.getElementById('galleryCount');
  var contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item');

  // controls
  var controlBlock = document.getElementById('scrGalControls');
  var controls = controlBlock.getElementsByTagName('i');
  console.log('controls = ' + controls.length);
    
  var item = contentBlock[0];  
  //ширина 1-го элемента
  var itemWidth = item.clientWidth;
  console.log('itemWidth = ' + itemWidth );  //??  
 
  var itemСomputedStyle = getStyle(contentBlock[0]);
  var itemMargin = parseInt(itemСomputedStyle.marginLeft, 10);
  console.log('itemMargin = ' + itemMargin );
  
  //ширина всего блока 1-го элемента
  itemWidth += 2*itemMargin;
  console.log('itemWidth = ' + itemWidth );
  resizeSlider();
  window.addEventListener('resize', resizeSlider);
  
  //перестроение слайдера
  function resizeSlider() {
    console.log('!!!!!!!!');
    
    //ширина доступного окна 
    var windowWidth = document.documentElement.clientWidth;
    console.log('windowWidth = ' + windowWidth);
    
    //ширина галлереи
    var galleryWidth = gallery.clientWidth;
    console.log('galleryWidth = ' + galleryWidth );
    galleryWidth += 2*itemMargin;

    var countLine = Math.floor(galleryWidth/itemWidth);
    console.log('countLine = ' + countLine);
/*
    countLine = ( windowWidth < 1196 ) ? 3 : 4;
    console.log('countLine = ' + countLine);
 */   
    // показали нужные блоки
    for (var i = 0; i < countLine; i++ ) {
      contentBlock[i].style.display = '';    
    }

    // спрятали лишние блоки
    for (var i = countLine, length = contentBlock.length; i < length; i++ ) {
      contentBlock[i].style.display = 'none';    
    }

    
    var countContr = Math.ceil(contentBlock.length / countLine);
    console.log('countContr = ' + countContr);
        
    //добавить недостающие контролы
    while ( controls.length < countContr ) {
      var controlNew = document.createElement('i');
      controlNew.setAttribute('data-toggler', (controls.length + 1));
      controlBlock.appendChild(controlNew);
    }
    
    // показали нужные контролы
    for (var i = 0; i < countContr; i++ ) {
      controls[i].style.display = '';    
    }

    // спрятали лишние контролы
    for (var i = countContr, length = controls.length; i < length; i++ ) {
      controls[i].style.display = 'none';    
    }
    
  }
  
  document.querySelector('.screenshorts-gallery-controls').addEventListener('click', changeSlider);
  
  function changeSlider(e) {
    var targetElem = e.target;
    if (targetElem.tagName != 'I')  
      {return; } else {
        console.log("!! " + targetElem.getAttribute('data-toggler'));
      }
  }
  
  
  //кросс-браузерное получение стилей элемента (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
})();