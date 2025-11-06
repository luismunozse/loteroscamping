# Camping Lotero - Website

Sitio web del Camping Lotero, ubicado en Ruta 55, Km 27, a orillas del Lago San Roque, Córdoba, Argentina.

## Características

- 🏕️ Landing page moderna y responsive
- 🚣 Sistema de reservas de botes
- 📱 Diseño mobile-first
- ⚡ Optimizado para SEO
- 🎨 Interfaz moderna con Tailwind CSS

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **React Hook Form** - Manejo de formularios

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Producción

```bash
npm run build
npm start
```

## Estructura del Proyecto

```
camping-lotero/
├── app/
│   ├── layout.tsx      # Layout principal con metadata SEO
│   ├── page.tsx        # Página principal
│   └── globals.css     # Estilos globales
├── components/
│   ├── Navbar.tsx      # Barra de navegación
│   ├── Hero.tsx        # Sección hero
│   ├── About.tsx       # Sobre nosotros
│   ├── Services.tsx    # Servicios del camping
│   ├── BoatRental.tsx  # Formulario de reserva de botes
│   ├── Contact.tsx     # Información de contacto
│   └── Footer.tsx      # Pie de página
└── public/
    └── images/         # Imágenes del camping
```

## Próximos Pasos

Para integrar el sistema de reservas con un backend:

1. Crear una API route en `app/api/reservas/route.ts`
2. Conectar con un servicio de email (SendGrid, Resend, etc.)
3. Agregar validación del lado del servidor
4. Implementar base de datos para almacenar reservas

## Contacto

Para consultas sobre el camping, contactar a Sr. Mauro o a la secretaría de la Cámara de Loteros y Agentes de Juego.

