'use strict';

(function () {

  const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
  let elementType;

  const hideElement = (element) => {
    element.style.display = `none`;
  };

  const getValueTypeOffer = (data) => {
    switch (data) {
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
    }

    return elementType;
  };

  const renderCard = (advert) => {
    let cardPopupElement = cardPopupTemplate.cloneNode(true);
    let cardTitle = cardPopupElement.querySelector(`.popup__title`);
    let cardAddress = cardPopupElement.querySelector(`.popup__text--address`);
    let cardPrice = cardPopupElement.querySelector(`.popup__text--price`);
    let cardCapacity = cardPopupElement.querySelector(`.popup__text--capacity`);
    let cardTime = cardPopupElement.querySelector(`.popup__text--time`);
    let cardFeatures = cardPopupElement.querySelector(`.popup__features`);
    let cardDescription = cardPopupElement.querySelector(`.popup__description`);
    let cardAvatar = cardPopupElement.querySelector(`.popup__avatar`);
    let cardType = cardPopupElement.querySelector(`.popup__type`);
    let cardPhotos = cardPopupElement.querySelector(`.popup__photos`);

    getValueTypeOffer(advert.offer.type);

    if (!advert.offer.title) {
      hideElement(cardTitle);
    } else {
      cardTitle.innerHTML = advert.offer.title;
    }

    if (!advert.offer.address) {
      hideElement(cardAddress);
    } else {
      cardAddress.innerHTML = advert.offer.address;
    }

    if (!advert.offer.price) {
      hideElement(cardPrice);
    } else {
      cardPrice.innerHTML = `${advert.offer.price}₽/ночь`;
    }

    if (!advert.offer.rooms || !advert.offer.guests) {
      hideElement(cardCapacity);
    } else {
      cardCapacity.innerHTML = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;
    }

    if (!advert.offer.checkin || !advert.offer.checkout) {
      hideElement(cardTime);
    } else {
      cardTime.innerHTML = `Заезд после ${advert.offer.checkin}, выезд&nbsp;до ${advert.offer.checkout}`;
    }

    if (!advert.offer.features) {
      hideElement(cardFeatures);
    } else {
      cardFeatures.innerHTML = advert.offer.features.map((item) => {
        return ` ${item}`;
      });
    }

    if (!advert.offer.description) {
      hideElement(cardDescription);
    } else {
      cardDescription.innerHTML = advert.offer.description;
    }

    if (!advert.author.avatar) {
      hideElement(cardAvatar);
    } else {
      cardAvatar.src = advert.author.avatar;
    }

    if (!advert.offer.type) {
      hideElement(cardType);
    } else {
      cardType.innerHTML = elementType;
    }

    if (!advert.offer.photos) {
      hideElement(cardPhotos);
    } else {
      for (let i = 0; i < advert.offer.photos.length; i++) {
        cardPhotos.insertAdjacentHTML(`beforeend`, `<img src="${advert.offer.photos[i]}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
      }
    }

    return cardPopupElement;
  };

  window.card = {
    render: renderCard
  };

})();
