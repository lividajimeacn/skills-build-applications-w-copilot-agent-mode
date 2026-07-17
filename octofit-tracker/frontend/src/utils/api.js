export const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  return 'http://127.0.0.1:8000'
}

export const getApiUrl = (resource) => `${getApiBaseUrl()}/api/${resource}/`

export const normalizeItems = (payload, fallbackKey = '') => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.items)) {
    return payload.items
  }

  if (Array.isArray(payload.results)) {
    return payload.results
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  const fallback = fallbackKey ? payload[fallbackKey] : undefined
  if (Array.isArray(fallback)) {
    return fallback
  }

  if (Array.isArray(payload.entries)) {
    return payload.entries
  }

  if (Array.isArray(payload.users)) {
    return payload.users
  }

  if (Array.isArray(payload.activities)) {
    return payload.activities
  }

  if (Array.isArray(payload.teams)) {
    return payload.teams
  }

  if (Array.isArray(payload.workouts)) {
    return payload.workouts
  }

  return []
}
