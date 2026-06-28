// =====================================
// ClimaX Weather Dashboard
// script.js
// ---------- Elements ----------

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const locationBtn = document.getElementById("locationBtn");

// ---------- Event Listeners ----------

searchBtn.addEventListener("click", searchWeather);

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchWeather();
    }
});

locationBtn.addEventListener("click", getCurrentLocation);

// =====================================
// Search Weather
// =====================================

function searchWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        showError("Please enter a city name.");
        return;
    }

    loadWeather(city);

}

// =====================================
// Current Location
// =====================================

function getCurrentLocation() {

    if (!navigator.geolocation) {
        showError("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const weather = await fetchWeatherByLocation(
                latitude,
                longitude
            );

            if (!weather) return;

            updateWeather(weather);

        },

        () => {
            showError("Unable to get your location.");
        }

    );

}

// =====================================
// Load Weather
// =====================================

async function loadWeather(city) {

    const weather = await fetchWeather(city);

    if (!weather) return;

    updateWeather(weather);

}

// =====================================
// Update Dashboard
// =====================================

function updateWeather(weather) {

    // Hero

    document.getElementById("temperature").textContent =
        `${weather.current.temp_c}°C`;

    document.getElementById("cityName").textContent =
        weather.location.name;
        currentCity = weather.location.name;

saveSearch(currentCity);

    document.getElementById("description").textContent =
        weather.current.condition.text;

    document.getElementById("feelsLike").textContent =
        `Feels Like ${weather.current.feelslike_c}°C`;

    // Highlights

    document.getElementById("humidity").textContent =
        `${weather.current.humidity}%`;

    document.getElementById("wind").textContent =
        `${weather.current.wind_kph} km/h`;

    document.getElementById("pressure").textContent =
        `${weather.current.pressure_mb} hPa`;

    document.getElementById("visibility").textContent =
        `${weather.current.vis_km} km`;

    document.getElementById("uv").textContent =
        weather.current.uv;

    // Air Quality

    if (weather.current.air_quality) {

        document.getElementById("aqi").textContent =
            weather.current.air_quality["us-epa-index"];

    }

    // Sunrise

    document.getElementById("sunrise").textContent =
        `🌅 Sunrise : ${weather.forecast.forecastday[0].astro.sunrise}`;

    // Sunset

    document.getElementById("sunset").textContent =
        `🌇 Sunset : ${weather.forecast.forecastday[0].astro.sunset}`;

    // Last Updated

    document.getElementById("updatedTime").textContent =
        `🕒 Updated : ${weather.current.last_updated}`;

    // Forecast

    displayHourlyForecast(weather);

    displayDailyForecast(weather);

    updateBackground(weather);
}

// =====================================
// Rain Animation
// =====================================

function createRain() {

    const rain = document.getElementById("rain");

    rain.innerHTML = "";

    for (let i = 0; i < 120; i++) {

        const drop = document.createElement("div");

        drop.className = "drop";

        drop.style.left = Math.random() * 100 + "%";

        drop.style.animationDuration =
            (0.5 + Math.random()) + "s";

        drop.style.animationDelay =
            Math.random() + "s";

        rain.appendChild(drop);

    }

}
// =====================================
// Snow Animation
// =====================================

function createSnow(){

    const snow=document.getElementById("snow");

    snow.innerHTML="";

    for(let i=0;i<90;i++){

        const flake=document.createElement("div");

        flake.className="flake";

        flake.style.left=Math.random()*100+"%";

        flake.style.animationDuration=
            (3+Math.random()*4)+"s";

        flake.style.animationDelay=
            Math.random()*4+"s";

        flake.style.opacity=
            Math.random();

        snow.appendChild(flake);

    }

}
// =====================================
// Lightning
// =====================================

function flashLightning(){

    const light=document.getElementById("lightning");

    light.classList.add("flash");

    setTimeout(()=>{

        light.classList.remove("flash");

    },250);

}

// =====================================
// 24 Hour Forecast
// =====================================

function displayHourlyForecast(weather) {

    const hourlyContainer =
        document.getElementById("hourlyForecast");

    hourlyContainer.innerHTML = "";

    const hours = weather.forecast.forecastday[0].hour;

    hours.forEach(hour => {

        const time = hour.time.split(" ")[1];

        const card = `
            <div class="hour-card glass">

                <p>${time}</p>

                <img
                    src="https:${hour.condition.icon}"
                    alt="${hour.condition.text}"
                >

                <h3>${hour.temp_c}°C</h3>

                <small>
                    💧 ${hour.humidity}% &nbsp; 🌧 ${hour.chance_of_rain}%
                </small>

            </div>
        `;

        hourlyContainer.innerHTML += card;

    });

}

