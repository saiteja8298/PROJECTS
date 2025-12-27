import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { loadAllMedia, getTopRated, getMostPopular, getMediaStats } from '../services/mediaService'
import '../styles/Home.css'

function Home() {
  const navigate = useNavigate()
  const [allMedia, setAllMedia] = useState([])
  const [heroItems, setHeroItems] = useState([])
  const [trendingItems, setTrendingItems] = useState([])
  const [stats, setStats] = useState({ total: 0, anime: 0, manga: 0, manhwa: 0 })
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [imageErrors, setImageErrors] = useState({})
  const slideInterval = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAllMedia()
        setAllMedia(data)
        setStats(getMediaStats(data))

        // Get items with covers for hero slider - mix of all types
        const withCovers = data.filter(item => item.hasCover && item.cover)

        // Get MORE items with covers for hero slider - mix of all types
        const animeItems = withCovers.filter(item => item.mediaType === 'anime').slice(0, 10)
        const mangaItems = withCovers.filter(item => item.mediaType === 'manga').slice(0, 3)
        const manhwaItems = withCovers.filter(item => item.mediaType === 'manhwa').slice(0, 2)

        // Combine all types for variety - 15 items total
        const heroMix = [...animeItems, ...mangaItems, ...manhwaItems]
        // Shuffle for variety
        for (let i = heroMix.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [heroMix[i], heroMix[j]] = [heroMix[j], heroMix[i]];
        }

        setHeroItems(heroMix.slice(0, 15))
        setTrendingItems(getTopRated(data, 12))
      } catch (err) {
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Auto-slide hero every 10 seconds
  useEffect(() => {
    if (heroItems.length > 0) {
      slideInterval.current = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % heroItems.length)
      }, 10000)
    }
    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current)
    }
  }, [heroItems])

  const goToSlide = (index) => {
    setCurrentSlide(index)
    // Reset interval on manual navigation
    if (slideInterval.current) clearInterval(slideInterval.current)
    slideInterval.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % heroItems.length)
    }, 10000)
  }

  const handleCardClick = (item) => {
    const history = JSON.parse(localStorage.getItem('manhwaHistory') || '[]')
    const existingIndex = history.findIndex(h => h.title === item.title)
    if (existingIndex >= 0) history.splice(existingIndex, 1)
    history.unshift({ ...item, viewedAt: new Date().toISOString() })
    localStorage.setItem('manhwaHistory', JSON.stringify(history.slice(0, 50)))
    navigate(`/${item.mediaType}/${item.slug}`, { state: { media: item } })
  }

  const handleImageError = (id) => {
    setImageErrors(prev => ({ ...prev, [id]: true }))
  }

  const getImageSrc = (item) => {
    if (imageErrors[item.id] || !item.hasCover) return null
    return item.cover
  }

  const currentHero = heroItems[currentSlide]

  return (
    <div className="home-page">
      {/* Hero Slider Section */}
      <section className="hero-slider">
        {loading ? (
          <div className="hero-loading">
            <div className="loader"></div>
            <p>Loading amazing content...</p>
          </div>
        ) : currentHero ? (
          <>
            {/* Background Image */}
            <div
              className="hero-backdrop"
              style={{ backgroundImage: `url(${currentHero.cover})` }}
            ></div>

            {/* Hero Content */}
            <div className="hero-content">
              <div className="hero-info">
                <span className={`hero-type ${currentHero.mediaType}`}>
                  {currentHero.mediaType === 'anime' ? '🎬' : currentHero.mediaType === 'manhwa' ? '📚' : '📖'} {currentHero.mediaType}
                </span>
                <h1 className="hero-title">{currentHero.title}</h1>

                <div className="hero-meta">
                  {currentHero.rating > 0 && (
                    <span className="hero-rating">⭐ {currentHero.rating.toFixed(1)}</span>
                  )}
                  {currentHero.year && <span className="hero-year">{currentHero.year}</span>}
                  {currentHero.episodes && <span>{currentHero.episodes}</span>}
                </div>

                <p className="hero-description">
                  {currentHero.description?.slice(0, 180) || 'Discover more about this amazing title. Click below to view ratings, reviews, and detailed information.'}
                  {currentHero.description?.length > 180 ? '...' : ''}
                </p>

                <div className="hero-actions">
                  <button
                    className="hero-btn primary"
                    onClick={() => handleCardClick(currentHero)}
                  >
                    View Details
                  </button>
                  <Link to="/browse" className="hero-btn secondary">
                    Browse All
                  </Link>
                </div>
              </div>

              <div className="hero-cover" onClick={() => handleCardClick(currentHero)}>
                <img src={currentHero.cover} alt={currentHero.title} />
              </div>
            </div>

            {/* Simple Slide Indicators */}
            <div className="slide-indicators">
              {heroItems.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>

            {/* Prev/Next */}
            <button
              className="slide-nav prev"
              onClick={() => goToSlide((currentSlide - 1 + heroItems.length) % heroItems.length)}
            >
              ‹
            </button>
            <button
              className="slide-nav next"
              onClick={() => goToSlide((currentSlide + 1) % heroItems.length)}
            >
              ›
            </button>
          </>
        ) : (
          <div className="hero-fallback">
            <h1>🎬 AniVerseInfo</h1>
            <p>Your Anime, Manga & Manhwa Database</p>
            <Link to="/browse" className="hero-btn primary">Start Exploring</Link>
          </div>
        )}
      </section>

      {/* Quick Stats */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{stats.anime > 0 ? stats.anime.toLocaleString() : '—'}</span>
          <span className="stat-label">Anime</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.manga > 0 ? stats.manga.toLocaleString() : '—'}</span>
          <span className="stat-label">Manga</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.manhwa > 0 ? stats.manhwa.toLocaleString() : '—'}</span>
          <span className="stat-label">Manhwa</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{stats.total > 0 ? stats.total.toLocaleString() : '—'}</span>
          <span className="stat-label">Total</span>
        </div>
      </section>

      {/* Browse by Type */}
      <section className="browse-section">
        <div className="browse-cards">
          <Link to="/browse/anime" className="browse-card anime">
            <span className="browse-icon">🎬</span>
            <h3>Anime</h3>
            <p>Japanese Animation</p>
          </Link>
          <Link to="/browse/manga" className="browse-card manga">
            <span className="browse-icon">📖</span>
            <h3>Manga</h3>
            <p>Japanese Comics</p>
          </Link>
          <Link to="/browse/manhwa" className="browse-card manhwa">
            <span className="browse-icon">📚</span>
            <h3>Manhwa</h3>
            <p>Korean Webtoons</p>
          </Link>
        </div>
      </section>

      {/* Top Rated Grid */}
      <section className="top-rated-section">
        <div className="section-header">
          <h2>⭐ Top Rated</h2>
          <Link to="/browse" className="see-all">View All →</Link>
        </div>
        <div className="top-rated-grid">
          {trendingItems.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="top-card"
              onClick={() => handleCardClick(item)}
            >
              <div className="top-card-cover">
                {item.hasCover ? (
                  <img
                    src={getImageSrc(item)}
                    alt={item.title}
                    loading="lazy"
                    onError={() => handleImageError(item.id)}
                  />
                ) : (
                  <div className="no-cover">📺</div>
                )}
                {item.rating > 0 && (
                  <span className="top-rating">⭐ {item.rating.toFixed(1)}</span>
                )}
                <span className={`top-type ${item.mediaType}`}>{item.mediaType}</span>
              </div>
              <h4 className="top-title">{item.title}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>AniVerseInfo</h3>
            <p>Your anime, manga & manhwa information database</p>
          </div>
          <div className="footer-links">
            <Link to="/browse">Browse</Link>
            <Link to="/search">Search</Link>
            <Link to="/history">History</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <p className="copyright">© 2024 AniVerseInfo. Information database for fans.</p>
      </footer>
    </div>
  )
}

export default Home
