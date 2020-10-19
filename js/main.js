'use strict';

(function () {

  const mapFilters = window.util.map.querySelector(`.map__filters`);
  const adFormElements = Array.from(window.util.adForm.querySelectorAll(`.ad-form__element`));
  const mapFiltersElements = Array.from(mapFilters.children);
  const fragment = document.createDocumentFragment();

  const removeDisabled = function (array) {
    array.forEach((elem) => {
      elem.removeAttribute(`disabled`);
    });
  };

  const activatePage = function () {
    window.util.activatedPage = true;
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

  disableForms();

  window.util.mainPin.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, activatePage);
  });

  // перетаскивание

  window.util.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

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

      console.log(startCoords);

      if (moveEvt.clientX >= 1235 || moveEvt.clientX <= 200 || moveEvt.clientY >= 630 || moveEvt.clientY <= 130) {
        return;
      };

      window.util.mainPin.style.top = (window.util.mainPin.offsetTop - shift.y) + 'px';
      window.util.mainPin.style.left = (window.util.mainPin.offsetLeft - shift.x) + 'px';

      window.adress.setAdressToField();

    };

    var onMouseUp = function (upEvt) {

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (evt.button === 0) {
        activatePage();
        window.adress.setAdressToField();
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
