# Configuración del Widget de Clima

## Pasos para configurar la API de OpenWeatherMap

1. **Obtener una API Key gratuita:**
   - Visita: https://openweathermap.org/api
   - Crea una cuenta gratuita
   - Ve a "API keys" en tu panel
   - Copia tu API key

2. **Configurar la variable de entorno:**
   - Crea un archivo `.env.local` en la raíz del proyecto
   - Agrega la siguiente línea:
   ```
   OPENWEATHER_API_KEY=tu_api_key_aqui
   ```
   - Reemplaza `tu_api_key_aqui` con tu API key real

3. **Reiniciar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

## Notas

- La API gratuita de OpenWeatherMap permite hasta 60 llamadas por minuto
- El widget se actualiza automáticamente cada 30 minutos
- Los datos se cachean en el servidor por 30 minutos para optimizar el rendimiento
- Si no se configura la API key, el widget no mostrará datos

## Ubicación configurada

- **Lugar:** Camping Lotero, Lago San Roque, Córdoba, Argentina
- **Coordenadas exactas:** Lat: -31.357561045793954, Lon: -64.45936301833817

