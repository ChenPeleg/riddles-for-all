import { useState, useEffect } from 'react';
import RiddleCard from '../components/RiddleCard';

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

function Search() {
  const [riddles, setRiddles] = useState<Riddle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('/riddles/data/riddles-all.json')
      .then(res => res.json())
      .then(data => {
        setRiddles(data.riddles);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching riddles:', err);
        setLoading(false);
      });
  }, []);

  const filteredRiddles = riddles.filter(r => 
    r.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.categories.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Search Riddles</h1>
      
      <div className="mb-8">
        <input 
          type="text" 
          placeholder="Search by text or category..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 text-lg rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      {loading ? (
        <p>Loading riddles...</p>
      ) : (
        <div>
          <p className="text-gray-500 mb-4">
            Found {filteredRiddles.length} riddles
          </p>
          <div className="space-y-4">
            {filteredRiddles.map(riddle => (
              <RiddleCard key={riddle.id} riddle={riddle} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
