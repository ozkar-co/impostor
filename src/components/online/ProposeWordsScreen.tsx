import { useState } from 'react';
import { proposeWords, WordProposal } from '../../services/api';

interface ProposeWordsScreenProps {
  onBack: () => void;
}

const ProposeWordsScreen = ({ onBack }: ProposeWordsScreenProps) => {
  const [words, setWords] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleAddWord = () => {
    setWords([...words, '']);
  };

  const handleRemoveWord = (index: number) => {
    setWords(words.filter((_, i) => i !== index));
  };

  const handleWordChange = (index: number, value: string) => {
    const newWords = [...words];
    newWords[index] = value;
    setWords(newWords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const filteredWords = words.filter((w: string) => w.trim().length > 0);
    if (filteredWords.length === 0) {
      setError('Debes agregar al menos una palabra');
      return;
    }

    const wordProposals: WordProposal[] = filteredWords.map((palabra: string) => ({
      palabra: palabra.trim(),
      categoria: 'general'
    }));

    setLoading(true);
    try {
      const result = await proposeWords(wordProposals);
      setSuccess(result.message);
      setWords(['']);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al proponer las palabras');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Proponer Palabras</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Palabras a proponer:</label>
          {words.map((word: string, index: number) => (
            <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <input
                type="text"
                value={word}
                onChange={(e) => handleWordChange(index, e.target.value)}
                placeholder="Escribe una palabra"
                disabled={loading}
                style={{ flex: 1, minWidth: 0 }}
              />
              {words.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveWord(index)}
                  disabled={loading}
                  style={{
                    padding: '10px 15px',
                    backgroundColor: '#ff4444',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    borderRadius: '3px',
                    flexShrink: 0,
                    width: 'auto',
                    minWidth: 'fit-content'
                  }}
                >
                  ✖
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWord}
            disabled={loading}
            style={{
              padding: '10px 15px',
              backgroundColor: '#4a4a4a',
              border: '1px solid #666',
              color: '#d4af37',
              cursor: 'pointer',
              borderRadius: '3px',
              width: '100%',
              marginTop: '10px'
            }}
          >
            ➕ Agregar otra palabra
          </button>
        </div>

        {error && (
          <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ color: '#00ff00', marginBottom: '15px', textAlign: 'center' }}>
            ✅ {success}
          </div>
        )}

        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="btn-start" onClick={onBack} disabled={loading} style={{ backgroundColor: '#555' }}>
            Volver
          </button>
          <button type="submit" className="btn-start" disabled={loading}>
            {loading ? 'Enviando...' : 'Proponer Palabras'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProposeWordsScreen;
