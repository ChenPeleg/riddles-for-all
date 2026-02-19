import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import RiddleDetail from './pages/RiddleDetail'
import Categories from './pages/Categories'
import Sources from './pages/Sources'
import { RiddleProvider } from './context/RiddleContext'
import BookReader from './pages/BookReader'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <RiddleProvider>
      <Router>
        <div className="h-screen  overflow-y-hidden">
          <NavBar />
          <main className={'h-screen   overflow-scroll'} id="main" tabIndex={-1}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/riddle/:id" element={<RiddleDetail />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/sources" element={<Sources />} />
              <Route path="/books/:slug" element={<BookReader />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </RiddleProvider>
  )
}

export default App
