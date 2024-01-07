const getWeatherButton = document.querySelector("#getWeather");

const updateDom = function (weatherDataObject) {
  try {
    let unitsMetric = false;
    const cityDom = document.querySelector("#city");
    const countryDom = document.querySelector("#country");
    const conditionImageDom = document.querySelector("#conditionImage");
    const conditionTextDom = document.querySelector("#conditionText");
    const humidityDom = document.querySelector("#humidity");
    const cloudPercentDom = document.querySelector("#cloudPercent");
    const weatherDisplayDom = document.querySelector("#weatherDisplay");
    const changeUnitsButton = document.querySelector("#changeUnits");
    const tempDom = document.querySelector("#temp");
    const feelsLikeDom = document.querySelector("#feelsLike");
    const windSpeedDom = document.querySelector("#windSpeed");

    const setHtml = function (jsElement, objectElement, suffix) {
      jsElement.innerHTML = "";
      if (suffix) {
        jsElement.innerHTML = weatherDataObject[objectElement] + suffix;
      } else {
        jsElement.innerHTML = weatherDataObject[objectElement];
      }
    };

    setHtml(cityDom, "city");
    setHtml(countryDom, "country");
    setHtml(conditionImageDom, "conditionImage");
    setHtml(conditionTextDom, "conditionText");
    setHtml(humidityDom, "humidity", "%");
    setHtml(cloudPercentDom, "cloudPercent", "%");

    const setVariableItems = function () {
      if (unitsMetric) {
        setHtml(tempDom, "tempC", " °C");
        setHtml(feelsLikeDom, "feelsLikeC", " °C");
        setHtml(windSpeedDom, "windKph", " kph");
      } else {
        setHtml(tempDom, "tempF", " °F");
        setHtml(feelsLikeDom, "feelsLikeF", " °F");
        setHtml(windSpeedDom, "windMph", " mph");
      }
    };

    setVariableItems();
    changeUnitsButton.addEventListener("click", () => {
      unitsMetric = !unitsMetric;
      setVariableItems();
    });

    weatherDisplayDom.style.display = "grid";
  } catch (error) {
    console.log(error);
  }
};

const apiDataPull = async function () {
  try {
    const getLocation = function () {
      try {
        const locationField = document.querySelector("#location");
        const locationValue = locationField.value;
        if (locationValue) {
          const weatherLocation = locationField.value;
          locationField.value = "";
          return weatherLocation;
        } else {
          locationField.classList.toggle("errorInField");
          locationField.placeholder = "Enter a location";
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    };

    const generateUrl = function () {
      try {
        const apiKey = "0cdd91de3c714477a03190112240201";
        const city = getLocation();
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
        return url;
      } catch (error) {
        console.log(error);
      }
    };

    const parcelData = async function (object) {
      try {
        const location = object.location;
        const current = object.current;
        const condition = current.condition;
        let weatherData = {};

        const addToDataObject = function (key, dataPiece) {
          weatherData[key] = dataPiece;
        };

        addToDataObject("country", location.country);
        addToDataObject("city", location.name);
        addToDataObject("conditionText", condition.text);
        const conditionImage = `<img src="http:${condition.icon}">`;
        addToDataObject("conditionImage", conditionImage);
        addToDataObject("cloudPercent", current.cloud);
        addToDataObject("tempC", current.temp_c);
        addToDataObject("tempF", current.temp_f);
        addToDataObject("windMph", current.wind_mph);
        addToDataObject("windKph", current.wind_kph);
        addToDataObject("humidity", current.humidity);
        addToDataObject("feelsLikeC", current.feelslike_c);
        addToDataObject("feelsLikeF", current.feelslike_f);
        return weatherData;
      } catch (error) {
        console.log(error);
      }
    };

    const getData = async function () {
      try {
        const url = generateUrl();
        const response = await fetch(url, { mode: "cors" });
        const responseJson = await response.json();
        const weatherData = await parcelData(responseJson);
        return weatherData;
      } catch (error) {
        console.log(error);
      }
    };

    document.querySelector("form").reset();
    weatherDataObject = {};
    getWeatherButton.addEventListener("click", async () => {
      const weatherData = await getData();
      document.querySelector("form").reset();
      updateDom(weatherData);
    });
  } catch (error) {
    console.log(error);
  }
};

apiDataPull();
