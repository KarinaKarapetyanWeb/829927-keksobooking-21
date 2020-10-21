'use strict';

(function () {

  const SIMILAR_ADVERTS_COUNT = 8;
  const mapFilters = window.util.map.querySelector(`.map__filters`);
  const adFormElements = Array.from(window.util.adForm.querySelectorAll(`.ad-form__element`));
  const mapFiltersElements = Array.from(mapFilters.children);

  const onLoadAction = function (adverts) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < SIMILAR_ADVERTS_COUNT; i++) {
      fragment.appendChild(window.advert.render(adverts[i]));
    }
    window.util.mapPins.appendChild(fragment);
  };

  const onErrorAction = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `position: absolute; z-index: 1; width: 400px; font-size: 30px; text-align: center; left: 50%; top: 200px; margin-left: -200px; padding: 30px; background-color: rgba(0, 0, 0, 0.7); color: #ffffff;`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const removeDisabled = function (array) {
    array.forEach((elem) => {
      elem.removeAttribute(`disabled`);
    });
  };

  const disableForms = function () {
    window.util.addDisabled(adFormElements);
    window.util.addDisabled(mapFiltersElements);
  };

  const activatePage = function () {
    window.util.activatedPage = true;
    window.util.map.classList.remove(`map--faded`);
    window.util.adForm.classList.remove(`ad-form--disabled`);
    removeDisabled(adFormElements);
    removeDisabled(mapFiltersElements);

    window.backend.load(onLoadAction, onErrorAction);
  };

  window.page = {
    activate: activatePage,
    disable: disableForms
  };

})();
