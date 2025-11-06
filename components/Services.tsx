'use client'

import { useState, useEffect } from 'react'

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerView, setItemsPerView] = useState(1)

  const services = [
    {
      icon: '🏕️',
      title: 'Dormis',
      description: 'Alquiler de bungalows cómodos para tu estadía',
    },
    {
      icon: '🔥',
      title: 'Asadores',
      description: 'Asadores disponibles para tus asados',
    },
    {
      icon: '🍽️',
      title: 'Comedor',
      description: 'Comedor cómodo para disfrutar tus comidas',
    },
    {
      icon: '🚣',
      title: 'Botes',
      description: 'Alquiler de botes con motor, sin motor y tracker con guía',
    },
    {
      icon: '🏊',
      title: 'Pileta',
      description: 'Pileta para refrescarte en los días calurosos',
    },
    {
      icon: '🌳',
      title: 'Arboleda',
      description: 'Enorme arboleda para disfrutar la sombra natural',
    },
    {
      icon: '🧹',
      title: 'Limpieza',
      description: 'Áreas mantenidas y limpias constantemente',
    },
    {
      icon: '🔒',
      title: 'Seguridad',
      description: 'Seguridad garantizada para tu tranquilidad',
    },
  ]

  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(4)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    updateItemsPerView()
    window.addEventListener('resize', updateItemsPerView)
    return () => window.removeEventListener('resize', updateItemsPerView)
  }, [])

  const totalSlides = Math.ceil(services.length / itemsPerView)

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  // Auto-play solo en móvil
  useEffect(() => {
    if (itemsPerView > 1) return // Solo auto-play en móvil (1 item por vista)

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }, 4000) // Cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [totalSlides, itemsPerView])

  return (
    <section id="servicios" className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <div className="w-24 h-1 bg-nature-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Todo lo que necesitás para disfrutar de una experiencia inolvidable
          </p>
        </div>

        {/* Desktop/Tablet: Grid normal */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="text-5xl mb-4 text-center">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile: Carrusel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * 100}%)`,
              }}
            >
              {services.map((service, index) => (
                <div
                  key={index}
                  className="min-w-full px-2"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mx-auto max-w-sm">
                    <div className="text-5xl mb-4 text-center">{service.icon}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-center">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Botones de navegación */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300"
                aria-label="Servicio anterior"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={goToNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 transition-all duration-300"
                aria-label="Servicio siguiente"
              >
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Indicadores */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-nature-500 w-8'
                      : 'bg-gray-300 w-2 hover:bg-gray-400'
                  }`}
                  aria-label={`Ir a slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

