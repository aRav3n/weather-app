const apiDataPull = async function () {
  let city = "Merida, Mexico";

  const generateUrl = function () {
    try {
      const apiKey = "0cdd91de3c714477a03190112240201";
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
      const conditionImage = new Image();
      conditionImage.src = condition.icon;
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

  const weatherData = await getData();
  console.log(weatherData);
};
