import { useState } from 'react'
import { analyzeConversation } from '../services/claude'

export default function Demo() {
  const [text, setText] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError(null)
    try {
      const analysis = await analyzeConversation(text)
      setResult(analysis)
    } catch (err) {
      setError('No se pudo analizar la conversación. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="demo" className="py-16 max-w-4xl mx-auto px-4 sm:px-6">
      <h2 className="text-center mb-3">
        Prueba la <span className="text-primary">demo</span>
      </h2>
      <p className="text-center text-gray-400 mb-8">Sin registro. Sin límites. Gratis, como todo en Autentia.</p>
      <div className="card">
        <label htmlFor="demo-text" className="sr-only">Conversación a analizar</label>
        <textarea
          id="demo-text"
          className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          rows="6"
          placeholder="Pega aquí una conversación (ej: 'Hola, ¿cómo estás? - Bien, ¿y tú?')"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAnalyze}
          disabled={loading || !text.trim()}
          className="mt-4 btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analizando...' : 'Analizar conversación'}
        </button>
        {error && <p className="mt-4 text-red-400 text-sm" role="alert">{error}</p>}
        {result && (
          <div className="mt-6 p-4 bg-dark/50 rounded-xl border border-white/5">
            <h3 className="font-bold text-primary mb-2">Análisis</h3>
            <p className="whitespace-pre-wrap text-gray-300">{result}</p>
          </div>
        )}
      </div>
    </section>
  )
}
