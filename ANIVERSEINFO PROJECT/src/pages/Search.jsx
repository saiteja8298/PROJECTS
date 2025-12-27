import { useState, useEffect, useMemo } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { loadAllMedia, searchMedia, getAllGenres } from '../services/mediaService'
import '../styles/Search.css'

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    const navigate = useNavigate()

    const [allMedia, setAllMedia] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '')
    const [inputValue, setInputValue] = useState(searchParams.get('q') || '')
    const [imageErrors, setImageErrors] = useState({})

    // Popular searches
    const popularSearches = [
        'Solo Leveling', 'Attack on Titan', 'Naruto', 'One Piece',
        'Demon Slayer', 'Jujutsu Kaisen', 'Death Note', 'Tokyo Ghoul',
        'My Hero Academia', 'Hunter x Hunter', 'Bleach', 'Fullmetal Alchemist'
    ]

    // Load all media on mount
    useEffect(() => {
        const fetchData = async () => {
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

    // Debounced auto-search while typing
    useEffect(() => {
        if (inputValue.length >= 2) {
            const timer = setTimeout(() => {
                setSearchQuery(inputValue)
            }, 300)
            return () => clearTimeout(timer)
        } else if (inputValue.length === 0) {
            setSearchQuery('')
        }
    }, [inputValue])

    // Update from URL params
    useEffect(() => {
        const q = searchParams.get('q')
        if (q && q !== inputValue) {
            setInputValue(q)
            setSearchQuery(q)
        }
    }, [searchParams])

    // Search results
    const results = useMemo(() => {
        if (!searchQuery) return []
        return searchMedia(allMedia, searchQuery).slice(0, 50)
    }, [allMedia, searchQuery])

    // Get genres for suggestions
    const genres = useMemo(() => getAllGenres(allMedia).slice(0, 20), [allMedia])

    // Handle search submit
    const handleSearch = (e) => {
        e.preventDefault()
        if (inputValue.trim()) {
            setSearchParams({ q: inputValue.trim() })
            setSearchQuery(inputValue.trim())
        }
    }

    // Handle suggestion click
    const handleSuggestionClick = (term) => {
        setInputValue(term)
        setSearchParams({ q: term })
        setSearchQuery(term)
    }

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

        navigate(`/${item.mediaType}/${item.slug}`, { state: { media: item } })
    }

    // Handle image error
    const handleImageError = (id) => {
        setImageErrors(prev => ({ ...prev, [id]: true }))
    }

    // Get image source
    const getImageSrc = (item) => {
        if (imageErrors[item.id]) return 'https://via.placeholder.com/80x120?text=No+Cover'
        return item.localCover || item.cover || 'https://via.placeholder.com/80x120?text=No+Cover'
    }

    return (
        <div className="search-page">
            {/* Hero with Search */}
            <section className="search-hero">
                <h1>Search</h1>
                <form className="search-form" onSubmit={handleSearch}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Search anime, manga, manhwa..."
                        autoFocus
                    />
                    <button type="submit">Search</button>
                </form>
            </section>

            <div className="search-content">
                {loading ? (
                    <div className="search-loading">
                        <div className="spinner"></div>
                        <p>Loading database...</p>
                    </div>
                ) : searchQuery ? (
                    /* Search Results */
                    <>
                        <div className="results-info">
                            {results.length > 0
                                ? `Found ${results.length} results for "${searchQuery}"`
                                : `No results found for "${searchQuery}"`
                            }
                        </div>

                        {results.length > 0 ? (
                            <div className="search-results">
                                {results.map(item => (
                                    <div
                                        key={item.id}
                                        className="search-result-card"
                                        onClick={() => handleCardClick(item)}
                                    >
                                        <img
                                            src={getImageSrc(item)}
                                            alt={item.title}
                                            loading="lazy"
                                            onError={() => handleImageError(item.id)}
                                        />
                                        <div className="result-info">
                                            <h3>{item.title}</h3>
                                            <p>
                                                {item.description?.slice(0, 150) || 'No description available.'}
                                                {item.description?.length > 150 ? '...' : ''}
                                            </p>
                                            <div className="result-meta">
                                                <span className={`type-label ${item.mediaType}`}>{item.mediaType}</span>
                                                {item.rating > 0 && <span>⭐ {item.rating.toFixed(1)}</span>}
                                                {item.year && <span>📅 {item.year}</span>}
                                                {item.tags.length > 0 && (
                                                    <span className="tags">{item.tags.slice(0, 3).join(', ')}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <h2>😔 No results found</h2>
                                <p>Try searching with different keywords or check the spelling</p>
                                <div className="search-suggestions">
                                    <h3>Popular Searches</h3>
                                    <div className="suggestion-tags">
                                        {popularSearches.map(term => (
                                            <button key={term} onClick={() => handleSuggestionClick(term)}>
                                                {term}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    /* Default: Show Suggestions */
                    <div className="search-suggestions">
                        <h2>🔥 Popular Searches</h2>
                        <div className="suggestion-tags">
                            {popularSearches.map(term => (
                                <button key={term} onClick={() => handleSuggestionClick(term)}>
                                    {term}
                                </button>
                            ))}
                        </div>

                        {genres.length > 0 && (
                            <>
                                <h2 style={{ marginTop: '2.5rem' }}>🎭 Browse by Genre</h2>
                                <div className="suggestion-tags">
                                    {genres.map(genre => (
                                        <button key={genre} onClick={() => handleSuggestionClick(genre)}>
                                            {genre}
                                        </button>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search
