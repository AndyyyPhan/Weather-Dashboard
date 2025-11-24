import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDashboard from "./components/WeatherDashboard";
import ForecastDashboard from "./components/ForecastDashboard";
import React from "react";

export default function App() {
  const [validCity, setValidCity] = React.useState(() => {
    const savedCity = localStorage.getItem("validCity");
    return savedCity ? savedCity : "";
  });

  const [city, setCity] = React.useState(validCity);

  React.useEffect(() => {
    localStorage.setItem("validCity", validCity);
  }, [validCity])

  return (
    <main className="app-shell">
      <div className="app-container">
        <div className="header-row">
          <Header />
          <SearchBar onSearch={setCity} />
        </div>
        <WeatherDashboard city={city} setValidCity={setValidCity}/>
        <ForecastDashboard validCity={validCity} />
      </div>
    </main>
  )
}