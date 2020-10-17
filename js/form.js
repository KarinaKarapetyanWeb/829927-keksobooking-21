'use strict';

(function () {

  const MAIN_PIN_WIDTH = 65;
  const MAIN_PIN_HEIGHT = 85;
  const FIVESCORE_ROOMS = `100`;
  const selectType = window.util.adForm.querySelector(`#type`);
  const inputPrice = window.util.adForm.querySelector(`#price`);
  const selectTimeIn = window.util.adForm.querySelector(`#timein`);
  const selectTimeOut = window.util.adForm.querySelector(`#timeout`);
  const selectRoom = window.util.adForm.querySelector(`#room_number`);
  const selectGuests = window.util.adForm.querySelector(`#capacity`);
  const addressInput = window.util.adForm.querySelector(`#address`);
  const selectGuestsOptions = Array.from(selectGuests.options);
  const RoomsCapacity = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  const disableGuestsOptions = function (array) {
    array.forEach((elem) => {
      if (!elem.selected) {
        elem.disabled = `true`;
      }
    });
  };

  disableGuestsOptions(selectGuestsOptions);

  const setAdressToField = function () {
    let positionX = window.util.mainPin.style.left.slice(0, -2);
    let positionY = window.util.mainPin.style.top.slice(0, -2);
    let mainCoordX = (positionX - (MAIN_PIN_WIDTH / 2)).toFixed();
    let mainCoordY = (positionY - MAIN_PIN_HEIGHT).toFixed();
    addressInput.value = `${mainCoordX}, ${mainCoordY}`;
  };

  setAdressToField();

  const calculateRoomsAndCapacity = function () {
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

  selectRoom.addEventListener(`input`, calculateRoomsAndCapacity);

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

})();
