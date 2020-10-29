'use strict';

(function () {

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

  selectType.addEventListener(`change`, () => {
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

  selectTimeIn.addEventListener(`change`, OnSelectTimeChange);
  selectTimeOut.addEventListener(`change`, OnSelectTimeChange);

  const showMessage = (template) => {
    const message = template.cloneNode(true);
    main.insertAdjacentElement(`beforeend`, message);
  };

  const getSuccessMessage = () => {
    const success = main.querySelector(`.success`);
    return success;
  };

  const getErrorMessage = () => {
    const error = main.querySelector(`.error`);
    return error;
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

})();
