import type { Metadata, Viewport } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { StylesProvider } from './styles-provider'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Daniel Ríos Giraldo — Desarrollador de Software | Web & Mobile',
  description:
    'Portafolio profesional de Daniel Ríos Giraldo, desarrollador de software en Medellín, Colombia. Aplicaciones web, apps móviles, backend, bases de datos y pruebas de software.',
  keywords: [
    'Daniel Ríos Giraldo',
    'desarrollador de software',
    'Medellín',
    'ADSO',
    'SENA',
    'Tecnoparque',
    'React',
    'Next.js',
    'React Native',
    'Expo',
    'Flutter',
    'Node.js',
    'Python',
    'Django',
    'Selenium',
    'portafolio',
  ],
  openGraph: {
    title: 'Daniel Ríos Giraldo — Desarrollador de Software | Web & Mobile',
    description:
      'Desarrollando ideas, aprendiendo tecnologías y construyendo soluciones digitales.',
    type: 'website',
    locale: 'es_CO',
  },
}

export const viewport: Viewport = {
  themeColor: '#04050a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body>
        <StylesProvider>{children}</StylesProvider>
      </body>
    </html>
  )
}
