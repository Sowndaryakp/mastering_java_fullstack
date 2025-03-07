const CACHE_PREFIX = 'oep_';
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

export const cache = {
  set: (key, value, expiry = CACHE_EXPIRY) => {
    const item = {
      value,
      timestamp: Date.now(),
      expiry,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  },

  get: (key) => {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const { value, timestamp, expiry } = JSON.parse(item);
    if (Date.now() - timestamp > expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return value;
  },

  remove: (key) => {
    localStorage.removeItem(CACHE_PREFIX + key);
  },

  clear: () => {
    Object.keys(localStorage)
      .filter((key) => key.startsWith(CACHE_PREFIX))
      .forEach((key) => localStorage.removeItem(key));
  },

  setUserPreferences: (preferences) => {
    cache.set('user_preferences', preferences, 30 * 24 * 60 * 60 * 1000); // 30 days
  },

  getUserPreferences: () => {
    return cache.get('user_preferences') || {};
  },

  setExamHistory: (history) => {
    cache.set('exam_history', history);
  },

  getExamHistory: () => {
    return cache.get('exam_history') || { exams: [], stats: null };
  },

  setOfflineData: (data) => {
    cache.set('offline_data', data);
  },

  getOfflineData: () => {
    return cache.get('offline_data') || [];
  },

  addOfflineAction: (action) => {
    const offlineData = cache.getOfflineData();
    offlineData.push({
      ...action,
      timestamp: Date.now(),
    });
    cache.setOfflineData(offlineData);
  },

  clearOfflineData: () => {
    cache.remove('offline_data');
  },
}; 