/* Code
---------------------------------------------------------------------- */

// Replace 'document.***'
var $id  = function(id)  { return document.getElementById(id); };
var $cn  = function(cn)  { return document.getElementsByClassName(cn); };
var $tag = function(tag) { return document.getElementsByTagName(tag); };
var $qsa = function(qsa) { return document.querySelectorAll(qsa); };


if (window.top === window) {


    (function() {
        var pageURL = location.hostname;
        safari.self.tab.dispatchMessage('checkUrlList', pageURL); // to global
    }());


    (function() {
        var receiveMessage = function(event) {
            switch (event.name) {

                // // from global
                // case 'stopPageLoad' :
                //     var htmlPath = 'html/dummy.html';
                //     var jumpURL = safari.extension.baseURI + htmlPath;
                //     document.location = jumpURL;
                //     // stop();
                //     break;

                // from popover
                case 'requestURL' :
                    var href = location.href;
                    var pageURL = href.match(/https?:\/\/[^\/]+\//);
                    safari.self.tab.dispatchMessage('showPopoverURL', pageURL); // to global
                    break;

                default:
                    break;
            }
        };
        safari.self.addEventListener('message', receiveMessage, false);
    }());


}