/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id){ return document.getElementById(id); };


var initialize = function(){
  if (undefined === localStorage.safariExtention){
    localStorage.id = 0;
    storage.create();
  }
  storage.initialize();
};


var storage = (function(){
  var value_ = [];
  return {
    getValue : function(){
      return value_;
    },
    setValue : function(obj){
      value_ = obj;
      localStorage.safariExtention = JSON.stringify(value_);
    },
    initialize : function(){
      value_ = JSON.parse(localStorage.safariExtention);
    },
    create : function(listName){
      var storageID = localStorage.id;
      var thisID = parseInt(storageID, 10)+1;
      localStorage.id = thisID;
      var obj = {
        id : thisID,
        sortId : 1, // Unimplemented
        name : listName ? listName : 'New List',
        runFlag : true,
        url : [],
        timeZone : ['0000-2400'],
        week : {sun : true, mon : true, tue : true, wed : true, thu : true, fri : true, sat : true},
        viewTime : 0, // Unimplemented
        viewInterval : 'day', // Unimplemented
        displayTimeFlag : true, // Unimplemented
        jumpUrl : '', // Unimplemented
        delay : 0
      };
      value_.unshift(obj);
    }
  };
}());


var now = (function(){
  var dateObj = new Date();
  var weekDayList = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

  var year = dateObj.getFullYear();
  var month = dateObj.getMonth()+1;
  var date = dateObj.getDate();
  var hour = dateObj.getHours();
  var minute = ('0'+dateObj.getMinutes()).slice(-2);
  var second = dateObj.getSeconds();
  var weekDay = weekDayList[dateObj.getDay()];

  return {
    getTime : parseInt(hour +''+ minute, 10),
    getWeek : weekDay,
    getTodaysWeek : function(obj){
      // alert(JSON.stringify(obj));
      switch (this.getWeek) {
        case 'sun' :
          return obj.week.sun;
          break;
        case 'mon' :
          return obj.week.mon;
          break;
        case 'tue' :
          return obj.week.tue;
          break;
        case 'wed' :
          return obj.week.wed;
          break;
        case 'thu' :
          return obj.week.thu;
          break;
        case 'fri' :
          return obj.week.fri;
          break;
        case 'sat' :
          return obj.week.sat;
          break;
        default :
          break;
      }
    }
  }
}());

// alert(now.getWeek);


var receiveMessage = function(event){
  switch (event.name){

    // from option
    case 'setStorage' :
      storage.setValue(event.message);
      // alert(JSON.stringify(storage.getValue()));
      break;

    // from option
    case 'getStorage' :
      var storageValue = storage.getValue();
      event.target.page.dispatchMessage('setStorage', storageValue); // to option
      break;

    // from option
    case 'createStorage' :
      var listName = event.message;
      storage.create(listName);
      event.target.page.dispatchMessage('createStorage'); // to option
      break;

    // from injecting start
    case 'checkUrlList' :
      var storageValue = storage.getValue();
      if ('' == storageValue){ break; }

      // flag judgment
      var targetID = [];
      var storageURL = [];
      var nowTime;
      var startTime;
      var endTime;
      var todaysWeek
      for (var i = 0, len = storageValue.length; i < len; i++){
        if (true === storageValue[i].runFlag){
          todaysWeek = now.getTodaysWeek(storageValue[i]);
          if (true === todaysWeek){
            nowTime = now.getTime;

            for (var j = 0, lenj = storageValue[i].timeZone.length; j < lenj; j++){
              startTime = parseInt(storageValue[i].timeZone[j].substring(0,4), 10);
              endTime = parseInt(storageValue[i].timeZone[j].substring(5,9), 10);
              if (startTime < nowTime && endTime > nowTime) {
                storageURL = storageURL.concat(storageValue[i].url);
                targetID.push(i);
              }
            }

          }
        }
      }

      // jump
      var pageURL = event.message;

      for (var i = 0, len = targetID.length; i < len; i++){
        var target = storageValue[targetID[i]];
        var jumpUrl = target.jumpUrl;
        var delaySecond = target.delay * 1000;
        var loopFlag = false;

        for (var j = 0, lenj = target.url.length; j < lenj; j++){
          var targetURL = target.url[j].replace(/.*\/\/|\/.*/g, '').split(/\r\n|\r|\n/).toString();
          if (pageURL === targetURL){
            if ('' !== jumpUrl){
              event.target.page.dispatchMessage('jumpPage', jumpUrl); // to injecting end
            } else {
              event.target.page.dispatchMessage('stopPageLoad', delaySecond); // to injecting end
            }
            loopFlag = true;
            break;
          }
        }
        if (true === loopFlag){ break; }
      }

      break;

    // from injecting start
    case 'showPopoverURL' :
      var pageUrl = event.message;
      var storageValue = storage.getValue();
      safari.extension.popovers[0].contentWindow.setActivePageUrl(pageUrl, storageValue); // to popover
      break;

    // from injectin end
    case 'requestAlertValue' :
      var storageValue = JSON.stringify(storage.getValue());
      event.target.page.dispatchMessage('showListData', storageValue); // to injecting end
      break;

    default:
      break;

  }
};
safari.application.addEventListener('message', receiveMessage, false);


initialize();
// localStorage.removeItem('safariExtention');


/* Option
---------------------------------------------------------------------- */

(function(){

  safari.extension.settings.openSettingsSafariCheckbox = false;

  var openSettings = function(event){
    if (event.key === 'openSettingsSafariCheckbox'){
      var htmlPath = 'html/options.html';
      var newTab = safari.application.activeBrowserWindow.openTab();
      newTab.url = safari.extension.baseURI + htmlPath;
    }
  };
  safari.extension.settings.addEventListener('change', openSettings, false);

}());

