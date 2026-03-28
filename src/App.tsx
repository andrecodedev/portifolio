import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Home from './pages/Home';
import About from './pages/About';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Contact from './pages/Contact';
import LanguageSwitcher from './components/LanguageSwitcher';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ReadingProgress from './components/ui/ReadingProgress';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pequeno delay para garantir que os assets base carreguem e mostrar a animação premium
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <Router>
      <ReadingProgress />
      <CustomCursor />
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
        <Route path="*" element={<div className="main-center"><h2>Página não encontrada</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;