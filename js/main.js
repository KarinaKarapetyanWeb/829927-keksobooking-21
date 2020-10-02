'use strict';

const ADVERT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ADVERT_CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const ADVERT_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ADVERT_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const ADVERTS_NUMBER = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const MAP_WIDTH = 1200;
const MAP_START_Y = 130;
const MAP_END_Y = 630;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
// const mapFilterContainer = document.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
// const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();
const similarAdverts = [];
const advertAvatars = [];

let coordX;
let coordY;
// let elementType;

const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqueNumbersInRange = function (min, max, num) {
  let i;
  const array = [];
  const result = [];
  for (i = min; i <= max; i++) {
    array.push(i);
  }
  for (i = 0; i < num; i++) {
    result.push(array.splice(Math.floor(Math.random() * (array.length)), 1)[0]);
  }
  return result;
};

const getRandomElementOfArray = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

const createUniqueAvatarArray = function (array, arrayLength) {
  const test = getUniqueNumbersInRange(1, arrayLength, arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    array.push(`img/avatars/user0${test[i]}.png`);
  }
  return array;
};

const createRandomArrayFromArray = function (array) {
  const features = [];
  for (let i = 0; i < getRandomInRange(1, array.length); i++) {
    features[i] = array[i];
  }
  return features;
};

const createAdvertsArray = function (array, types, times, features, photos, arrayAvatar, arrayLength, coordinateX, coordinateY) {
  for (let i = 0; i < arrayLength; i++) {
    coordinateX = getRandomInRange(0, MAP_WIDTH);
    coordinateY = getRandomInRange(MAP_START_Y, MAP_END_Y);
    array[i] = {
      'author': {
        'avatar': arrayAvatar[i]
      },
      'offer': {
        'title': `заголовок предложения`,
        'address': `${coordinateX}, ${coordinateY}`,
        'price': getRandomInRange(10, 120),
        'type': getRandomElementOfArray(types),
        'rooms': getRandomInRange(1, 5),
        'guests': getRandomInRange(1, 5),
        'checkin': getRandomElementOfArray(times),
        'checkout': getRandomElementOfArray(times),
        'features': createRandomArrayFromArray(features),
        'description': `описание`,
        'photos': createRandomArrayFromArray(photos)
      },
      'location': {
        'x': coordinateX,
        'y': coordinateY
      }
    };
  }
};

const renderAdvert = function (advert) {
  let advertElement = mapPinTemplate.cloneNode(true);
  let advertElementImg = advertElement.querySelector(`img`);
  let pinCoordX = advert.location.x - (PIN_WIDTH / 2);
  let pinCoordY = advert.location.y - PIN_HEIGHT;

  advertElement.style.left = `${pinCoordX}px`;
  advertElement.style.top = `${pinCoordY}px`;
  advertElementImg.src = advert.author.avatar;
  advertElementImg.alt = advert.offer.title;

  return advertElement;
};

createUniqueAvatarArray(advertAvatars, ADVERTS_NUMBER);

createAdvertsArray(similarAdverts, ADVERT_TYPES, ADVERT_CHECK_TIMES, ADVERT_FEATURES, ADVERT_PHOTOS, advertAvatars, ADVERTS_NUMBER, coordX, coordY);

for (let i = 0; i < similarAdverts.length; i++) {
  fragment.appendChild(renderAdvert(similarAdverts[i]));
}

// const hideElement = function (element) {
//   element.style.display = `none`;
// };

// const getValueTypeOffer = function (data) {
//   switch (data) {
//     case `palace`:
//       elementType = `Дворец`;
//       break;
//     case `flat`:
//       elementType = `Квартира`;
//       break;
//     case `house`:
//       elementType = `Дом`;
//       break;
//     case `bungalow`:
//       elementType = `Бунгало`;
//       break;
//   }

//   return elementType;
// };

// const renderCard = function (advert) {
//   let cardPopupElement = cardPopupTemplate.cloneNode(true);
//   let cardTitle = cardPopupElement.querySelector(`.popup__title`);
//   let cardAddress = cardPopupElement.querySelector(`.popup__text--address`);
//   let cardPrice = cardPopupElement.querySelector(`.popup__text--price`);
//   let cardCapacity = cardPopupElement.querySelector(`.popup__text--capacity`);
//   let cardTime = cardPopupElement.querySelector(`.popup__text--time`);
//   let cardFeatures = cardPopupElement.querySelector(`.popup__features`);
//   let cardDescription = cardPopupElement.querySelector(`.popup__description`);
//   let cardAvatar = cardPopupElement.querySelector(`.popup__avatar`);
//   let cardType = cardPopupElement.querySelector(`.popup__type`);
//   let cardPhotos = cardPopupElement.querySelector(`.popup__photos`);

