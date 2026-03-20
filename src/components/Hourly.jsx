import React from 'react'
import { useState, useEffect } from 'react'

const Hourly = ({ lat, lon }) => {
    const [hourlyData, setHourlyData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchHourlyData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`)
                const data = await response.json()
                setHourlyData(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchHourlyData()
    }, [lat, lon])


    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {hourlyData && (
                <div className="hourly-container">
                    <div className="hourly-row">
                        <p className="section-title">Time</p>
                        <div className="data-list">
                            {hourlyData.hourly.time.map((time, index) => (
                                <span className="data-item" key={index}>
                                    {new Date(time).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="hourly-row">
                        <p className="section-title">Temperature</p>
                        <div className="data-list">
                            {hourlyData.hourly.temperature_2m.map((temp, index) => (
                                <span className="data-item" key={index}>{temp}°C</span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Hourly