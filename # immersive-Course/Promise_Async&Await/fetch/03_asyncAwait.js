async function getNewsAndWeatherAsync() {
  const newsURL = 'http://localhost:5000/data/latestNews';
  const weatherURL = 'http://localhost:5000/data/weather';

  const json1 = await fetch(newsURL).then((resp) => resp.json());
  const json2 = await fetch(weatherURL).then((resp) => resp.json());

  return {
    news: json1.data,
    weather: json2,
  };
}

if (typeof window === 'undefined') {
  module.exports = {
    getNewsAndWeatherAsync,
  };
}
