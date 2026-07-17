import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/teams/'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadTeams() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setTeams(Array.isArray(payload) ? payload : payload?.teams || payload?.items || payload?.results || payload?.data || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadTeams()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-secondary">Loading teams...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Teams</h2>
      {teams.length === 0 ? (
        <p className="text-muted">No teams available yet.</p>
      ) : (
        <div className="list-group">
          {teams.map((team) => (
            <div className="list-group-item" key={team._id || team.name}>
              <h5 className="mb-1">{team.name}</h5>
              <p className="mb-1">{team.description}</p>
              <small className="text-muted">{team.members?.length || 0} members</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Teams


