'use client'

import { useState, useEffect } from 'react'
import WeatherWidget from './WeatherWidget'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#nosotros', label: 'Nosotros' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#ubicacion', label: 'Ubicación' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <a
            href="/"
            className={`text-xl sm:text-2xl font-bold transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            Camping Lotero
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <nav className="flex items-center space-x-6 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`font-medium text-sm lg:text-base transition-colors hover:text-nature-500 ${
                    isScrolled ? 'text-gray-700' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            {/* Separador visual */}
            <div className={`h-6 w-px mx-2 ${
              isScrolled ? 'bg-gray-300' : 'bg-white/30'
            }`}></div>
            {/* Weather Widget */}
            <div className="ml-2">
              <WeatherWidget isScrolled={isScrolled} />
            </div>
          </div>

          {/* Mobile: Weather Widget + Menu Button */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Weather Widget visible en móvil */}
            <div className="flex items-center">
              <WeatherWidget isScrolled={isScrolled} />
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
              aria-label="Toggle menu"
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
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {/* Enlaces de navegación */}
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-nature-50 hover:text-nature-600 transition-colors font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

