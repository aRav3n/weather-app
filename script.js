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

const getJson = async function () {
  try {
    const url = generateUrl();
    const response = await fetch(url, { mode: "cors" });
    const responseJson = response.json();
    return responseJson;
  } catch (error) {
    console.log(error);
  }
};
