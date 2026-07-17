import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className="bg-dark/90 backdrop-blur-md border-b border-white/5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-primary" aria-label="Autentia, inicio">
          Autentia<span className="text-white">.</span>
        </Link>
        <nav className="flex items-center gap-4" aria-label="Navegación principal">
          {user ? (
            <>
              <Link to="/dashboard" className="text-sm hover:text-primary transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm text-gray-400 hover:text-white transition"
                aria-label="Cerrar sesión"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-primary transition">
                Iniciar sesión
              </Link>
              <Link to="/register" className="btn-primary text-sm py-2 px-5">
                Registrarme gratis
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
