import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import WeatherDashboard from "./components/WeatherDashboard";
import React from "react";

export default function App() {
  const [city, setCity] = React.useState("");

  return (
    <main className="app-shell">
      <div className="app-container">
        <div className="header-row">
          <Header />
          <SearchBar onSearch={setCity} />
        </div>
        <WeatherDashboard city={city} />
      </div>
    </main>
  )
}