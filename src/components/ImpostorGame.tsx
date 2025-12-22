import { useState } from 'react';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import RoleModal from './RoleModal';
import GameOver from './GameOver';
import { words } from '../data/words';

type GameState = 'setup' | 'playing' | 'finished';

const ImpostorGame = () => {
  const [gameState, setGameState] = useState<GameState>('setup');
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [impostorIndex, setImpostorIndex] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const handleStartGame = (playerCount: number, customWord: string) => {
    setTotalPlayers(playerCount);
    setCurrentPlayerIndex(0);
    
    const word = customWord || words[Math.floor(Math.random() * words.length)];
    setSelectedWord(word);
    
    const impostor = Math.floor(Math.random() * playerCount);
    setImpostorIndex(impostor);
    
    setGameState('playing');
  };

  const handleRevealRole = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    
    if (currentPlayerIndex + 1 >= totalPlayers) {
      setGameState('finished');
    } else {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    }
  };

  const handleReset = () => {
    setGameState('setup');
    setCurrentPlayerIndex(0);
    setSelectedWord('');
    setImpostorIndex(-1);
    setShowModal(false);
  };

  const isCurrentPlayerImpostor = currentPlayerIndex === impostorIndex;

  return (
    <div className="container">
      <h1>🎭 El Impostor</h1>
      
      {gameState === 'setup' && (
        <SetupScreen onStartGame={handleStartGame} />
      )}
      
      {gameState === 'playing' && (
        <GameScreen
          currentPlayer={currentPlayerIndex + 1}
          playersRevealed={currentPlayerIndex}
          totalPlayers={totalPlayers}
          onRevealRole={handleRevealRole}
        />
      )}
      
      {gameState === 'finished' && (
        <GameOver onReset={handleReset} />
      )}
      
      <RoleModal
        isOpen={showModal}
        isImpostor={isCurrentPlayerImpostor}
        word={selectedWord}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ImpostorGame;
