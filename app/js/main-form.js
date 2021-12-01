var countryData = window.intlTelInputGlobals.getCountryData(), // получить данные о стране из плагина
  input = document.querySelector("#phone"),
  addressDropdown = document.querySelector("#country"),
  currencyList = document.querySelectorAll("#currency option"),
  btnSubmit = document.querySelector(".sub-form"),
  errorMsg = document.getElementById("error-msg"),
  validMsg = document.getElementById("valid-msg"),
  swicthLinks = document.querySelectorAll(".form-tabs__switches a"),
  promoSwitch = document.getElementById("checkPromo"),
  form = document.getElementById("tabsForm"),
  promoInput = document.getElementById("promo"),
  rezult = document.querySelector('.rezult');

// здесь индекс соответствует коду ошибки, возвращаемому из getValidationError - см. readmevar
errorMap = [
  "Invalid number",
  "Invalid country code",
  "Too short",
  "Too long",
  "Invalid number",
];

// инициализация плагина
var iti = window.intlTelInput(input, {
  preferredCountries: ["us", "ua", "br"],
  separateDialCode: true, // отображение кода страны возле флага
  // nationalMode: false,
  initialCountry: "auto", // автоматическоа подставление страны по IP
  geoIpLookup: function (callback) {
    // автоматическоа подставление страны по IP
    $.get("https://ipinfo.io", function () {}, "jsonp").always(function (resp) {
      var countryCode = resp && resp.country ? resp.country : "us";
      callback(countryCode);
    });
  },
  utilsScript: "js/utils.js", // только для форматирования/плейсхолдера и т.д.
});

// заполнить выпадающий список стран
for (var i = 0; i < countryData.length; i++) {
  var country = countryData[i];
  var optionNode = document.createElement("option");
  optionNode.value = country.iso2;
  var textNode = document.createTextNode(country.name);
  optionNode.appendChild(textNode);
  addressDropdown.appendChild(optionNode);
}

// установить его начальное значение
addressDropdown.value = iti.getSelectedCountryData().iso2;

// переключение валюты в зависимости от активной (выбранной) страны
function currencySwitch(country) {
  switch (country) {
    case "ua":
    case "ru":
      currencyList.forEach(function (el) {
        el.value === "UAH" ? (el.selected = true) : "";
      });
      break;
    case "pt":
    case "fr":
    case "ee":
    case "ro":
    case "pl":
    case "de":
    case "br":
      currencyList.forEach(function (el) {
        el.value === "EUR" ? (el.selected = true) : "";
      });
      break;
    default:
      document.getElementById("currency").options[0].selected = true;
  }
}

// отслеживаем изменения телефонного кода
input.addEventListener("countrychange", function (e) {
  addressDropdown.value = iti.getSelectedCountryData().iso2;
  currencySwitch(addressDropdown.value);
});

// отлслеживаем изменения в выпадающем списке стран
addressDropdown.addEventListener("change", function () {
  iti.setCountry(this.value);
  var activeCountry = iti.defaultCountry; // получение кода активной (выбранной) страны
  currencySwitch(activeCountry);
});


// функция вадлидации для ввода номера телефона. активирует кнопку отправки при успешном вводе номера
function validatAction() {
  if (iti.isValidNumber()) {
    errorMsg.classList.add("hide");
    validMsg.classList.remove("hide");
    btnSubmit.classList.remove("sub-form-disabled");
    btnSubmit.disabled = false;
  } else {
    input.classList.add("error");
    validMsg.classList.add("hide");
    btnSubmit.classList.add("sub-form-disabled");
    btnSubmit.disabled = true;
    var errorCode = iti.getValidationError();
    errorMsg.innerHTML = errorMap[errorCode];
    errorMsg.classList.remove("hide");
  }
}

// запуск функции валидации формы
input.addEventListener("input", validatAction);
input.addEventListener("change", validatAction);
input.addEventListener("keyup", validatAction);


// обработчик отправки формы
function submit() {
  var request = new XMLHttpRequest(),
  form = document.getElementById("tabsForm")
  formData = new FormData(form);

  request.onload = function () {
    if (request.status === 200) {
      var req = JSON.parse(request.responseText);
      console.log(req);
      success = req['success'];
      if(success) {
        var login = req['login'],
        password = req['password'],
        deposit = req['deposit'];
        rezult.innerHTML = `
          <div style="text-transform: uppercase; color: green"> 
          login: ${login}
          </br> 
          password: ${password} 
          </div>
        ` 
      } else {
        var message = req['message'];
        rezult.innerHTML = `
        <div style="text-transform: uppercase; color: red"> ${message} </div>
        ` 
      }
    }
  };
  request.open("POST", "registration-form-handler.php", true);
  request.send(formData);
}

btnSubmit.addEventListener("click", submit);

// переключение табов формы для выбора регистрации по телефону или по почте 
swicthLinks.forEach(function (el) {
  var gmail = "switchGmail",
    phone = "switchPhone";
  el.addEventListener("click", function () {
    if (
      !this.classList.contains("active") &&
      this.getAttribute("id") == gmail
    ) {
      for (let i = 0; i < swicthLinks.length; i++) {
        if (swicthLinks[i].getAttribute("id") !== gmail) {
          swicthLinks[i].classList.remove("active");
        }
      }
      this.classList.add("active");
      document.querySelector("." + gmail).classList.remove("hide");
      document.querySelector("." + phone).classList.add("hide");
    } else if (
      !this.classList.contains("active") &&
      this.getAttribute("id") == phone
    ) {
      for (let i = 0; i < swicthLinks.length; i++) {
        if (swicthLinks[i].getAttribute("id") !== phone) {
          swicthLinks[i].classList.remove("active");
        }
      }
      this.classList.add("active");
      document.querySelector("." + phone).classList.remove("hide");
      document.querySelector("." + gmail).classList.add("hide");
    }
  });
});

promoSwitch.addEventListener("click", function (el) {
  if (this.checked) {
    promoInput.className = "promo-show";
  } else {
    promoInput.className = "promo-hide";
  }
});
