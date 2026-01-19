import { useState } from 'react';
import { useRiddles } from '../context/RiddleContext';
import RiddleCard from '../components/RiddleCard';

function Sources() {
  const { riddles, loading } = useRiddles();
  const [selectedSource, setSelectedSource] = useState<string | null>(null);

  if (loading) return <div className="p-8 max-w-3xl mx-auto">Loading sources...</div>;

  const sources = Array.from(new Set(riddles.map(r => r.source.book))).sort();

  const filteredRiddles = selectedSource 
    ? riddles.filter(r => r.source.book === selectedSource)
    : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse by Sources</h1>
        <p className="text-gray-600">Discover riddles from different books and collections.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {sources.map(source => (
          <button
            key={source}
            onClick={() => setSelectedSource(source === selectedSource ? null : source)}
            className={`p-4 rounded-xl border text-left transition-all ${
              selectedSource === source
                ? 'bg-pink-600 text-white border-pink-600 shadow-md transform scale-105'
                : 'bg-white text-gray-700 border-gray-200 hover:border-pink-400 hover:bg-pink-50'
            }`}
          >
            <div className={`text-xs uppercase tracking-wider mb-1 ${selectedSource === source ? 'text-pink-100' : 'text-gray-400'}`}>
              Source Book
            </div>
            <div className="font-bold truncate">{source}</div>
          </button>
        ))}
      </div>

      {selectedSource ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-pink-600">📖</span> {selectedSource}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredRiddles.length} riddles)
            </span>
          </h2>
          <div className="space-y-4">
            {filteredRiddles.map(riddle => (
              <RiddleCard key={riddle.id} riddle={riddle} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-100 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 text-lg">Select a source above to see the riddles from that book.</p>
        </div>
      )}
    </div>
  );
}

export default Sources;
