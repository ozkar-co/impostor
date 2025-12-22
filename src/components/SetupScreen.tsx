import React from 'react';

interface SetupScreenProps {
  onStartGame: (playerCount: number, customWord: string) => void;
}

const SetupScreen = ({ onStartGame }: SetupScreenProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const playerCount = parseInt((form.elements.namedItem('playerCount') as HTMLSelectElement).value);
    const customWord = (form.elements.namedItem('customWord') as HTMLInputElement).value.trim();
    onStartGame(playerCount, customWord);
  };

  return (
    <form className="setup-screen" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="playerCount">Número de jugadores:</label>
        <select id="playerCount" name="playerCount">
          <option value="3">3 jugadores</option>
          <option value="4">4 jugadores</option>
          <option value="5">5 jugadores</option>
          <option value="6">6 jugadores</option>
          <option value="7">7 jugadores</option>
          <option value="8">8 jugadores</option>
          <option value="9">9 jugadores</option>
          <option value="10">10 jugadores</option>
          <option value="11">11 jugadores</option>
          <option value="12">12 jugadores</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="customWord">Palabra personalizada (opcional):</label>
        <input 
          type="text" 
          id="customWord" 
          name="customWord"
          placeholder="Deja en blanco para palabra aleatoria" 
        />
      </div>
      <button type="submit" className="btn-start">Comenzar Juego</button>
    </form>
  );
};

export default SetupScreen;
