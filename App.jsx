import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AuthProvider } from './context/AuthContext'
import { AnalysisProvider } from './context/AnalysisContext'
import PrivateRoute from './components/PrivateRoute'
import Header from './components/Header'
import Footer from './components/Footer'

// Lazy-loading de rutas para optimizar el rendimiento
const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))

function PageLoader() {
  return (
    <div className="flex items-center justify-center py-32" role="status" aria-label="Cargando">
      <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
    </div>
  )
}

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <AnalysisProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  <Route path="/privacidad" element={<Privacy />} />
                  <Route path="/terminos" element={<Terms />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </AnalysisProvider>
      </AuthProvider>
    </HelmetProvider>
  )
}

export default App
