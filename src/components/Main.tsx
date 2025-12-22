import '../App.css';
import logo from '../assets/logo.png';

const Main = () => {
  return (
    <div className="app-container">
      <div className="content">
        <a 
          href="https://forjadecodigo.com" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src={logo} 
            alt="Logo" 
            className="logo" 
          />
        </a>
        <h1 className="title">PLANTILLA BASE</h1>
        <p className="subtitle">
          En Forja de Código estamos construyendo tu sitio
        </p>
      </div>
    </div>
  );
};

export default Main;
