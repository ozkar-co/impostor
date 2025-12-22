import { getUsername, logout } from '../../services/api';

interface OnlineLobbyProps {
  onCreateGame: () => void;
  onJoinGame: () => void;
  onMyGames: () => void;
  onProposeWords: () => void;
  onBack: () => void;
}

const OnlineLobby = ({ onCreateGame, onJoinGame, onMyGames, onProposeWords, onBack }: OnlineLobbyProps) => {
  const username = getUsername();

  const handleLogout = () => {
    logout();
    onBack();
  };

  return (
    <div className="setup-screen">
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37', marginBottom: '10px' }}>Bienvenido, {username}</h2>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <button className="btn-start" onClick={onCreateGame}>
          ➕ Crear Nueva Partida
        </button>
        <button className="btn-start" onClick={onJoinGame}>
          🚪 Unirse a Partida
        </button>
        <button className="btn-start" onClick={onMyGames}>
          📋 Mis Partidas
        </button>
        <button className="btn-start" onClick={onProposeWords}>
          💭 Proponer Palabras
        </button>
        <button className="btn-start" onClick={handleLogout} style={{ backgroundColor: '#555' }}>
          🚪 Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default OnlineLobby;
