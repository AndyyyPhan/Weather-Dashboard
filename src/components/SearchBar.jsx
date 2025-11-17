export default function SearchBar(props) {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    function getCity(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const city = formData.get("searchCity");
        props.onSearch(city);
    }
    return (
        <form className="searchCity" onSubmit={getCity}>
            <label htmlFor="searchCity">Search City:</label>
            <input id="searchCity" name="searchCity" />

            <button>Search</button>
        </form>
    )
}