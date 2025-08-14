import { useNavigate, useLocation } from 'react-router-dom'
import { MenuSanduiche } from './MenuSanduiche'
import '../styles/lux.css'

const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className={`header-top ${isHome ? 'home-layout' : 'default-layout'}`}>
      {!isHome && (
        <span
          className="lux font-medium text-[1.4rem] cursor-pointer inline-block"
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
