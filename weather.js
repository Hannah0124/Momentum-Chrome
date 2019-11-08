const weather = document.querySelector('.js-weather');

const API_KEY = 'd07f906a4da48e94608362cc317ea0fd';
const COORDS = 'coords'

function getWeather(lat, lon) {
  // Make a API call
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(function(response) {
      return response.json();
      // Once json is ready
    }).then(function(json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `${temperature} @ ${place}`;

    });
};

// Store geo data in local storage
function saveCoords(coordsObj) {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

function handleGeoSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude
  };

  // Save geo data in LS
  saveCoords(coordsObj);

  getWeather(latitude, longitude);
};

function handleGeoError() {
  console.log('Cant access geo locaiton');
};

function askForCoords() {
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
};

function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if(loadedCoords === null) {
    askForCoords();
  } else {
    // getWeather
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
};

init();