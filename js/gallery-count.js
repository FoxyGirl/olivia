(function() {
  "use strict"
  
  var gallery = document.getElementById('galleryCount');
  var contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item');

  var item = contentBlock[0];
  //item = item.querySelector('img');
  console.log('item ' + item.tagName);  
  
  //ширина 1-го элемента
  var itemWidth = item.clientWidth;
  console.log('itemWidth = ' + itemWidth );  //??
  
  // controls
  var controlBlock = gallery.getElementsByClassName('screenshorts-gallery-controls');
  console.log('items = ' + contentBlock.length );  
  var controls = controlBlock[0].getElementsByTagName('i');
  console.log('controls = ' + controls.length);
    
  //ширина всего блока
  var galleryWidth = gallery.clientWidth;
  console.log('galleryWidth = ' + galleryWidth); 
   
  var itemСomputedStyle = getStyle(contentBlock[0]);
  var itemMargin = parseInt(itemСomputedStyle.marginLeft, 10);
  console.log('itemMargin = ' + itemMargin );
  
  var galleryWidth = gallery.clientWidth;
  console.log('galleryWidth = ' + galleryWidth );
  
    
  resizeSlider();
  window.addEventListener('resize', resizeSlider);
  
  //перестроение слайдера
  function resizeSlider() {
    console.log('!!!!!!!!');
    
    //ширина доступного окна 
    var windowWidth = document.documentElement.clientWidth;
    console.log('windowWidth = ' + windowWidth);


    var countLine = Math.floor(galleryWidth/itemWidth);
    console.log('countLine = ' + countLine);

    countLine = ( windowWidth < 1196 ) ? 3 : 4;
    console.log('countLine = ' + countLine);
    
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
    if ( controls.length < countContr ) {
      var controlNew = document.createElement('i');
      document.querySelector('.screenshorts-gallery-controls').appendChild(controlNew);
    }
    
    // показали нужные контролы
    for (var i = 0; i < countContr; i++ ) {
      controls[i].style.display = '';    
    }

    // спрятали лишние контролы
    for (var i = countContr, length = controls.length; i < length; i++ ) {
      controls[i].style.display = 'none';    
    }
    

    /* //убра
    if ( controls.length > countContr ) {
      for (var i = countContr, length = controls.length; i < length; i++ ) {
        controls[i].style.display = 'none';    
      }
    }     
    */
  }
  
  
  //кросс-браузерное получение стилей элемента (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
})();