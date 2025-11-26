import React from "react";
export default function ForecastDashboard(props) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const [forecastData, setForecastData] = React.useState(null);
    const [cityLatLon, setCityLatLon] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);
    React.useEffect(() => {
        if (props.validCity === "") return;
        setIsLoading(true);
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${props.validCity}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                setCityLatLon({ lat: data[0].lat, lon: data[0].lon })
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            })
    }, [props.validCity])
    React.useEffect(() => {
        if (!cityLatLon) return;
        setIsLoading(true);
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatLon.lat}&lon=${cityLatLon.lon}&appid=${apiKey}&units=metric`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                let forecast5Days = [];
                for (let i = 0; i < 5; i++) {
                    let min_temp = data.list[8 * i].main.temp_min;
                    let max_temp = data.list[8 * i].main.temp_max;
                    for (let j = 0; j < 8; j++) {
                        min_temp = Math.min(min_temp, data.list[8 * i + j].main.temp_min)
                        max_temp = Math.max(max_temp, data.list[8 * i + j].main.temp_max)
                    }
                    forecast5Days.push({
                        date: data.list[8 * i].dt_txt.split(" ")[0],
                        temp_min: min_temp,
                        temp_max: max_temp
                    })
                }
                setForecastData(forecast5Days);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            })
    }, [cityLatLon])

    function convertToFahrenheit(celsius) {
        return celsius * (9 / 5) + 32
    }

    function formatTemperature(celsius, units) {
        if (units === "metric") {
            return `${Math.round(celsius)}°C`;
        }
        return `${Math.round(convertToFahrenheit(celsius))}°F`
    }

    function displayForecast() {
        if (!forecastData) return null;
        return forecastData.map(day => {
            return (
                <div className="weather-card forecast-card" key={day.date}>
                    <div className="weather-main">
                        <h2>Date: {day.date}</h2>
                        <div className="weather-meta">
                            <span>Min Temp: {formatTemperature(day.temp_min, props.units)}</span>
                            <span>Max Temp: {formatTemperature(day.temp_max, props.units)}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <section className="forecast-section">
            {forecastData && <h2 className="forecast-title">5-Day Forecast</h2>}

            {isLoading && (
                <div className="weather-card loading-card">Loading forecast...</div>
            )}
            {!isLoading && (
                <div className="forecast-grid">{displayForecast()}</div>
            )}
        </section>
    )
}