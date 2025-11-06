'use client'

import { useState, useEffect } from 'react'

interface WeatherData {
  temp: number
  description: string
  icon: string
  loading: boolean
  error: boolean
}

interface WeatherWidgetProps {
  isScrolled?: boolean
}

export default function WeatherWidget({ isScrolled = false }: WeatherWidgetProps) {
  const [weather, setWeather] = useState<WeatherData>({
    temp: 0,
    description: '',
    icon: '',
    loading: true,
    error: false,
  })

  useEffect(() => {
    let retryCount = 0
    const maxRetries = 3
    const retryDelay = 2000 // 2 segundos

    const fetchWeather = async (isRetry = false) => {
      try {
        // Timeout de 8 segundos para la petición
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 8000)

        const response = await fetch('/api/weather', {
          signal: controller.signal,
          cache: 'no-store' // Evitar cache en caso de errores
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          console.error('Error response:', errorData)
          
          // Si es error 401, no reintentar
          if (response.status === 401) {
            throw new Error('API key inválida')
          }
          
          // Reintentar si no es error 401 y no hemos alcanzado el máximo
          if (retryCount < maxRetries && !isRetry) {
            retryCount++
            setTimeout(() => fetchWeather(true), retryDelay * retryCount)
            return
          }
          
          throw new Error(errorData.error || 'Error al obtener datos del clima')
        }

        const data = await response.json()
        
        // Verificar que los datos sean válidos
        if (!data.temp || !data.description || !data.icon) {
          console.error('Datos inválidos recibidos:', data)
          
          // Reintentar si no hemos alcanzado el máximo
          if (retryCount < maxRetries && !isRetry) {
            retryCount++
            setTimeout(() => fetchWeather(true), retryDelay * retryCount)
            return
          }
          
          throw new Error('Datos de clima inválidos')
        }
        
        // Resetear contador de reintentos en caso de éxito
        retryCount = 0
        
        setWeather({
          temp: data.temp,
          description: data.description,
          icon: data.icon,
          loading: false,
          error: false,
        })
      } catch (error) {
        console.error('Error fetching weather:', error)
        
        // Si es un error de aborto (timeout) o de red, reintentar
        if ((error instanceof Error && error.name === 'AbortError') || 
            (error instanceof TypeError && error.message.includes('fetch'))) {
          if (retryCount < maxRetries && !isRetry) {
            retryCount++
            setTimeout(() => fetchWeather(true), retryDelay * retryCount)
            return
          }
        }
        
        setWeather(prev => ({ ...prev, loading: false, error: true }))
      }
    }

    fetchWeather()
    
    // Actualizar cada 30 minutos
    const interval = setInterval(() => {
      retryCount = 0 // Resetear contador para actualizaciones periódicas
      fetchWeather()
    }, 30 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const bgClass = isScrolled 
    ? 'bg-gray-100 border-gray-200 hover:bg-gray-200' 
    : 'bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20'
  
  const textClass = isScrolled ? 'text-gray-700' : 'text-white'

  if (weather.loading) {
    return (
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${bgClass} border ${textClass}`}>
        <div className={`w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin opacity-70`}></div>
        <span className={`text-xs font-medium opacity-70 ${textClass}`}>Cargando...</span>
      </div>
    )
  }

  if (weather.error) {
    // Mostrar un mensaje discreto en caso de error
    return (
      <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${bgClass} border ${textClass} opacity-60`} title="Error al cargar el clima">
        <span className="text-base">🌤️</span>
        <span className={`text-xs ${textClass}`}>--°C</span>
      </div>
    )
  }

  return (
    <div className={`flex items-center space-x-2 px-3 py-1.5 rounded-full ${bgClass} border transition-all duration-300 cursor-default ${textClass}`}>
      <span className="text-base leading-none">{weather.icon}</span>
      <div className="flex flex-col items-start">
        <span className={`text-sm font-bold leading-tight ${textClass}`}>{weather.temp}°C</span>
        <span className={`text-[10px] opacity-80 leading-tight max-w-[80px] truncate ${textClass}`}>{weather.description}</span>
      </div>
    </div>
  )
}

