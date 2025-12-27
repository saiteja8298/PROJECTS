import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/GenerateManhwa.css'

function GenerateManhwa() {
  const [storyText, setStoryText] = useState('')
  const [title, setTitle] = useState('')
  const [style, setStyle] = useState('Solo Leveling')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (e) => {
    e.preventDefault()
    setIsGenerating(true)
    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false)
      alert('Manhwa generation started! Check History page for progress.')
    }, 2000)
  }

  return (
    <div className="page-container">
      <section className="hero-section generate-hero">
        <h1 className="hero-title">Generate Manhwa</h1>
        <p className="hero-subtitle">AI-Powered Creation Engine</p>
      </section>

      <div className="generate-container">
        <form onSubmit={handleGenerate} className="generate-form">
          <div className="form-group">
            <label htmlFor="manhwa-title">Manhwa Title</label>
            <input
              type="text"
              id="manhwa-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your manhwa title..."
              className="modern-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="manhwa-style">Art Style</label>
            <select
              id="manhwa-style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="modern-input"
            >
              <option>Solo Leveling</option>
              <option>Naruto</option>
              <option>One Piece</option>
              <option>Dragon Ball</option>
              <option>Attack on Titan</option>
              <option>Custom Style</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="story-text">Story Text</label>
            <textarea
              id="story-text"
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              rows="12"
              placeholder="Write or paste your story here...&#10;&#10;Example:&#10;In a world where shadows rule, a lone hunter awakens to find he has become the most powerful being. With an army of shadow soldiers at his command, he embarks on a journey to uncover the truth behind the system that changed his life forever..."
              className="modern-input"
              required
            />
            <div className="char-count">
              Characters: {storyText.length}
            </div>
          </div>

          <button
            type="submit"
            className="cta-button generate-btn"
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : '⚡ Generate Manhwa'}
          </button>
        </form>

        <div className="info-panel">
          <h3>How It Works</h3>
          <ul>
            <li>Enter your story text or paste existing content</li>
            <li>Choose your preferred art style</li>
            <li>Our AI processes your story and generates panels</li>
            <li>Check History page to view generated manhwa</li>
          </ul>

          <div className="style-preview">
            <h3>Style Preview</h3>
            <div className="style-images">
              <div className="style-item">
                <img src="/images/sololeveling.jpg" alt="Solo Leveling" loading="lazy" />
                <span>Solo Leveling</span>
              </div>
              <div className="style-item">
                <img src="/images/onepiece.jpeg" alt="One Piece" loading="lazy" />
                <span>One Piece</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateManhwa

