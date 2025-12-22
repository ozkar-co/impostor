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
            Los otros jugadores deben adivinarlo mientras él intenta ocultarse entre el grupo.
          </p>

          <h3>Reglas Básicas</h3>
          <ul>
            <li><strong>La Palabra:</strong> Se selecciona una palabra al azar (o personalizada) que conocen todos excepto el impostor.</li>
            <li><strong>Ronda de Preguntas:</strong> Los jugadores hacen preguntas sobre la palabra para identificar pistas.</li>
            <li><strong>Votación:</strong> Después de las preguntas, votan juntos para decidir quién es el impostor.</li>
          </ul>

          <h3>Turnos en la App</h3>
          <ul>
            <li>Cada jugador toca el botón "Ver Mi Rol" en su turno.</li>
            <li>La aplicación mostrará si es el impostor o la palabra que debe conocer.</li>
            <li>Después de que todos los jugadores hayan visto su rol, pasarán a la pantalla de finalización.</li>
          </ul>

          <h3>Cómo Ganar</h3>
          <ul>
            <li><strong>Ciudadanos ganan:</strong> Si logran identificar al impostor correctamente.</li>
            <li><strong>Impostor gana:</strong> Si consigue que voten a un ciudadano normal o si todos lo creen cuando miente.</li>
          </ul>

          <h3>Consejos Útiles</h3>
          <ul>
            <li>El impostor debe hacer preguntas que parezcan genuinas pero que no revelen su identidad.</li>
            <li>Los ciudadanos deben hacer preguntas inteligentes para detectar mentiras.</li>
            <li>¡Es un juego social - actúa de forma convincente!</li>
          </ul>

          <h3>Ejemplo de Juego</h3>
          <p>
            <strong>Palabra seleccionada:</strong> "Pizza"<br/>
            <strong>Impostor:</strong> Jugador 3<br/>
            Jugador 1: "¿Es algo que comes?"<br/>
            Jugador 3 (Impostor): "Sí, claro" (sin saber qué es)<br/>
            Jugador 2: "¿Tiene ingredientes de origen animal?"<br/>
            Jugador 3: "A veces" (respuesta vaga para no revelar que no sabe)<br/>
            ¡El grupo debe descubrir al impostor antes de que termine la ronda!
          </p>
        </div>

        <button className="btn-close" onClick={onClose}>Entendido</button>
      </div>
    </div>
  );
};

export default InstructionsModal;
