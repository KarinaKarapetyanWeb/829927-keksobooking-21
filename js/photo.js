'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_IMAGE_SRC = `img/muffin-grey.svg`;
const HOUSING_PREVIEW_SIZE = 70;

const avatarChooser = window.util.adForm.querySelector(`#avatar`);
const housingChooser = window.util.adForm.querySelector(`#images`);
const avatarPreview = window.util.adForm.querySelector(`.ad-form-header__preview img`);
const housingPreview = window.util.adForm.querySelector(`.ad-form__photo`);

const onChooserChange = function (evt) {
  const target = evt.target;
  const file = target.files[0];
  let fileName = file.name.toLowerCase();
  let preview;

  if (target === avatarChooser) {
    preview = avatarPreview;
  } else {
    preview = document.createElement(`img`);
    preview.height = HOUSING_PREVIEW_SIZE;
    preview.width = HOUSING_PREVIEW_SIZE;
    housingPreview.appendChild(preview);
  }

  let matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener(`load`, function () {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
};

const clearPreview = function () {
  let housingPreviewImg = housingPreview.querySelector(`img`);

  if (avatarPreview.src !== DEFAULT_IMAGE_SRC) {
    avatarPreview.src = DEFAULT_IMAGE_SRC;
  }
  if (housingPreviewImg) {
    window.util.removeElem(housingPreviewImg);
  }
};

avatarChooser.addEventListener(`change`, onChooserChange);
housingChooser.addEventListener(`change`, onChooserChange);

window.photo = {
  clear: clearPreview
};

