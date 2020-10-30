'use strict';

const FIVESCORE_ROOMS = `100`;
const selectType = window.util.adForm.querySelector(`#type`);
const inputPrice = window.util.adForm.querySelector(`#price`);
const selectTimeIn = window.util.adForm.querySelector(`#timein`);
const selectTimeOut = window.util.adForm.querySelector(`#timeout`);
const selectRoom = window.util.adForm.querySelector(`#room_number`);
const selectGuests = window.util.adForm.querySelector(`#capacity`);
const selectGuestsOptions = Array.from(selectGuests.options);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const main = document.querySelector(`main`);
const resetBtn = window.util.adForm.querySelector(`.ad-form__reset`);

const RoomsCapacity = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0]
};

const RoomsMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

const disableGuestsOptions = (array) => {
  array.forEach((elem) => {
    if (!elem.selected) {
      elem.disabled = `true`;
    }
  });
};

disableGuestsOptions(selectGuestsOptions);

const onSelectRoomInput = () => {
  window.util.addDisabled(selectGuestsOptions);

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

selectRoom.addEventListener(`input`, onSelectRoomInput);

const OnSelectTimeChange = function (evt) {
  const target = evt.target;
  let value = target.value;
  let connectedSelect;

  if (target === selectTimeIn) {
    connectedSelect = selectTimeOut;
  } else {
    connectedSelect = selectTimeIn;
  }

  connectedSelect.value = value;
};

selectType.addEventListener(`change`, () => {
  let value = selectType.value.toUpperCase();
  inputPrice.min = RoomsMinPrice[value];
  inputPrice.placeholder = `от ${RoomsMinPrice[value]}`;
});

selectTimeIn.addEventListener(`change`, OnSelectTimeChange);
selectTimeOut.addEventListener(`change`, OnSelectTimeChange);

const showMessage = (template) => {
  const message = template.cloneNode(true);
  main.insertAdjacentElement(`beforeend`, message);
};

const getSuccessMessage = () => {
  return main.querySelector(`.success`);
};

const getErrorMessage = () => {
  return main.querySelector(`.error`);
};

const hideMessage = (getEl) => {
  const el = getEl();
  window.util.removeElem(el);
};

const onSuccessMessageClick = () => {
  hideMessage(getSuccessMessage);
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const onErrorMessageClick = () => {
  hideMessage(getErrorMessage);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onSuccessEscPress = function (evt) {
  window.util.isEscEvent(evt, hideMessage, getSuccessMessage);
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const onErrorEscPress = function (evt) {
  window.util.isEscEvent(evt, hideMessage, getErrorMessage);
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onLoadAction = () => {
  showMessage(successMessageTemplate);
  document.addEventListener(`keydown`, onSuccessEscPress);
  getSuccessMessage().addEventListener(`click`, onSuccessMessageClick);
  window.page.disable();
  window.util.adForm.reset();
};

const onErrorAction = () => {
  showMessage(errorMessageTemplate);
  document.addEventListener(`keydown`, onErrorEscPress);
  getErrorMessage().addEventListener(`click`, onErrorMessageClick);
  const errorButton = getErrorMessage().querySelector(`#error__button`);
  if (errorButton) {
    errorButton.addEventListener(`click`, onErrorMessageClick);
  }
};

window.util.adForm.addEventListener(`submit`, function (evt) {
  window.backend.save(new FormData(window.util.adForm), onLoadAction, onErrorAction);
  evt.preventDefault();
});

resetBtn.addEventListener(`click`, () => {
  window.page.disable();
});
