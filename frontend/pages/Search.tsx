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
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Search Riddles</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <input 
          type="text" 
          placeholder="Search by text or category..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.8rem',
            fontSize: '1rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e0',
            outline: 'none'
          }}
        />
      </div>

      {loading ? (
        <p>Loading riddles...</p>
      ) : (
        <div>
          <p style={{ color: '#718096', marginBottom: '1rem' }}>
            Found {filteredRiddles.length} riddles
          </p>
          {filteredRiddles.map(riddle => (
            <RiddleCard key={riddle.id} riddle={riddle} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Search;
