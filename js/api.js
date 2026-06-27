// ================================
// Weather API Configuration
// ================================

// Replace this with your WeatherAPI key
const API_KEY = "4ad82ba9c0ed4782a2f104004262606 ";

const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

// ================================
// Fetch Weather
// ================================

async function fetchWeather(city) {

    try {

        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${city}&days=7&aqi=yes&alerts=yes`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        return data;

    } catch (error) {

        console.error(error);

        alert("Unable to fetch weather.");

        return null;

    }
    // =====================================
// Fetch Weather by Coordinates
// =====================================

async function fetchWeatherByLocation(latitude, longitude) {

    try {

        const response = await fetch(
            `${BASE_URL}?key=${API_KEY}&q=${latitude},${longitude}&days=7&aqi=yes&alerts=yes`
        );

        if (!response.ok) {
            throw new Error("Location not found");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        alert("Unable to fetch your location weather.");

        return null;

    }

}

}