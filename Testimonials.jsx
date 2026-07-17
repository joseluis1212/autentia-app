const testimonials = [
  { name: 'Carlos, 28', text: 'Autentia me ayudó a entender por qué mis mensajes no funcionaban. Ahora tengo citas cada semana.' },
  { name: 'María, 24', text: 'Nunca pensé que la IA pudiera enseñarme a ser más auténtica. Ha cambiado mi forma de comunicarme.' },
  { name: 'Javier, 31', text: 'Lo mejor es que no da frases hechas, te enseña a ser tú mismo. Y encima es gratis.' },
]

export default function Testimonials() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
      <h2 className="text-center mb-12">
        Lo que dicen nuestros <span className="text-primary">usuarios</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div key={t.name} className="card">
            <p className="text-gray-300 italic">"{t.text}"</p>
            <p className="mt-4 font-semibold text-primary">— {t.name}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
