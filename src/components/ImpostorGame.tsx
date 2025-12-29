import { useState } from 'react';
import SetupScreen from './SetupScreen';
import GameScreen from './GameScreen';
import RoleModal from './RoleModal';
import GameOver from './GameOver';
import InstructionsModal from './InstructionsModal';
import ModeSelection from './online/ModeSelection';
import OnlineGame from './online/OnlineGame';
import { words } from '../data/words';
import { clues } from '../data/clues';

type GameState = 'mode-selection' | 'setup' | 'playing' | 'finished' | 'online';

const ImpostorGame = () => {
  const [gameState, setGameState] = useState<GameState>('mode-selection');
  const [totalPlayers, setTotalPlayers] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [selectedWord, setSelectedWord] = useState('');
  const [impostorIndices, setImpostorIndices] = useState<number[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [impostorClues, setImpostorClues] = useState<Record<number, string>>({});

  const handleStartGame = (playerCount: number, customWord: string, impostorCount: number, cluesEnabled: boolean) => {
    setTotalPlayers(playerCount);
    setCurrentPlayerIndex(0);
    
    const word = customWord || words[Math.floor(Math.random() * words.length)];
    setSelectedWord(word);
    
    // Select multiple random impostors
    // Ensure impostorCount doesn't exceed playerCount
    const validImpostorCount = Math.min(impostorCount, playerCount);
    const indices: number[] = [];
    const availableIndices = Array.from({ length: playerCount }, (_, i) => i);
    
    for (let i = 0; i < validImpostorCount; i++) {
      const randomIdx = Math.floor(Math.random() * availableIndices.length);
      indices.push(availableIndices[randomIdx]);
      availableIndices.splice(randomIdx, 1);
    }
    
    setImpostorIndices(indices);
    
    // Assign clues to impostors if enabled
    if (cluesEnabled) {
      const cluesMap: Record<number, string> = {};
      const wordClues = clues[word];
      
      if (wordClues && wordClues.length > 0) {
        // If we have clues for the word, assign different ones to each impostor
        indices.forEach((impostorIdx, i) => {
          const clueIndex = i % wordClues.length;
          cluesMap[impostorIdx] = wordClues[clueIndex];
        });
      } else {
        // Generate fallback clues when no clues exist for the word
        indices.forEach((impostorIdx) => {
          const fallbackClues = [
            `Empieza por "${word.charAt(0)}"`,
            `Tiene ${word.length} letras`
          ];
          const randomFallback = fallbackClues[Math.floor(Math.random() * fallbackClues.length)];
          cluesMap[impostorIdx] = randomFallback;
        });
      }
      
      setImpostorClues(cluesMap);
    } else {
      setImpostorClues({});
    }
    
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
    setImpostorClues({});
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
  const currentPlayerClue = isCurrentPlayerImpostor ? impostorClues[currentPlayerIndex] : undefined;

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
        clue={currentPlayerClue}
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
