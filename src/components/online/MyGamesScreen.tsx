import { useState, useEffect, useCallback } from 'react';
import { listMyGames, GameInfo } from '../../services/api';

interface MyGamesScreenProps {
  onGameSelect: (gameId: string) => void;
  onBack: () => void;
}

const MyGamesScreen = ({ onGameSelect, onBack }: MyGamesScreenProps) => {
  const [games, setGames] = useState<GameInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'todas' | 'creadas' | 'participadas'>('todas');

  const fetchGames = useCallback(async () => {
    setLoading(true);
    try {
      const result = await listMyGames(filter);
      setGames(result.partidas);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las partidas');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'abierta': return '#ffaa00';
      case 'activa': return '#00ff00';
      case 'finalizada': return '#888';
      default: return '#ccc';
    }
  };

  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>Mis Partidas</h2>

      <div className="form-group">
        <label htmlFor="filter">Filtrar:</label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'todas' | 'creadas' | 'participadas')}
        >
          <option value="todas">Todas</option>
          <option value="creadas">Creadas por mí</option>
          <option value="participadas">En las que participo</option>
        </select>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', color: '#b8b8b8', padding: '20px' }}>
          Cargando...
        </div>
      ) : error ? (
        <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </div>
      ) : games.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
          No hay partidas para mostrar
        </div>
      ) : (
        <div style={{ marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
          {games.map((game) => (
            <div
              key={game.id_partida}
              style={{
                padding: '15px',
                marginBottom: '10px',
                backgroundColor: 'rgba(74, 74, 74, 0.3)',
                border: '1px solid #4a4a4a',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => onGameSelect(game.id_partida)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(74, 74, 74, 0.5)';
                e.currentTarget.style.borderColor = '#d4af37';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(74, 74, 74, 0.3)';
                e.currentTarget.style.borderColor = '#4a4a4a';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <strong style={{ color: '#d4af37', fontSize: '1.1em' }}>{game.id_partida}</strong>
                <span style={{ color: getEstadoColor(game.estado), fontSize: '0.9em' }}>
                  {game.estado === 'abierta' ? '⏳ Abierta' : game.estado === 'activa' ? '▶️ Activa' : '🏁 Finalizada'}
                </span>
              </div>
              <div style={{ fontSize: '0.85em', color: '#b8b8b8' }}>
                <div>👤 Creador: {game.creador} {game.es_creador ? '(tú)' : ''}</div>
                <div>👥 Jugadores: {game.num_jugadores}</div>
                <div>🎭 Impostores: {game.numero_impostores}</div>
                <div>📅 {formatDate(game.fecha_inicio)}</div>
                {game.estado === 'finalizada' && game.palabra_secreta && (
                  <div style={{ marginTop: '5px', paddingTop: '5px', borderTop: '1px solid #4a4a4a' }}>
                    <div>💭 Palabra: {game.palabra_secreta}</div>
                    {game.impostores && game.impostores.length > 0 && (
                      <div>🎭 Impostores: {game.impostores.join(', ')}</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="btn-start" onClick={onBack} style={{ backgroundColor: '#555' }}>
        Volver
      </button>
    </div>
  );
};

export default MyGamesScreen;
