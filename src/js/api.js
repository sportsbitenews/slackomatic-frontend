import {each} from 'magic-loops';
import {isF} from 'magic-types';
import {frameGetRequest as frameGet} from './frameGetRequest';

class Api {
  constructor() {
    this.rootUrl = 'http://10.20.30.90:8080/slackomatic/';

    //add eventlisteners to all inputs
    var clickInputs = document.body.querySelectorAll('input[data-command]');
    each(clickInputs, (input) => {
      if ( isF(input.addEventListener) ) {
        input.addEventListener( 'click', this.clickEventListener.bind(this), false );
      }
    });
    //httpGet request /slackomatic/room/lounge/powersaving/killswitch/reset 
    frameGet(this.rootUrl + 'rooms/lounge/powersaving/killswitch/reset');
  }

  clickEventListener(evt) {
    if ( evt.target || isF(evt.target.getAttribute === 'function') ) {
      let command = evt.target.getAttribute('data-command')
        , url = this.rootUrl + command
      ;
      frameGet(url);
    }
  }
}

export default new Api();
