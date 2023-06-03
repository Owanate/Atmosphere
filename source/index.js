// Get APIKey
const apiKey = "58bab989e7f95b6d56a017f42601cf07";


// Set the current date
let date = new Date();
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
let today = document.querySelector('#date');
today.innerText = `${days[date.getDay()]} ${date.getHours()}: ${date.getMinutes()}`;


// Display Weather details
function displayWeather(data) {
    document.querySelector('#city').innerText = data.name;
    document.querySelector('#desc').innerText = data.weather[0].description;
    document.querySelector('#humid').innerText = `Humidity: ${data.main.humidity}%`;
    document.querySelector('#wind').innerText = `Wind: ${data.wind.speed}km/h`;
    document.querySelector('#temp').innerText = `${data.main.temp} °C`;
}


// Weather of current position
navigator.geolocation.getCurrentPosition(currentPosition);

async function currentPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
}


// Search form
let form = document.querySelector('#search-form');
let city = document.querySelector('#search-input');
form.addEventListener('submit',(event) => {
    event.preventDefault();
    fetch (`https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`
        ).then(response => response.json()
        ).then(data => displayWeather(data));
    })

// Convert temperature 
document.querySelector('#metric').addEventListener('click', convertTemperature);
function convertTemperature() {
    let celsius = temperature.innerText;
    let fahrenheit = (celsius * 9/5) + 32;
    if (!this.dataset.clicked) {
        this.setAttribute("data-clicked", "true");
        temperature.innerText = fahrenheit;
        metric.innerText ="°F";
    } else {
        this.removeAttribute("data-clicked");
        temperature.innerText = celsius;
        metric.innerText ="°C"
    }
}

