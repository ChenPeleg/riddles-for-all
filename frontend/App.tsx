import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import RiddleDetail from './pages/RiddleDetail'
import Categories from './pages/Categories'
import Sources from './pages/Sources'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/riddle/:id" element={<RiddleDetail />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/sources" element={<Sources />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
