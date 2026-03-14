import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

// Cached rate so we don't spam API on every render
let _cachedRate = null
let _cachedAt   = 0
const CACHE_MS  = 5 * 60 * 1000 // 5 minutes

export function useLiveRate() {
  const [rate,    setRate]    = useState(_cachedRate || 19.5)
  const [loading, setLoading] = useState(!_cachedRate)
  const [error,   setError]   = useState(false)
  const [updated, setUpdated] = useState(null)

  const fetchRate = async () => {
    const now = Date.now()
    if (_cachedRate && now - _cachedAt < CACHE_MS) {
      setRate(_cachedRate)
      setLoading(false)
      return
    }
    try {
      setLoading(true)
      const res  = await fetch('https://api.exchangerate-api.com/v4/latest/MYR')
      const data = await res.json()
      const r    = data?.rates?.INR
      if (r) {
        _cachedRate = r
        _cachedAt   = now
        setRate(r)
        setUpdated(new Date())
        setError(false)
      }
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRate()
    // Re-fetch when app comes to foreground
    const sub = AppState.addEventListener('change', state => {
      if (state === 'active') fetchRate()
    })
    return () => sub.remove()
  }, [])

  return { rate, loading, error, refetch: fetchRate, updated }
}
