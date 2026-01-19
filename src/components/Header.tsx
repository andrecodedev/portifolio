
import { useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MenuSanduiche } from './MenuSanduiche'
import '../styles/lux.css'


const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const header = headerRef.current
      if (!header) return
      if (window.scrollY > 10) {
        header.classList.add('sticky')
      } else {
        header.classList.remove('sticky')
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      ref={headerRef}
      className={`header-top ${isHome ? 'home-layout' : 'default-layout'}`}
    >
      {!isHome && (
        <span
          className="lux font-medium text-2xl cursor-pointer inline-block"
          onClick={() => navigate('/')}
          role="button"
          tabIndex={0}
          onKeyDown={e => { if (e.key === 'Enter') navigate('/') }}
        >
          AndreCodeDev
        </span>
      )}

      <MenuSanduiche navigate={navigate} location={location} />
    </header>
  )
}

export default Header
