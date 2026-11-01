import type { Metadata, Viewport } from 'next'
import { Parisienne, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

// A caligráfica, só para os nomes e as frases de afeto. Em bloco de texto
// ela cansaria a leitura; em nome próprio é o que dá a cara de convite.
const escrita = Parisienne({
  subsets: ['latin'],
  weight: '400',
  variable: '--fonte-escrita',
  display: 'swap',
})

// A serifada de todo o resto. Clássica, com acentuação boa em português.
const serifa = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--fonte-serifa',
  display: 'swap',
})

const NOIVOS = 'Ellayne & Lucas Gabriel'
const DATA = '20 de março de 2027'
const DESCRICAO = `Convidamos você para o nosso casamento — ${DATA}, na Paróquia Nossa Senhora da Conceição, em Pacatuba, Ceará.`

export const metadata: Metadata = {
  title: `${NOIVOS} — Nosso casamento`,
  description: DESCRICAO,
  // O convite circula por WhatsApp: é o cartão do Open Graph que a pessoa vê
  // antes de abrir. Vale mais que qualquer meta de busca aqui.
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: NOIVOS,
    title: `${NOIVOS} — ${DATA}`,
    description: DESCRICAO,
  },
  // Convite não é para ser achado no Google. Só quem recebe o link entra.
  robots: { index: false, follow: false },
}

export const viewport: Viewport = {
  themeColor: '#7d4530',
  // Deixa a página usar a tela toda no celular, inclusive atrás do entalhe.
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${escrita.variable} ${serifa.variable}`}>
      <body>{children}</body>
    </html>
  )
}
