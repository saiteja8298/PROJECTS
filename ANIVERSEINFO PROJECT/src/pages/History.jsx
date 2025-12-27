import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/History.css'

function History() {
  const navigate = useNavigate()
  const [historyItems, setHistoryItems] = useState([])

  useEffect(() => {
    // Load history from localStorage
    const savedHistory = JSON.parse(localStorage.getItem('manhwaHistory') || '[]')
    setHistoryItems(savedHistory)
  }, [])

  const formatDate = (dateString) => {
    if (!dateString) return 'Unknown'
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const handleViewItem = (item) => {
    navigate(`/${item.mediaType || 'manga'}/${item.slug}`, {
      state: { media: item }
    })
  }

  const handleDeleteItem = (index) => {
    const updatedHistory = [...historyItems]
    updatedHistory.splice(index, 1)
    setHistoryItems(updatedHistory)
    localStorage.setItem('manhwaHistory', JSON.stringify(updatedHistory))
  }

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      setHistoryItems([])
      localStorage.removeItem('manhwaHistory')
    }
  }

  // Get tags as array
  const getTags = (item) => {
    if (Array.isArray(item.tags)) return item.tags.slice(0, 3)
    if (typeof item.tags === 'string') {
      return item.tags.replace(/[\[\]']/g, '').split(',').slice(0, 3)
    }
    return []
  }

  return (
    <div className="history-page">
      {/* Hero */}
      <section className="history-hero">
        <h1>📚 Browsing History</h1>
        <p>Your Anime, Manga & Manhwa Journey</p>
      </section>

      {/* Header with stats and clear button */}
      <div className="history-header">
        <div className="history-stats">
          <div className="stat-box">
            <span className="stat-number">{historyItems.length}</span>
            <span className="stat-label">Items Viewed</span>
          </div>
        </div>
        {historyItems.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            🗑️ Clear All History
          </button>
        )}
      </div>

      {/* Content */}
      <section className="history-content">
        {historyItems.length === 0 ? (
          <div className="empty-history">
            <div className="empty-icon">📖</div>
            <h2>No History Yet</h2>
            <p>You haven't viewed any anime, manga, or manhwa yet.</p>
            <Link to="/browse" className="browse-link">
              Browse Collection →
            </Link>
          </div>
        ) : (
          <div className="history-grid">
            {historyItems.map((item, index) => {
              const tags = getTags(item)
              const hasCover = item.hasCover && item.cover

              return (
                <div key={`${item.id || index}`} className="history-card">
                  <div className="history-card-cover" onClick={() => handleViewItem(item)}>
                    {hasCover ? (
                      <img
                        src={item.cover}
                        alt={item.title}
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="cover-placeholder">
                        <span>📺</span>
                      </div>
                    )}
                    <div className="card-overlay">
                      <span>View Details</span>
                    </div>
                    {item.rating > 0 && (
                      <span className="rating-badge">
                        ⭐ {typeof item.rating === 'number' ? item.rating.toFixed(1) : item.rating}
                      </span>
                    )}
                    <span className={`type-badge ${item.mediaType || 'manga'}`}>
                      {item.mediaType || 'manga'}
                    </span>
                  </div>

                  <div className="history-card-info">
                    <h3 className="card-title" onClick={() => handleViewItem(item)}>
                      {item.title}
                    </h3>
                    <div className="card-meta">
                      {item.year && <span>📅 {item.year}</span>}
                      {item.viewedAt && <span>👁️ {formatDate(item.viewedAt)}</span>}
                    </div>
                    {tags.length > 0 && (
                      <div className="card-tags">
                        {tags.map((tag, i) => (
                          <span key={i} className="tag">{tag}</span>
                        ))}
                      </div>
                    )}
                    <button
                      className="remove-btn"
                      onClick={() => handleDeleteItem(index)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

export default History
