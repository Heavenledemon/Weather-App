import React from 'react'
import { useState, useEffect } from 'react'

const SevenDay = ({ lat, lon }) => {
    const [sevenDayData, setSevenDayData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSevenDayData = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min&timezone=auto`)
                const data = await response.json()
                setSevenDayData(data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchSevenDayData()
    }, [lat, lon])



    return (
        <div>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {sevenDayData && (
                <div className="seven-day-container">
                    <div className="daily-grid">
                        {sevenDayData.daily.time.map((date, index) => (
                            <div className="daily-card glass-sub" key={index}>
                                <p className="day-name">{new Date(date).toLocaleDateString("en-US", { weekday: "short" })}</p>
                                <div className="temp-range">
                                    <span className="max-temp">{Math.round(sevenDayData.daily.temperature_2m_max[index])}°C</span>
                                    <span className="min-temp">{Math.round(sevenDayData.daily.temperature_2m_min[index])}°C</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

        </div>
    )
}

export default SevenDay