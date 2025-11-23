import React from "react";
export default function WeatherDashboard(props) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const [weatherData, setWeatherData] = React.useState(null);
    React.useEffect(() => {
        if (props.city === "") return;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                setWeatherData({
                    curTemp: data.main.temp,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    weatherDesc: data.weather[0].description,
                    weatherIcon: data.weather[0].icon
                })
            })
    }, [props.city])
    return (
        <section className="weather-section">
            {!weatherData && (
                <div className="empty-state">
                    Search for a city to see its current weather.
                </div>
            )}
            {weatherData && (
                <div className="weather-card">
                    <div className="weather-main">
                        <h2>City: {props.city}</h2>
                        <div className="weather-temp">
                            {Math.round(weatherData.curTemp)}°C
                        </div>

                        <div className="weather-meta">
                            <span>💧 Humidity: {weatherData.humidity}%</span>
                            <span>💨 Wind: {weatherData.windSpeed} m/s</span>
                            <span className="weather-description">{weatherData.weatherDesc}</span>
                        </div>
                    </div>
                    <div className="weather-icon-wrapper">
                        <img
                            src={`https://openweathermap.org/img/wn/${weatherData.weatherIcon}@2x.png`}
                            alt={weatherData.weatherDesc}
                        />
                        <small>Powered by OpenWeather</small>
                    </div>
                </div>
            )}
        </section>
    )
}