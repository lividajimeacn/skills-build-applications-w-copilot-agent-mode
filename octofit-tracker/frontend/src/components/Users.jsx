import { useEffect, useState } from 'react'

const API_URL = (() => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api/users/`
  }

  return 'http://127.0.0.1:8000/api/users/'
})()

const normalizeItems = (payload) =>
  Array.isArray(payload) ? payload : payload?.users || payload?.items || payload?.results || payload?.data || []

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function loadUsers() {
      try {
        const response = await fetch(API_URL)

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }

        const payload = await response.json()

        if (isMounted) {
          setUsers(normalizeItems(payload))
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load users')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      isMounted = false
    }
  }, [])

  if (loading) {
    return <div className="alert alert-secondary">Loading users...</div>
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>
  }

  return (
    <div>
      <h2>Users</h2>
      {users.length === 0 ? (
        <p className="text-muted">No users available yet.</p>
      ) : (
        <div className="list-group">
          {users.map((user) => (
            <div className="list-group-item" key={user._id || user.email || user.name}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">{user.name}</h5>
                  <p className="mb-1">{user.email}</p>
                  <small className="text-muted">{user.role} • {user.fitnessGoal}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Users


