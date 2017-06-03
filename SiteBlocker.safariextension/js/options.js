/* Code
---------------------------------------------------------------------- */

// Replace 'document.***'
var $id  = function(id)  { return document.getElementById(id); };
var $cn  = function(cn)  { return document.getElementsByClassName(cn); };
var $tag = function(tag) { return document.getElementsByTagName(tag); };
var $qsa = function(qsa) { return document.querySelectorAll(qsa); };


(function() {


  var initialize = function() {
    storage.initialize();
  };


  var storage = (function() {
    var value_ = [];
    return {
      getValue : function() {
        return value_;
      },
      setValue : function(obj) {
        value_ = obj;
        safari.self.tab.dispatchMessage('setStorage', value_); // to global
      },
      initialize : function() {
        safari.self.tab.dispatchMessage('getStorage'); // to global
      },
      create : function(listName) {
        safari.self.tab.dispatchMessage('createStorage', listName); // to global
      }
    };
  }());


  var receiveMessage = function(event) {
    switch (event.name) {

      // from global
      case 'setStorage' :
        storage.setValue(event.message);
        refreshMainContent();
        refreshSideContent();
        break;

      // from global
      case 'createStorage' :
        storage.initialize();
        refreshMainContent();
        refreshSideContent();
        var message = 'Create New List! :D';
        showMessage(message);
        break;

      default:
        break;
    }
  };
  safari.self.addEventListener('message', receiveMessage, false);


  var getCurrentID = function() {
    var listItem = $id('js__side__list').children;
    var target = $id('js__side__list').getElementsByClassName('is-ON');
    for (var i = 0, len = listItem.length; i < len; i++) {
      if (target.item(0) === listItem[i]) {
        var index = i ;
        break;
      };
    };
    return index;
  };


  var showMessage = function(message) {
    var target = $id('js__message');
    target.innerHTML = message;
    target.classList.add('is-ON');
    setTimeout(function() {
      target.classList.remove('is-ON');
    }, 3500);
  };


  var refreshMainContent = function(listID) {
    var id = listID;
    if (undefined === id) { var id = 0; }

    var storageValue = storage.getValue();

    $id('js__name').innerHTML = storageValue[id].name;
    $id('js__text--urlList').value = storageValue[id].url.join('\n');
    if (true === storageValue[id].runFlag) {
      $id('js__runFlag--on').checked = true;
      $id('js__main').classList.remove('is-OFF');
    } else {
      $id('js__runFlag--off').checked = true;
      $id('js__main').classList.add('is-OFF');
    }
    $id('js__timeZone').value = storageValue[id].timeZone;
    $id('js__week--sun').checked = storageValue[id].week.sun;
    $id('js__week--mon').checked = storageValue[id].week.mon;
    $id('js__week--tue').checked = storageValue[id].week.tue;
    $id('js__week--wed').checked = storageValue[id].week.wed;
    $id('js__week--thu').checked = storageValue[id].week.thu;
    $id('js__week--fri').checked = storageValue[id].week.fri;
    $id('js__week--sat').checked = storageValue[id].week.sat;
    $id('js__blockType').value = storageValue[id].blockType;
    changeBlockType();
    $id('js__viewTime').value = storageValue[id].viewTime;
    $id('js__viewInterval').value = storageValue[id].viewInterval;
    $id('js__displayTimeFlag').checked = storageValue[id].displayTimeFlag;
    $id('js__jumpUrl').value = storageValue[id].jumpUrl;
    $id('js__delay').value = storageValue[id].delay;

    $id('js__main').scrollTo(0, 0);
  };


  var refreshSideContent = function() {
    resetSideContent();
    addSideContentClickEvent();
    sortableList();
  };


  var resetSideContent = function() {
    var target = $id('js__side__list');
    target.innerHTML = '';

    var storageValue = storage.getValue();
    var listItem = $id('js__side__list').children;

    // insert side list
    for (var i = 0; i < storageValue.length; i++) {
      var element = target.innerHTML;
      var name = storageValue[i].name;
      var sortId = i;
      target.innerHTML = element + '<li class="side__list__item" data-sortID="' + sortId + '">' + name + '</li>';

      if(!storageValue[i].runFlag) {
        listItem[i].classList.add('is-Disable');
      }
    };

    listItem[0].classList.add('is-ON'); // insert first item 'is-ON'
  };


  var addSideContentClickEvent = function() {
    var listItem = $id('js__side__list').children;

    var event = function() {
      var targetID = this.getAttribute('data-sortID');
      refreshMainContent(targetID);
      removeClass();
      this.classList.add('is-ON');
      // scrollTo(0, 0);
    };

    var removeClass = function() {
      for (var i = 0, len = listItem.length; i < len; i++) {
        listItem[i].classList.remove('is-ON');
      };
    };

    for (var i = 0, len = listItem.length; i < len; i++) {
      listItem[i].addEventListener('click', event, false);
    };
  };


  var refreshSideContentSortId = function() {
    var listItem = $id('js__side__list').children;
    for (var i = 0, len = listItem.length; i < len; i++) {
      listItem[i].setAttribute('data-sortID',i)
    };
  };


  var saveSettings = function() {
    var id = getCurrentID();
    var storageValue = storage.getValue();

    // set value
    storageValue[id].name = $id('js__name').innerHTML;
    storageValue[id].url = $id('js__text--urlList').value.split(/\r\n|\r|\n/);
    if (true === storageValue[id].runFlag) {
      storageValue[id].runFlag = true;
    } else {
      storageValue[id].runFlag = false;
    }
    storageValue[id].timeZone = $id('js__timeZone').value.split(',');
    storageValue[id].week.sun = $id('js__week--sun').checked;
    storageValue[id].week.mon = $id('js__week--mon').checked;
    storageValue[id].week.tue = $id('js__week--tue').checked;
    storageValue[id].week.wed = $id('js__week--wed').checked;
    storageValue[id].week.thu = $id('js__week--thu').checked;
    storageValue[id].week.fri = $id('js__week--fri').checked;
    storageValue[id].week.sat = $id('js__week--sat').checked;
    storageValue[id].blockType = $id('js__blockType').value;
    storageValue[id].viewTime = parseInt($id('js__viewTime').value, 10);
    storageValue[id].viewInterval = $id('js__viewInterval').value;
    storageValue[id].displayTimeFlag = $id('js__displayTimeFlag').checked;
    storageValue[id].jumpUrl = $id('js__jumpUrl').value;
    storageValue[id].delay = parseInt($id('js__delay').value, 10);

    storage.setValue(storageValue);
  };


  (function() {
    var editListName = function() {
      var target = $id('js__name');
      var listName = target.innerHTML;

      var promptMessage = 'Edit List Name';
      var promptResult = prompt(promptMessage, listName);

      if (promptResult === null) { return false; }

      var id = getCurrentID();
      var listItem = $id('js__side__list').children;
      var storageValue = storage.getValue();

      target.innerHTML = promptResult;
      listItem[id].innerHTML = promptResult;
      storageValue[id].name = promptResult;

      storage.setValue(storageValue);

      var message = 'Save Successful :)';
      showMessage(message);
    };
    $id('js__name--edit').addEventListener('click', editListName, false);
  }());


  (function() {
    var changeRunFlagIsOn = function() {
      var id = getCurrentID();
      var mainContent = $id('js__main');
      var listItem = $id('js__side__list').children;
      var storageValue = storage.getValue();

      mainContent.classList.remove('is-OFF');
      listItem[id].classList.remove('is-Disable');
      storageValue[id].runFlag = true;
      saveSettings();
    }
    $id('js__runFlag--on').addEventListener('change', changeRunFlagIsOn, false);
  }());


  (function() {
    var changeRunFlagIsOff = function() {
      var id = getCurrentID();
      var mainContent = $id('js__main');
      var listItem = $id('js__side__list').children;
      var storageValue = storage.getValue();

      mainContent.classList.add('is-OFF');
      listItem[id].classList.add('is-Disable');
      storageValue[id].runFlag = false;
      refreshMainContent(id);
      saveSettings();
    };
    $id('js__runFlag--off').addEventListener('change', changeRunFlagIsOff, false);
  }());


  (function() {
    var submitAddNewListButton = function() {
      var listItem = $id('js__side__list').children;
      var target = $id('js__side__list');
      var element = target.innerHTML;
      var sortID = listItem.length;

      var promptMessage = 'Please New List Name';
      var promptResult = prompt(promptMessage, 'New List');

      if (promptResult === null) { return false; }

      storage.create(promptResult);
      refreshMainContent();
      refreshSideContent();

      listItem[0].classList.add('is-New'); // insert first item 'is-New'
    }
    $id('js__addList').addEventListener('click', submitAddNewListButton, false);
  }());


  var submitSaveButton = function() {
    saveSettings();

    var message = 'Save Successful :)';
    showMessage(message);
    return false;
  }
  $id('js__btn--save').addEventListener('click', submitSaveButton, false);


  (function() {
    var submitDeleteButton = function() {
      var currentID = getCurrentID();
      var storageValue = storage.getValue();
      var listName = storageValue[currentID].name;

      var confirmDeleteList = confirm('Delete "' + listName + '"?');
      if (confirmDeleteList === false) { return false; }

      storageValue.splice(currentID, 1);

      refreshMainContent();
      refreshSideContent();

      saveSettings();

      var message = 'Delete Successful XD';
      showMessage(message);
    }
    $id('js__btn--delete').addEventListener('click', submitDeleteButton, false);
  }());


  // ブロックタイプセレクト
  var changeBlockType = function(event) {
    var formValue = document.form.blockType.value;
    var switchBlockTypeOption = function() {
      $id('js__jumpUrl').parentNode.classList.add('is-OFF');
      $id('js__viewTime').parentNode.classList.add('is-OFF');
      $id('js__displayTimeFlag').parentNode.parentNode.classList.add('is-OFF');
      $id('js__delay').parentNode.classList.add('is-OFF');
    }

    switch (formValue) {
      // すぐにブロック
      case 'immediately':
        switchBlockTypeOption();
        $id('js__jumpUrl').parentNode.classList.remove('is-OFF');
        break;

      // 時間が経つと閲覧可能
      case 'after':
        switchBlockTypeOption();
        $id('js__delay').parentNode.classList.remove('is-OFF');
        break;

      // 指定した時間だけ閲覧可能
      case 'countdown':
        switchBlockTypeOption();
        $id('js__viewTime').parentNode.classList.remove('is-OFF');
        $id('js__displayTimeFlag').parentNode.parentNode.classList.remove('is-OFF');
        break;

      default:
        break;
    }
  }
  $id('js__blockType').addEventListener('change', changeBlockType, false);
  changeBlockType();


  var sortableList = function () {

    var listItem = $cn('side__list__item');
    var dragItem;
    var dropArea;
    var overItem;
    var replaceTarget;
    var sortId;
    var isDrag;
    var isOver;
    var position;
    var positionX;
    var positionY;
    var css = {
      drag : 'js__listDrag',
      over : 'js__listOver',
      remove : 'js__listRemove',
      dropArea : 'js__listDropArea'
    }


    var handleMouseDown = function(event) {
      isDrag = true;
      replaceTarget = this;

      // リストがズレないように自分を複製
      dragItem = this.cloneNode(false);
      dragItem.innerHTML = this.innerHTML;
      dragItem.classList.add(css.drag);
      dragItem.classList.add(css.remove);
      dragItem.style.left = '9999px';
      dragItem.style.top = '9999px';
      this.parentNode.insertBefore(dragItem, this.nextSibling);
      document.body.appendChild(dragItem);

      position = this.getBoundingClientRect();
      positionX = event.pageX - position.left;
      positionY = event.pageY - position.top;

      document.addEventListener('mousemove', handleMouseMove, false);
      document.addEventListener('mouseup', handleMouseUp, false);
    }


    var handleMouseMove = function(event) {
      dragItem.style.left = event.pageX - positionX + 'px';
      dragItem.style.top = event.pageY - positionY + 'px';
    }


    var handleMouseOver = function(event) {
      if (true === isDrag) {
        overItem = this;
        overItem.classList.add(css.over);

        // ドロップエリアを生成
        dropArea = document.createElement('li');
        dropArea.classList.add(css.dropArea);
        overItem.parentNode.insertBefore(dropArea, overItem.nextSibling);

        sortId = overItem.getAttribute('data-sortID');
        isOver = true;
      }
    }


    var handleMouseOut = function(event) {
      if (true === isDrag && true === isOver) {
        dropArea.parentNode.removeChild(dropArea);
        overItem.classList.remove(css.over);
        isOver = false;
      }
    }


    var handleMouseUp = function(event) {
      if (true === isOver) {
        dropArea.parentNode.removeChild(dropArea);
        overItem.parentNode.insertBefore(replaceTarget, overItem.nextSibling);
        overItem.classList.remove(css.over)

        // ストレージを更新
        var storageValue = storage.getValue();
        var sortedStorageValue = [];
        var sortIdArray = $qsa('.side__list__item');
        for (var i = 0, len = storageValue.length; i < len; i++) {
          sortedStorageValue.push(storageValue[sortIdArray[i].getAttribute('data-sortid')]);
        }
        storage.setValue(sortedStorageValue);
        refreshSideContentSortId();
      }

      dragItem.parentNode.removeChild(dragItem);

      document.removeEventListener('mousemove', handleMouseMove, false);
      document.removeEventListener('mouseup', handleMouseUp, false);

      isDrag = false;
      isOver = false;
    }


    for (var i = 0, len = listItem.length; i < len; i++) {
      listItem[i].addEventListener('mousedown', handleMouseDown, false);
      listItem[i].addEventListener('mouseover', handleMouseOver, false);
      listItem[i].addEventListener('mouseout', handleMouseOut, false);
    }

  }


  initialize();


}());


/* Debug
---------------------------------------------------------------------- */

function debugSet() {
  // var jsonData = 'jsonData';
  // localStorage.removeItem('safariExtention');
  // localStorage.safariExtention = JSON.stringify(jsonData);
  // location.reload();
}

function debugClear() {
  // var confirmDeleteList = confirm('Delete localStorage?');
  // if (confirmDeleteList === false) { return false; }
  // localStorage.removeItem('safariExtention');
  // location.reload();
}

function debugShow() {
}

