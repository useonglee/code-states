function getNewsAndWeather() {
  const newsURL = 'http://localhost:5000/data/latestNews';
  const weatherURL = 'http://localhost:5000/data/weather';

  return fetch(newsURL)
    .then((resp) => resp.json())
    .then((json1) => {
      return fetch(weatherURL)
        .then((resp) => resp.json())
        .then((json2) => {
          return {
            news: json1.data,
            weather: json2,
          };
        });
    });
}

if (typeof window === 'undefined') {
  module.exports = {
    getNewsAndWeather,
  };
}
