import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/MangaDetails.css'

function MangaDetails() {
    const location = useLocation()
    const navigate = useNavigate()
    const { manga } = location.state || {}

    useEffect(() => {
        // Scroll to top on mount
        window.scrollTo(0, 0)

        // Redirect if no data
        if (!manga) {
            navigate('/refer-manhwa')
        }
    }, [manga, navigate])

    if (!manga) return null

    // Helper to parse tags
    const getTags = (tagString) => {
        if (!tagString) return []
        return tagString.replace(/[\[\]']/g, '').split(',')
    }

    const tags = getTags(manga.tags)

    return (
        <div className="details-page">
            {/* Hero Background */}
            <div className="details-hero">
                <img
                    src={manga.localCover || manga.cover}
                    alt="Hero Background"
                    className="hero-bg"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1920x800?text=No+Background'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, var(--bg-dark), transparent 90%)'
                }}></div>
            </div>

            {/* Main Content */}
            <div className="details-container">
                {/* Left Column: Poster */}
                <div className="poster-wrapper">
                    <img
                        src={manga.localCover || manga.cover}
                        alt={manga.title}
                        className="poster-image"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x600?text=No+Cover';
                        }}
                    />
                </div>

                {/* Right Column: Information */}
                <div className="info-wrapper">
                    <h1 className="manga-title">{manga.title}</h1>

                    <div className="stats-bar">
                        {manga.rating && (
                            <div className="stat-item">
                                <span>⭐</span>
                                <strong>{manga.rating}</strong>
                                <span>Rating</span>
                            </div>
                        )}
                        {manga.year && (
                            <div className="stat-item">
                                <span>📅</span>
                                <strong>{manga.year}</strong>
                                <span>Relased</span>
                            </div>
                        )}
                        <div className="stat-item">
                            <span>📚</span>
                            <strong>Manhwa</strong>
                            <span>Type</span>
                        </div>
                    </div>

                    <div className="tags-list">
                        {tags.map((tag, idx) => (
                            tag.trim() && <span key={idx} className="tag-chip">{tag.trim()}</span>
                        ))}
                    </div>

                    <div className="synopsis-section">
                        <h3>Synopsis</h3>
                        <p className="synopsis-text">
                            {manga.description || "No synopsis available for this title."}
                        </p>
                    </div>

                    <div className="action-buttons">
                        <button
                            className="cta-button"
                            onClick={() => alert('Start Reading feature coming soon!')}
                        >
                            Start Reading
                        </button>
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MangaDetails
