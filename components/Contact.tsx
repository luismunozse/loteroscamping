export default function Contact() {
  // Coordenadas exactas del Camping Lotero
  const lat = -31.357561045793954
  const lon = -64.45936301833817
  
  // URL del mapa embebido con las coordenadas exactas (sin API key requerida)
  const mapsEmbedUrl = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=15&output=embed`
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`

  return (
    <section id="ubicacion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Ubicación
          </h2>
          <div className="w-24 h-1 bg-nature-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encontrános en un lugar privilegiado a orillas del Lago San Roque
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Mapa de Google Maps */}
          <div className="rounded-xl overflow-hidden shadow-2xl border-2 sm:border-4 border-gray-200">
            <iframe
              src={mapsEmbedUrl}
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full sm:h-[500px] md:h-[600px] lg:h-[650px]"
            ></iframe>
          </div>
          <div className="mt-4 text-center">
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-nature-600 hover:text-nature-700 font-semibold transition-colors duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Abrir en Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

