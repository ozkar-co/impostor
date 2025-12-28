import { useState } from 'react';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import RoleModal from './RoleModal';
import GameOver from './GameOver';
import InstructionsModal from './InstructionsModal';
import ModeSelection from './online/ModeSelection';
import OnlineGame from './online/OnlineGame';
import { words } from '../data/words';

type GameState = 'mode-selection' | 'setup' | 'playing' | 'finished' | 'online';

const ImpostorGame = () => {
  const [gameState, setGameState] = useState<GameState>('mode-selection');
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [impostorIndices, setImpostorIndices] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStartGame = (playerCount: number, customWord: string, impostorCount: number) => {
    setTotalPlayers(playerCount);
    setCurrentPlayerIndex(0);
    
    const word = customWord || words[Math.floor(Math.random() * words.length)];
    setSelectedWord(word);
    
    // Select multiple random impostors
    const indices: number[] = [];
    const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
    
    for (let i = 0; i < impostorCount; i++) {
      const randomIdx = Math.floor(Math.random() * availableIndices.length);
      indices.push(availableIndices[randomIdx]);
      availableIndices.splice(randomIdx, 1);
    }
    
    setImpostorIndices(indices);
    
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
    setGameState('mode-selection');
    setCurrentPlayerIndex(0);
    setSelectedWord('');
    setImpostorIndices([]);
    setShowModal(false);
    setShowInstructions(false);
  };

  const handleSelectLocal = () => {
    setGameState('setup');
  };

  const handleSelectOnline = () => {
    setGameState('online');
  };

  const handleBackToModeSelection = () => {
    setGameState('mode-selection');
  };

  const isCurrentPlayerImpostor = impostorIndices.includes(currentPlayerIndex);

  return (
    <div className="container">
      <h1>El Impostor</h1>
      {gameState !== 'mode-selection' && gameState !== 'online' && (
        <button className="btn-instructions" onClick={() => setShowInstructions(true)}>
          Instrucciones
        </button>
      )}
      
      {gameState === 'mode-selection' && (
        <ModeSelection
          onSelectLocal={handleSelectLocal}
          onSelectOnline={handleSelectOnline}
        />
      )}

      {gameState === 'online' && (
        <OnlineGame onBack={handleBackToModeSelection} />
      )}
      
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
      
      <InstructionsModal
        isOpen={showInstructions}
        onClose={() => setShowInstructions(false)}
      />
    </div>
  );
};

export default ImpostorGame;
