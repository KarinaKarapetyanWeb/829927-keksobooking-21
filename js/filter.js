'use strict';

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

const getChecked = (target) => {
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

const updateFilter = () => {
  const houseType = window.util.mapFilters.querySelector(`#housing-type`);
  const houseRooms = window.util.mapFilters.querySelector(`#housing-rooms`);
  const houseGuests = window.util.mapFilters.querySelector(`#housing-guests`);
  const housePrice = window.util.mapFilters.querySelector(`#housing-price`);
  const houseFeatures = window.util.mapFilters.querySelector(`.map__checkbox`);

  getChecked(houseType);
  getChecked(houseRooms);
  getChecked(houseGuests);
  getChecked(housePrice);
  getChecked(houseFeatures);
};

const checkPrice = (it) => {
  return PriceRange[window.util.checked.price.toUpperCase()].MIN <= it && it <= PriceRange[window.util.checked.price.toUpperCase()].MAX;
};

const getFeatures = (it) => {
  if (it) {
    if (window.util.checked.features.length === 0) {
      return true;
    } else {
      return window.util.checked.features.every((el) => {
        return it.includes(el);
      });
    }
  }
  return false;
};

const getBooleanValue = (value, item) => {
  return value !== DEFAULT_VALUE ? value === item.toString() : true;
};

const onFilterChange = function (evt) {
  const fragment = document.createDocumentFragment();
  window.map.closeCard();
  window.page.removeAllPins();
  getChecked(evt.target);

  filteredAdverts = window.util.advertsData.filter((item) => {
    let type = getBooleanValue(window.util.checked.type, item.offer.type);
    let rooms = getBooleanValue(window.util.checked.rooms, item.offer.rooms);
    let guests = getBooleanValue(window.util.checked.guests, item.offer.guests);
    let price = window.util.checked.price !== DEFAULT_VALUE ? checkPrice(item.offer.price) : true;
    let features = getFeatures(item.offer.features);

    return !!(type && price && rooms && guests && features);
  });

  let number = filteredAdverts.length > window.util.SIMILAR_ADVERTS_COUNT ? window.util.SIMILAR_ADVERTS_COUNT : filteredAdverts.length;

  for (let i = 0; i < number; i++) {
    fragment.appendChild(window.advert.render(filteredAdverts[i]));
  }

  window.util.mapPins.appendChild(fragment);

  return filteredAdverts;
};

updateFilter();

window.util.mapFilters.addEventListener(`change`, window.debounce(onFilterChange));

window.filter = {
  update: updateFilter
};
