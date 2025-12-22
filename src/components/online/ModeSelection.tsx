interface ModeSelectionProps {
  onSelectLocal: () => void;
  onSelectOnline: () => void;
}

const ModeSelection = ({ onSelectLocal, onSelectOnline }: ModeSelectionProps) => {
  return (
    <div className="setup-screen">
      <h2 style={{ color: '#d4af37', marginBottom: '30px', textAlign: 'center' }}>Selecciona el Modo de Juego</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <button className="btn-start" onClick={onSelectLocal}>
          🎮 Modo Local
          <div style={{ fontSize: '0.8em', marginTop: '5px', opacity: 0.8 }}>
            Jugar en persona pasando el dispositivo
          </div>
        </button>
        <button className="btn-start" onClick={onSelectOnline}>
          🌐 Modo Online
          <div style={{ fontSize: '0.8em', marginTop: '5px', opacity: 0.8 }}>
            Jugar a distancia con código de partida
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModeSelection;
