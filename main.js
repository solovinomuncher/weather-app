// SPECS:
// (X) 1. search for specific location
// (X) 2. toggle displaying data in Farenheit or Celsius
// (X) 3. make page-look change based on data

function tempKtoC(kelvin) {
  return Math.round(kelvin - 273.15);
}

function tempKtoF(kelvin) {
  return Math.round(((kelvin - 273.15) * 9) / 5 + 32);
}

async function fetchWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c9dd1867e5c041f4763cddbe0e0f541e`
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(`${err}`);
  }
}

async function getTempF(jsonPromise) {
  try {
    const temp = await jsonPromise.then((json) => tempKtoF(json.main.temp));
    return temp;
  } catch (err) {
    console.error(`${err}`);
  }
}

async function getTempC(jsonPromise) {
  try {
    const temp = await jsonPromise.then((json) => tempKtoC(json.main.temp));
    return temp;
  } catch (err) {
    console.error(`${err}`);
  }
}

// DOM Stuff
const cityInput = document.querySelector("#city");
const submitBtn = document.querySelector(".submitBtn");
const tempCDisplay = document.querySelector(".tempC");
const tempFDisplay = document.querySelector(".tempF");
const cityNameDisplay = document.querySelector(".city");
const weatherIcon = document.querySelector(".weather-icon");

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const jsonPromise = fetchWeatherData(cityInput.value);
  const tempFPromise = getTempF(jsonPromise);
  const tempCPromise = getTempC(jsonPromise);

  jsonPromise.then((json) => {
    console.log(json);
    weatherIcon.src = `http://openweathermap.org/img/wn/${json.weather[0].icon}@2x.png`;
  });

  jsonPromise.then((json) => {
    cityNameDisplay.textContent = `${json.name}`;
  });

  tempFPromise.then((temp) => {
    tempFDisplay.textContent = `${temp}*F`;
  });

  tempCPromise.then((temp) => {
    tempCDisplay.textContent = `${temp}*C`;
  });

  cityInput.value = "";
});
