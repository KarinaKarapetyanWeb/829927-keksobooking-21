'use strict';

(function () {

  const addressInput = window.util.adForm.querySelector(`#address`);
  const MainPinParam = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT_NOT_ACTIVE: 65,
    MAIN_PIN_HEIGHT: 85
  };
  const MAIN_PIN_CENTER = MainPinParam.MAIN_PIN_WIDTH / 2;
  const MIN_COORD_Y = window.util.MapLimits.MAP_START_Y - MainPinParam.MAIN_PIN_HEIGHT;
  const MAX_COORD_Y = window.util.MapLimits.MAP_END_Y - MainPinParam.MAIN_PIN_HEIGHT;

  const setAdressToField = function () {
    let positionX = +window.util.mainPin.style.left.slice(0, -2);
    let positionY = +window.util.mainPin.style.top.slice(0, -2);
    let mainCoordX = (positionX + MAIN_PIN_CENTER).toFixed();
    let mainCoordY;
    if (window.util.activatedPage) {
      mainCoordY = (positionY + MainPinParam.MAIN_PIN_HEIGHT).toFixed();
    } else {
      mainCoordY = (positionY + MainPinParam.MAIN_PIN_HEIGHT_NOT_ACTIVE / 2).toFixed();
    }

    addressInput.value = `${mainCoordX}, ${mainCoordY}`;
  };

  setAdressToField();

  window.util.mainPin.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, window.page.activate);
  });

  window.util.mainPin.addEventListener(`mousedown`, function (evt) {

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

        let movedCoordY = window.util.mainPin.offsetTop - shift.y;
        let movedCoordX = window.util.mainPin.offsetLeft - shift.x;

        if (movedCoordY <= MIN_COORD_Y) {
          window.util.mainPin.style.top = MIN_COORD_Y + `px`;
        }
        if (movedCoordY >= MAX_COORD_Y) {
          window.util.mainPin.style.top = MAX_COORD_Y + `px`;
        }
        if (movedCoordX <= -(MAIN_PIN_CENTER)) {
          window.util.mainPin.style.left = -(MAIN_PIN_CENTER) + `px`;
        }
        if (movedCoordX >= (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER)) {
          window.util.mainPin.style.left = (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER) + `px`;
        }

        window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + `px`;
        window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + `px`;

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

  window.drag = {
    setAdressToField
  };

})();
