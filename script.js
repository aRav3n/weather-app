let city = "Merida, Mexico";

const generateUrl = async function (city) {
  try {
    const apiKey = "0cdd91de3c714477a03190112240201";
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    return url;
  } catch (error) {
    console.log(error);
  }
};
