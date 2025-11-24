import React from "react";
export default function ForecastDashboard(props) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const [forecastData, setForecastData] = React.useState(null);
    const [cityLatLon, setCityLatLon] = React.useState(null);
    React.useEffect(() => {
        if (props.city === "") return;
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${props.city}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                setCityLatLon({ lat: data[0].lat, lon: data[0].lon })
            })
    }, [props.city])
    React.useEffect(() => {
        if (!cityLatLon) return;
        fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityLatLon.lat}&lon=${cityLatLon.lon}&appid=${apiKey}`)
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
            })
    }, [cityLatLon])

    function displayForecast() {
        if (!forecastData) return null;
        return forecastData.map(day => {
            return (
                <div className="weather-card" key={day.date}>
                    <div className="weather-main">
                        <h2>Date: {day.date}</h2>
                        <div className="weather-meta">
                            <span>Min Temp: {day.temp_min}</span>
                            <span>Max Temp: {day.temp_max}</span>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            {forecastData && <h2>Forecast Dashboard</h2>}
            {displayForecast()}
        </>
    )
}