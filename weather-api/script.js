let data = {
  "coord": {
    "lon": -122.08,
    "lat": 37.39
  },
  "weather": [
    {
      "id": 800,
      "main": "Clear",
      "description": "clear sky",
      "icon": "01d"
    }
  ],
  "base": "stations",
  "main": {
    "temp": 282.55,
    "feels_like": 281.86,
    "temp_min": 280.37,
    "temp_max": 284.26,
    "pressure": 1023,
    "humidity": 100
  },
  "visibility": 16093,
  "wind": {
    "speed": 1.5,
    "deg": 350
  },
  "clouds": {
    "all": 1
  },
  "dt": 1560350645,
  "sys": {
    "type": 1,
    "id": 5122,
    "message": 0.0139,
    "country": "US",
    "sunrise": 1560343627,
    "sunset": 1560396563
  },
  "timezone": -25200,
  "id": 420006353,
  "name": "Mountain View",
  "cod": 200
}

let root = document.querySelector('#root');
let search = document.querySelector('#search');
let input = document.querySelector('input');


function renderWeatherData(data) {
 // TODO: 여기에 DOM을 이용하여 날씨 데이터를 표시하세요   // &units=metric (섭씨표기법)

  let location = document.createElement('div');
  root.appendChild(location);
  location.textContent = data.name;

  let weather = document.createElement('div');
  root.appendChild(weather);
  weather.textContent = data.weather[0].description;

  let temp = document.createElement('div');
  root.appendChild(temp);
  temp.textContent = (data.main.temp-273.15).toFixed(1) + '℃';
}


function buttonhandler () {
  const cityName = input.value;
  `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=kr&&appid=ffe6e117e6c3a544ffa013109dda93e7`;
  
  getData();
} 

function getCity () {
  const cityName = document.querySelector("#inputCity").value;
  return `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=kr&&appid=ffe6e117e6c3a544ffa013109dda93e7`;
}

function getData() {

  fetch(getCity())
  .then(function(resp) {
    return resp.json()
  })
  .then(function(json) {

    renderWeatherData(json);
    // TODO:
    // 요청이 완료되고 나면 여기서부터 날씨 데이터(json)를 사용할 수 있습니다.
    // 하드코딩된 data를 대체하세요.
  });
}

search.onclick = buttonhandler;
