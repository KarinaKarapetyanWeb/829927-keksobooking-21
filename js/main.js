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

map.classList.remove(`map--faded`);

const getRandomInRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const generateUniqueNumbersInRange = function (min, max, num) {
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

const createRandomArrayFromArray = function (array) {
  let features = [];
  for (let i = 0; i < getRandomInRange(1, array.length); i++) {
    features[i] = array[i];
  }
  return features;
};

const AdvertData = function (types, times, features, photos) {
  this.author = {
    // Не могу понять, как лучше сгенерировать неповторяющееся число на каждой итерации цикла, так как сама функция генерирует случайное число или массив с уникальными числами, но на каждой итерации - получаются повторения. Может быть заранее подготовить массив ADVERT_AVATARS?
    'avatar': `img/avatars/user0${generateUniqueNumbersInRange(1, 8, 1)}.png`
  };
  this.offer = {
    'title': `заголовок предложения`,
    // Еще вопрос - как сослаться на свойство этого же объекта и подставить его в строку? this.location.x - вызывает ошибку.
    'address': `location.x, location.y`,
    'price': getRandomInRange(10, 120),
    'type': getRandomElementOfArray(types),
    'rooms': getRandomInRange(1, 5),
    'guests': getRandomInRange(1, 5),
    'checkin': getRandomElementOfArray(times),
    'checkout': getRandomElementOfArray(times),
    'features': createRandomArrayFromArray(features),
    'description': `описание`,
    'photos': createRandomArrayFromArray(photos)
  };
  this.location = {
    'x': getRandomInRange(0, 1200),
    'y': getRandomInRange(130, 630)
  };
};

const createAdvertsArray = function (array, types, times, features, photos) {
  for (let i = 0; i < ADVERTS_NUMBER; i++) {
    // стоит ли создавать объект на каждой итерации цикла с помощью функции-конструктора? или просто присваивать array[i] новый объект?
    array[i] = new AdvertData(types, times, features, photos);
    /* array[i] = {
      'author': {
        'avatar': `img/avatars/user0${randomUniqueNumbersInRange(1, 8, 1)}.png`
      },
      'offer': {
        'title': `заголовок предложения`,
        'address': `location.x, location.y`,
        'price': getRandomInRange(10, 120),
        'type': getRandomElementOfArray(ADVERT_TYPES),
        'rooms': getRandomInRange(1, 5),
        'guests': getRandomInRange(1, 5),
        'checkin': getRandomElementOfArray(ADVERT_CHECK_TIMES),
        'checkout': getRandomElementOfArray(ADVERT_CHECK_TIMES),
        'features': createRandomArrayFromArray(ADVERT_FEATURES),
        'description': `описание`,
        'photos': createRandomArrayFromArray(ADVERT_PHOTOS)
      },
      'location': {
        'x': getRandomInRange(0, 1200),
        'y': getRandomInRange(130, 630)
      }
    };*/
  }
};

createAdvertsArray(similarAdverts, ADVERT_TYPES, ADVERT_CHECK_TIMES, ADVERT_FEATURES, ADVERT_PHOTOS);

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

for (let i = 0; i < similarAdverts.length; i++) {
  fragment.appendChild(renderAdvert(similarAdverts[i]));
}
mapPins.appendChild(fragment);
