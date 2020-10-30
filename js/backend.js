'use strict';

const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const URL_UPLOAD = `https://21.javascript.pages.academy/keksobooking`;
const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const getData = (onLoad, onError) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      window.util.advertsData = xhr.response;
      onLoad(window.util.advertsData);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });
  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  return xhr;
};

const load = (onLoad, onError) => {
  const xhr = getData(onLoad, onError);
  xhr.open(`GET`, URL_LOAD);
  xhr.send();
};

const save = (data, onLoad, onError) => {
  const xhr = getData(onLoad, onError);
  xhr.open(`POST`, URL_UPLOAD);
  xhr.send(data);
};

window.backend = {
  load,
  save
};

