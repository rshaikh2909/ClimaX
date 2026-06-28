// ================================
// Weather API Configuration
// ================================

const API_KEY = "4ad82ba9c0ed4782a2f104004262606";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

// ================================
// Fetch Weather by City
// ================================

async function fetchWeather(city) {
    try {
        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        showError("City not found.");
        return null;
    }
}

// ================================
// Fetch Weather by Location
// ================================

async function fetchWeatherByLocation(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=yes&alerts=yes`
        );

        if (!response.ok) {
            throw new Error("Location not found");
        }

        return await response.json();

    } catch (error) {
        console.error(error);
        showError("Unable to fetch weather for your location.");
        return null;
    }
}