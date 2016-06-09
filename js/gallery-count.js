(function() {
  "use strict"
  
  var gallery = document.getElementById('galleryCount');
  var contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item');
  var controlBlock = gallery.getElementsByClassName('screenshorts-gallery-controls');
  console.log('items = ' + contentBlock.length );
  var item = contentBlock[0];
  console.log('item ' + item.tagName);
  
  //ширина 1-го элемента
  var itemWidth = item.clientWidth;
  console.log('itemWidth = ' + itemWidth );
  
  //ширина всего блока
  var galleryWidth = gallery.clientWidth;
  console.log('galleryWidth = ' + galleryWidth);
  
  var counIteration = Math.floor(galleryWidth/itemWidth);
  console.log('counIteration = ' + counIteration);
  
  var itemСomputedStyle = getStyle(contentBlock[0]);
  var itemMargin = parseInt(itemСomputedStyle.marginLeft, 10);
  console.log('itemMargin = ' + itemMargin );
  
  var galleryWidth = gallery.clientWidth;
  console.log('galleryWidth = ' + galleryWidth );
  
  var controls = controlBlock[0].getElementsByTagName('i');
  console.log(controls.length);
  
  //кросс-браузерное получение стилей элемента (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
})();