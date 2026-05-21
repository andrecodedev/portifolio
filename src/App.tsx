import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import Home from './pages/Home';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Project from './pages/Project';
import Contact from './pages/Contact';
import Library from './pages/Library';
import LanguageSwitcher from './components/LanguageSwitcher';
import ScrollToTopButton from './components/ScrollToTopButton';
import ScrollToTopOnNavigation from './components/ScrollToTopOnNavigation';
import LoadingScreen from './components/ui/LoadingScreen';
import CustomCursor from './components/ui/CustomCursor';
import ReadingProgress from './components/ui/ReadingProgress';
import GlobalCodeRain from './components/ui/GlobalCodeRain';
import Lenis from 'lenis';

// Componente Wrapper para gerenciar a key da rota e forçar re-render se necessário
function AppRoutes() {
  const location = useLocation();

  // Usamos a location.state ou timestamp para forçar o reset da intro se o usuário clicar na logo home
  // a key da rota '/' vai depender de um segredo vindo do state se desejado.
  const homeKey = useMemo(() => {
    return location.pathname === '/' ? (location.state?.resetIntro || 'main-home') : 'other';
  }, [location.pathname, location.state]);

  return (
    <Routes>
      {/* Home com Intro (Estado Inicial) */}
      <Route path="/" element={<Home key={homeKey} />} />

      {/* Sobre (Home sem Intro) */}
      <Route path="/about" element={<Home skipIntro={true} />} />

      <Route path="/education" element={<Education />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/project" element={<Project />} />
      <Route path="/library" element={<Library />} />
      <Route path="/contact" element={<Contact />} />
      {/* News page removed */}
      <Route path="*" element={<div className="main-center"><h2>Página não encontrada</h2></div>} />
    </Routes>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pequeno delay para garantir que os assets base carreguem e mostrar a animação premium
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Initialize Lenis apenas após o loading, garantindo que o DOM está pronto
  useEffect(() => {
    if (loading) return;

    console.log('%c[Lenis] Ultra Smooth (Low Gravity) Ativado! 🪐', 'color: #00ffff; font-weight: bold; font-size: 14px;');

    const lenis = new Lenis({
      lerp: 0.03, // Extremamente suave, sensação de "baixa gravidade"
      duration: 2.5,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5, // Mais força no giro para ver o deslize longo
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Debug opcional para confirmar rastreamento no console do usuário
    lenis.on('scroll', () => {
      // scroll is working
    });

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <>
      <GlobalCodeRain />
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <ReadingProgress />
          <CustomCursor />
          <ScrollToTopOnNavigation />
          <LanguageSwitcher />
          <ScrollToTopButton />
          <AppRoutes />
        </Router>
      )}
    </>
  );
}

export default App;