import { useState } from 'react'

export default function AnalysisForm({ onAnalyze }) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!text.trim() || loading) return
    setLoading(true)
    try {
      await onAnalyze(text)
      setText('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-1">Analizar conversación</h3>
      <p className="text-sm text-gray-400 mb-4">Análisis ilimitados, sin coste.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="analysis-text" className="sr-only">Conversación a analizar</label>
        <textarea
          id="analysis-text"
          className="w-full bg-dark/50 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
          rows="6"
          placeholder="Pega la conversación completa..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading || !text.trim()}
          className="mt-4 btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Analizando...' : 'Analizar'}
        </button>
      </form>
    </div>
  )
}
