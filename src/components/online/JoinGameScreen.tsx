import { useState } from 'react';
import { joinGame } from '../../services/api';

interface JoinGameScreenProps {
  onGameJoined: (gameId: string) => void;
  onBack: () => void;
}

const JoinGameScreen = ({ onGameJoined, onBack }: JoinGameScreenProps) => {
  const [gameId, setGameId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await joinGame(gameId.toUpperCase().trim());
      onGameJoined(gameId.toUpperCase().trim());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al unirse a la partida');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Unirse a Partida</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="gameId">Código de la partida:</label>
          <input
            type="text"
            id="gameId"
            value={gameId}
            onChange={(e) => setGameId(e.target.value.toUpperCase())}
            placeholder="Ej: ABC7XY"
            maxLength={6}
            required
            disabled={loading}
            style={{ textTransform: 'uppercase' }}
          />
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
          <button type="submit" className="btn-start" disabled={loading || gameId.length !== 6}>
            {loading ? 'Uniéndose...' : 'Unirse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinGameScreen;
