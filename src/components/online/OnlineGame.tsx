import { useState } from 'react';
import { isAuthenticated } from '../../services/api';
import LoginScreen from './LoginScreen';
import OnlineLobby from './OnlineLobby';
import CreateGameScreen from './CreateGameScreen';
import JoinGameScreen from './JoinGameScreen';
import OnlineGameRoom from './OnlineGameRoom';
import MyGamesScreen from './MyGamesScreen';
import ProposeWordsScreen from './ProposeWordsScreen';

type OnlineScreen = 
  | 'login'
  | 'lobby'
  | 'create-game'
  | 'join-game'
  | 'game-room'
  | 'my-games'
  | 'propose-words';

interface OnlineGameProps {
  onBack: () => void;
}

const OnlineGame = ({ onBack }: OnlineGameProps) => {
  const [screen, setScreen] = useState<OnlineScreen>(isAuthenticated() ? 'lobby' : 'login');
  const [currentGameId, setCurrentGameId] = useState<string>('');

  const handleLoginSuccess = () => {
    setScreen('lobby');
  };

  const handleCreateGame = () => {
    setScreen('create-game');
  };

  const handleJoinGame = () => {
    setScreen('join-game');
  };

  const handleMyGames = () => {
    setScreen('my-games');
  };

  const handleProposeWords = () => {
    setScreen('propose-words');
  };

  const handleGameCreated = (gameId: string) => {
    setCurrentGameId(gameId);
    setScreen('game-room');
  };

  const handleGameJoined = (gameId: string) => {
    setCurrentGameId(gameId);
    setScreen('game-room');
  };

  const handleGameSelect = (gameId: string) => {
    setCurrentGameId(gameId);
    setScreen('game-room');
  };

  const handleBackToLobby = () => {
    setCurrentGameId('');
    setScreen('lobby');
  };

  const handleBackToModeSelection = () => {
    setCurrentGameId('');
    onBack();
  };

  return (
    <>
      {screen === 'login' && (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      )}
      
      {screen === 'lobby' && (
        <OnlineLobby
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
          onMyGames={handleMyGames}
          onProposeWords={handleProposeWords}
          onBack={handleBackToModeSelection}
        />
      )}
      
      {screen === 'create-game' && (
        <CreateGameScreen
          onGameCreated={handleGameCreated}
          onBack={handleBackToLobby}
        />
      )}
      
      {screen === 'join-game' && (
        <JoinGameScreen
          onGameJoined={handleGameJoined}
          onBack={handleBackToLobby}
        />
      )}
      
      {screen === 'game-room' && currentGameId && (
        <OnlineGameRoom
          gameId={currentGameId}
          onBack={handleBackToLobby}
        />
      )}
      
      {screen === 'my-games' && (
        <MyGamesScreen
          onGameSelect={handleGameSelect}
          onBack={handleBackToLobby}
        />
      )}
      
      {screen === 'propose-words' && (
        <ProposeWordsScreen
          onBack={handleBackToLobby}
        />
      )}
    </>
  );
};

export default OnlineGame;
