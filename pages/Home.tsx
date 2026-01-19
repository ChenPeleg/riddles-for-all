import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import RiddleCard from '../components/RiddleCard'
import { useRiddles } from '../context/RiddleContext'

function Home() {
  const { riddles, loading } = useRiddles();
  const [randomRiddle, setRandomRiddle] = useState(null as any);

  useEffect(() => {
    if (riddles.length > 0 && !randomRiddle) {
      const randomIndex = Math.floor(Math.random() * riddles.length);
      setRandomRiddle(riddles[randomIndex]);
    }
  }, [riddles, randomRiddle]);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Riddles Collection</h1>
        <p className="text-xl text-gray-600">
          Exercise your brain with our handpicked collection of brain teasers and puzzles.
        </p>
      </header>

      <div className="mb-12">
        <h2 className="border-b-2 border-gray-100 pb-2 mb-6 text-2xl font-semibold">
          Riddle of the Moment
        </h2>
        {randomRiddle ? (
          <RiddleCard riddle={randomRiddle} />
        ) : (
          <p>Loading a fresh riddle for you...</p>
        )}
      </div>

      <nav className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link to="/search" className="no-underline">
          <div className="p-6 bg-blue-500 hover:bg-blue-600 text-white rounded-xl text-center font-bold shadow-lg shadow-blue-500/30 transition-all hover:scale-105 active:scale-95">
            Search All Riddles
          </div>
        </Link>
        <Link to="/categories" className="no-underline">
          <div className="p-6 bg-green-500 hover:bg-green-600 text-white rounded-xl text-center font-bold shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95">
            Browse Categories
          </div>
        </Link>
        <Link to="/sources" className="no-underline">
          <div className="p-6 bg-pink-500 hover:bg-pink-600 text-white rounded-xl text-center font-bold shadow-lg shadow-pink-500/30 transition-all hover:scale-105 active:scale-95">
            Browse Sources
          </div>
        </Link>
      </nav>
    </div>
  )
}

export default Home
