'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  const addressInput = window.util.adForm.querySelector(`#address`);
  const MainPinParams = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT_NOT_ACTIVE: 65,
    MAIN_PIN_HEIGHT: 85
  };
  const MAIN_PIN_CENTER = MainPinParams.MAIN_PIN_WIDTH / 2;
  const MIN_COORD_Y = window.util.MapLimits.MAP_START_Y - MainPinParams.MAIN_PIN_HEIGHT;
  const MAX_COORD_Y = window.util.MapLimits.MAP_END_Y - MainPinParams.MAIN_PIN_HEIGHT;

  const setAdressToField = function () {
    let positionX = +mainPin.style.left.slice(0, -2);
    let positionY = +mainPin.style.top.slice(0, -2);
    let mainCoordX = (positionX + MAIN_PIN_CENTER).toFixed();
    let mainCoordY;
    if (window.util.activatedPage) {
      mainCoordY = (positionY + MainPinParams.MAIN_PIN_HEIGHT).toFixed();
    } else {
      mainCoordY = (positionY + MainPinParams.MAIN_PIN_HEIGHT_NOT_ACTIVE / 2).toFixed();
    }

    addressInput.value = `${mainCoordX}, ${mainCoordY}`;
  };

  window.page.disable();

  setAdressToField();

  mainPin.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, window.page.activate);
  });

  mainPin.addEventListener(`mousedown`, function (evt) {

    if (evt.button === 0) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        const shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let movedCoordY = mainPin.offsetTop - shift.y;
        let movedCoordX = mainPin.offsetLeft - shift.x;

        if (movedCoordY <= MIN_COORD_Y) {
          mainPin.style.top = MIN_COORD_Y + `px`;
        }
        if (movedCoordY >= MAX_COORD_Y) {
          mainPin.style.top = MAX_COORD_Y + `px`;
        }
        if (movedCoordX <= -(MAIN_PIN_CENTER)) {
          mainPin.style.left = -(MAIN_PIN_CENTER) + `px`;
        }
        if (movedCoordX >= (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER)) {
          mainPin.style.left = (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER) + `px`;
        }

        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

        setAdressToField();

      };

      const onMouseUp = function () {

        if (!window.util.activatedPage) {
          window.page.activate();
        }

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);
        setAdressToField();

      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

    }
  });

})();
