import { Link } from 'react-router-dom'

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Riddles Collection</h1>
      <p>Welcome to the Riddles Collection - Browse and search through brain teasers and puzzles!</p>

      <nav style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <Link to="/search">
          <button>Search Riddles</button>
        </Link>
        <Link to="/categories">
          <button>Browse Categories</button>
        </Link>
        <Link to="/sources">
          <button>Browse Sources</button>
        </Link>
      </nav>
    </div>
  )
}

export default Home
