import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Auth.css'

function Submit() {
    const [formData, setFormData] = useState({
        title: '',
        type: 'manhwa',
        description: '',
        genres: '',
        year: '',
        coverUrl: '',
        isAIGenerated: false,
        aiModel: ''
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Save to localStorage (simulating submission)
        const submissions = JSON.parse(localStorage.getItem('userSubmissions') || '[]')
        submissions.push({
            ...formData,
            id: Date.now(),
            submittedAt: new Date().toISOString(),
            status: 'pending'
        })
        localStorage.setItem('userSubmissions', JSON.stringify(submissions))

        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="submit-page">
                <div className="submit-success">
                    <div className="success-icon">✓</div>
                    <h2>Submission Received!</h2>
                    <p>Your content has been submitted for review. Our moderators will review it shortly.</p>
                    <Link to="/browse" className="back-btn">Browse Content</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="submit-page">
            <section className="submit-hero">
                <h1>Submit Content</h1>
                <p>Contribute to AniVerseInfo by adding new anime, manga, or manhwa entries</p>
            </section>

            <div className="submit-content">
                <form className="submit-form" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h2>Basic Information</h2>

                        <div className="form-group">
                            <label>Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter the title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Type *</label>
                            <select name="type" value={formData.type} onChange={handleChange}>
                                <option value="anime">Anime</option>
                                <option value="manga">Manga</option>
                                <option value="manhwa">Manhwa</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter a description or synopsis"
                                rows={5}
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label>Genres</label>
                                <input
                                    type="text"
                                    name="genres"
                                    value={formData.genres}
                                    onChange={handleChange}
                                    placeholder="Action, Fantasy, Romance..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Year</label>
                                <input
                                    type="text"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    placeholder="2024"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Cover Image URL</label>
                            <input
                                type="url"
                                name="coverUrl"
                                value={formData.coverUrl}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="form-section ai-section">
                        <h2>AI Content</h2>
                        <p className="section-note">If this content was generated by AI, please check the box below</p>

                        <div className="form-group checkbox-group">
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    name="isAIGenerated"
                                    checked={formData.isAIGenerated}
                                    onChange={handleChange}
                                />
                                <span className="checkmark"></span>
                                This content is AI-generated
                            </label>
                        </div>

                        {formData.isAIGenerated && (
                            <div className="form-group">
                                <label>AI Model Used</label>
                                <input
                                    type="text"
                                    name="aiModel"
                                    value={formData.aiModel}
                                    onChange={handleChange}
                                    placeholder="e.g., Stable Diffusion, Midjourney..."
                                />
                            </div>
                        )}
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="submit-btn">Submit for Review</button>
                    </div>
                </form>

                <div className="submit-guidelines">
                    <h3>Submission Guidelines</h3>
                    <ul>
                        <li>Ensure the title is accurate and properly formatted</li>
                        <li>Provide a clear and informative description</li>
                        <li>AI-generated content must be clearly labeled</li>
                        <li>Do not submit copyrighted material without permission</li>
                        <li>All submissions are reviewed by moderators</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Submit
