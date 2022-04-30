const $ = (el) => document.querySelector(el);
const app = $(".weather-app");
const temp = $(".temp");
const dateOutput = $(".date");
const timeOutput = $(".time");
const conditionOutput = $(".condition");
const nameOutput = $(".name");
const icon = $(".icon");
const cloudOutput = $(".cloud");
const humidityOutput = $(".humidity");
const windOutput = $(".wind");
const form = $("#locationInput");
const search = $(".search");
const btn = $(".submit");
const cities = document.querySelectorAll(".city");

import { API_KEY } from "./config.js";

let cityInput = "Itamogi";

cities.forEach((city) => {
  city.addEventListener("click", (event) => {
    cityInput = event.target.innerHTML;

    fetchWeatherData();

    app.style.opacity = "0";
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (search.value.length == 0) {
    alert("Por favor digite o nome de uma cidade");
  } else {
  }
  cityInput = search.value;
  fetchWeatherData();
  search.value = "";
  app.style.opacity = "0";
});

function dayOfTheWeek(day, month, year) {
  const weekDay = [
    "Domingo",
    "Segunda-Feira",
    "Terça-Feira",
    "Quarta-Feira",
    "Quinta-Feira",
    "Sexta-Feira",
    "Sábado",
  ];
  return weekDay[new Date(`${month}/${day}/${year}`).getDay()];
}

async function fetchWeatherData() {
  const options = {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const URL = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityInput}`;

  await fetch(URL, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.current.temp_c);
      temp.innerHTML = data.current.temp_c + "°";
      conditionOutput.innerHTML = data.current.condition.text;

      const date = data.location.localtime;
      const yyyy = parseInt(date.substr(0, 4));
      const mm = parseInt(date.substr(5, 2));
      const dd = parseInt(date.substr(8, 2));
      const time = date.substr(11);

      dateOutput.innerHTML = `${dayOfTheWeek(
        dd,
        mm,
        yyyy
      )} ${dd}, ${mm} ${yyyy}`;
      timeOutput.innerHTML = time;
      nameOutput.innerHTML = data.location.name;

      const iconID = data.current.condition.icon.substr(
        "//cdn.weatherapi.com/weather/64x64/".length
      );
      icon.src = "./icons/" + iconID;

      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      let timeOfDay = "day";
      const code = data.current.condition.code;
      if (!data.current.is_day) timeOfDay = "night";

      if (code == 1000) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
        btn.style.background = "#E5BA92";
        if (timeOfDay == "night") {
          btn.style.background = "#181E27";
        }
      } else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
        btn.style.background = "#FA6D1B";
        if (timeOfDay == "night") {
          btn.style.background = "#181E27";
        }
      } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
      ) {
        app.style.backgroundImage = `url(./images/${timeOfDay}/rainy.jpg)`;
        btn.style.background = "#647D75";
        if (timeOfDay == "night") {
          btn.style.background = "#325C80";
        }
      } else {
        app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
        btn.style.background = "#4D72AA";
        if (timeOfDay == "night") {
          btn.style.background = "#1B1B1B";
        }
      }
      app.style.opacity = "1";
    })
    .catch(() => {
      alert("Cidade não encontrada, por favor tente novamente");
      app.style.opacity = "1";
    });
}

fetchWeatherData();
app.style.opacity = "1";
