import '../styles/AboutMe.css'

function AboutMe() {
  return (
    <div className="page-container">
      <section className="hero-section about-hero">
        <h1 className="hero-title">About Me</h1>
        <p className="hero-subtitle">The Creator Behind Akatsuki Chronicles</p>
      </section>

      <section className="about-content">
        <div className="profile-section">
          <div className="profile-image-container">
            <img 
              src="/images/profile.jpg"
              alt="Profile"
              className="profile-image"
              onError={(e) => {
                const img = e.target;
                const sources = [
                  'https://cdn.pixabay.com/photo/2022/02/23/16/08/naruto-7030316_1280.jpg',
                  'https://cdn.pixabay.com/photo/2021/12/15/18/33/anime-6874248_1280.jpg',
                  'https://picsum.photos/400/400?random=7'
                ];
                const currentIndex = sources.findIndex(src => img.src.includes(src.split('/').pop()));
                if (currentIndex < sources.length - 1) {
                  img.src = sources[currentIndex + 1];
                } else {
                  img.style.display = 'none';
                  if (!img.parentElement.querySelector('.image-placeholder')) {
                    const placeholder = document.createElement('div');
                    placeholder.className = 'image-placeholder profile-image';
                    placeholder.textContent = 'Profile Picture';
                    img.parentElement.appendChild(placeholder);
                  }
                }
              }}
            />
          </div>
          <div className="profile-info">
            <h2>Welcome to Akatsuki Chronicles</h2>
            <p>
              I'm a passionate developer and anime enthusiast who has always been fascinated 
              by the art of storytelling through manga and manhwa. Growing up watching legendary 
              series like Naruto, One Piece, and more recently, Solo Leveling, I was inspired 
              to bridge the gap between traditional storytelling and cutting-edge AI technology.
            </p>
            <p>
              Akatsuki Chronicles represents my vision of making manhwa creation accessible to 
              everyone. By combining the power of artificial intelligence and machine learning 
              with the rich traditions of anime art styles, we can help creators bring their 
              stories to life in ways that were previously unimaginable.
            </p>
          </div>
        </div>

        <div className="content-box">
          <h2>My Journey</h2>
          <p>
            The idea for Akatsuki Chronicles was born from countless hours spent reading and 
            analyzing some of the greatest manhwa and manga series. I wanted to understand what 
            made stories like Solo Leveling so captivating - was it the art style, the character 
            development, or the epic world-building?
          </p>
          <p>
            After years of studying AI and machine learning, I realized that these technologies 
            could help democratize the creative process. Not everyone has the artistic skills to 
            draw like the masters at Shueisha or Shonen Jump, but everyone has stories worth telling.
          </p>
        </div>

        <div className="content-box">
          <h2>Inspirations</h2>
          <div className="inspiration-list">
            <div className="inspiration-item">
              <h3>⚡ Solo Leveling</h3>
              <p>
                The dark fantasy elements and incredible artwork of Solo Leveling showed me how 
                powerful visual storytelling can be when combined with compelling narrative arcs.
              </p>
            </div>
            <div className="inspiration-item">
              <h3>🔥 Naruto</h3>
              <p>
                Naruto's journey of growth, perseverance, and the power of bonds has always resonated 
                with me. It's a perfect example of character-driven storytelling.
              </p>
            </div>
            <div className="inspiration-item">
              <h3>⚓ One Piece</h3>
              <p>
                The epic world-building and sense of adventure in One Piece demonstrates how a 
                well-crafted universe can captivate audiences for decades.
              </p>
            </div>
          </div>
        </div>

        <div className="content-box">
          <h2>Vision & Mission</h2>
          <p>
            My mission is to empower creators worldwide to share their stories without the barriers 
            of technical artistic skill. Through AI and ML, we can preserve the essence of what makes 
            manhwa special while opening the door for new voices and perspectives.
          </p>
          <p>
            Akatsuki Chronicles is more than just a tool - it's a platform for the next generation 
            of storytellers. Whether you're inspired by the shadow monarchs of Solo Leveling, the 
            ninja way of Naruto, or the grand adventures of One Piece, your story deserves to be told.
          </p>
        </div>

        <section className="contact-section">
          <h2 className="section-title">Connect With Me</h2>
          <div className="social-links">
            <a href="#" className="social-link">
              <span className="social-icon">📧</span>
              <span>Email</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">🐙</span>
              <span>GitHub</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">💼</span>
              <span>LinkedIn</span>
            </a>
            <a href="#" className="social-link">
              <span className="social-icon">🐦</span>
              <span>Twitter</span>
            </a>
          </div>
        </section>
      </section>
    </div>
  )
}

export default AboutMe

