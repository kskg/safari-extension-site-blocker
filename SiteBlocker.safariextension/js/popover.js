/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id){ return document.getElementById(id); };


var showPopover = function(){
  safari.application.activeBrowserWindow.activeTab.page.dispatchMessage('requestURL'); // to injecting start
};
safari.application.addEventListener('popover', showPopover, true);


// from Global
var setActivePageUrl = function(pageUrl, storageValue){
  $id('js__ActivePageUrl').innerHTML = pageUrl;

  var target = $id('js__select--listName');
  target.innerHTML = '';

  for (var i = 0; i < storageValue.length; i++){
    var element = target.innerHTML;
    target.innerHTML = element + '<option value="' + i + '">' + storageValue[i].name + '</option>';
  };

  document.activeElement.blur();
  $id('js__added').classList.remove('is-ON');
}


// add button
var submitAddURL = function(event){
  var pageURL = $id('js__ActivePageUrl').innerHTML;
  var id = document.addList.listName.value;

  // safari.extension.globalPage.contentWindow.setLocalStorage(pageURL);
  var storageValue = safari.extension.globalPage.contentWindow.storage.getValue();
  storageValue[id].url.unshift(pageURL);

  $id('js__added').classList.add('is-ON');
  $id('js__added__txt').innerHTML = 'Added to “' + storageValue[id].name +'”';

  return false;
};
$id('js__btn--add').addEventListener('click', submitAddURL, false);


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
