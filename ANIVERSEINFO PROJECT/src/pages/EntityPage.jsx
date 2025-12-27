import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import '../styles/EntityPage.css'

function EntityPage({ type: propType }) {
    const { slug } = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [userRating, setUserRating] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)

    // Get media data from navigation state
    const media = location.state?.media || location.state?.manga || null
    const mediaType = propType || media?.mediaType || 'anime'

    useEffect(() => {
        window.scrollTo(0, 0)

        // Load saved user rating if exists
        if (media) {
            const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}')
            if (ratings[media.title]) {
                setUserRating(ratings[media.title])
            }

            // Check if in favorites
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
            setIsFavorite(favorites.some(f => f.title === media.title))

            // Add to viewing history
            const history = JSON.parse(localStorage.getItem('viewHistory') || '[]')
            const existingIndex = history.findIndex(h => h.title === media.title)
            if (existingIndex > -1) {
                history.splice(existingIndex, 1)
            }
            history.unshift({ ...media, viewedAt: new Date().toISOString() })
            localStorage.setItem('viewHistory', JSON.stringify(history.slice(0, 50)))
        }
    }, [slug, media])

    // Show error if no media data
    if (!media) {
        return (
            <div className="entity-page">
                <div className="entity-error">
                    <h2>Content Not Found</h2>
                    <p>Sorry, we couldn't find this {mediaType}. Please go back and try again.</p>
                    <Link to="/browse" className="back-btn">← Back to Browse</Link>
                </div>
            </div>
        )
    }

    // Get genres/tags
    const genres = media.genres || media.tags || []
    const themes = media.themes || []

    // Get cover image (prefer local, then external)
    const coverImage = media.cover || media.externalCover || ''
    const hasCover = media.hasCover && coverImage

    const handleRatingClick = (rating) => {
        setUserRating(rating)
        const ratings = JSON.parse(localStorage.getItem('userRatings') || '{}')
        ratings[media.title] = rating
        localStorage.setItem('userRatings', JSON.stringify(ratings))
    }

    const toggleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (isFavorite) {
            const updated = favorites.filter(f => f.title !== media.title)
            localStorage.setItem('favorites', JSON.stringify(updated))
            setIsFavorite(false)
        } else {
            favorites.push(media)
            localStorage.setItem('favorites', JSON.stringify(favorites))
            setIsFavorite(true)
        }
    }

    // Format numbers with K/M suffix
    const formatNumber = (num) => {
        if (!num || num === 0) return null
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
        return num.toLocaleString()
    }

    // Format rating display
    const formatRating = (rating) => {
        if (!rating || rating === 0) return 'N/A'
        return typeof rating === 'number' ? rating.toFixed(1) : rating
    }

    return (
        <div className="entity-page">
            {/* Hero Section */}
            <section className="entity-hero">
                {hasCover && (
                    <div className="hero-backdrop" style={{
                        backgroundImage: `url(${coverImage})`
                    }}></div>
                )}
                {!hasCover && <div className="hero-backdrop no-image"></div>}

                <div className="hero-content">
                    <div className="hero-cover">
                        {hasCover ? (
                            <img
                                src={coverImage}
                                alt={media.title}
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.src = media.externalCover || ''
                                }}
                            />
                        ) : (
                            <div className="cover-placeholder">
                                <span>{mediaType === 'anime' ? '🎬' : '📖'}</span>
                                <p>{media.title.slice(0, 30)}</p>
                            </div>
                        )}
                    </div>
                    <div className="hero-info">
                        <div className="type-badges">
                            <span className={`type-badge ${mediaType}`}>{mediaType}</span>
                            {media.type && media.type !== mediaType && (
                                <span className="format-badge">{media.type}</span>
                            )}
                            {media.ageRating && (
                                <span className="age-badge">{media.ageRating}</span>
                            )}
                        </div>

                        <h1 className="entity-title">{media.title}</h1>

                        {/* Original & Japanese Titles (shown as secondary) */}
                        {media.originalTitle && media.originalTitle !== media.title && (
                            <p className="alt-title romaji">{media.originalTitle}</p>
                        )}
                        {media.japaneseTitle && (
                            <p className="alt-title japanese">{media.japaneseTitle}</p>
                        )}

                        {/* Rating Display */}
                        <div className="entity-rating">
                            {media.rating > 0 ? (
                                <>
                                    <span className="rating-star">⭐</span>
                                    <span className="rating-value">{formatRating(media.rating)}</span>
                                    <span className="rating-max">/ 10</span>
                                    {media.scoredBy > 0 && (
                                        <span className="scored-by">({formatNumber(media.scoredBy)} votes)</span>
                                    )}
                                </>
                            ) : (
                                <span className="no-rating">No Rating Available</span>
                            )}
                        </div>

                        {/* Stats Row */}
                        <div className="stats-row">
                            {media.rank > 0 && (
                                <div className="stat-item">
                                    <span className="stat-icon">🏆</span>
                                    <span className="stat-label">Rank</span>
                                    <span className="stat-value">#{media.rank}</span>
                                </div>
                            )}
                            {media.popularity > 0 && (
                                <div className="stat-item">
                                    <span className="stat-icon">📈</span>
                                    <span className="stat-label">Popularity</span>
                                    <span className="stat-value">#{media.popularity}</span>
                                </div>
                            )}
                            {media.members > 0 && (
                                <div className="stat-item">
                                    <span className="stat-icon">👥</span>
                                    <span className="stat-label">Members</span>
                                    <span className="stat-value">{formatNumber(media.members)}</span>
                                </div>
                            )}
                            {media.favorites > 0 && (
                                <div className="stat-item">
                                    <span className="stat-icon">❤️</span>
                                    <span className="stat-label">Favorites</span>
                                    <span className="stat-value">{formatNumber(media.favorites)}</span>
                                </div>
                            )}
                        </div>

                        {/* Quick Info Chips */}
                        <div className="entity-quick-info">
                            {media.year && (
                                <div className="info-chip">
                                    <span className="chip-icon">📅</span>
                                    <span className="chip-value">{media.premiered || media.year}</span>
                                </div>
                            )}
                            {media.episodes && (
                                <div className="info-chip">
                                    <span className="chip-icon">📺</span>
                                    <span className="chip-value">{media.episodes} eps</span>
                                </div>
                            )}
                            {media.duration && (
                                <div className="info-chip">
                                    <span className="chip-icon">⏱️</span>
                                    <span className="chip-value">{media.duration}</span>
                                </div>
                            )}
                            {media.source && (
                                <div className="info-chip">
                                    <span className="chip-icon">📚</span>
                                    <span className="chip-value">{media.source}</span>
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {genres.length > 0 && (
                            <div className="entity-tags">
                                {genres.slice(0, 8).map((tag, idx) => (
                                    <span key={idx} className="tag genre">{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Themes */}
                        {themes.length > 0 && (
                            <div className="entity-tags themes">
                                {themes.slice(0, 6).map((theme, idx) => (
                                    <span key={idx} className="tag theme">{theme}</span>
                                ))}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="entity-actions">
                            <button
                                className={`action-btn ${isFavorite ? 'favorited' : 'secondary'}`}
                                onClick={toggleFavorite}
                            >
                                <span>{isFavorite ? '💖' : '🤍'}</span>
                                {isFavorite ? 'In Favorites' : 'Add to Favorites'}
                            </button>
                            {media.url && (
                                <a
                                    href={media.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="action-btn external"
                                >
                                    <span>🔗</span> More Info
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="entity-content">
                {/* Synopsis */}
                <div className="content-section">
                    <h2>📝 Synopsis</h2>
                    <p className="synopsis">
                        {media.description || 'No synopsis available for this title. Check back later for updates.'}
                    </p>
                </div>

                {/* Detailed Information Grid */}
                <div className="content-section">
                    <h2>📊 Information</h2>
                    <div className="info-grid">
                        <div className="info-item">
                            <span className="label">Title</span>
                            <span className="value">{media.title}</span>
                        </div>
                        {media.originalTitle && media.originalTitle !== media.title && (
                            <div className="info-item">
                                <span className="label">Original Title</span>
                                <span className="value">{media.originalTitle}</span>
                            </div>
                        )}
                        {media.japaneseTitle && (
                            <div className="info-item">
                                <span className="label">Japanese</span>
                                <span className="value">{media.japaneseTitle}</span>
                            </div>
                        )}
                        <div className="info-item">
                            <span className="label">Format</span>
                            <span className="value">{media.type || mediaType}</span>
                        </div>
                        {media.episodes && (
                            <div className="info-item">
                                <span className="label">Episodes</span>
                                <span className="value">{media.episodes}</span>
                            </div>
                        )}
                        {media.duration && (
                            <div className="info-item">
                                <span className="label">Duration</span>
                                <span className="value">{media.duration}</span>
                            </div>
                        )}
                        {media.premiered && (
                            <div className="info-item">
                                <span className="label">Premiered</span>
                                <span className="value">{media.premiered}</span>
                            </div>
                        )}
                        {media.year && !media.premiered && (
                            <div className="info-item">
                                <span className="label">Year</span>
                                <span className="value">{media.year}</span>
                            </div>
                        )}
                        {media.source && (
                            <div className="info-item">
                                <span className="label">Source</span>
                                <span className="value">{media.source}</span>
                            </div>
                        )}
                        {media.ageRating && (
                            <div className="info-item">
                                <span className="label">Age Rating</span>
                                <span className="value">{media.ageRating}</span>
                            </div>
                        )}
                        <div className="info-item">
                            <span className="label">Score</span>
                            <span className="value highlight">{formatRating(media.rating)}</span>
                        </div>
                        {media.rank > 0 && (
                            <div className="info-item">
                                <span className="label">Rank</span>
                                <span className="value highlight">#{media.rank}</span>
                            </div>
                        )}
                        {media.popularity > 0 && (
                            <div className="info-item">
                                <span className="label">Popularity</span>
                                <span className="value">#{media.popularity}</span>
                            </div>
                        )}
                        {media.members > 0 && (
                            <div className="info-item">
                                <span className="label">Members</span>
                                <span className="value">{media.members.toLocaleString()}</span>
                            </div>
                        )}
                        {media.favorites > 0 && (
                            <div className="info-item">
                                <span className="label">Favorites</span>
                                <span className="value">{media.favorites.toLocaleString()}</span>
                            </div>
                        )}
                        {media.scoredBy > 0 && (
                            <div className="info-item">
                                <span className="label">Scored By</span>
                                <span className="value">{media.scoredBy.toLocaleString()} users</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Studios & Producers */}
                {(media.studios || media.producers) && (
                    <div className="content-section">
                        <h2>🎬 Production</h2>
                        <div className="info-grid production">
                            {media.studios && (
                                <div className="info-item full-width">
                                    <span className="label">Studios</span>
                                    <span className="value">{media.studios}</span>
                                </div>
                            )}
                            {media.producers && (
                                <div className="info-item full-width">
                                    <span className="label">Producers</span>
                                    <span className="value">{media.producers}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Genres & Themes */}
                {(genres.length > 0 || themes.length > 0 || media.demographics) && (
                    <div className="content-section">
                        <h2>🏷️ Genres & Themes</h2>
                        <div className="info-grid">
                            {genres.length > 0 && (
                                <div className="info-item full-width">
                                    <span className="label">Genres</span>
                                    <span className="value tags-inline">
                                        {genres.map((g, i) => (
                                            <span key={i} className="inline-tag">{g}</span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {themes.length > 0 && (
                                <div className="info-item full-width">
                                    <span className="label">Themes</span>
                                    <span className="value tags-inline">
                                        {themes.map((t, i) => (
                                            <span key={i} className="inline-tag theme">{t}</span>
                                        ))}
                                    </span>
                                </div>
                            )}
                            {media.demographics && (
                                <div className="info-item">
                                    <span className="label">Demographic</span>
                                    <span className="value">{media.demographics}</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* User Rating Section */}
                <div className="content-section">
                    <h2>⭐ Rate This {mediaType}</h2>
                    <p className="section-desc">Share your opinion! Click on the stars to rate.</p>
                    <div className="rating-input">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <button
                                key={num}
                                className={`rating-star-btn ${userRating >= num ? 'active' : ''}`}
                                onClick={() => handleRatingClick(num)}
                                title={`Rate ${num}/10`}
                            >
                                {userRating >= num ? '★' : '☆'}
                            </button>
                        ))}
                        {userRating > 0 && (
                            <span className="rating-display">Your Rating: {userRating}/10</span>
                        )}
                    </div>
                </div>

                {/* Note about data */}
                <div className="content-section info-note">
                    <p>
                        <strong>ℹ️ Note:</strong> AniVerseInfo is an information and rating database.
                        We provide details and ratings for anime, manga, and manhwa.
                        This is not a streaming or reading platform.
                    </p>
                </div>
            </div>

            {/* Back Button */}
            <div className="entity-footer">
                <button onClick={() => navigate(-1)} className="back-link">
                    ← Back to Previous Page
                </button>
                <Link to="/browse" className="back-link">
                    Browse All →
                </Link>
            </div>
        </div>
    )
}

export default EntityPage
