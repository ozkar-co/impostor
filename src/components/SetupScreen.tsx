import React, { useState } from 'react';

interface SetupScreenProps {
  onStartGame: (playerCount: number, customWord: string, impostorCount: number) => void;
}

const SetupScreen = ({ onStartGame }: SetupScreenProps) => {
  const [playerCount, setPlayerCount] = useState(3);
  const [impostorCount, setImpostorCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const customWord = (form.elements.namedItem('customWord') as HTMLInputElement).value.trim();
    onStartGame(playerCount, customWord, impostorCount);
  };

  return (
    <form className="setup-screen" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="playerCount">Número de jugadores:</label>
        <select 
          id="playerCount" 
          name="playerCount" 
          value={playerCount} 
          onChange={(e) => {
            const newPlayerCount = parseInt(e.target.value);
            setPlayerCount(newPlayerCount);
            // Adjust impostor count if it exceeds new player count
            if (impostorCount > newPlayerCount) {
              setImpostorCount(Math.min(6, newPlayerCount));
            }
          }}
        >
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
          <option value="13">13 jugadores</option>
          <option value="14">14 jugadores</option>
          <option value="15">15 jugadores</option>
          <option value="16">16 jugadores</option>
          <option value="17">17 jugadores</option>
          <option value="18">18 jugadores</option>
          <option value="19">19 jugadores</option>
          <option value="20">20 jugadores</option>
          <option value="21">21 jugadores</option>
          <option value="22">22 jugadores</option>
          <option value="23">23 jugadores</option>
          <option value="24">24 jugadores</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="impostorCount">Número de impostores:</label>
        <select 
          id="impostorCount" 
          name="impostorCount" 
          value={impostorCount} 
          onChange={(e) => setImpostorCount(parseInt(e.target.value))}
        >
          {[1, 2, 3, 4, 5, 6].filter(num => num <= playerCount).map(num => (
            <option key={num} value={num}>
              {num} impostor{num > 1 ? 'es' : ''}
            </option>
          ))}
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
