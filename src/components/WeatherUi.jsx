import React from 'react'
import { useState, useEffect } from 'react'
import SevenDay from './SevenDay'
import Hourly from './Hourly'

const WeatherUi = () => {


    const [inputCity, setInputCity] = useState("Mumbai")
    const [city, setCity] = useState("Mumbai")
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchWeather = async () => {
            if (!city) return
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
                const data = await response.json()
                if (data.cod !== 200) {
                    setError(data.message)
                } else {
                    setWeatherData(data)
                }
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchWeather()
    }, [city])

    const handleSearch = (e) => {
        e.preventDefault()
        setCity(inputCity)
    }

    return (
        <div className="weather-container">
            <h1 className="app-title">Weather Forecast</h1>
            <form className="search-box" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={inputCity}
                    onChange={(e) => setInputCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading && <div className="loader">Loading...</div>}
            {error && <div className="error-message">{error}</div>}

            {weatherData && (
                <div className="weather-content">
                    <div className="current-weather card glass">
                        <div className="main-info">
                            <h2 className="city-name">{weatherData.name}</h2>
                            <p className="temp">{Math.round(weatherData.main.temp)}°C</p>
                            <p className="desc">{weatherData.weather[0].description}</p>
                        </div>
                        <div className="details-grid">
                            <div className="detail-item">
                                <span className="label">Humidity</span>
                                <span className="value">{weatherData.main.humidity}%</span>
                            </div>
                            <div className="detail-item">
                                <span className="label">Wind Speed</span>
                                <span className="value">{weatherData.wind.speed} m/s</span>
                            </div>
                        </div>
                    </div>

                    <div className="forecast-section glass">
                        <h3>Hourly Forecast</h3>
                        <Hourly lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
                    </div>

                    <div className="forecast-section glass">
                        <h3>7-Day Forecast</h3>
                        <SevenDay lat={weatherData.coord.lat} lon={weatherData.coord.lon} />
                    </div>
                </div>
            )}
        </div>
    )
}

export default WeatherUi