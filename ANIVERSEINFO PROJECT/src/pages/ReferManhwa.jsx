import { useState, useEffect, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { parseCSV } from '../utils/csvParser'
import '../styles/ReferManhwa.css'

function ReferManhwa() {
  const navigate = useNavigate()
  const [manhwaList, setManhwaList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 24

  useEffect(() => {
    const fetchManhwaData = async () => {
      try {
        setLoading(true)

        // Load local image index first
        let localImagesSet = new Set()
        try {
          const indexRes = await fetch('/local-images.json')
          if (indexRes.ok) {
            const indexData = await indexRes.json()
            localImagesSet = new Set(indexData)
          }
        } catch (e) {
          console.warn("Could not load local image index", e)
        }

        // Fetching the large dataset
        const response = await fetch('/Dataset/data.csv')
        if (!response.ok) {
          throw new Error('Failed to load dataset')
        }
        const text = await response.text()
        const { data } = parseCSV(text)

        // Process data to add local image paths where available
        const uniqueTitles = new Set();
        const processedData = [];

        data.forEach(item => {
          const title = item.title;
          if (!title) return;

          // Deduplication check
          const normalizedTitleKey = title.trim().toLowerCase();

          if (uniqueTitles.has(normalizedTitleKey)) {
            return; // Skip duplicate
          }
          uniqueTitles.add(normalizedTitleKey);

          let matchedFolder = null
          const normalizedTitle = title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

          // Try to find a matching folder in our local set
          for (const localFolder of localImagesSet) {
            const normalizedLocal = localFolder.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
            // Check if normalized title contains local folder name or vice versa
            if (normalizedTitle.includes(normalizedLocal) || normalizedLocal.includes(normalizedTitle)) {
              matchedFolder = localFolder;
              break;
            }
          }

          let localCover = null
          if (matchedFolder) {
            // Construct path: /Dataset/FolderName/FolderName_1.jpg
            localCover = `/Dataset/${matchedFolder}/${matchedFolder}_1.jpg`
          }

          processedData.push({
            ...item,
            localCover
          })
        })

        // Sort: Prioritize Local Covers -> Remote Covers -> No Covers
        processedData.sort((a, b) => {
          const aHasLocal = !!a.localCover;
          const bHasLocal = !!b.localCover;

          // 1. Local covers first (guaranteed to work)
          if (aHasLocal && !bHasLocal) return -1;
          if (!aHasLocal && bHasLocal) return 1;

          // 2. Remote covers next
          const aHasRemote = a.cover && a.cover.length > 10; // Simple length check for valid URL
          const bHasRemote = b.cover && b.cover.length > 10;

          if (aHasRemote && !bHasRemote) return -1;
          if (!aHasRemote && bHasRemote) return 1;

          return 0;
        });

        setManhwaList(processedData)
      } catch (err) {
        console.error("Error loading manhwa data:", err)
        setError("Could not load the manhwa library. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchManhwaData()
  }, [])

  // Filter logic
  const filteredList = useMemo(() => {
    if (!searchTerm) return manhwaList
    const lowerTerm = searchTerm.toLowerCase()
    return manhwaList.filter(item =>
      (item.title && item.title.toLowerCase().includes(lowerTerm)) ||
      (item.tags && item.tags.toLowerCase().includes(lowerTerm))
    )
  }, [manhwaList, searchTerm])

  // Pagination logic
  const totalPages = Math.ceil(filteredList.length / itemsPerPage)
  const currentItems = useMemo(() => {
    const start = (page - 1) * itemsPerPage
    return filteredList.slice(start, start + itemsPerPage)
  }, [filteredList, page])

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const cleanTags = (tagString) => {
    if (!tagString) return []
    // Remove brackets and quotes: ['Action', 'Comedy'] -> Action, Comedy
    return tagString.replace(/[\[\]']/g, '').split(',').slice(0, 3)
  }

  const handleReadManhwa = (manhwa) => {
    // Save to history in localStorage
    const historyKey = 'manhwaHistory';
    const existingHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');

    // Create history entry
    const historyEntry = {
      id: Date.now(),
      title: manhwa.title,
      description: manhwa.description,
      cover: manhwa.localCover || manhwa.cover,
      rating: manhwa.rating,
      year: manhwa.year,
      tags: manhwa.tags,
      viewedAt: new Date().toISOString(),
      status: 'Viewed'
    };

    // Check if already exists (by title)
    const existingIndex = existingHistory.findIndex(h => h.title === manhwa.title);
    if (existingIndex >= 0) {
      // Update existing entry
      existingHistory[existingIndex] = { ...existingHistory[existingIndex], viewedAt: historyEntry.viewedAt };
    } else {
      // Add new entry at the beginning
      existingHistory.unshift(historyEntry);
    }

    // Keep only last 50 items
    const limitedHistory = existingHistory.slice(0, 50);
    localStorage.setItem(historyKey, JSON.stringify(limitedHistory));

    // Navigate to details page passing the full manhwa object
    navigate(`/manga-details/${encodeURIComponent(manhwa.title)}`, { state: { manga: manhwa } })
  }

  if (loading) {
    return (
      <div className="page-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="loader">Loading Library...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="page-container" style={{ padding: '4rem', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="page-container">
      <section className="hero-section refer-hero">
        <h1 className="hero-title">Manga & Manhwa</h1>
        <p className="hero-subtitle">Browse our collection of {manhwaList.length.toLocaleString()} titles</p>

        <div className="search-container" style={{ marginTop: '2rem', maxWidth: '600px', margin: '2rem auto' }}>
          <input
            type="text"
            placeholder="Search by title or genre..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1) // Reset to first page on search
            }}
            className="search-input"
            style={{
              width: '100%',
              padding: '1rem',
              borderRadius: '8px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.1)',
              color: 'white',
              fontSize: '1.1rem',
              backdropFilter: 'blur(10px)'
            }}
          />
        </div>
      </section>

      <div className="manhwa-grid">
        {currentItems.map((manhwa, index) => {
          const tags = cleanTags(manhwa.tags);
          return (
            <div
              key={`${manhwa.title}-${index}`}
              className="manhwa-card"
              onClick={() => handleReadManhwa(manhwa)}
            >
              <div className="manhwa-cover">
                <img
                  src={manhwa.localCover || manhwa.cover}
                  alt={manhwa.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Start fallback chain
                    // 1. If currently trying localCover, fall back to cover (external)
                    // 2. If currently trying cover, fall back to placeholder

                    const currentSrc = e.target.src;

                    // Note: currentSrc will be a full URL (http://localhost...), localCover is relative (/Dataset/...)
                    // Simple check if it contains the local path
                    if (manhwa.localCover && currentSrc.includes(manhwa.localCover.split('/').pop())) {
                      // Failed local, try remote if exists
                      if (manhwa.cover) {
                        e.target.src = manhwa.cover;
                      } else {
                        e.target.style.display = 'none'; // Or placeholder
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
                      }
                    } else {
                      // Failed remote or fallback
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
                    }
                  }}
                />
                <div className="manhwa-overlay">
                  <span className="read-btn">VIEW DETAILS</span>
                </div>
                {manhwa.rating && (
                  <div className="rating-badge">
                    ⭐ {manhwa.rating}
                  </div>
                )}
              </div>
              <div className="manhwa-info">
                <h3 className="manhwa-title" title={manhwa.title}>{manhwa.title}</h3>
                <div className="manhwa-meta">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="meta-tag">{tag.trim()}</span>
                  ))}
                </div>
                <p className="manhwa-description" title={manhwa.description}>
                  {manhwa.description ? (manhwa.description.slice(0, 100) + '...') : 'No description available.'}
                </p>
                <div className="manhwa-stats">
                  <span>📅 {manhwa.year || 'N/A'}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {totalPages > 1 && (
        <div className="pagination-controls" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          marginTop: '3rem',
          marginBottom: '3rem'
        }}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="cta-button"
            style={{ opacity: page === 1 ? 0.5 : 1, cursor: page === 1 ? 'not-allowed' : 'pointer' }}
          >
            Previous
          </button>
          <span style={{ color: 'var(--text-primary)', fontSize: '1.1rem' }}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="cta-button"
            style={{ opacity: page === totalPages ? 0.5 : 1, cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Next
          </button>
        </div>
      )}

      <div className="content-box" style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h2>Want to Create Your Own?</h2>
        <p>Generate your own manhwa using our AI-powered creation tool.</p>
        <Link to="/generate-manhwa" className="cta-button" style={{ marginTop: '1.5rem' }}>
          Generate New Manhwa
        </Link>
      </div>
    </div>
  )
}

export default ReferManhwa
