/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id){ return document.getElementById(id); };


if (window.top === window){


  // (function(){
  //   var element = document.createElement('div');
  //   element.id = 'injecting__mask';
  //   // element.innerHTML = 'test';
  //   document.getElementsByTagName('body').item(0).appendChild(element);

  //   var hideMask = function(){
  //     element.parentNode.removeChild(element);
  //   }
  //   setTimeout(hideMask, 2000);
  // }());


  safari.self.tab.dispatchMessage('requestAlertValue'); // to global


  var receiveMessage = function(event){
    switch (event.name){

      // from global
      case 'showListData' :
        // var element = document.createElement('div');
        // element.id = 'injecting__url';
        // element.innerHTML = event.message;
        // element.style.opacity = 0;
        // document.getElementsByTagName('body').item(0).appendChild(element);
        break;

      default:
        break;
    }
  };
  safari.self.addEventListener('message', receiveMessage, false);


  // keydown 'D' show URL
  var keyDown = function(event){
    if (68 === event.keyCode){
      var elementOpacity = parseInt($id('injecting__url').style.opacity, 10);
      if (0 === elementOpacity){
        $id('injecting__url').style.opacity = 1;
      } else {
        $id('injecting__url').style.opacity = 0;
      }
    }
  };
  document.addEventListener('keydown', keyDown);


}