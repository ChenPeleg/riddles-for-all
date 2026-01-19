import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RiddleCard from '../components/RiddleCard'

interface Riddle {
  id: string;
  text: string;
  solution?: string;
  categories: string[];
  difficulty?: string;
  source: {
    book: string;
  };
}

function Home() {
  const [randomRiddle, setRandomRiddle] = useState<Riddle | null>(null);

  useEffect(() => {
    fetch('/riddles/data/riddles-all.json')
      .then(res => res.json())
      .then(data => {
        if (data.riddles && data.riddles.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.riddles.length);
          setRandomRiddle(data.riddles[randomIndex]);
        }
      })
      .catch(err => console.error('Error fetching riddles for home:', err));
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '3rem', color: '#2d3748', marginBottom: '1rem' }}>Riddles Collection</h1>
        <p style={{ fontSize: '1.2rem', color: '#718096' }}>
          Exercise your brain with our handpicked collection of brain teasers and puzzles.
        </p>
      </header>

      <div style={{ marginBottom: '3rem' }}>
        <h2 style={{ borderBottom: '2px solid #edf2f7', paddingBottom: '0.5rem', marginBottom: '1.5rem' }}>
          Riddle of the Moment
        </h2>
        {randomRiddle ? (
          <RiddleCard riddle={randomRiddle} />
        ) : (
          <p>Loading a fresh riddle for you...</p>
        )}
      </div>

      <nav style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr 1fr', 
        gap: '1.5rem',
        marginTop: '2rem' 
      }}>
        <Link to="/search" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#4299e1',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(66, 153, 225, 0.3)',
            transition: 'transform 0.2s'
          }}>
            Search All Riddles
          </div>
        </Link>
        <Link to="/categories" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#48bb78',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(72, 187, 120, 0.3)',
            transition: 'transform 0.2s'
          }}>
            Browse Categories
          </div>
        </Link>
        <Link to="/sources" style={{ textDecoration: 'none' }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#ed64a6',
            color: 'white',
            borderRadius: '12px',
            textAlign: 'center',
            fontWeight: 'bold',
            boxShadow: '0 4px 6px rgba(237, 100, 166, 0.3)',
            transition: 'transform 0.2s'
          }}>
            Browse Sources
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Home
