import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

let _cached = null
let _cachedAt = 0
const CACHE_MS = 30 * 60 * 1000 // 30 min

// KL coordinates
const LAT = 3.1390
const LON = 101.6869

export function useWeather() {
  const [weather,  setWeather]  = useState(_cached)
  const [loading,  setLoading]  = useState(!_cached)
  const [error,    setError]    = useState(false)

  const fetch_ = async () => {
    const now = Date.now()
    if (_cached && now - _cachedAt < CACHE_MS) { setWeather(_cached); setLoading(false); return }
    try {
      setLoading(true)
      const res  = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,precipitation,rain,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=1&timezone=Asia%2FKuala_Lumpur`
      )
      const data = await res.json()
      const cur  = data.current
      // Get max rain probability for next 6 hours
      const now_h = new Date().getHours()
      const probs = (data.hourly?.precipitation_probability || []).slice(now_h, now_h + 6)
      const maxRainProb = Math.max(...probs, 0)

      const w = {
        temp:       Math.round(cur.temperature_2m),
        humidity:   Math.round(cur.relative_humidity_2m),
        rain:       cur.rain || 0,
        code:       cur.weather_code,
        wind:       Math.round(cur.wind_speed_10m),
        maxRainProb,
        umbrella:   maxRainProb > 50,
        emoji:      getWeatherEmoji(cur.weather_code, maxRainProb),
        condition:  getCondition(cur.weather_code, maxRainProb),
        feel:       getFeel(Math.round(cur.temperature_2m), Math.round(cur.relative_humidity_2m)),
      }
      _cached   = w
      _cachedAt = now
      setWeather(w)
      setError(false)
    } catch { setError(true) } finally { setLoading(false) }
  }

  useEffect(() => {
    fetch_()
    const sub = AppState.addEventListener('change', s => { if (s === 'active') fetch_() })
    return () => sub.remove()
  }, [])

  return { weather, loading, error, refetch: fetch_ }
}

function getWeatherEmoji(code, rainProb) {
  if (code >= 95) return '⛈️'
  if (code >= 80) return '🌧️'
  if (code >= 61) return '🌦️'
  if (code >= 51) return '🌦️'
  if (code >= 45) return '🌫️'
  if (code >= 3)  return '⛅'
  if (code >= 1)  return '🌤️'
  if (rainProb > 60) return '🌧️'
  return '☀️'
}

function getCondition(code, rainProb) {
  if (code >= 95) return 'Thunderstorm'
  if (code >= 80) return 'Heavy Rain'
  if (code >= 61) return 'Rainy'
  if (code >= 51) return 'Drizzle'
  if (code >= 45) return 'Foggy'
  if (code >= 3)  return 'Cloudy'
  if (code >= 1)  return 'Partly Cloudy'
  if (rainProb > 60) return 'Rain likely'
  return 'Clear'
}

function getFeel(temp, humidity) {
  if (temp >= 35) return 'Very hot & humid 🥵'
  if (temp >= 32 && humidity > 80) return 'Hot & humid'
  if (temp >= 30) return 'Warm & humid'
  if (temp >= 27) return 'Pleasant 😊'
  return 'Cool & comfortable'
}
