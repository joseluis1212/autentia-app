// Funciones utilitarias compartidas

// Formatea una fecha (Date o Timestamp de Firestore) a texto legible en español
export function formatDate(date) {
  if (!date) return ''
  const d = date?.toDate ? date.toDate() : new Date(date)
  return d.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Acorta un texto largo para mostrarlo como vista previa en listas
export function truncate(text, maxLength = 80) {
  if (!text) return ''
  return text.length > maxLength ? `${text.slice(0, maxLength).trim()}…` : text
}

// Validación simple de formato de correo
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
