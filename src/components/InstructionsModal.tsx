import React from 'react';

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>Cómo Jugar - El Impostor</h2>
        
        <div className="instructions-content">
          <h3>Objetivo del Juego</h3>
          <p>
            Un jugador es elegido al azar como <strong>"El Impostor"</strong>. 
            Todos excepto el impostor conocen una palabra secreta. Los jugadores deben votar juntos 
            para expulsar al impostor antes de que termine el juego.
          </p>

          <h3>Cómo Funciona</h3>
          <ol style={{ marginLeft: '20px', marginBottom: '15px' }}>
            <li style={{ marginBottom: '10px' }}>
              <strong>Revelación de Rol:</strong> Cada jugador toca "Ver Mi Rol" para descubrir si es 
              el impostor o conocer la palabra secreta.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>Las Rondas (3 rondas):</strong> En cada ronda, los jugadores comparten palabras 
              o características asociadas a la palabra secreta. El impostor intenta diferenciar la palabra 
              sin revelar su ignorancia.
            </li>
            <li style={{ marginBottom: '10px' }}>
              <strong>La Votación:</strong> Después de 3 rondas, todos votan para decidir quién expulsar.
            </li>
          </ol>

          <h3>Condiciones de Victoria</h3>
          <ul>
            <li><strong>Ciudadanos Ganan:</strong> Si logran expulsar al impostor durante la votación.</li>
            <li><strong>Impostor Gana:</strong> Si los ciudadanos votan incorrectamente y expulsan a alguien que no es el impostor.</li>
          </ul>

          <h3>Ejemplo de Ronda</h3>
          <p style={{ fontSize: '0.9em', fontStyle: 'italic', marginBottom: '15px' }}>
            <strong>Palabra Secreta:</strong> "Pizza"
          </p>
          <div style={{ 
            background: 'rgba(0,0,0,0.3)', 
            padding: '15px', 
            marginBottom: '15px',
            borderLeft: '3px solid #d4af37'
          }}>
            <p style={{ marginBottom: '8px' }}>
              <strong>Jugador 1:</strong> "Comida italiana"
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Jugador 2 (Impostor):</strong> "Se come caliente" (respuesta vaga para ocultar ignorancia)
            </p>
            <p style={{ marginBottom: '8px' }}>
              <strong>Jugador 3:</strong> "Tiene queso y salsa"
            </p>
            <p>
              <strong>Resultado:</strong> El grupo nota respuestas sospechosas de Jugador 2 y lo expulsa. ¡Los ciudadanos ganan!
            </p>
          </div>

          <h3>Consejos Estratégicos</h3>
          <ul>
            <li><strong>Para los Ciudadanos:</strong> Escucha atentamente las descripciones. El impostor 
            puede cometer errores al describir la palabra.</li>
            <li><strong>Para el Impostor:</strong> Sé vago pero creíble. Pregunta a otros jugadores para 
            deducir la palabra sin revelar tu ignorancia.</li>
            <li><strong>General:</strong> ¡Es un juego social - actúa convincentemente!</li>
          </ul>
        </div>

        <button className="btn-close" onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
};

export default InstructionsModal;