//   getValueTypeOffer(advert.offer.type);

//   if (!advert.offer.title) {
//     hideElement(cardTitle);
//   } else {
//     cardTitle.innerHTML = advert.offer.title;
//   }

//   if (!advert.offer.address) {
//     hideElement(cardAddress);
//   } else {
//     cardAddress.innerHTML = advert.offer.address;
//   }

//   if (!advert.offer.price) {
//     hideElement(cardPrice);
//   } else {
//     cardPrice.innerHTML = `${advert.offer.price}₽/ночь`;
//   }

//   if (!advert.offer.rooms || !advert.offer.guests) {
//     hideElement(cardCapacity);
//   } else {
//     cardCapacity.innerHTML = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
//   }

//   if (!advert.offer.checkin || !advert.offer.checkout) {
//     hideElement(cardTime);
//   } else {
//     cardTime.innerHTML = `Заезд после ${advert.offer.checkin}, выезд&nbsp;до ${advert.offer.checkout}`;
//   }

//   if (!advert.offer.features) {
//     hideElement(cardFeatures);
//   } else {
//     cardFeatures.innerHTML = advert.offer.features;
//   }

//   if (!advert.offer.description) {
//     hideElement(cardDescription);
//   } else {
//     cardDescription.innerHTML = advert.offer.description;
//   }

//   if (!advert.author.avatar) {
//     hideElement(cardAvatar);
//   } else {
//     cardAvatar.src = advert.author.avatar;
//   }

//   if (!advert.offer.type) {
//     hideElement(cardType);
//   } else {
//     cardType.innerHTML = elementType;
//   }

//   if (!advert.offer.photos) {
//     hideElement(cardPhotos);
//   } else {
//     for (let i = 0; i < advert.offer.photos.length; i++) {
//       cardPhotos.insertAdjacentHTML(`beforeend`, `<img src="${advert.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
//     }
//   }

//   return cardPopupElement;
// };

// map.insertBefore(renderCard(similarAdverts[0]), mapFilterContainer);

// активация страницы

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 85;
const ENTER_KEY = `Enter`;
const FIVESCORE_ROOMS = `100`;
const mainPin = document.querySelector(`.map__pin--main`);
const adForm = document.querySelector(`.ad-form`);
const mapFilters = document.querySelector(`.map__filters`);
const adFormElements = Array.from(adForm.querySelectorAll(`.ad-form__element`));
const mapFiltersElements = Array.from(mapFilters.children);
const addressInput = adForm.querySelector(`#address`);
const selectRoom = adForm.querySelector(`#room_number`);
const selectGuests = adForm.querySelector(`#capacity`);
const selectGuestsOptions = Array.from(selectGuests.options);
const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const addDisabled = function (array) {
  array.forEach(function (elem) {
    elem.setAttribute(`disabled`, true);
  });
};

const removeDisabled = function (array) {
  array.forEach(function (elem) {
    elem.removeAttribute(`disabled`);
  });
};


const disableGuestsOptions = function (array) {
  array.forEach(function (elem) {
    if (!elem.selected) {
      elem.disabled = `true`;
    }
  });
};

const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabled(adFormElements);
  removeDisabled(mapFiltersElements);
  mapPins.appendChild(fragment);
};

const disableForms = function () {
  addDisabled(adFormElements);
  addDisabled(mapFiltersElements);
};

const setAdressToField = function () {
  let positionX = mainPin.style.left.slice(0, -2);
  let positionY = mainPin.style.top.slice(0, -2);
  let mainCoordX = (positionX - (MAIN_PIN_WIDTH / 2)).toFixed();
  let mainCoordY = (positionY - MAIN_PIN_HEIGHT).toFixed();
  addressInput.value = `${mainCoordX}, ${mainCoordY}`;
};

const calculateRoomsAndCapacity = function () {
  // блокируем все опции
  addDisabled(selectGuestsOptions);

  // разблокировка опций - для выбранной комнаты
  RoomsCapacity[+selectRoom.value].forEach(function (item) {
    let availableOption = selectGuests.querySelector(`option[value='${item}']`);
    availableOption.removeAttribute(`disabled`);
  });

  // установка выбранного значения гостей для каждого варианта комнаты
  if (selectRoom.value === FIVESCORE_ROOMS) {
    selectGuests.querySelector(`option[value='${RoomsCapacity[+FIVESCORE_ROOMS]}']`).selected = true;
  } else {
    selectGuests.querySelector(`option[value='${selectRoom.value}']`).selected = true;
  }
};

disableForms();

disableGuestsOptions(selectGuestsOptions);

setAdressToField();

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
  }
});

selectRoom.addEventListener(`input`, calculateRoomsAndCapacity);
