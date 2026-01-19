import { useState } from 'react';

interface RiddleProps {
  riddle: {
    id: string;
    text: string;
    solution?: string;
    categories: string[];
    difficulty?: string;
    source: {
      book: string;
    };
  };
}

const RiddleCard = ({ riddle }: RiddleProps) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="border border-gray-100 rounded-2xl p-6 my-4 bg-white shadow-md hover:shadow-lg transition-all duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className="flex flex-wrap gap-2">
          {riddle.categories.map(cat => (
            <span key={cat} className="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
              {cat}
            </span>
          ))}
        </div>
        <span className={`text-xs font-bold uppercase tracking-wider ${
          riddle.difficulty === 'hard' ? 'text-red-500' : 
          riddle.difficulty === 'medium' ? 'text-orange-500' : 'text-green-500'
        }`}>
          {riddle.difficulty || 'easy'}
        </span>
      </div>

      <p className="text-lg leading-relaxed mb-6 text-gray-800">
        {riddle.text}
      </p>

      {showSolution ? (
        <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="font-bold text-blue-700 mb-2">Solution:</p>
          <p className="text-gray-900 text-lg leading-relaxed">{riddle.solution || 'No solution provided.'}</p>
        </div>
      ) : (
        <button 
          onClick={() => setShowSolution(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-md shadow-blue-600/20 transition-all active:scale-95"
        >
          Reveal Solution
        </button>
      )}

      <div className="mt-6 pt-4 border-t border-gray-50 text-xs text-gray-400 font-medium italic">
        Source: {riddle.source.book}
      </div>
    </div>
  );
};

export default RiddleCard;
