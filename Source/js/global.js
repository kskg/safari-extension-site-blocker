/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID'
var $id = function(id){ return document.getElementById(id); };


(function(){


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
      create : function(){
        var storageID = localStorage.id;
        var thisID = parseInt(storageID, 10)+1;
        localStorage.id = thisID;
        var obj = {
          id : thisID,
          sortId : 1, // Unimplemented
          name : 'New List',
          runFlag : true,
          url : [],
          timeZone : ['0000-2400'],
          week : {sun : true, mon : true, tue : true, wed : true, thu : true, fri : true, sat : true},
          viewTime : 0, // Unimplemented
          viewInterval : 'day', // Unimplemented
          displayTimeFlag : true, // Unimplemented
          jumpUrl : '', // Unimplemented
          delay : 0 // Unimplemented
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
        storage.create();
        event.target.page.dispatchMessage('createStorage'); // to option
        break;

      // from injecting start
      case 'checkUrlList' :
        var storageValue = storage.getValue();
        if ('' == storageValue){ break; }

        // flag judgment
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
                // alert(nowTime +' / '+ startTime +'-'+ endTime);
                if (startTime < nowTime && endTime > nowTime) {
                  storageURL = storageURL.concat(storageValue[i].url);
                }
              }

            }
          }
        }

        var hostnameArray = [];
        for (var i = 0, len = storageURL.length; i < len; i++){
          var hostname = storageURL[i].replace(/.*\/\/|\/.*/g, '').split(/\r\n|\r|\n/);
          hostnameArray.push(hostname);
        }

        var pageURL = event.message;
        for (var i = 0, len = hostnameArray.length; i < len; i++){
          if (pageURL == hostnameArray[i]){
            event.target.page.dispatchMessage('stopPageLoad'); // to injecting start
          }
        }
        break;

      // from injecting start
      case 'showPopoverURL' :
        var pageURL = event.message;
        safari.extension.popovers[0].contentWindow.setActivePageUrl(pageURL); // to popover
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


}());


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

