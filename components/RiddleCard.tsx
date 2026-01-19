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
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '12px',
      padding: '1.5rem',
      margin: '1rem 0',
      backgroundColor: '#fff',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      transition: 'transform 0.2s ease',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {riddle.categories.map(cat => (
            <span key={cat} style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.6rem',
              backgroundColor: '#f0f0f0',
              borderRadius: '12px',
              color: '#666'
            }}>
              {cat}
            </span>
          ))}
        </div>
        <span style={{
          fontSize: '0.8rem',
          color: riddle.difficulty === 'hard' ? '#e53e3e' : 
                 riddle.difficulty === 'medium' ? '#dd6b20' : '#38a169',
          fontWeight: 'bold',
          textTransform: 'uppercase'
        }}>
          {riddle.difficulty || 'easy'}
        </span>
      </div>

      <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#2d3748' }}>
        {riddle.text}
      </p>

      {showSolution ? (
        <div style={{
          padding: '1rem',
          backgroundColor: '#f7fafc',
          borderRadius: '8px',
          borderLeft: '4px solid #4299e1',
          marginTop: '1rem'
        }}>
          <p style={{ fontWeight: 'bold', margin: '0 0 0.5rem 0', color: '#2b6cb0' }}>Solution:</p>
          <p style={{ margin: 0, fontSize: '1.05rem' }}>{riddle.solution || 'No solution provided.'}</p>
        </div>
      ) : (
        <button 
          onClick={() => setShowSolution(true)}
          style={{
            backgroundColor: '#4299e1',
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#3182ce'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4299e1'}
        >
          Reveal Solution
        </button>
      )}

      <div style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: '#a0aec0', borderTop: '1px solid #edf2f7', paddingTop: '0.8rem' }}>
        Source: {riddle.source.book}
      </div>
    </div>
  );
};

export default RiddleCard;
