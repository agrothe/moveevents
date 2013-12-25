Move Events
==========

Javascript Up/Down/Right/Left move events

Example Usage:

var m = moveEvents({
  element: document.getElementById('mydiv'),
  swipeLeft: function(e){console.log('swipeLeft');},
  swipeRight: function(e){console.log('swipeRight');},
  swipeDown: function(e){console.log('swipeDown');},
  swipeUp: function(e){console.log('swipeUp');}
});

Each swipe event provides access to the original element.

```
swipeDown: function(e){ MoveDown(e); },
```

```
function MoveDown(element){
	var top = parseInt(element.style.top.replace('px',''));
	top += 10;
	element.setAttribute('style', 'top:' + top + 'px');
}
```