'use strict';

(function () {

  const mainPin = document.querySelector(`.map__pin--main`);
  const mapFilters = window.util.map.querySelector(`.map__filters`);
  const adFormElements = Array.from(window.util.adForm.querySelectorAll(`.ad-form__element`));
  const mapFiltersElements = Array.from(mapFilters.children);
  const fragment = document.createDocumentFragment();
  const addressInput = window.util.adForm.querySelector(`#address`);
  const MainPinParams = {
    MAIN_PIN_WIDTH: 65,
    MAIN_PIN_HEIGHT_NOT_ACTIVE: 65,
    MAIN_PIN_HEIGHT: 85
  };
  const MAIN_PIN_CENTER = MainPinParams.MAIN_PIN_WIDTH / 2;
  const MIN_COORD_Y = window.util.MapLimits.MAP_START_Y - MainPinParams.MAIN_PIN_HEIGHT;
  const MAX_COORD_Y = window.util.MapLimits.MAP_END_Y - MainPinParams.MAIN_PIN_HEIGHT;

  let activatedPage = false;

  const removeDisabled = function (array) {
    array.forEach((elem) => {
      elem.removeAttribute(`disabled`);
    });
  };

  const activatePage = function () {
    activatedPage = true;
    window.util.map.classList.remove(`map--faded`);
    window.util.adForm.classList.remove(`ad-form--disabled`);
    removeDisabled(adFormElements);
    removeDisabled(mapFiltersElements);

    for (let i = 0; i < window.util.similarAdverts.length; i++) {
      fragment.appendChild(window.advert.renderAdvert(window.util.similarAdverts[i]));
    }
    window.util.mapPins.appendChild(fragment);
  };

  const disableForms = function () {
    window.util.addDisabled(adFormElements);
    window.util.addDisabled(mapFiltersElements);
  };

  const setAdressToField = function () {
    let positionX = +mainPin.style.left.slice(0, -2);
    let positionY = +mainPin.style.top.slice(0, -2);
    let mainCoordX = (positionX + MAIN_PIN_CENTER).toFixed();
    let mainCoordY;
    if (activatedPage) {
      mainCoordY = (positionY + MainPinParams.MAIN_PIN_HEIGHT).toFixed();
    } else {
      mainCoordY = (positionY + MainPinParams.MAIN_PIN_HEIGHT_NOT_ACTIVE / 2).toFixed();
    }

    addressInput.value = `${mainCoordX}, ${mainCoordY}`;
  };

  setAdressToField();

  disableForms();

  mainPin.addEventListener(`keydown`, function (evt) {
    window.util.isEnterEvent(evt, activatePage);
  });

  mainPin.addEventListener(`mousedown`, function (evt) {

    if (evt.button === 0) {

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      let dragged = false;

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        dragged = true;

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
          mainPin.style.top = MIN_COORD_Y + 'px';
        }
        if (movedCoordY >= MAX_COORD_Y) {
          mainPin.style.top = MAX_COORD_Y + 'px';
        }
        if (movedCoordX <= -(MAIN_PIN_CENTER)) {
          mainPin.style.left = -(MAIN_PIN_CENTER) + 'px';
        }
        if (movedCoordX >= (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER)) {
          mainPin.style.left = (window.util.MapLimits.MAP_END_X - MAIN_PIN_CENTER) + 'px';
        }

        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;

        setAdressToField();

      };

      const onMouseUp = function () {

        if (!activatedPage) {
          activatePage();
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
