import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/leaderboard/'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadLeaderboard() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setEntries(Array.isArray(payload) ? payload : payload?.entries || payload?.items || payload?.results || payload?.data || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadLeaderboard()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-secondary">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p className="text-muted">No leaderboard data available yet.</p>
      ) : (
        <div className="list-group">
          {entries.map((entry) => (
            <div className="list-group-item" key={entry._id || entry.userId}>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5 className="mb-1">Rank {entry.rank}</h5>
                  <p className="mb-1">User {entry.userId}</p>
                </div>
                <span className="badge bg-primary rounded-pill">{entry.score}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Leaderboard
