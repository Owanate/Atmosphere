// Get variables
const apiKey ="bb54be0147ot8a4cca9066da1f16f233";
let celsiusTemp = null;

// Set the current date
let date = new Date();
let today = document.querySelector('#date');
if (date.getHours() < 12 || date.getHours() == 0){
    today.innerText =`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} AM`
}else{
    today.innerText =`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} PM`
}

// Display Weather details
function displayWeather(data) {
    celsiusTemp = data.temperature.current.toFixed();
    document.querySelector('#city').innerText = data.city;
    document.querySelector('#desc').innerText = data.condition.description;
    document.querySelector('#humid').innerText = `Humidity: ${data.temperature.humidity}%`;
    document.querySelector('#wind').innerText = `Wind: ${data.wind.speed}km/h`;
    document.querySelector('#temp').innerText = `${celsiusTemp}`;
    document.querySelector('.weather-icon').src = `${data.condition.icon_url}`;
}

// Weather of current position
navigator.geolocation.getCurrentPosition(currentPosition);
async function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    const url = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
    getForecast(lat, lon);
}

// Search form
let form = document.querySelector('#search-form');
let city = document.querySelector('#search-input');
form.addEventListener('submit',(event) => {
    event.preventDefault();
    fetch (`https://api.shecodes.io/weather/v1/current?query=${city.value}&key=${apiKey}&units=metric`
        ).then(response => response.json()
        ).then(data => displayWeather(data));
    })

// Convert Temperature
document.querySelector('#metric').addEventListener('click', convertTemperature);
function convertTemperature(event) {
    let temperature = document.querySelector('#temp');
    event.preventDefault();
    let fahrenheit = (celsiusTemp * 9/5) + 32;
    if (!this.dataset.clicked) {
        this.setAttribute("data-clicked", "true");
        temperature.innerText = fahrenheit;
        metric.innerText ="°F";
    } else {
        this.removeAttribute("data-clicked");
        temperature.innerText = celsiusTemp;
        metric.innerText ="°C"
    }
}

// Weather Forecast
async function getForecast(lat, lon) {
    let url = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}`
    const response = await fetch(url)
    const data = await response.json();
    let forecasts = document.querySelector('.wrapper');
    for (let i = 0; i < 4; i++) {
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() + i);
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        let forecast = 
            
            `<div class="future-weather">
                <p class="day">${days[tomorrow.getDay()]}</p>
                <img src="${data.daily[i].condition.icon_url}" alt="" class="forecast-img">
                <p class="temp">
                    <span>${data.daily[i].temperature.maximum.toFixed()}°</span>
                    <span>${data.daily[i].temperature.minimum.toFixed()}°</span>
                </p>
            </div>`;
        forecasts.insertAdjacentHTML('beforeend', forecast);
    }
}