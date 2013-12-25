/*
 * Pure Javascript plugin to handle swipe events.
 * Exposes swipeUp, swipeDown, swipeLeft and swipeRight methods
 * Adapted from the jQuery plugin by Andreas Waltl, (http://www.netcu.de)
 * 
 * Version 1.0 Dec 25, 2013
 * GIT: https://github.com/agrothe/moveevents
 */

var moveEvents = (function(){
  var mymove = {};
  var defaults = {
    element: null,
    minMoveX: 20,
    minMoveY: 20,
    swipeLeft: function(){},
    swipeRight: function(){},
    swipeUp: function(){},
    swipeDown: function(){},
    preventDefaults: true,
    startX: null,
    startY: null,
    isMoving: false
  };
  
  mymove.cancelTouch = cancelTouch;
  function cancelTouch(){
    console.log('cancelTouch');
    mymove.element.removeEventListener('mousemove', mymove.onTouchMove);
    mymove.startX = null;
    mymove.isMoving = null;
  } // cancelTouch
  
  mymove.onTouchMove = onTouchMove;
  function onTouchMove(e){
    console.log('TouchMove');
    var x = e.pageX;
    var dx = mymove.startX - x;
    var y = e.pageY; 
    var dy = mymove.startY - y;
    if(Math.abs(dx) >= mymove.minMoveX){
      mymove.cancelTouch();
      if(dx > 0){
        mymove.swipeLeft(mymove.element);
      }else {
        mymove.swipeRight(mymove.element);
      }
    } else if(Math.abs(dy) >= mymove.minMoveY){
      mymove.cancelTouch();
      if(dy > 0){
        mymove.swipeUp(mymove.element);
      } else {
        mymove.swipeDown(mymove.element);
      }
    }
  } //onTouchMove
  
  mymove.onTouchStart = onTouchStart;
  function onTouchStart(e){
    console.log('TouchStart');
    if (e !== null) {
      mymove.startX = e.pageX;
      mymove.startY = e.pageY;
      mymove.isMoving = true;
      mymove.element.addEventListener('mousemove', mymove.onTouchMove, false);
    }
  } // onTouchStart
  
  
  mymove.init = init;
  function init(config){
    defaults = extend(defaults, config);
    for(var key in defaults)
            mymove[key] = defaults[key];
    
    mymove.element.addEventListener('mousedown', mymove.onTouchStart, false);
  } // init
  
  mymove.extend = extend;
  function extend(a, b){
    for(var key in b)
      if(b.hasOwnProperty(key))
        a[key] = b[key];
    return a;
  } // extend
  
  return mymove.init;
})();