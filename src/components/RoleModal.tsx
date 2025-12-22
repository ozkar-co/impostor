interface RoleModalProps {
  isOpen: boolean;
  isImpostor: boolean;
  word: string;
  onClose: () => void;
}

const RoleModal = ({ isOpen, isImpostor, word, onClose }: RoleModalProps) => {
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
        <p style={{ color: '#888', marginTop: '20px' }}>Memoriza tu rol y cierra esta ventana</p>
        <button className="close-btn" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default RoleModal;
