'use strict';

var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = [' да Марья', ' Верон', ' Мирабелла', ' Вальц', ' Онопко', ' Топольницкая', ' Нионго', ' Ирвинг'];
var WIZARD_CLOAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYE_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var NUMBER_OF_WIZARD = 4;
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCloatInput = setup.querySelector('input[name = "coat-color"]');
var wizadEyesInput = setup.querySelector('input[name = "eyes-color"]');
var wizardFireballInput = setup.querySelector('input[name = "fireball-color"]');
var setupWizadCoat = setup.querySelector('.setup-wizard .wizard-coat');
var setupWizadEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var setupWizadFireball = setup.querySelector('.setup-fireball-wrap');
var similarListElement = setup.querySelector('.setup-similar-list');
var userNameForm = setup.querySelector('.setup-user-name');


var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var getRandomArrayElement = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var getWizard = function () {
  var element = {
    name: getRandomArrayElement(WIZARD_NAMES) + getRandomArrayElement(WIZARD_SURNAMES),
    coatColor: getRandomArrayElement(WIZARD_CLOAT_COLORS),
    eyesColor: getRandomArrayElement(WIZARD_EYE_COLOR)
  };
  return element;
};

var getArrayWizards = function (number) {
  var wizards = [];
  for (var j = 0; j < number; j++) {
    wizards.push(getWizard());
  }

  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWirads = function (numberOfWizards) {
  var fragment = document.createDocumentFragment();
  var arrayWizards = getArrayWizards(numberOfWizards);
  for (var i = 0; i < arrayWizards.length; i++) {
    fragment.appendChild(renderWizard(arrayWizards[i]));
  }

  similarListElement.appendChild(fragment);

  setup.querySelector('.setup-similar').classList.remove('hidden');
};

createSimilarWirads(NUMBER_OF_WIZARD);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameForm.addEventListener('focus', function () {
  document.removeEventListener('keydown', onPopupEscPress);
});

userNameForm.addEventListener('blur', function () {
  document.addEventListener('keydown', onPopupEscPress);
});

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});

var setupColorSVG = function (array, element, input) {
  var color = getRandomArrayElement(array);
  element.style.fill = color;
  input.value = color;
};

var setupColor = function (array, element, input) {
  var color = getRandomArrayElement(array);
  element.style = 'background-color: ' + color;
  input.value = color;
};

setupWizadCoat.addEventListener('click', function () {
  setupColorSVG(WIZARD_CLOAT_COLORS, setupWizadCoat, wizardCloatInput);
});

setupWizadEyes.addEventListener('click', function () {
  setupColorSVG(WIZARD_EYE_COLOR, setupWizadEyes, wizadEyesInput);
});

setupWizadFireball.addEventListener('click', function () {
  setupColor(WIZARD_FIREBALL_COLOR, setupWizadFireball, wizardFireballInput);
});
