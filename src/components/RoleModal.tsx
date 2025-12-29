interface RoleModalProps {
  isOpen: boolean;
  isImpostor: boolean;
  word: string;
  clue?: string;
  onClose: () => void;
}

const RoleModal = ({ isOpen, isImpostor, word, clue, onClose }: RoleModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal active">
      <div className="modal-content">
        <div className={`role-title ${isImpostor ? 'impostor' : 'word'}`}>
          {isImpostor ? '¡Eres el' : 'Tu palabra es:'}
        </div>
        <div className={`word-display ${isImpostor ? 'impostor' : 'word'}`}>
          {isImpostor ? 'IMPOSTOR!' : word}
        </div>
        {isImpostor && clue && (
          <div style={{ 
            marginTop: '20px', 
            padding: '15px', 
            backgroundColor: 'rgba(255, 215, 0, 0.1)', 
            borderRadius: '8px',
            border: '2px solid rgba(255, 215, 0, 0.3)'
          }}>
            <p style={{ color: '#d4af37', fontWeight: 'bold', marginBottom: '8px' }}>💡 Pista:</p>
            <p style={{ color: '#fff', fontSize: '1.1em' }}>{clue}</p>
          </div>
        )}
        <p style={{ color: '#888', marginTop: '20px' }}>Memoriza tu rol y cierra esta ventana</p>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RoleModal;
