// Get APIKey
const apiKey ="bb54be0147ot8a4cca9066da1f16f233";


// Set the current date
let date = new Date();
let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
let today = document.querySelector('#date');
if (date.getHours() < 12 || date.getHours() == 0){
    today.innerText =`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} AM`
}else{
    today.innerText =`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')} PM`
}

// Display Weather details
function displayWeather(data) {
    document.querySelector('#city').innerText = data.city;
    document.querySelector('#desc').innerText = data.condition.description;
    document.querySelector('#humid').innerText = `Humidity: ${data.temperature.humidity}%`;
    document.querySelector('#wind').innerText = `Wind: ${data.wind.speed}km/h`;
    document.querySelector('#temp').innerText = `${data.temperature.current} °C`;
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

