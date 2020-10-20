'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const ENTER_KEYCODE = 13;

  window.util = {
    similarAdverts: [],
    mainPin: document.querySelector(`.map__pin--main`),
    adForm: document.querySelector(`.ad-form`),
    map: document.querySelector(`.map`),
    mapPins: document.querySelector(`.map__pins`),
    activatedPage: false,
    MapLimits: {
      MAP_START_X: 200,
      MAP_END_X: 1235,
      MAP_START_Y: 130,
      MAP_END_Y: 630
    },
    isEscEvent(evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action();
      }
    },
    isEnterEvent(evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    addDisabled(array) {
      array.forEach((elem) => {
        elem.setAttribute(`disabled`, true);
      });
    }
  };

})();
