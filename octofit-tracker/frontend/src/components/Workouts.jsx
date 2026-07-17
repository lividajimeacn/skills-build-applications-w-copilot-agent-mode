import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/workouts/'
const API_URLtest = '/api/workouts/'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadWorkouts() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setWorkouts(Array.isArray(payload) ? payload : payload?.workouts || payload?.items || payload?.results || payload?.data || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadWorkouts()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-secondary">Loading workouts...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p className="text-muted">No workouts available yet.</p>
      ) : (
        <div className="list-group">
          {workouts.map((workout) => (
            <div className="list-group-item" key={workout._id || workout.title}>
              <h5 className="mb-1">{workout.title}</h5>
              <p className="mb-1">Focus: {workout.focus}</p>
              <small className="text-muted">{workout.durationMinutes} minutes • {workout.difficulty}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Workouts


