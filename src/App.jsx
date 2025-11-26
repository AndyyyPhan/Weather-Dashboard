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
  const [units, setUnits] = React.useState("metric");
  const [theme, setTheme] = React.useState("dark");

  React.useEffect(() => {
    localStorage.setItem("validCity", validCity);
  }, [validCity])

  function toggleUnits() {
    setUnits((prevUnits) => (prevUnits === "metric" ? "imperial" : "metric"));
  }

  function toggleTheme() {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  }

  return (
    <main className={`app-shell ${theme === "dark" ? "theme-dark" : "theme-light"}`}>
      <div className="app-container">
        <div className="header-row">
          <Header />
          <div className="header-controls">
            <SearchBar onSearch={setCity} />
            <button type="button"
              className="unit-toggle"
              onClick={toggleUnits}
              aria-label="Toggle temperature units between Celsius and Fahrenheit"
            >
              <span className={`unit-toggle-segment ${units === "metric" ? "is-active" : ""}`}>
                °C
              </span>
              <span className={`unit-toggle-segment ${units === "imperial" ? "is-active" : ""}`}>
                °F
              </span>
            </button>
            <button type="button"
              className="theme-toggle"
              onClick={toggleTheme}
            >
              <span className={`unit-toggle-segment ${theme === "dark" ? "is-active" : ""}`}>
                🌙
              </span>
              <span className={`unit-toggle-segment ${theme === "light" ? "is-active" : ""}`}>
                🔆
              </span>
            </button>
          </div>
        </div>

        <WeatherDashboard city={city} setValidCity={setValidCity} units={units} />
        <ForecastDashboard validCity={validCity} units={units} />
      </div>
    </main>
  )
}