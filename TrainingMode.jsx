import { useState } from 'react'
import { trainingReply } from '../services/claude'

const ESCENARIOS = [
  'Primera cita en una cafetería',
  'Reconectar con alguien después de un silencio incómodo',
  'Proponer un segundo encuentro con seguridad',
]

export default function TrainingMode() {
  const [scenario, setScenario] = useState(ESCENARIOS[0])
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input.trim() }
    const newHistory = [...messages, userMessage]
    setMessages(newHistory)
    setInput('')
    setLoading(true)
    setError(null)

    try {
      const reply = await trainingReply(newHistory, scenario)
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch (err) {
      setError('No se pudo generar una respuesta. Intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const resetChat = (newScenario) => {
    setScenario(newScenario)
    setMessages([])
    setError(null)
  }

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-1">Modo Entrenamiento</h3>
      <p className="text-sm text-gray-400 mb-4">
        Practica conversaciones con un simulador de IA. Ilimitado y gratis.
      </p>

      <label htmlFor="scenario-select" className="text-sm text-gray-400 mb-2 block">
        Escenario
      </label>
      <select
        id="scenario-select"
        value={scenario}
        onChange={(e) => resetChat(e.target.value)}
        className="w-full bg-dark/50 border border-white/10 rounded-xl p-3 text-white mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {ESCENARIOS.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <div className="bg-dark/50 rounded-xl border border-white/5 p-4 h-64 overflow-y-auto flex flex-col gap-3 mb-4">
        {messages.length === 0 && (
          <p className="text-gray-500 text-sm m-auto">Escribe el primer mensaje para empezar a practicar.</p>
        )}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              m.role === 'user'
                ? 'bg-primary/20 text-white self-end rounded-br-sm'
                : 'bg-secondary/20 text-gray-100 self-start rounded-bl-sm'
            }`}
          >
            {m.content}
          </div>
        ))}
      </div>

      {error && <p className="text-red-400 text-sm mb-3" role="alert">{error}</p>}

      <form onSubmit={handleSend} className="flex gap-2">
        <label htmlFor="training-input" className="sr-only">Tu mensaje</label>
        <input
          id="training-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          className="flex-grow bg-dark/50 border border-white/10 rounded-xl p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="btn-primary py-2 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Enviar'}
        </button>
      </form>
    </div>
  )
}
