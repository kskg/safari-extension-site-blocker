/* Code
---------------------------------------------------------------------- */

// Replace 'document.***'
var $id  = function(id)  { return document.getElementById(id); };
var $cn  = function(cn)  { return document.getElementsByClassName(cn); };
var $tag = function(tag) { return document.getElementsByTagName(tag); };
var $qsa = function(qsa) { return document.querySelectorAll(qsa); };


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