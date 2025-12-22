import { useState } from 'react';
import { createGame } from '../../services/api';

interface CreateGameScreenProps {
  onGameCreated: (gameId: string) => void;
  onBack: () => void;
}

const CreateGameScreen = ({ onGameCreated, onBack }: CreateGameScreenProps) => {
  const [filtro, setFiltro] = useState<'sistema' | 'todas'>('sistema');
  const [numImpostores, setNumImpostores] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await createGame(filtro, numImpostores);
      onGameCreated(result.id_partida);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la partida');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Crear Nueva Partida</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="filtro">Palabras a usar:</label>
          <select
            id="filtro"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value as 'sistema' | 'todas')}
            disabled={loading}
          >
            <option value="sistema">Solo palabras del sistema</option>
            <option value="todas">Todas las palabras</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="impostores">Número de impostores:</label>
          <select
            id="impostores"
            value={numImpostores}
            onChange={(e) => setNumImpostores(parseInt(e.target.value))}
            disabled={loading}
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} impostor{num > 1 ? 'es' : ''}</option>
            ))}
          </select>
        </div>
        {error && (
          <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="button" className="btn-start" onClick={onBack} disabled={loading} style={{ backgroundColor: '#555' }}>
            Volver
          </button>
          <button type="submit" className="btn-start" disabled={loading}>
            {loading ? 'Creando...' : 'Crear Partida'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGameScreen;
