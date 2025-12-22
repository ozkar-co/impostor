interface GameOverProps {
  onReset: () => void;
}

const GameOver = ({ onReset }: GameOverProps) => {
  return (
    <div className="game-over">
      <h2>¡Juego terminado!</h2>
      <p>Todos los jugadores han visto sus roles. ¡Que comience la discusión!</p>
      <button className="reset-btn" onClick={onReset}>Nuevo Juego</button>
    </div>
  );
};

export default GameOver;
