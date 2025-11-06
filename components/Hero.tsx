'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  // Array de imágenes - puedes agregar más imágenes aquí
  const images = [
    '/images/background.jpg',
    // Agrega más imágenes aquí cuando las tengas:
    // '/images/slide-2.jpg',
    // '/images/slide-3.jpg',
    // '/images/slide-4.jpg',
  ]

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Auto-play del slider
  useEffect(() => {
    if (images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length)
    }, 5000) // Cambia cada 5 segundos

    return () => clearInterval(interval)
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Slider de imágenes de fondo */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-800/50 to-blue-900/60 z-10" />
        
        {/* Slides */}
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${image})`,
            }}
          />
        ))}
      </div>

      {/* Contenido */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Camping Lotero
        </h1>
        <p className="text-xl md:text-2xl text-white mb-4 drop-shadow-md">
          Tu refugio perfecto junto al Lago San Roque
        </p>
        <p className="text-lg md:text-xl text-blue-100 mb-8 drop-shadow-md max-w-2xl mx-auto">
          Disfrutá de la naturaleza en un ambiente familiar, tranquilo y seguro. 
          Experiencias inolvidables esperan por vos.
        </p>
        <p className="text-base md:text-lg text-blue-200 mb-8 drop-shadow-sm">
          Ruta 55, Kilómetro 27 - Córdoba, Argentina
        </p>
        <a
          href="#reservar-bote"
          className="inline-block bg-nature-500 hover:bg-nature-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Alquilar Bote
        </a>
      </div>

      {/* Controles del slider - solo se muestran si hay más de una imagen */}
      {images.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-6 h-6"
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

          {/* Botón siguiente */}
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Imagen siguiente"
          >
            <svg
              className="w-6 h-6"
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

          {/* Indicadores de slides */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

