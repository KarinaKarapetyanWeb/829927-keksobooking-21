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
const mapFilterContainer = document.querySelector(`.map__filters-container`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
const fragment = document.createDocumentFragment();
const similarAdverts = [];
const advertAvatars = [];

let coordX;
let coordY;

map.classList.remove(`map--faded`);

const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getUniqueNumbersInRange = function (min, max, num) {
  let i;
  let array = [];
  let result = [];
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
  let test = getUniqueNumbersInRange(1, arrayLength, arrayLength);
  for (let i = 0; i < arrayLength; i++) {
    array.push(`img/avatars/user0${test[i]}.png`);
  }
  return array;
};

const createRandomArrayFromArray = function (array) {
  let features = [];
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

mapPins.appendChild(fragment);

// Не получается передать method в параметр функции checkDataExists (например, чтобы можно было заменить метод innerHTML на другой)
const checkDataExists = function (element, data, elementSelector, value) {
  // Expected an assignment or function call and instead saw an expression - эта ошибка возникает, потому что функция должна что-то возравщать? Не совсем понимаю, что можно вовзращать в этой функции.
  data ? element.querySelector(elementSelector).innerHTML = value : element.querySelector(elementSelector).style.display = `none`;
};

const renderCard = function (advert) {
  let cardPopupElement = cardPopupTemplate.cloneNode(true);

  checkDataExists(cardPopupElement, advert.offer.title, `.popup__title`, advert.offer.title);
  checkDataExists(cardPopupElement, advert.offer.address, `.popup__text--address`, advert.offer.address);
  checkDataExists(cardPopupElement, advert.offer.price, `.popup__text--price`, `${advert.offer.price}₽/ночь`);
  // Стоит, наверное, разделить проверки advert.offer.rooms && advert.offer.guests, advert.offer.checkin && advert.offer.checkout и предложение выводить по частям или так можно оставить?
  checkDataExists(cardPopupElement, advert.offer.rooms && advert.offer.guests, `.popup__text--capacity`, `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`);
  checkDataExists(cardPopupElement, advert.offer.checkin && advert.offer.checkout, `.popup__text--time`, `Заезд после ${advert.offer.checkin}, выезд&nbsp;до ${advert.offer.checkout}`);
  checkDataExists(cardPopupElement, advert.offer.features, `.popup__features`, advert.offer.features);
  checkDataExists(cardPopupElement, advert.offer.description, `.popup__description`, advert.offer.description);

  // Не получается передать method в параметр функции checkDataExists, чтобы можно было использовать эту функцию и для свойства src аватара, а не только innerHTML.
  // Пока что advert.author.avatar оставила без проверки, прописать проверку без функции? Или можно реализовать передачу метода в аргумент?

  cardPopupElement.querySelector(`.popup__avatar`).src = advert.author.avatar;

  let elementType;

  switch (advert.offer.type) {
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
    default:
      elementType = ``;
  }

  // Если типа жилья нет, оно все-равно вставляет значение 'квартира', хоть и скрывает .popup__type - хотя я прописала в default пустую строку.

  checkDataExists(cardPopupElement, advert.offer.type, `.popup__type`, elementType);

  let elementPhotos = cardPopupElement.querySelector(`.popup__photos`);

  if (advert.offer.photos) {
    for (let i = 0; i < advert.offer.photos.length; i++) {
      elementPhotos.insertAdjacentHTML(`beforeend`, `<img src="${advert.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    }
  } else {
    elementPhotos.style.display = `none`;
  }

  return cardPopupElement;
};

map.insertBefore(renderCard(similarAdverts[0]), mapFilterContainer);
