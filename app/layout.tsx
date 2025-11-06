import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import WhatsAppButton from '@/components/WhatsAppButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Camping Lotero - Lago San Roque, Córdoba',
  description: 'Camping familiar en Ruta 55, Km 27, a orillas del lago San Roque. Hospedaje, asadores, comedor, pileta, botes y arboleda. Ambiente familiar con limpieza y seguridad.',
  keywords: 'camping, lago san roque, córdoba, turismo, botes, alquiler botes, camping familiar',
  openGraph: {
    title: 'Camping Lotero - Lago San Roque, Córdoba',
    description: 'Camping familiar en Ruta 55, Km 27, a orillas del lago San Roque',
    type: 'website',
    locale: 'es_AR',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}

