/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id) { return document.getElementById(id); };


(function() {

  var dummy = function() {
    $id('js__owata').innerHTML = '／(^o^)＼／(^o^)＼／(^o^)＼';

    var hajimata = function() {
      $id('js__owata').innerHTML = '＼(^o^)／＼(^o^)／＼(^o^)／';
    }
    setTimeout(hajimata, 200)
  };
  setInterval(dummy, 400);


}());