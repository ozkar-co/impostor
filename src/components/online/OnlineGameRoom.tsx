import { useState, useEffect, useCallback } from 'react';
import { getGameStatus, startGame, closeGame, getUsername, GameInfo } from '../../services/api';

interface OnlineGameRoomProps {
  gameId: string;
  onBack: () => void;
}

const OnlineGameRoom = ({ gameId, onBack }: OnlineGameRoomProps) => {
  const [gameInfo, setGameInfo] = useState<GameInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const username = getUsername();

  const fetchGameStatus = useCallback(async () => {
    try {
      const info = await getGameStatus(gameId);
      setGameInfo(info);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el estado de la partida');
    } finally {
      setLoading(false);
    }
  }, [gameId]);

  useEffect(() => {
    fetchGameStatus();
    const interval = setInterval(fetchGameStatus, 3000);
    return () => clearInterval(interval);
  }, [fetchGameStatus]);

  const handleStartGame = async () => {
    setActionLoading(true);
    try {
      await startGame(gameId);
      await fetchGameStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar la partida');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCloseGame = async () => {
    setActionLoading(true);
    try {
      await closeGame(gameId);
      await fetchGameStatus();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cerrar la partida');
    } finally {
      setActionLoading(false);
    }
  };

  const handleCopyGameId = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="game-screen">
        <div className="player-info">
          <div className="player-number">Cargando...</div>
        </div>
      </div>
    );
  }

  if (!gameInfo) {
    return (
      <div className="game-screen">
        <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
          {error || 'No se pudo cargar la partida'}
        </div>
        <button className="btn-start" onClick={onBack}>Volver</button>
      </div>
    );
  }

  const isCreator = gameInfo.creador === username;

  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>
        Partida: {gameId}
      </h2>

      <div style={{ marginBottom: '20px' }}>
        <div className="form-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <strong style={{ color: '#b8b8b8' }}>Código:</strong>
            <span style={{ color: '#d4af37', fontSize: '1.2em', letterSpacing: '2px' }}>{gameId}</span>
            <button 
              onClick={handleCopyGameId}
              style={{ 
                padding: '5px 10px', 
                fontSize: '0.8em',
                cursor: 'pointer',
                backgroundColor: copied ? '#4a9a4a' : '#4a4a4a',
                border: '1px solid #666',
                color: '#d4af37',
                borderRadius: '3px'
              }}
            >
              {copied ? '✅ Copiado' : '📋 Copiar'}
            </button>
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong style={{ color: '#b8b8b8' }}>Estado:</strong>{' '}
            <span style={{ 
              color: gameInfo.estado === 'abierta' ? '#ffaa00' : gameInfo.estado === 'activa' ? '#00ff00' : '#888'
            }}>
              {gameInfo.estado === 'abierta' ? 'Abierta' : gameInfo.estado === 'activa' ? 'Activa' : 'Finalizada'}
            </span>
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong style={{ color: '#b8b8b8' }}>Creador:</strong> {gameInfo.creador}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong style={{ color: '#b8b8b8' }}>Jugadores:</strong> {gameInfo.num_jugadores || gameInfo.jugadores.length}
          </div>
          <div style={{ marginBottom: '5px' }}>
            <strong style={{ color: '#b8b8b8' }}>Impostores:</strong> {gameInfo.numero_impostores}
          </div>
        </div>

        <div className="form-group">
          <strong style={{ color: '#b8b8b8' }}>Jugadores en la partida:</strong>
          <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#ccc' }}>
            {gameInfo.jugadores.map((player, idx) => (
              <li key={idx} style={{ marginBottom: '5px' }}>
                {player} {player === username ? '(tú)' : ''} {player === gameInfo.creador ? '👑' : ''}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {gameInfo.estado === 'abierta' && (
        <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: 'rgba(255, 170, 0, 0.1)', border: '1px solid #ffaa00', borderRadius: '5px' }}>
          <p style={{ color: '#ffaa00', margin: 0 }}>
            ⏳ Esperando a que el creador inicie la partida...
          </p>
        </div>
      )}

      {gameInfo.estado === 'activa' && (
        <div style={{ marginBottom: '20px' }}>
          {gameInfo.es_impostor ? (
            <div className="modal-content" style={{ backgroundColor: 'rgba(255, 68, 68, 0.1)', border: '2px solid #ff4444', padding: '20px' }}>
              <div className="role-title impostor">¡Eres el</div>
              <div className="word-display impostor">IMPOSTOR!</div>
              <p style={{ color: '#ff4444', marginTop: '10px' }}>
                Debes descubrir la palabra sin que te descubran
              </p>
            </div>
          ) : (
            <div className="modal-content" style={{ backgroundColor: 'rgba(0, 255, 0, 0.05)', border: '2px solid #00ff00', padding: '20px' }}>
              <div className="role-title word">Tu palabra es:</div>
              <div className="word-display word">{gameInfo.palabra_secreta}</div>
              <p style={{ color: '#00ff00', marginTop: '10px' }}>
                Haz preguntas para descubrir al impostor
              </p>
            </div>
          )}
        </div>
      )}

      {gameInfo.estado === 'finalizada' && (
        <div style={{ marginBottom: '20px' }}>
          <div className="modal-content" style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', border: '2px solid #d4af37', padding: '20px' }}>
            <div style={{ color: '#d4af37', fontSize: '1.3em', marginBottom: '15px', fontWeight: 'bold' }}>
              🏁 Partida Finalizada
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong style={{ color: '#b8b8b8' }}>Palabra secreta:</strong>{' '}
              <span style={{ color: '#d4af37', fontSize: '1.2em' }}>{gameInfo.palabra_secreta}</span>
            </div>
            <div>
              <strong style={{ color: '#b8b8b8' }}>Impostores:</strong>
              <ul style={{ marginTop: '10px', paddingLeft: '20px', color: '#ff4444' }}>
                {gameInfo.impostores?.map((impostor, idx) => (
                  <li key={idx}>{impostor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div style={{ color: '#ff4444', marginBottom: '15px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {isCreator && gameInfo.estado === 'abierta' && (
          <button 
            className="btn-start" 
            onClick={handleStartGame}
            disabled={actionLoading || gameInfo.jugadores.length < gameInfo.numero_impostores + 1}
          >
            {actionLoading ? 'Iniciando...' : '▶️ Iniciar Partida'}
          </button>
        )}
        
        {isCreator && gameInfo.estado === 'activa' && (
          <button 
            className="btn-start" 
            onClick={handleCloseGame}
            disabled={actionLoading}
          >
            {actionLoading ? 'Cerrando...' : '🏁 Finalizar Partida'}
          </button>
        )}

        <button className="btn-start" onClick={onBack} style={{ backgroundColor: '#555' }}>
          🚪 Salir
        </button>
      </div>

      {isCreator && gameInfo.estado === 'abierta' && gameInfo.jugadores.length < gameInfo.numero_impostores + 1 && (
        <p style={{ color: '#ff4444', marginTop: '15px', textAlign: 'center', fontSize: '0.9em' }}>
          Se necesitan al menos {gameInfo.numero_impostores + 1} jugadores para iniciar
        </p>
      )}
    </div>
  );
};

export default OnlineGameRoom;
