import { useState } from 'react';
import { proposeWords, WordProposal } from '../../services/api';

interface ProposeWordsScreenProps {
  onBack: () => void;
}

interface FeedbackWord {
  palabra: string;
  slug: string;
  razon?: string;
  estado: 'creada' | 'omitida';
}

const ProposeWordsScreen = ({ onBack }: ProposeWordsScreenProps) => {
  const [words, setWords] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState<FeedbackWord[]>([]);

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
    setFeedback([]);

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
      
      // Construir feedback detallado
      const feedbackList: FeedbackWord[] = [];
      
      // Agregar palabras creadas
      if (result.palabras_creadas && Array.isArray(result.palabras_creadas)) {
        result.palabras_creadas.forEach(palabra => {
          feedbackList.push({
            palabra: palabra.palabra,
            slug: palabra.slug,
            estado: 'creada'
          });
        });
      }
      
      // Agregar palabras omitidas
      if (result.palabras_omitidas && Array.isArray(result.palabras_omitidas) && result.palabras_omitidas.length > 0) {
        result.palabras_omitidas.forEach(omitted => {
          feedbackList.push({
            palabra: omitted.palabra,
            slug: omitted.slug,
            razon: omitted.razon,
            estado: 'omitida'
          });
        });
      }
      
      setFeedback(feedbackList);
      
      // Limpiar inputs si se crearon palabras
      if (result.total_creadas > 0) {
        setWords(['']);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al proponer las palabras');
      setFeedback([]);
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
          <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center', padding: '10px', backgroundColor: 'rgba(255, 68, 68, 0.1)', borderRadius: '4px' }}>
            {error}
          </div>
        )}

        {feedback.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            {feedback.some(f => f.estado === 'creada') && (
              <div style={{ marginBottom: '10px' }}>
                <h4 style={{ color: '#00ff00', marginBottom: '8px' }}>✅ Palabras Creadas ({feedback.filter(f => f.estado === 'creada').length})</h4>
                {feedback
                  .filter(f => f.estado === 'creada')
                  .map((item, idx) => (
                    <div key={idx} style={{ color: '#00ff00', fontSize: '0.9em', marginBottom: '4px', paddingLeft: '10px' }}>
                      • {item.palabra}
                    </div>
                  ))}
              </div>
            )}
            
            {feedback.some(f => f.estado === 'omitida') && (
              <div>
                <h4 style={{ color: '#ffaa00', marginBottom: '8px' }}>⏭️ Palabras Omitidas ({feedback.filter(f => f.estado === 'omitida').length})</h4>
                {feedback
                  .filter(f => f.estado === 'omitida')
                  .map((item, idx) => (
                    <div key={idx} style={{ color: '#ffaa00', fontSize: '0.9em', marginBottom: '4px', paddingLeft: '10px' }}>
                      • {item.palabra} - <span style={{ fontSize: '0.85em' }}>{item.razon}</span>
                    </div>
                  ))}
              </div>
            )}
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

