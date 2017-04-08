/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id){ return document.getElementById(id); };


var showPopover = function(){
  safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('requestURL'); // to injecting start
};
safari.application.addEventListener('popover', showPopover, true);


var setActivePageUrl = function(event){
  $id('js__ActivePageUrl').innerHTML = event;
  document.activeElement.blur();
}


var openSettings = function(){
  var newTab = safari.application.activeBrowserWindow.openTab();
  safari.self.hide();
}
$id('js__SettingOpen').addEventListener('click', openSettings, false);


var openGlobal = function(){
  var newTab = safari.application.activeBrowserWindow.openTab();
  safari.self.hide();
}
$id('js__globalOpen').addEventListener('click', openGlobal, false);


// // add button
// var submitAddURL = function(event){
//   var pageURL = $id('js__ActivePageUrl').innerHTML;
//   safari.extension.globalPage.contentWindow.setLocalStorage(pageURL);
//   // safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('addUrlToLocalStorage', pageURL);
//   // alert(pageURL);
// };
// $id('js__btn--add').addEventListener('click', submitAddURL, false);

