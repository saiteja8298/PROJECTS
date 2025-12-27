import { useState, useEffect, useMemo, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { loadAllMedia, filterByType, searchMedia, sortMedia, getAllGenres, getMediaStats } from '../services/mediaService'
import '../styles/Browse.css'

function Browse() {
    const { type } = useParams() // 'anime', 'manga', 'manhwa', or undefined for all
    const navigate = useNavigate()

    const [allMedia, setAllMedia] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchInput, setSearchInput] = useState('') // What user types
    const [searchQuery, setSearchQuery] = useState('') // Debounced value
    const [selectedGenre, setSelectedGenre] = useState('')
    const [selectedYear, setSelectedYear] = useState('')
    const [sortBy, setSortBy] = useState('rating')
    const [viewMode, setViewMode] = useState('grid') // 'grid' or 'list'
    const [currentPage, setCurrentPage] = useState(1)
    const [itemLoadError, setItemLoadError] = useState({})

    const itemsPerPage = 24

    // Load all media data on mount
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const data = await loadAllMedia()
                setAllMedia(data)
            } catch (error) {
                console.error('Error loading media:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchQuery(searchInput)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchInput])

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [type, searchQuery, selectedGenre, selectedYear, sortBy])

    // Get stats - memoized
    const stats = useMemo(() => getMediaStats(allMedia), [allMedia])

    // Get all genres - memoized
    const genres = useMemo(() => getAllGenres(allMedia), [allMedia])

    // Get years - limited for performance
    const years = useMemo(() => {
        const yearSet = new Set()
        for (let i = 0; i < Math.min(allMedia.length, 3000); i++) {
            if (allMedia[i].year) yearSet.add(allMedia[i].year)
        }
        return Array.from(yearSet).sort((a, b) => b - a).slice(0, 30)
    }, [allMedia])

    // Filter and sort media
    const filteredMedia = useMemo(() => {
        let result = allMedia

        // Filter by type
        result = filterByType(result, type)

        // Search
        if (searchQuery) {
            result = searchMedia(result, searchQuery)
        }

        // Filter by genre
        if (selectedGenre) {
            result = result.filter(item =>
                item.tags.some(tag => tag.toLowerCase() === selectedGenre.toLowerCase())
            )
        }

        // Filter by year
        if (selectedYear) {
            result = result.filter(item => item.year === selectedYear)
        }

        // Sort
        result = sortMedia(result, sortBy)

        return result
    }, [allMedia, type, searchQuery, selectedGenre, selectedYear, sortBy])

    // Pagination
    const totalPages = Math.ceil(filteredMedia.length / itemsPerPage)
    const paginatedMedia = filteredMedia.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    )

    // Handle card click
    const handleCardClick = (item) => {
        // Save to history
        const history = JSON.parse(localStorage.getItem('manhwaHistory') || '[]')
        const existingIndex = history.findIndex(h => h.title === item.title)
        if (existingIndex >= 0) {
            history.splice(existingIndex, 1)
        }
        history.unshift({
            ...item,
            viewedAt: new Date().toISOString()
        })
        localStorage.setItem('manhwaHistory', JSON.stringify(history.slice(0, 50)))

        // Navigate to entity page
        navigate(`/${item.mediaType}/${item.slug}`, { state: { media: item } })
    }

    // Handle image error
    const handleImageError = (id) => {
        setItemLoadError(prev => ({ ...prev, [id]: true }))
    }

    // Get image source - prioritize items with covers
    const getImageSrc = (item) => {
        if (itemLoadError[item.id] || !item.hasCover) {
            // Use a gradient placeholder for items without covers
            return null
        }
        return item.cover || null
    }

    // Check if should show placeholder
    const showPlaceholder = (item) => {
        return itemLoadError[item.id] || !item.hasCover || !item.cover
    }

    // Type tabs
    const tabs = [
        { key: '', label: 'All', count: stats.total },
        { key: 'anime', label: 'Anime', count: stats.anime },
        { key: 'manga', label: 'Manga', count: stats.manga },
        { key: 'manhwa', label: 'Manhwa', count: stats.manhwa },
    ]

    return (
        <div className="browse-page">
            {/* Hero */}
            <section className="browse-hero">
                <h1>Browse {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'All Media'}</h1>
                <p>Explore {filteredMedia.length.toLocaleString()} titles from our extensive database</p>

                {/* Stats badges */}
                <div className="stat-badges">
                    <span className="stat-badge">🎬 {stats.anime.toLocaleString()} Anime</span>
                    <span className="stat-badge">📖 {stats.manga.toLocaleString()} Manga</span>
                    <span className="stat-badge">📚 {stats.manhwa.toLocaleString()} Manhwa</span>
                </div>
            </section>

            {/* Type Tabs */}
            <div className="type-tabs">
                {tabs.map(tab => (
                    <Link
                        key={tab.key}
                        to={tab.key ? `/browse/${tab.key}` : '/browse'}
                        className={`tab-btn ${type === tab.key || (!type && tab.key === '') ? 'active' : ''}`}
                    >
                        {tab.label}
                        <span className="tab-count">{tab.count.toLocaleString()}</span>
                    </Link>
                ))}
            </div>

            <div className="browse-content">
                {/* Sidebar Filters */}
                <aside className="filter-sidebar">
                    <div className="filter-section">
                        <h3>Search</h3>
                        <input
                            type="text"
                            placeholder="Search titles..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="filter-section">
                        <h3>Sort By</h3>
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="rating">Rating</option>
                            <option value="title">Title A-Z</option>
                            <option value="year">Newest First</option>
                            <option value="members">Popularity</option>
                        </select>
                    </div>

                    <div className="filter-section">
                        <h3>Genre</h3>
                        <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                            <option value="">All Genres</option>
                            {genres.slice(0, 50).map(g => (
                                <option key={g} value={g}>{g}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-section">
                        <h3>Year</h3>
                        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
                            <option value="">All Years</option>
                            {years.map(y => (
                                <option key={y} value={y}>{y}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="clear-filters"
                        onClick={() => {
                            setSearchInput('')
                            setSearchQuery('')
                            setSelectedGenre('')
                            setSelectedYear('')
                            setSortBy('rating')
                        }}
                    >
                        Clear Filters
                    </button>
                </aside>

                {/* Main Content */}
                <main className="browse-main">
                    {/* View toggle */}
                    <div className="browse-toolbar">
                        <span className="results-count">
                            Showing {paginatedMedia.length} of {filteredMedia.length.toLocaleString()} results
                        </span>
                        <div className="view-toggle">
                            <button
                                className={viewMode === 'grid' ? 'active' : ''}
                                onClick={() => setViewMode('grid')}
                                title="Grid View"
                            >⊞</button>
                            <button
                                className={viewMode === 'list' ? 'active' : ''}
                                onClick={() => setViewMode('list')}
                                title="List View"
                            >☰</button>
                        </div>
                    </div>

                    {loading ? (
                        <div className="loading-state">
                            <div className="loader"></div>
                            <p>Loading {stats.total > 0 ? 'more' : ''} media...</p>
                        </div>
                    ) : filteredMedia.length === 0 ? (
                        <div className="empty-state">
                            <h2>No results found</h2>
                            <p>Try adjusting your filters or search query</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid View */}
                            {viewMode === 'grid' && (
                                <div className="media-grid">
                                    {paginatedMedia.map(item => (
                                        <div
                                            key={item.id}
                                            className={`media-card ${!item.hasCover ? 'no-cover' : ''}`}
                                            onClick={() => handleCardClick(item)}
                                        >
                                            <div className="card-cover">
                                                {showPlaceholder(item) ? (
                                                    <div className="placeholder-cover">
                                                        <span className="placeholder-icon">📺</span>
                                                        <span className="placeholder-text">{item.title.slice(0, 20)}</span>
                                                    </div>
                                                ) : (
                                                    <img
                                                        src={getImageSrc(item)}
                                                        alt={item.title}
                                                        loading="lazy"
                                                        onError={() => handleImageError(item.id)}
                                                    />
                                                )}
                                                <div className="card-overlay">
                                                    <span>View Details</span>
                                                </div>
                                                {item.rating > 0 && (
                                                    <div className="rating-badge">⭐ {item.rating.toFixed(1)}</div>
                                                )}
                                                <div className={`type-badge ${item.mediaType}`}>
                                                    {item.mediaType}
                                                </div>
                                            </div>
                                            <div className="card-info">
                                                <h3 className="card-title">{item.title}</h3>
                                                <div className="card-meta">
                                                    {item.year && <span>{item.year}</span>}
                                                    {item.episodes && <span>{item.episodes}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* List View */}
                            {viewMode === 'list' && (
                                <div className="media-list">
                                    {paginatedMedia.map(item => (
                                        <div
                                            key={item.id}
                                            className={`media-list-item ${!item.hasCover ? 'no-cover' : ''}`}
                                            onClick={() => handleCardClick(item)}
                                        >
                                            {showPlaceholder(item) ? (
                                                <div className="list-placeholder">
                                                    <span>📺</span>
                                                </div>
                                            ) : (
                                                <img
                                                    src={getImageSrc(item)}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    onError={() => handleImageError(item.id)}
                                                />
                                            )}
                                            <div className="list-item-info">
                                                <h3>{item.title}</h3>
                                                <p className="list-description">
                                                    {item.description?.slice(0, 200) || 'No description available.'}
                                                    {item.description?.length > 200 ? '...' : ''}
                                                </p>
                                                <div className="list-meta">
                                                    <span className={`type-label ${item.mediaType}`}>{item.mediaType}</span>
                                                    {item.rating > 0 && <span>⭐ {item.rating.toFixed(1)}</span>}
                                                    {item.year && <span>📅 {item.year}</span>}
                                                    {item.tags.length > 0 && (
                                                        <span className="tags">
                                                            {item.tags.slice(0, 3).join(', ')}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(1)}
                                    >«</button>
                                    <button
                                        disabled={currentPage === 1}
                                        onClick={() => setCurrentPage(p => p - 1)}
                                    >‹</button>

                                    {[...Array(Math.min(5, totalPages))].map((_, i) => {
                                        let pageNum
                                        if (totalPages <= 5) {
                                            pageNum = i + 1
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i
                                        } else {
                                            pageNum = currentPage - 2 + i
                                        }

                                        return (
                                            <button
                                                key={pageNum}
                                                className={currentPage === pageNum ? 'active' : ''}
                                                onClick={() => setCurrentPage(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        )
                                    })}

                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(p => p + 1)}
                                    >›</button>
                                    <button
                                        disabled={currentPage === totalPages}
                                        onClick={() => setCurrentPage(totalPages)}
                                    >»</button>
                                </div>
                            )}
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default Browse
