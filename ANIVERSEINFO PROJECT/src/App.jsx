import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Browse from './pages/Browse'
import Search from './pages/Search'
import EntityPage from './pages/EntityPage'
import History from './pages/History'
import About from './pages/About'
import './index.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />

          {/* Browse Routes */}
          <Route path="/browse" element={<Browse />} />
          <Route path="/browse/:type" element={<Browse />} />

          {/* Search */}
          <Route path="/search" element={<Search />} />

          {/* Entity Pages */}
          <Route path="/anime/:slug" element={<EntityPage type="anime" />} />
          <Route path="/manga/:slug" element={<EntityPage type="manga" />} />
          <Route path="/manhwa/:slug" element={<EntityPage type="manhwa" />} />

          {/* Legacy route redirect */}
          <Route path="/manga-details/:id" element={<EntityPage />} />
          <Route path="/refer-manhwa" element={<Browse />} />

          {/* Other Pages */}
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
