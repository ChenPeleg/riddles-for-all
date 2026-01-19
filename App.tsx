import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import RiddleDetail from './pages/RiddleDetail'
import Categories from './pages/Categories'
import Sources from './pages/Sources'
import { RiddleProvider } from './context/RiddleContext'

function App() {
  return (
    <RiddleProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/riddle/:id" element={<RiddleDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/sources" element={<Sources />} />
          </Routes>
        </div>
      </Router>
    </RiddleProvider>
  )
}

export default App
