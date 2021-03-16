function getNewsAndWeatherAll() {
  const newsURL = 'http://localhost:5000/data/latestNews';
  const weatherURL = 'http://localhost:5000/data/weather';

  return Promise.all([fetch(newsURL), fetch(weatherURL)])
    .then(([newsResponse, weatherResponse]) => {
      return Promise.all([newsResponse.json(), weatherResponse.json()]);
    })
    .then(([json1, json2]) => {
      return {
        news: json1.data,
        weather: json2,
      };
    });
}

if (typeof window === 'undefined') {
  module.exports = {
    getNewsAndWeatherAll,
  };
}
