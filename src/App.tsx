import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Contact from './pages/Contact';
import LanguageSwitcher from './components/LanguageSwitcher'; 

function App() {
  return (
    <Router>
      {/* 
        Coloque os componentes permanentes AQUI, fora do <Routes>.
        Eles aparecerão em TODAS as páginas.
      */}
      <LanguageSwitcher />

      {/* 
        O <Routes> só vai cuidar de trocar o miolo da página.
      */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/education" element={<Education />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />

        {/* A rota "Não Encontrado" deve ser a ÚLTIMA */}
        <Route path="*" element={<div className="main-center"><h2>Página não encontrada</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;