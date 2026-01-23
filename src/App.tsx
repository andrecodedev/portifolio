import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Contact from './pages/Contact';
import LanguageSwitcher from './components/LanguageSwitcher';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation';

function App() {
  return (
    <Router>
      {/* Componentes globais */}
      <ScrollToTopOnNavigation />
      <LanguageSwitcher />
      <ScrollToTopButton />
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