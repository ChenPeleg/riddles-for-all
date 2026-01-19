import { useState } from 'react';
import { useRiddles } from '../context/RiddleContext';
import RiddleCard from '../components/RiddleCard';

function Categories() {
  const { riddles, loading } = useRiddles();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (loading) return <div className="p-8 max-w-3xl mx-auto">Loading categories...</div>;

  const categories = Array.from(new Set(riddles.flatMap(r => r.categories))).sort();

  const filteredRiddles = selectedCategory 
    ? riddles.filter(r => r.categories.includes(selectedCategory))
    : [];

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Browse by Categories</h1>
        <p className="text-gray-600">Explore riddles grouped by topic.</p>
      </header>

      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
            className={`px-4 py-2 rounded-full border transition-all ${
              selectedCategory === category
                ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {selectedCategory ? (
        <div>
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <span className="text-blue-600">#</span> {selectedCategory}
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
          <p className="text-gray-500 text-lg">Select a category above to see the riddles.</p>
        </div>
      )}
    </div>
  );
}

export default Categories;