// =====================================
// 7 Day Forecast
// =====================================

function displayDailyForecast(weather) {

    const dailyContainer =
        document.getElementById("dailyForecast");

    dailyContainer.innerHTML = "";

    weather.forecast.forecastday.forEach(day => {

        const date = new Date(day.date);

        const dayName =
            date.toLocaleDateString("en-US", {
                weekday: "short"
            });

        const card = `
            <div class="day-card glass">

                <h3>${dayName}</h3>

                <img
                    src="https:${day.day.condition.icon}"
                    alt="${day.day.condition.text}"
                >

                <h3>
                    ${day.day.maxtemp_c}° /
                    ${day.day.mintemp_c}°
                </h3>

                <small>
                    ${day.day.condition.text}
                </small>

            </div>
        `;

        dailyContainer.innerHTML += card;

    });

}
// =====================================
// Weather Background
// =====================================
function updateBackground(weather){

    const condition =
        weather.current.condition.text.toLowerCase();

    const rain=document.getElementById("rain");
    const snow=document.getElementById("snow");
    const moon=document.querySelector(".moon");
    const stars=document.getElementById("stars");

    document.body.className="";

    rain.style.display="none";
    snow.style.display="none";
    moon.style.display="none";
    stars.style.display="none";

    if(condition.includes("rain")){

        document.body.classList.add("rainy");

        rain.style.display="block";

        createRain();

    }

    else if(condition.includes("snow")){

        document.body.classList.add("snowy");

        snow.style.display="block";

        createSnow();

    }

    else if(condition.includes("thunder")){

        document.body.classList.add("storm");

        rain.style.display="block";

        createRain();

        flashLightning();

    }

    else if(condition.includes("clear")){

        document.body.classList.add("clear");

        moon.style.display="block";

        stars.style.display="block";

    }

    else if(condition.includes("cloud")){

        document.body.classList.add("cloudy");

    }

    else{

        document.body.classList.add("sunny");

    }

}
// =====================================
// Loading
// =====================================

function showLoading() {

    searchBtn.disabled = true;

    searchBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i>';

}

function hideLoading() {

    searchBtn.disabled = false;

    searchBtn.innerHTML =
        '<i class="fa-solid fa-magnifying-glass"></i>';

}

// =====================================
// Improve loadWeather
// =====================================

const originalLoadWeather = loadWeather;

loadWeather = async function(city) {

    showLoading();

    try {

        await originalLoadWeather(city);

    } finally {

        hideLoading();

    }

};

// =====================================
// Initialize Dashboard
// =====================================

window.addEventListener("load", () => {

    loadWeather("Mumbai");

});
function showError(message){

    const box = document.getElementById("errorBox");

    box.textContent = message;

    box.style.display = "block";

    setTimeout(() => {
        box.style.display = "none";
    }, 3000);

}

// ================================
// Search History & Favorites
// ================================

let searchHistory =
    JSON.parse(localStorage.getItem("history")) || [];

let favorites =
    JSON.parse(localStorage.getItem("favorites")) || [];

let currentCity = "";

// Render Tags
function renderTags(containerId, data){

    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    data.forEach(city => {

        const tag =
            document.createElement("div");

        tag.className = "tag";

        tag.textContent = city;

        tag.onclick = () => {

            cityInput.value = city;
            loadWeather(city);

        };

        container.appendChild(tag);

    });

}

// Save Search
function saveSearch(city){

    if(!searchHistory.includes(city)){

        searchHistory.unshift(city);

        if(searchHistory.length > 8){

            searchHistory.pop();

        }

        localStorage.setItem(
            "history",
            JSON.stringify(searchHistory)
        );

        renderTags("searchHistory", searchHistory);

    }

}

// Save Favorite
function saveFavorite(){

    if(currentCity === "") return;

    if(!favorites.includes(currentCity)){

        favorites.push(currentCity);

        localStorage.setItem(
            "favorites",
            JSON.stringify(favorites)
        );

        renderTags("favoriteCities", favorites);

    }

}

// Clear Buttons
document
.getElementById("clearHistoryBtn")
.onclick = () => {

    searchHistory = [];

    localStorage.removeItem("history");

    renderTags("searchHistory", searchHistory);

};

document
.getElementById("clearFavoritesBtn")
.onclick = () => {

    favorites = [];

    localStorage.removeItem("favorites");

    renderTags("favoriteCities", favorites);

};

// Favorite Button
document
.getElementById("favoriteBtn")
.onclick = saveFavorite;

// Initial Render
renderTags("searchHistory", searchHistory);

renderTags("favoriteCities", favorites);