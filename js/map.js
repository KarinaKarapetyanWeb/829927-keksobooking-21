'use strict';

(function () {

  const AVATAR_ID_POSITION = -5;
  const mapFilterContainer = window.util.map.querySelector(`.map__filters-container`);

  const enableActivatedPin = function () {
    const activePin = window.util.mapPins.querySelector(`.map__pin--active`);
    if (activePin) {
      activePin.classList.remove(`map__pin--active`);
    }
  };

  const activatePin = function (pin) {
    pin.classList.add(`.map__pin--active`);
  };

  const closeCard = function () {
    // переменная openedCard объявляется в каждой функции, наверное вынесу эту часть в еще одну функцию
    const openedCard = window.util.map.querySelector(`.map__card`);
    if (openedCard) {
      openedCard.parentElement.removeChild(openedCard);
    }
    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  const onPopupEscPress = function (evt) {
    const openedCard = window.util.map.querySelector(`.map__card`);
    window.util.isEscEvent(evt, closeCard, openedCard);
  };

  const onCloseButtonClick = function () {
    const openedCard = window.util.map.querySelector(`.map__card`);
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
        window.util.map.insertBefore(window.card.renderCard(item), mapFilterContainer);

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
      searchAndRenderCard(window.util.similarAdverts, imgSrc);
    } else if (target.matches(`.map__pin img`) && !target.parentElement.matches(`.map__pin--main`)) {
      imgSrc = target.src;
      activatePin(target.parentElement);
      searchAndRenderCard(window.util.similarAdverts, imgSrc);
    }

    enableActivatedPin();
  };

  // раньше эту функцию я вызывала внутри функции activatePage, как сделать лучше? можно оставить ее здесь и просто сразу вызвать?
  window.util.mapPins.addEventListener(`click`, checkPinAndCard);

})();
