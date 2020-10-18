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

  window.util.mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  });

  window.util.mainPin.addEventListener(`keydown`, function (evt) {
    window.util.isEscEvent(evt, activatePage);
  });

})();
