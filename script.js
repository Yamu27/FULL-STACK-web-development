async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = "cdf3430703b7b0975d58e3cfaefacd73";  // Enter your API key here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("City not found!");
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherData').innerHTML = "❌ City not found!";
    }
}

async function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const apiKey = "cdf3430703b7b0975d58e3cfaefacd73";  // Enter your API key here
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Location not found!");
                }

                const data = await response.json();
                displayWeather(data);
            } catch (error) {
                document.getElementById('weatherData').innerHTML = "❌ Unable to fetch location weather!";
            }
        });
    } else {
        document.getElementById('weatherData').innerHTML = "❌ Geolocation is not supported by your browser.";
    }
}

function displayWeather(data) {
    document.getElementById('weatherData').innerHTML = `
        <h2>${data.name}</h2>
        <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <p>🌡 Temperature: ${data.main.temp}°C</p>
        <p>🤗 Feels Like: ${data.main.feels_like}°C</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>☁ Weather: ${data.weather[0].description}</p>
    `;
}
