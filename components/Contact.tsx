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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Mapa de Google Maps */}
          <div className="order-2 md:order-1">
            <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-gray-200">
              <iframe
                src={mapsEmbedUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
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

          {/* Información de ubicación */}
          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 flex items-center">
                <svg className="w-6 h-6 text-nature-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cómo Llegar
              </h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-600 mb-2 font-medium">Dirección</p>
                  <p className="text-xl text-gray-900 font-semibold">
                    Ruta 55, Kilómetro 27
                  </p>
                  <p className="text-lg text-gray-700">
                    A orillas del Lago San Roque
                  </p>
                  <p className="text-lg text-gray-700">
                    Provincia de Córdoba, Argentina
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-300">
                  <p className="text-gray-600 mb-3 font-medium">Instrucciones</p>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-nature-500 mr-2">•</span>
                      <span>Desde Córdoba Capital, tomar Ruta 55 hacia el norte</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-nature-500 mr-2">•</span>
                      <span>Recorrer aproximadamente 27 kilómetros</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-nature-500 mr-2">•</span>
                      <span>El camping se encuentra a la derecha, frente al lago</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white p-4 rounded-lg border-l-4 border-nature-500">
                  <p className="text-gray-800 font-medium mb-1">
                    ¿Necesitás ayuda?
                  </p>
                  <p className="text-gray-600 text-sm">
                    Contactá con <strong>Sr. Mauro</strong> para más información sobre cómo llegar
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

