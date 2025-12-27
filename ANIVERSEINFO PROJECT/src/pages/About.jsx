import { Link } from 'react-router-dom'
import '../styles/About.css'

function About() {
    return (
        <div className="about-page">
            {/* Hero */}
            <section className="about-hero">
                <h1>About AniVerseInfo</h1>
                <p>Your ultimate destination for anime, manga, and manhwa discovery</p>
            </section>

            {/* Creator Section */}
            <section className="creator-section">
                <div className="creator-card">
                    <div className="creator-avatar">
                        <span className="avatar-icon">👨‍💻</span>
                        <div className="avatar-glow"></div>
                    </div>
                    <div className="creator-info">
                        <span className="creator-label">Creator & Developer</span>
                        <h2 className="creator-name">SAI TEJA AMBHILIGE</h2>
                        <p className="creator-location">
                            <span className="location-icon">📍</span> Hyderabad, India 🇮🇳
                        </p>
                        <p className="creator-bio">
                            A passionate developer and anime enthusiast from the heart of India.
                            Building AniVerseInfo to create the ultimate database for anime, manga,
                            and manhwa lovers worldwide.
                        </p>
                        <div className="creator-contact">
                            <a href="mailto:asaitejar@gmail.com" className="contact-link email">
                                <span className="contact-icon">📧</span>
                                <span className="contact-text">asaitejar@gmail.com</span>
                            </a>
                        </div>
                        <div className="creator-tags">
                            <span className="tag">Full Stack Developer</span>
                            <span className="tag">Anime Enthusiast</span>
                            <span className="tag">React Developer</span>
                            <span className="tag">Made in India 🇮🇳</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="about-section">
                <div className="section-content">
                    <h2>🎯 Our Mission</h2>
                    <p>
                        AniVerseInfo is a unified, trustworthy, and discoverable media database for anime,
                        manga, and manhwa. We combine authoritative metadata, community contributions, and
                        ethically applied AI to deliver the most comprehensive fan and researcher experience.
                    </p>
                    <p>
                        Similar in credibility to IMDb but tailored for Asian visual storytelling, we aim to
                        become the go-to reference platform for millions of fans worldwide.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="about-stats">
                <div className="stat-item">
                    <div className="stat-number">15,000+</div>
                    <div className="stat-label">Anime Titles</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">3</div>
                    <div className="stat-label">Media Types</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">🇮🇳</div>
                    <div className="stat-label">Made in India</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">∞</div>
                    <div className="stat-label">Possibilities</div>
                </div>
            </section>

            {/* Features */}
            <section className="about-section">
                <div className="section-content">
                    <h2>✨ What We Offer</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🔍</div>
                            <h3>Powerful Search</h3>
                            <p>Find exactly what you're looking for with advanced filters and full-text search.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📊</div>
                            <h3>Detailed Metadata</h3>
                            <p>Comprehensive information including genres, studios, episodes, and more.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⭐</div>
                            <h3>Ratings & Reviews</h3>
                            <p>Community-driven ratings help you discover the best content.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Responsive Design</h3>
                            <p>Beautiful experience on any device - desktop, tablet, or mobile.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="about-section alt">
                <div className="section-content">
                    <h2>🌟 The Vision</h2>
                    <p>
                        AniVerseInfo was born from a passion for Asian visual storytelling and a desire to
                        create a central hub where fans can discover, track, and discuss their favorite titles.
                    </p>
                    <p>
                        Built with ❤️ in Hyderabad, India - we believe in the power of community and the
                        importance of accurate, accessible information. Our platform is built by a fan, for fans.
                    </p>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="about-section">
                <div className="section-content">
                    <h2>🛠️ Built With</h2>
                    <div className="tech-stack">
                        <div className="tech-item">
                            <span className="tech-icon">⚛️</span>
                            <span className="tech-name">React</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">⚡</span>
                            <span className="tech-name">Vite</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">🎨</span>
                            <span className="tech-name">CSS3</span>
                        </div>
                        <div className="tech-item">
                            <span className="tech-icon">📊</span>
                            <span className="tech-name">Large Datasets</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="about-cta">
                <h2>Ready to Explore?</h2>
                <p>Dive into our vast collection of anime, manga, and manhwa</p>
                <div className="cta-buttons">
                    <Link to="/browse" className="cta-btn primary">Start Browsing</Link>
                    <Link to="/" className="cta-btn secondary">Back to Home</Link>
                </div>
            </section>

            {/* Footer Note */}
            <section className="about-footer">
                <p>
                    © 2024 AniVerseInfo | Created by <strong>SAI TEJA AMBHILIGE</strong>
                </p>
                <p className="footer-note">
                    A passion project from Hyderabad, India 🇮🇳
                </p>
            </section>
        </div>
    )
}

export default About
