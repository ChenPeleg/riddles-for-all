import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRiddles } from '../../context/RiddleContext';
import RiddleCard from '../../components/RiddleCard';

function Categories() {
  const { riddles, loading } = useRiddles();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (loading) return <div className="p-8 max-w-3xl mx-auto">Loading categories...</div>;

  const categories = Array.from(new Set(riddles.flatMap(r => r.categories))).sort();

  const filteredRiddles = selectedCategory 
    ? riddles.filter(r => r.categories.includes(selectedCategory))
    : [];

  return (
    <div className="min-h-screen bg-surface-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <header className="mb-12 animate-fade-in">
          <Link to="/" className="inline-flex items-center gap-2 text-surface-400 hover:text-brand-primary transition-colors mb-8 group">
            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-surface-900 tracking-tight mb-4">Browse by <span className="text-brand-primary">Categories</span></h1>
          <p className="text-surface-600">Explore riddles grouped by topic and theme.</p>
        </header>

        <div className="flex flex-wrap gap-3 mb-16 animate-fade-in [animation-delay:100ms]">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
              className={`px-6 py-2.5 rounded-2xl border-2 font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-brand-primary text-white border-brand-primary shadow-[0_8px_16px_-4px_rgba(99,102,241,0.4)] scale-105'
                  : 'bg-white text-surface-600 border-surface-200 hover:border-brand-primary/30 hover:bg-brand-primary/5 active:scale-95'
              }`}
            >
              <span className="mr-2 opacity-50">#</span>{category}
            </button>
          ))}
        </div>

        {selectedCategory ? (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl">#</div>
                 <h2 className="text-2xl font-bold text-surface-900 tracking-tight">
                    {selectedCategory}
                 </h2>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-surface-400 px-3 py-1 bg-surface-100 rounded-lg">
                {filteredRiddles.length} riddles
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {filteredRiddles.map(riddle => (
                <RiddleCard key={riddle.id} riddle={riddle} />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[2rem] border-2 border-dashed border-surface-200 animate-fade-in [animation-delay:200ms]">
            <div className="w-16 h-16 bg-surface-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
               <svg className="w-8 h-8 text-surface-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <p className="text-surface-400 text-lg font-medium">Select a category above to reveal its mysteries.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Categories;
