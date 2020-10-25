'use strict';

(function () {

  const houseType = window.util.mapFilters.querySelector(`#housing-type`);
  let filteredAdverts = [];

  window.util.mapFilters.addEventListener(`change`, function () {
    window.map.closeCard();
  });

  houseType.addEventListener(`change`, function () {
    const fragment = document.createDocumentFragment();
    let value = houseType.value;

    if (value !== `any`) {
      filteredAdverts = window.util.advertsData.filter((item) => {
        if (item.offer.type === value) {
          return item;
        }
      });
    } else {
      filteredAdverts = window.util.advertsData;
    }

    let number = filteredAdverts.length > window.util.SIMILAR_ADVERTS_COUNT ? window.util.SIMILAR_ADVERTS_COUNT : filteredAdverts.length;

    window.page.removeAllPins();

    for (let i = 0; i < number; i++) {
      fragment.appendChild(window.advert.render(filteredAdverts[i]));
    }

    window.util.mapPins.appendChild(fragment);

    return filteredAdverts;
  });

})();
