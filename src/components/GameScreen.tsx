interface GameScreenProps {
  currentPlayer: number;
  playersRevealed: number;
  totalPlayers: number;
  onRevealRole: () => void;
}

const GameScreen = ({ currentPlayer, playersRevealed, totalPlayers, onRevealRole }: GameScreenProps) => {
  return (
    <div className="game-screen">
      <div className="player-info">
        <div className="player-number">Jugador {currentPlayer}</div>
        <div className="progress">
          {playersRevealed} de {totalPlayers} revelados
        </div>
      </div>
      <button onClick={onRevealRole}>Ver mi rol</button>
    </div>
  );
};

export default GameScreen;
