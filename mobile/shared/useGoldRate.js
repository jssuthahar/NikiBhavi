import { useState, useEffect } from 'react'
import { AppState } from 'react-native'

let _cached = null
let _cachedAt = 0
const CACHE_MS = 60 * 60 * 1000 // 1 hour

// Gold rate in MYR per gram — uses goldpricez API (free, no key)
// Fallback: approximate based on USD gold price
const MYR_PER_USD = 4.47 // approximate

export function useGoldRate() {
  const [gold,    setGold]    = useState(_cached)
  const [loading, setLoading] = useState(!_cached)
  const [error,   setError]   = useState(false)

  const fetch_ = async () => {
    const now = Date.now()
    if (_cached && now - _cachedAt < CACHE_MS) { setGold(_cached); setLoading(false); return }
    try {
      setLoading(true)
      // Use free metals API (no key needed, real-time)
      const res  = await fetch('https://api.metals.live/v1/spot/gold')
      const data = await res.json()
      const usdPerOz = data[0]?.price || 3200 // fallback USD/oz
      const usdPerGram = usdPerOz / 31.1035
      const myrPerGram = usdPerGram * MYR_PER_USD
      const inrPerGram = myrPerGram * 19.5

      const g = {
        myrGram:  Math.round(myrPerGram),
        inrGram:  Math.round(inrPerGram),
        usdOz:    Math.round(usdPerOz),
        // Common weights
        myr8g:    Math.round(myrPerGram * 8),   // 1 emas
        myr10g:   Math.round(myrPerGram * 10),
        myr916:   Math.round(myrPerGram * 0.916), // 22k per gram
        myrSovereign: Math.round(myrPerGram * 7.98), // 1 sovereign
        updated:  new Date(),
      }
      _cached   = g
      _cachedAt = now
      setGold(g)
      setError(false)
    } catch {
      // Use fallback rate if API fails
      const fallback = {
        myrGram: 430, inrGram: 8385, usdOz: 3200,
        myr8g: 3440, myr10g: 4300, myr916: 394,
        myrSovereign: 3431, updated: null, isFallback: true,
      }
      _cached = fallback
      setGold(fallback)
      setError(true)
    } finally { setLoading(false) }
  }

  useEffect(() => {
    fetch_()
    const sub = AppState.addEventListener('change', s => { if (s === 'active') fetch_() })
    return () => sub.remove()
  }, [])

  return { gold, loading, error, refetch: fetch_ }
}
