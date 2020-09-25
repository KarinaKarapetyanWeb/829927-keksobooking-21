'use strict';

const ADVERT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
const ADVERT_CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
const ADVERT_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const ADVERT_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const ADVERTS_NUMBER = 8;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const map = document.querySelector(`.map`);
const mapPins = map.querySelector(`.map__pins`);
const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
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
  return array[getRandomInRange(0, array.length)];
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


coordX = getRandomInRange(0, 1200);
coordY = getRandomInRange(130, 630);

createUniqueAvatarArray(advertAvatars, ADVERTS_NUMBER);

createAdvertsArray(similarAdverts, ADVERT_TYPES, ADVERT_CHECK_TIMES, ADVERT_FEATURES, ADVERT_PHOTOS, advertAvatars, ADVERTS_NUMBER, coordX, coordY);

for (let i = 0; i < similarAdverts.length; i++) {
  fragment.appendChild(renderAdvert(similarAdverts[i]));
}
mapPins.appendChild(fragment);
