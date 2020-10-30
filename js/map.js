'use strict';

const mapFilterContainer = window.util.map.querySelector(`.map__filters-container`);
let openedCard;

const enableActivatedPin = () => {
  const activePin = window.util.mapPins.querySelector(`.map__pin--active`);
  if (activePin) {
    activePin.classList.remove(`map__pin--active`);
  }
};

const activatePin = (pin) => {
  pin.classList.add(`.map__pin--active`);
};

const getOpenedCard = () => {
  openedCard = window.util.map.querySelector(`.map__card`);
  return openedCard;
};

const closeCard = () => {
  getOpenedCard();
  if (openedCard) {
    window.util.removeElem(openedCard);
  }
  document.removeEventListener(`keydown`, onPopupEscPress);
};

const onCloseButtonClick = () => {
  getOpenedCard();
  if (openedCard) {
    const closePopup = openedCard.querySelector(`.popup__close`);
    closePopup.addEventListener(`click`, () => {
      closeCard();
    });
  }
};

const onPopupEscPress = function (evt) {
  window.util.isEscEvent(evt, closeCard);
};

const searchAndRenderCard = (array, description) => {
  array.forEach((item) => {
    if (item.offer.title === description) {
      // удаляем открытую карточку и обработчик на документе
      closeCard();

      // отрисовываем нужную
      window.util.map.insertBefore(window.card.render(item), mapFilterContainer);

      // добавляем обработчик на документе
      document.addEventListener(`keydown`, onPopupEscPress);

      // добавляем обработчик клика на крестик
      onCloseButtonClick();
    }
  });
};

const onPinClick = function (evt) {
  const target = evt.target;
  let title;

  if (target.matches(`.map__pin`) && !target.matches(`.map__pin--main`)) {
    title = target.querySelector(`img`).alt;
    activatePin(target);
    searchAndRenderCard(window.util.advertsData, title);
  } else if (target.matches(`.map__pin img`) && !target.parentElement.matches(`.map__pin--main`)) {
    title = target.alt;
    activatePin(target.parentElement);
    searchAndRenderCard(window.util.advertsData, title);
  }

  enableActivatedPin();
};

window.util.mapPins.addEventListener(`click`, onPinClick);

window.map = {
  closeCard
};
