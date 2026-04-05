import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MenuSanduiche } from './MenuSanduiche'
import '../styles/lux.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const headerRef = useRef<HTMLElement>(null)

  // Header permanentemente fixo por CSS no template abaixo.
  // Removido listener de scroll que alternava a classe 'fixed', causava saltos de layout.
  useEffect(() => {
    // Mantemos apenas lógicas de scroll se houver necessidade de mudar cor/sombra futuramente.
  }, [])

  const handleHomeClick = () => {
    // Se já estiver na home, forçamos um reload ou mudamos a key da rota para resetar a intro
    if (location.pathname === '/') {
      // Em vez de window.location.reload(), podemos navegar para / e a key da rota fará o resto no App.tsx
      // mas para garantir, forçamos a navegação
      navigate('/', { replace: true, state: { resetIntro: Date.now() } });
    } else {
      navigate('/')
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full flex items-center px-6 py-3 z-[1000] transition-shadow duration-200 default-layout"
    >
      <span
        className="lux font-medium text-2xl cursor-pointer inline-block tracking-tight text-[var(--text-primary)]"
        onClick={handleHomeClick}
        role="button"
        tabIndex={0}
        onKeyDown={e => { if (e.key === 'Enter') handleHomeClick() }}
      >
        AndreCodeDev
      </span>

      <MenuSanduiche navigate={navigate} location={location} />
    </header>
  )
}

export default Header
