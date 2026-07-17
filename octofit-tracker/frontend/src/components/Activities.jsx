import { useEffect, useState } from 'react'

const API_URL = 'http://127.0.0.1:8000/api/activities/'
const API_URLtest = '/api/activities/'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadActivities() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setActivities(Array.isArray(payload) ? payload : payload?.activities || payload?.items || payload?.results || payload?.data || [])
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadActivities()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-secondary">Loading activities...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Activities</h2>
      {activities.length === 0 ? (
        <p className="text-muted">No activities available yet.</p>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div className="list-group-item" key={activity._id || activity.type}>
              <h5 className="mb-1">{activity.type}</h5>
              <p className="mb-1">{activity.durationMinutes} minutes • {activity.caloriesBurned} calories</p>
              {activity.distanceKm ? <small className="text-muted">{activity.distanceKm} km</small> : null}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Activities


