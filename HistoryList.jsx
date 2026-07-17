import { formatDate, truncate } from '../utils/helpers'

export default function HistoryList({ analyses, onSelect }) {
  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">Historial</h3>
      {analyses.length === 0 ? (
        <p className="text-gray-500 text-sm">
          Todavía no analizaste ninguna conversación. Empieza pegando una arriba, ¡es gratis e ilimitado!
        </p>
      ) : (
        <ul className="space-y-3 max-h-[500px] overflow-y-auto">
          {analyses.map((a) => (
            <li key={a.id}>
              <button
                onClick={() => onSelect(a)}
                className="w-full text-left p-3 rounded-xl bg-dark/50 border border-white/5 hover:border-primary/40 transition"
              >
                <p className="text-sm text-gray-300">{truncate(a.text, 70)}</p>
                {a.createdAt && (
                  <p className="text-xs text-gray-500 mt-1">{formatDate(a.createdAt)}</p>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
