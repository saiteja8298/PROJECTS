import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Navbar.css'

function Navbar() {
  const location = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <span className="logo-text">AniVerseInfo</span>
        </Link>

        {/* Search Bar */}
        <form className="nav-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search anime, manga..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            🔍
          </button>
        </form>

        {/* Navigation Links */}
        <ul className={`nav-links ${showMobileMenu ? 'active' : ''}`}>
          <li>
            <Link to="/" className={`nav-link ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li className="nav-dropdown">
            <Link to="/browse" className={`nav-link ${isActive('/browse') ? 'active' : ''}`}>
              Browse ▾
            </Link>
            <div className="dropdown-menu">
              <Link to="/browse/anime" className="dropdown-item">🎬 Anime</Link>
              <Link to="/browse/manga" className="dropdown-item">📖 Manga</Link>
              <Link to="/browse/manhwa" className="dropdown-item">📚 Manhwa</Link>
            </div>
          </li>
          <li>
            <Link to="/search" className={`nav-link ${isActive('/search') ? 'active' : ''}`}>
              Search
            </Link>
          </li>
          <li>
            <Link to="/history" className={`nav-link ${isActive('/history') ? 'active' : ''}`}>
              History
            </Link>
          </li>
          <li>
            <Link to="/about" className={`nav-link ${isActive('/about') ? 'active' : ''}`}>
              About
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar
