// Persistent storage using expo-secure-store
// Auto-linked by EAS — works in both simulator AND production builds

let SecureStore
try {
  SecureStore = require('expo-secure-store')
} catch {
  SecureStore = null
}

// In-memory fallback
const _mem = {}

export const storage = {
  async getItem(key) {
    try {
      if (SecureStore) return await SecureStore.getItemAsync(key)
      return _mem[key] ?? null
    } catch {
      return _mem[key] ?? null
    }
  },
  async setItem(key, value) {
    try {
      _mem[key] = value
      if (SecureStore) await SecureStore.setItemAsync(key, value)
    } catch {
      _mem[key] = value
    }
  },
  async removeItem(key) {
    try {
      delete _mem[key]
      if (SecureStore) await SecureStore.deleteItemAsync(key)
    } catch {
      delete _mem[key]
    }
  }
}
