'use strict';

// создание массива данных и функции отрисовки пинов

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
const mapFilterContainer = document.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();
const similarAdverts = [];
const advertAvatars = [];

let coordX;
let coordY;
let elementType;

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

// функция отрисовки карточки

const hideElement = function (element) {
  element.style.display = `none`;
};

const getValueTypeOffer = function (data) {
  switch (data) {
    case `palace`:
      elementType = `Дворец`;
      break;
    case `flat`:
      elementType = `Квартира`;
      break;
    case `house`:
      elementType = `Дом`;
      break;
    case `bungalow`:
      elementType = `Бунгало`;
      break;
  }

  return elementType;
};

const renderCard = function (advert) {
  let cardPopupElement = cardPopupTemplate.cloneNode(true);
  let cardTitle = cardPopupElement.querySelector(`.popup__title`);
  let cardAddress = cardPopupElement.querySelector(`.popup__text--address`);
  let cardPrice = cardPopupElement.querySelector(`.popup__text--price`);
  let cardCapacity = cardPopupElement.querySelector(`.popup__text--capacity`);
  let cardTime = cardPopupElement.querySelector(`.popup__text--time`);
  let cardFeatures = cardPopupElement.querySelector(`.popup__features`);
  let cardDescription = cardPopupElement.querySelector(`.popup__description`);
  let cardAvatar = cardPopupElement.querySelector(`.popup__avatar`);
  let cardType = cardPopupElement.querySelector(`.popup__type`);
  let cardPhotos = cardPopupElement.querySelector(`.popup__photos`);

  getValueTypeOffer(advert.offer.type);

  if (!advert.offer.title) {
    hideElement(cardTitle);
  } else {
    cardTitle.innerHTML = advert.offer.title;
  }

  if (!advert.offer.address) {
    hideElement(cardAddress);
  } else {
    cardAddress.innerHTML = advert.offer.address;
  }

  if (!advert.offer.price) {
    hideElement(cardPrice);
  } else {
    cardPrice.innerHTML = `${advert.offer.price}₽/ночь`;
  }

  if (!advert.offer.rooms || !advert.offer.guests) {
    hideElement(cardCapacity);
  } else {
    cardCapacity.innerHTML = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
  }

  if (!advert.offer.checkin || !advert.offer.checkout) {
    hideElement(cardTime);
  } else {
    cardTime.innerHTML = `Заезд после ${advert.offer.checkin}, выезд&nbsp;до ${advert.offer.checkout}`;
  }

  if (!advert.offer.features) {
    hideElement(cardFeatures);
  } else {
    cardFeatures.innerHTML = advert.offer.features;
  }

  if (!advert.offer.description) {
    hideElement(cardDescription);
  } else {
    cardDescription.innerHTML = advert.offer.description;
  }

  if (!advert.author.avatar) {
    hideElement(cardAvatar);
  } else {
    cardAvatar.src = advert.author.avatar;
  }

  if (!advert.offer.type) {
    hideElement(cardType);
  } else {
    cardType.innerHTML = elementType;
  }

  if (!advert.offer.photos) {
    hideElement(cardPhotos);
  } else {
    for (let i = 0; i < advert.offer.photos.length; i++) {
      cardPhotos.insertAdjacentHTML(`beforeend`, `<img src="${advert.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  }

  return cardPopupElement;
};

// активация страницы

const MAIN_PIN_WIDTH = 65;
const MAIN_PIN_HEIGHT = 85;
const ENTER_KEY = `Enter`;
const ESCAPE_KEY = `Escape`;
const FIVESCORE_ROOMS = `100`;
const AVATAR_ID_POSITION = -5;
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
  array.forEach((elem) => {
    elem.setAttribute(`disabled`, true);
  });
};

const removeDisabled = function (array) {
  array.forEach((elem) => {
    elem.removeAttribute(`disabled`);
  });
};


const disableGuestsOptions = function (array) {
  array.forEach((elem) => {
    if (!elem.selected) {
      elem.disabled = `true`;
    }
  });
};

const enableActivatedPin = function () {
  const activePin = mapPins.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const activatePin = function (pin) {
  pin.classList.add(`.map__pin--active`);
};

const onPopupEscPress = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    evt.preventDefault();
    closeCard(map.querySelector(`.map__card`));
  }
};

const closeCard = function () {
  const openedCard = map.querySelector(`.map__card`);
  if (openedCard) {
    openedCard.parentElement.removeChild(openedCard);
  }
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onCloseButtonClick = function () {
  const openedCard = map.querySelector(`.map__card`);
  if (openedCard) {
    const closePopup = openedCard.querySelector(`.popup__close`);
    closePopup.addEventListener(`click`, function () {
      closeCard();
    });
  }
};

const getAvatarId = function (string) {
  return string.substr(AVATAR_ID_POSITION, 1);
};

const searchAndRenderCard = function (array, source) {
  array.forEach((item) => {
    if (getAvatarId(item.author.avatar) === getAvatarId(source)) {
      // удаляем открытую карточку и обработчик на документе
      closeCard();

      // отрисовываем нужную
      map.insertBefore(renderCard(item), mapFilterContainer);

      // добавляем обработчик на документе
      document.addEventListener(`keydown`, onPopupEscPress);

      // добавляем обработчик клика на крестик
      onCloseButtonClick();
    }
  });
};

const checkPinAndCard = function (evt) {
  const target = evt.target;
  let imgSrc;

  if (target.matches(`.map__pin`) && !target.matches(`.map__pin--main`)) {
    imgSrc = target.querySelector(`img`).src;
    activatePin(target);
    searchAndRenderCard(similarAdverts, imgSrc);
  } else if (target.matches(`.map__pin img`) && !target.parentElement.matches(`.map__pin--main`)) {
    imgSrc = target.src;
    activatePin(target.parentElement);
    searchAndRenderCard(similarAdverts, imgSrc);
  }

  enableActivatedPin();
};

const activatePage = function () {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);
  removeDisabled(adFormElements);
  removeDisabled(mapFiltersElements);

  for (let i = 0; i < similarAdverts.length; i++) {
    fragment.appendChild(renderAdvert(similarAdverts[i]));
  }
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

disableForms();

disableGuestsOptions(selectGuestsOptions);

setAdressToField();

mainPin.addEventListener(`mousedown`, function (evt) {
  if (evt.button === 0) {
    activatePage();
    mapPins.addEventListener(`click`, checkPinAndCard);
  }
});

mainPin.addEventListener(`keydown`, function (evt) {
  if (evt.key === ENTER_KEY) {
    activatePage();
    mapPins.addEventListener(`click`, checkPinAndCard);
  }
});

// форма, валидация

const calculateRoomsAndCapacity = function () {
  addDisabled(selectGuestsOptions);

  RoomsCapacity[+selectRoom.value].forEach((item) => {
    let availableOption = selectGuests.querySelector(`option[value='${item}']`);
    availableOption.removeAttribute(`disabled`);
  });

  if (selectRoom.value === FIVESCORE_ROOMS) {
    selectGuests.querySelector(`option[value='${RoomsCapacity[+FIVESCORE_ROOMS]}']`).selected = true;
  } else {
    selectGuests.querySelector(`option[value='${selectRoom.value}']`).selected = true;
  }
};

selectRoom.addEventListener(`input`, calculateRoomsAndCapacity);

const selectType = adForm.querySelector(`#type`);
const inputPrice = adForm.querySelector(`#price`);
const selectTimeIn = adForm.querySelector(`#timein`);
const selectTimeOut = adForm.querySelector(`#timeout`);

const OnSelectTimeCLick = function (evt) {
  const target = evt.target;
  let connectedSelect;

  if (target === selectTimeIn) {
    connectedSelect = selectTimeOut;
  } else {
    connectedSelect = selectTimeIn;
  }

  switch (target.value) {
    case `12:00`:
      connectedSelect.value = `12:00`;
      break;
    case `13:00`:
      connectedSelect.value = `13:00`;
      break;
    case `14:00`:
      connectedSelect.value = `14:00`;
      break;
  }
};

selectType.addEventListener(`change`, function () {
  switch (selectType.value) {
    case `bungalow`:
      inputPrice.min = 0;
      inputPrice.placeholder = `от 0`;
      break;
    case `flat`:
      inputPrice.min = 1000;
      inputPrice.placeholder = `от 1000`;
      break;
    case `house`:
      inputPrice.min = 5000;
      inputPrice.placeholder = `от 5000`;
      break;
    case `palace`:
      inputPrice.min = 10000;
      inputPrice.placeholder = `от 10000`;
      break;
  }
});

selectTimeIn.addEventListener(`change`, OnSelectTimeCLick);
selectTimeOut.addEventListener(`change`, OnSelectTimeCLick);
