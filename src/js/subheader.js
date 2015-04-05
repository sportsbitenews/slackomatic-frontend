import {isF} from 'magic-types';
import {each} from 'magic-loops';

var hack = document.documentElement.doScroll
  , loaded = (hack ? /^loaded|^c/ : /^loaded|^i|^c/).test(document.readyState)
  , animDuration = 5000
  , interval
  , containerDiv = document.querySelector('header.main div.sub')
  , visibleClassName = 'visible'
  , intervalRunning = false;
;

function setup() {
  var lis = containerDiv.querySelectorAll('li')
    , regex = /[oO0\!\?]/g
  ;

  each(lis, (li) => {
    if ( li.innerHTML ) {
      var html = li.innerHTML;
      if ( html ) {
        html = html.replace( regex, (s) => {
          return `<span class="pinkie">${s}</span>`;
        });
      }
      li.innerHTML = html;
    }
  });

  if ( window.innerWidth >= 320 ) {
    if ( ! loaded ) {
      document.addEventListener('DOMContentLoaded', addInterval);
    } else {
      addInterval();
    }
  }
}

setup();

function addInterval() {
  if ( intervalRunning === false ) {
    intervalRunning = true;
    interval = setInterval( showHide, animDuration );
  }
}

function removeInterval() {
   if ( intervalRunning ) {
    intervalRunning = false;
    clearInterval(interval);
  }
}


function showHide() {
  if ( window.innerWidth >= 320 ) {
    var hidden = containerDiv.querySelectorAll('li:not(.visible)')
      , ran = Math.floor(Math.random() * ( hidden.length - 0.01 ) )
      , showNow = hidden[ran]
    ;

    hideAll();

    if ( showNow && showNow.classList && isF(showNow.classList.add) ) {
      showNow.classList.add(visibleClassName);
    }
  }
}

function hideAll() {
  var shown = containerDiv.querySelectorAll('li.visible'); 
  each(shown, (li) => {
    if ( li.classList && isF(li.classList.remove) ) {
      li.classList.remove(visibleClassName);
    }
  });
}

function showFirstChild() {
  var child = containerDiv.querySelector('li:first-child');
  hideAll();
  if ( child && child.classList && isF(child.classList.add) ) {
    child.classList.add(visibleClassName);
  }
}

window.addEventListener('resize', () => {
  if ( window.innerWidth < 320 ) {
    showFirstChild();
    removeInterval();
  } else {
    addInterval();
  }
});
