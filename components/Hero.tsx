'use client'

import { useState, useEffect, useRef } from 'react'
import DatePicker from './DatePicker'

export default function Hero() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchType, setSearchType] = useState<'bote' | 'dormi'>('dormi')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [duration, setDuration] = useState('')
  const [guests, setGuests] = useState('1')
  const [boteType, setBoteType] = useState('')
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [activeDateField, setActiveDateField] = useState<'checkin' | 'checkout' | 'fecha' | null>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)

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

  const handleSearch = () => {
    // Construir la URL con los parámetros de búsqueda
    const params = new URLSearchParams()
    params.set('tipo', searchType)
    if (searchType === 'dormi') {
      if (checkIn) params.set('checkin', checkIn)
      if (checkOut) params.set('checkout', checkOut)
    } else {
      if (checkIn) params.set('fecha', checkIn)
      if (duration) params.set('duracion', duration)
      if (boteType) params.set('tipoBote', boteType)
    }
    if (guests) params.set('personas', guests)
    
    // Redirigir a la sección de reservas con parámetros
    window.location.href = `#reservar-bote?${params.toString()}`
  }

  const minDate = new Date().toISOString().split('T')[0]
  const getMinCheckout = () => {
    if (!checkIn) return minDate
    const date = new Date(checkIn)
    date.setDate(date.getDate() + 1)
    return date.toISOString().split('T')[0]
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return ''
    const date = new Date(dateString + 'T00:00:00')
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`
  }

  const getPlaceholder = (type: 'checkin' | 'checkout' | 'fecha') => {
    if (type === 'checkin') return 'Agregar fecha'
    if (type === 'checkout') return 'Agregar fecha'
    return 'Seleccionar fecha'
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setShowDatePicker(false)
        setActiveDateField(null)
      }
    }

    if (showDatePicker) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDatePicker])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
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
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg leading-tight">
            Camping Lotero
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white mb-3 sm:mb-4 drop-shadow-md px-2">
            Tu refugio perfecto junto al Lago San Roque
          </p>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-100 mb-4 sm:mb-6 drop-shadow-md max-w-2xl mx-auto px-2">
            Disfrutá de la naturaleza en un ambiente familiar, tranquilo y seguro. 
            Experiencias inolvidables esperan por vos.
          </p>
        </div>

        {/* Buscador de Reservas - Estilo Booking/Airbnb */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Tabs para tipo de servicio */}
            <div className="flex border-b border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setSearchType('dormi')
                  setBoteType('')
                  setDuration('')
                }}
                className={`flex-1 px-6 py-4 font-semibold text-sm sm:text-base transition-all relative ${
                  searchType === 'dormi'
                    ? 'text-nature-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">🏠</span>
                Dormis (Bungalows)
                {searchType === 'dormi' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nature-500"></div>
                )}
              </button>
              <button
                onClick={() => {
                  setSearchType('bote')
                  setCheckOut('')
                }}
                className={`flex-1 px-6 py-4 font-semibold text-sm sm:text-base transition-all relative ${
                  searchType === 'bote'
                    ? 'text-nature-600 bg-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span className="mr-2">🚣</span>
                Botes
                {searchType === 'bote' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-nature-500"></div>
                )}
              </button>
            </div>

            {/* Formulario de búsqueda */}
            <div className="p-5 sm:p-8">
              <div className={`grid gap-4 ${
                searchType === 'dormi' 
                  ? 'grid-cols-1 md:grid-cols-4' 
                  : 'grid-cols-1 md:grid-cols-5'
              }`}>
                {/* Check-in / Fecha */}
                <div className="relative group" ref={activeDateField === (searchType === 'dormi' ? 'checkin' : 'fecha') ? datePickerRef : null}>
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    {searchType === 'dormi' ? 'Check-in' : 'Fecha'}
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveDateField(searchType === 'dormi' ? 'checkin' : 'fecha')
                      setShowDatePicker(true)
                    }}
                    className="w-full px-4 pt-6 pb-3 pr-12 border border-gray-300 rounded-xl hover:border-gray-400 transition-colors bg-white text-left relative"
                  >
                    {checkIn ? (
                      <div className="text-xs text-nature-600 font-semibold absolute top-2 left-4">
                        {formatDate(checkIn)}
                      </div>
                    ) : (
                      <div className="text-sm text-gray-400 font-medium">
                        {getPlaceholder(searchType === 'dormi' ? 'checkin' : 'fecha')}
                      </div>
                    )}
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-nature-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </button>
                  {showDatePicker && activeDateField === (searchType === 'dormi' ? 'checkin' : 'fecha') && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 lg:left-auto lg:right-0 lg:transform-none">
                      <DatePicker
                        checkIn={checkIn}
                        checkOut={searchType === 'dormi' ? checkOut : undefined}
                        onCheckInChange={(date) => {
                          setCheckIn(date)
                          if (searchType === 'bote') {
                            setShowDatePicker(false)
                            setActiveDateField(null)
                          }
                        }}
                        onCheckOutChange={(date) => {
                          setCheckOut(date)
                          if (searchType === 'dormi') {
                            setShowDatePicker(false)
                            setActiveDateField(null)
                          }
                        }}
                        minDate={minDate}
                        disabled={false}
                        isSingleDate={searchType === 'bote'}
                      />
                    </div>
                  )}
                </div>

                {/* Check-out / Duración */}
                {searchType === 'dormi' ? (
                  <div className="relative group" ref={activeDateField === 'checkout' ? datePickerRef : null}>
                    <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                      Check-out
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        if (checkIn) {
                          setActiveDateField('checkout')
                          setShowDatePicker(true)
                        }
                      }}
                      disabled={!checkIn}
                      className={`w-full px-4 pt-6 pb-3 pr-12 border rounded-xl transition-colors text-left relative ${
                        !checkIn 
                          ? 'bg-gray-50 border-gray-200 cursor-not-allowed' 
                          : 'border-gray-300 hover:border-gray-400 bg-white'
                      }`}
                    >
                      {checkOut ? (
                        <div className="text-xs text-nature-600 font-semibold absolute top-2 left-4">
                          {formatDate(checkOut)}
                        </div>
                      ) : (
                        <div className={`text-sm font-medium ${
                          !checkIn ? 'text-gray-300' : 'text-gray-400'
                        }`}>
                          {getPlaceholder('checkout')}
                        </div>
                      )}
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className={`w-5 h-5 transition-colors ${
                          !checkIn ? 'text-gray-300' : 'text-gray-400 group-hover:text-nature-500'
                        }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </button>
                    {showDatePicker && activeDateField === 'checkout' && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 z-50 lg:left-auto lg:right-0 lg:transform-none">
                        <DatePicker
                          checkIn={checkIn}
                          checkOut={checkOut}
                          onCheckInChange={setCheckIn}
                          onCheckOutChange={(date) => {
                            setCheckOut(date)
                            setShowDatePicker(false)
                            setActiveDateField(null)
                          }}
                          minDate={getMinCheckout()}
                          disabled={!checkIn}
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="relative group">
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Duración
                      </label>
                      <div className="relative">
                        <select
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                          className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base font-semibold appearance-none bg-white hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <option value="">Seleccionar</option>
                          <option value="1">1 hora</option>
                          <option value="2">2 horas</option>
                          <option value="3">3 horas</option>
                          <option value="4">4 horas</option>
                          <option value="dia">Día completo</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-nature-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                        Tipo de Bote
                      </label>
                      <div className="relative">
                        <select
                          value={boteType}
                          onChange={(e) => setBoteType(e.target.value)}
                          className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base font-semibold appearance-none bg-white hover:border-gray-400 transition-colors cursor-pointer"
                        >
                          <option value="">Todos los tipos</option>
                          <option value="con-motor">Con Motor</option>
                          <option value="sin-motor">Sin Motor</option>
                          <option value="tracker-guia">Tracker con Guía</option>
                        </select>
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                          <svg className="w-5 h-5 text-gray-400 group-hover:text-nature-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* Cantidad de Personas */}
                <div className="relative group">
                  <label className="block text-xs font-bold text-gray-700 mb-2 uppercase tracking-wide">
                    Personas
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full px-4 py-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-nature-500 focus:border-nature-500 text-sm sm:text-base font-semibold appearance-none bg-white hover:border-gray-400 transition-colors cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                        <option key={num} value={num.toString()}>
                          {num} {num === 1 ? 'persona' : 'personas'}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400 group-hover:text-nature-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Botón de Búsqueda */}
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    className="w-full bg-nature-500 hover:bg-nature-600 text-white font-bold px-6 py-4 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-xl hover:shadow-2xl flex items-center justify-center space-x-2"
                  >
                    <span>Buscar</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles del slider - solo se muestran si hay más de una imagen */}
      {images.length > 1 && (
        <>
          {/* Botón anterior */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Imagen anterior"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-110"
            aria-label="Imagen siguiente"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
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
          <div className="absolute bottom-16 sm:bottom-20 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-6 sm:w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 text-white"
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

