'use strict';

(function () {

  const ADVERT_TYPES = [`palace`, `flat`, `house`, `bungalow`];
  const ADVERT_CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const ADVERT_FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const ADVERT_PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const ADVERTS_NUMBER = 8;
  const MAP_WIDTH = 1200;
  const MAP_START_Y = 130;
  const MAP_END_Y = 630;
  const advertAvatars = [];
  let coordX;
  let coordY;

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

  createUniqueAvatarArray(advertAvatars, ADVERTS_NUMBER);
  createAdvertsArray(window.util.similarAdverts, ADVERT_TYPES, ADVERT_CHECK_TIMES, ADVERT_FEATURES, ADVERT_PHOTOS, advertAvatars, ADVERTS_NUMBER, coordX, coordY);

})();
