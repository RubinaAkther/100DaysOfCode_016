const apiKey = 'd94862396327db001f1e328745fddd09';
const apiUrl =
  'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search-btn');
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = data.main.temp + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = './images/clouds.png';
    } else if (data.weather[0].main == 'rain') {
      weatherIcon.src = './images/rain.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = './images/clear.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = './images/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = './images/mist.png';
    } else if (data.weather[0].main == 'Snow') {
      weatherIcon.src = './images/snow.png';
    }

    document.querySelector('.weather').style.display = 'block';
  } catch (error) {
    console.error(error);
    alert('Error: Unable to fetch weather data. Please check the city name.');
  }
}

searchBtn.addEventListener('click', () => {
  const city = searchBox.value.trim();
  if (city) {
    checkWeather(city);
  } else {
    alert('Please enter a city name.');
  }
});

searchBox.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    const city = searchBox.value.trim();
    if (city) {
      checkWeather(city);
    } else {
      alert('Please enter a city name.');
    }
  }
});
