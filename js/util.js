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
    isEscEvent: function (evt, action, arg) {
      if (evt.keyCode === ESC_KEYCODE) {
        evt.preventDefault();
        action(arg);
      }
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action();
      }
    },
    addDisabled: function (array) {
      array.forEach((elem) => {
        elem.setAttribute(`disabled`, true);
      });
    }
  };

})();
