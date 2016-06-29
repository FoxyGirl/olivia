(function () {
  "use stict";
  
  var countNews;
  var gallery = document.getElementById('galleryNews');
  var contentBlock = gallery.getElementsByClassName('blog-post-slider-item');
  
  //controls
  var controlBlock = document.getElementById('newsGalControls');
  var controls = controlBlock.getElementsByTagName('i');
  console.log('controls = ' + controls.length);
  
  resizeSlider();
  
  window.addEventListener('resize', resizeSlider);
  controlBlock.addEventListener('click', changeSlider);
  
  //перестроение слайдера
  function resizeSlider() {
    console.log('!!!News!!!');
          
    //ширина доступного окна 
    var windowWidth = document.documentElement.clientWidth;
    console.log('windowWidth = ' + windowWidth);
    
    countNews = ( windowWidth > 850 ) ? 6 : 3;
 
    var activeControl = 1;
    controlBlock.querySelector('.active').classList.remove('active');
    controls[activeControl - 1].classList.add('active');
    
    showItems(countNews, activeControl, contentBlock);
    
    var countContr = Math.ceil(contentBlock.length / countNews);
    console.log('countContr = ' + countContr);
        
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
        console.log("!! " + targetElem.getAttribute('data-toggler'));
        var activeControl = targetElem.getAttribute('data-toggler');
        controlBlock.querySelector('.active').classList.remove('active');
        controls[activeControl - 1].classList.add('active');
        
        showItems(countNews, activeControl, contentBlock);
      }
  }
  
  function showItems(countLine, activeControl, contentBlock) {
    var start = (activeControl - 1) * countLine;
    var end = activeControl * countLine - 1;
    console.log('start = ' + start);
    console.log('end = ' + end);
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
  
})();