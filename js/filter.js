'use strict';

(function () {

  const DEFAULT_VALUE = `any`;

  const PriceRange = {
    LOW: {
      MIN: 0,
      MAX: 10000
    },
    MIDDLE: {
      MIN: 10000,
      MAX: 50000
    },
    HIGH: {
      MIN: 50000,
      MAX: Infinity
    }
  };

  let filteredAdverts = [];

  const getChecked = function (target) {
    let name = target.name;
    let key;
    let selector;
    if (target.tagName.toLowerCase() === `input`) {
      key = name;
      selector = window.util.mapFilters.querySelectorAll(`input[name=${name}]:checked`);
      if (selector) {
        window.util.checked[key] = Array.from(selector).map((el) => {
          return el.value;
        });
      } else {
        window.util.checked[key] = [];
      }
    } else {
      key = name.slice(8);
      selector = window.util.mapFilters.querySelector(`select[name=${name}]`);
      window.util.checked[key] = selector.value;
    }
  };

  const updateFilter = function () {
    const houseType = window.util.mapFilters.querySelector(`#housing-type`);
    const houseRooms = window.util.mapFilters.querySelector(`#housing-rooms`);
    const houseGuests = window.util.mapFilters.querySelector(`#housing-guests`);
    const housePrice = window.util.mapFilters.querySelector(`#housing-price`);
    const houseFeatures = Array.from(window.util.mapFilters.querySelectorAll(`.map__checkbox`));

    getChecked(houseType);
    getChecked(houseRooms);
    getChecked(houseGuests);
    getChecked(housePrice);
    getChecked(houseFeatures[0]);
  };

  const checkPrice = function (it) {
    return PriceRange[window.util.checked.price.toUpperCase()].MIN <= it && it <= PriceRange[window.util.checked.price.toUpperCase()].MAX;
  };

  const getFeatures = function (it) {
    let res;
    if (it) {
      if (window.util.checked.features.length === 0) {
        res = true;
      } else {
        res = window.util.checked.features.every((el) => {
          return it.includes(el);
        });
      }
    } else {
      res = false;
    }
    return res;
  };

  const getBooleanValue = function (value, item) {
    return value !== DEFAULT_VALUE ? value === item.toString() : true;
  };

  updateFilter();

  window.util.mapFilters.addEventListener(`change`, function (evt) {
    const fragment = document.createDocumentFragment();
    window.map.closeCard();
    window.page.removeAllPins();
    getChecked(evt.target);

    filteredAdverts = window.util.advertsData.filter((item) => {

      // let type = window.util.checked.type !== DEFAULT_VALUE ? window.util.checked.type === item.offer.type : true;
      // let rooms = window.util.checked.rooms !== DEFAULT_VALUE ? +window.util.checked.rooms === item.offer.rooms : true;
      // let guests = window.util.checked.guests !== DEFAULT_VALUE ? +window.util.checked.guests === item.offer.guests : true;

      let type = getBooleanValue(window.util.checked.type, item.offer.type);
      let rooms = getBooleanValue(window.util.checked.rooms, item.offer.rooms);
      let guests = getBooleanValue(window.util.checked.guests, item.offer.guests);
      let price = window.util.checked.price !== DEFAULT_VALUE ? checkPrice(item.offer.price) : true;
      let features = getFeatures(item.offer.features);

      let result = (type && price && rooms && guests && features) ? true : false;

      return result;
    });

    let number = filteredAdverts.length > window.util.SIMILAR_ADVERTS_COUNT ? window.util.SIMILAR_ADVERTS_COUNT : filteredAdverts.length;

    for (let i = 0; i < number; i++) {
      fragment.appendChild(window.advert.render(filteredAdverts[i]));
    }

    window.util.mapPins.appendChild(fragment);

    return filteredAdverts;
  });

  window.filter = {
    updateFilter
  };

})();
