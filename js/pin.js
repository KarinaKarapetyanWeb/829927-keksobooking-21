'use strict';

(function () {

  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const mapPinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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

  window.advert = {
    renderAdvert: renderAdvert
  };

})();
