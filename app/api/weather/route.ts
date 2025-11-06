import { NextResponse } from 'next/server'

export async function GET() {
  const API_KEY = process.env.OPENWEATHER_API_KEY
  
  if (!API_KEY) {
    console.error('OPENWEATHER_API_KEY no está configurada en las variables de entorno')
    return NextResponse.json(
      { error: 'API key no configurada. Por favor, configura OPENWEATHER_API_KEY en .env.local' },
      { status: 500 }
    )
  }
  
  // Verificar que la API key tenga el formato correcto (debe tener 32 caracteres)
  if (API_KEY.length < 20) {
    console.error('API key parece inválida (muy corta)')
    return NextResponse.json(
      { error: 'API key inválida' },
      { status: 500 }
    )
  }

  // Coordenadas exactas del Camping Lotero, Lago San Roque, Punilla, Córdoba, Argentina
  // Zona de Punilla - Lago San Roque
  const lat = -31.357561045793954
  const lon = -64.45936301833817
  
  // Usar el nombre de la ciudad para mejor precisión en la zona de Punilla
  const cityName = 'Villa Carlos Paz' // Ciudad más cercana en Punilla para mejor precisión del clima

  try {
    // Crear AbortController para timeout
    const controller1 = new AbortController()
    const timeoutId1 = setTimeout(() => controller1.abort(), 10000)
    
    // Intentar primero con coordenadas exactas del camping
    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`,
      {
        next: { revalidate: 1800 }, // Cache por 30 minutos
        signal: controller1.signal
      }
    )
    
    clearTimeout(timeoutId1)

    // Si falla con coordenadas, intentar con nombre de ciudad (mejor para zonas específicas como Punilla)
    if (!response.ok && response.status !== 401) {
      console.log('Intentando con nombre de ciudad para mejor precisión en Punilla...')
      const controller2 = new AbortController()
      const timeoutId2 = setTimeout(() => controller2.abort(), 10000)
      
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName},AR&appid=${API_KEY}&units=metric&lang=es`,
        {
          next: { revalidate: 1800 },
          signal: controller2.signal
        }
      )
      
      clearTimeout(timeoutId2)
    }

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenWeatherMap API error:', response.status, errorText)
      
      if (response.status === 401) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.message || 'API key inválida'
        
        // Mensaje más útil para el usuario
        return NextResponse.json(
          { 
            error: 'API key inválida o aún no activada. Las API keys de OpenWeatherMap pueden tardar hasta 2 horas en activarse después de crearlas. Verifica que tu API key sea correcta y espera unos minutos si acabas de crearla.',
            details: errorMessage
          },
          { status: 401 }
        )
      }
      
      return NextResponse.json(
        { error: `Error de API: ${response.status}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Verificar que los datos necesarios existan
    if (!data.main || !data.main.temp || !data.weather || !data.weather[0]) {
      console.error('Datos incompletos de OpenWeatherMap:', data)
      return NextResponse.json(
        { error: 'Datos incompletos de la API' },
        { status: 500 }
      )
    }

    // Mapear iconos de OpenWeatherMap a emojis
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', // clear sky day
      '01n': '🌙', // clear sky night
      '02d': '⛅', // few clouds day
      '02n': '☁️', // few clouds night
      '03d': '☁️', // scattered clouds
      '03n': '☁️',
      '04d': '☁️', // broken clouds
      '04n': '☁️',
      '09d': '🌧️', // shower rain
      '09n': '🌧️',
      '10d': '🌦️', // rain day
      '10n': '🌧️', // rain night
      '11d': '⛈️', // thunderstorm
      '11n': '⛈️',
      '13d': '❄️', // snow
      '13n': '❄️',
      '50d': '🌫️', // mist
      '50n': '🌫️',
    }

    const weatherIcon = data.weather[0].icon || '02d'
    const description = data.weather[0].description || 'Despejado'

    return NextResponse.json({
      temp: Math.round(data.main.temp),
      description: description.charAt(0).toUpperCase() + description.slice(1),
      icon: iconMap[weatherIcon] || '🌤️',
    })
  } catch (error) {
    console.error('Error fetching weather:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Error al obtener datos del clima' },
      { status: 500 }
    )
  }
}

