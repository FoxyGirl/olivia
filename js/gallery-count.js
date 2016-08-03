/* jshint browser: true */
;(function () {
  "use strict";
  
  var countLine,  
      gallery = document.getElementById('galleryCount'),
      contentBlock = gallery.getElementsByClassName('screenshorts-gallery-item'),
      // controls
      controlBlock = document.getElementById('scrGalControls'),
      controls = controlBlock.getElementsByTagName('i');
    
  resizeSlider();
  
  //window.addEventListener('resize', resizeSlider);
  
  var help = debounce(resizeSlider, 200, false);
  window.addEventListener('resize', help);
  controlBlock.addEventListener('click', changeSlider);
  
  /*************************************************************/
  
  // slider resizing
  function resizeSlider() {
    
    var item = contentBlock[0],  //1-st element
        itemWidth = item.clientWidth,  //1-st element width
        itemComputedStyle = getStyle(contentBlock[0]),
        itemMargin = parseInt(itemComputedStyle.marginLeft, 10); //1-st element margin

    //full block width for 1-st element
    itemWidth += 2 * itemMargin;
    
    //window width
    var windowWidth = document.documentElement.clientWidth;
    
    //gallery width
    var galleryWidth = gallery.clientWidth;
    galleryWidth += 2 * itemMargin;
    
    //count of items in line
    countLine = Math.floor(galleryWidth / itemWidth);
 
    var activeControl = 1;
    controlBlock.querySelector('.active').classList.remove('active');
    controls[activeControl - 1].classList.add('active');
    
    showItems(countLine, activeControl, contentBlock);
    
    var countContr = Math.ceil(contentBlock.length / countLine);
        
    // add controls 
    while (controls.length < countContr) {
      var controlNew = document.createElement('i');
      controlNew.setAttribute('data-toggler', (controls.length + 1));
      controlBlock.appendChild(controlNew);
    }
    
    // show necessary controls
    for (var i = 0; i < countContr; i++) {
      controls[i].style.display = '';    
    }

    // hide unnecessary controls
    for (var j = countContr, length = controls.length; j < length; j++) {
      controls[j].style.display = 'none';    
    }
    
  }
  
  // slider changing
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
  
  // show item of gallery 
  // countLine:@Number = count item in line;
  // activeControl:@Number = num of active control;
  // contentBlock:@element = content Block of items
  function showItems(countLine, activeControl, contentBlock) {
    var start = (activeControl - 1) * countLine;
    var end = activeControl * countLine - 1;
    
    // show necessary blocks and hide unnecessary blocks 
    for (var i = 0, length = contentBlock.length; i < length; i++ ) {      
      if  ( ( i >= start ) && ( i <= end ) )
      {
        contentBlock[i].style.display = ''; 
      } else {
        contentBlock[i].style.display = 'none'; 
      }         
    }
  }  
  
  //cross-browser style getting for element (elem)
  function getStyle(elem) {
    return window.getComputedStyle ? getComputedStyle(elem, "") : elem.currentStyle;
  }
  
  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  function debounce(func, wait, immediate) {
  console.log('debounce');
    var timeout;
    return function () {
        console.log('debounce 2');

        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
      console.log('callNow ' + callNow);
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
  }
  
})();