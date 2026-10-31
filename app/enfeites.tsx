/**
 * Ornamentos e ícones, desenhados à mão em SVG.
 *
 * Nada é baixado de biblioteca: num convite o peso importa (a pessoa abre
 * pelo WhatsApp, muitas vezes com internet ruim), e são poucos desenhos.
 */

type Props = React.SVGProps<SVGSVGElement>

/* ── O lacre de cera ──────────────────────────────────────────────────────
   O contorno é irregular de propósito. Cera derretida não faz círculo
   perfeito, e um círculo perfeito aqui entregaria o desenho como vetor. */

export function Lacre({ iniciais = 'LE', ...p }: Props & { iniciais?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" {...p}>
      <defs>
        <radialGradient id="cera" cx="36%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#e8cd8a" />
          <stop offset="48%" stopColor="#c9a961" />
          <stop offset="100%" stopColor="#8d6f28" />
        </radialGradient>
      </defs>

      <path
        d="M60 8c14 0 26 6 34 16 7 9 19 14 18 26-1 11-8 18-8 28 0 10-8 19-18 23-9 4-14 11-26 10-11-1-18-6-27-9-10-4-19-12-20-23-1-10-7-18-6-29 1-11 10-18 17-26C42 14 46 8 60 8Z"
        fill="url(#cera)"
      />

      {/* brilho alto, como cera ainda macia */}
      <ellipse cx="45" cy="38" rx="16" ry="11" fill="#f2dfae" opacity="0.38" />

      <circle cx="60" cy="60" r="40" fill="none" stroke="#8d6f28" strokeWidth="1.1" opacity="0.5" />
      <circle cx="60" cy="60" r="36" fill="none" stroke="#f2dfae" strokeWidth="0.8" opacity="0.4" />

      <text
        x="60"
        y="60"
        className="lacre__letras"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#6b5219"
      >
        {iniciais}
      </text>
    </svg>
  )
}

/* ── Ramo de eucalipto ───────────────────────────────────────────────────
   O caule é uma curva, não uma reta, e as folhas alternam dos dois lados
   com tamanho decrescente. Ramo simétrico de linha reta parece carimbo. */

export const Ramo = (p: Props) => {
  // x, y, rotação, escala — da base (maior) para a ponta (menor)
  const folhas: [number, number, number, number][] = [
    [30, 14, -32, 1.0], [44, 34, 28, 0.95],
    [56, 12, -26, 0.92], [70, 35, 24, 0.88],
    [82, 11, -22, 0.82], [96, 34, 20, 0.76],
    [108, 13, -18, 0.68], [120, 32, 16, 0.6],
  ]
  return (
    <svg viewBox="0 0 160 48" fill="none" aria-hidden="true" {...p}>
      {/* caule, levemente arqueado */}
      <path
        d="M14 26c26-7 54-6 80-2 18 3 34 2 52-2"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      {folhas.map(([x, y, r, e], i) => (
        <ellipse
          key={i}
          cx={x}
          cy={y}
          rx={10 * e}
          ry={6.2 * e}
          fill="currentColor"
          opacity={0.78 - i * 0.045}
          transform={`rotate(${r} ${x} ${y})`}
        />
      ))}
      {/* botão da ponta */}
      <circle cx="146" cy="22" r="2.8" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/* ── Ícones ────────────────────────────────────────────────────────────── */

const traco = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const IconeLocal = (p: Props) => (
  <svg {...traco} {...p}>
    <path d="M20 10.2c0 5.3-6.2 10.4-7.6 11.4a.7.7 0 0 1-.8 0C10.2 20.6 4 15.5 4 10.2a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

export const IconePresenca = (p: Props) => (
  <svg {...traco} {...p}>
    <path d="M15.6 20.4v-1.8a3.6 3.6 0 0 0-3.6-3.6H6.6A3.6 3.6 0 0 0 3 18.6v1.8" />
    <circle cx="9.3" cy="7.8" r="3.6" />
    <path d="m16.2 11.4 2.1 2.1 3.3-3.6" />
  </svg>
)

export const IconePresente = (p: Props) => (
  <svg {...traco} {...p}>
    <rect x="3.2" y="10.4" width="17.6" height="10.4" rx="1.6" />
    <path d="M2.4 6.8h19.2v3.6H2.4zM12 6.8v14" />
    <path d="M12 6.8S10.8 3 8.4 3a2.4 2.4 0 0 0 0 3.8ZM12 6.8S13.2 3 15.6 3a2.4 2.4 0 0 1 0 3.8Z" />
  </svg>
)

export const IconeTraje = (p: Props) => (
  <svg {...traco} {...p}>
    <path d="M9.2 3.2 12 6l2.8-2.8 3.9 1.9A2.6 2.6 0 0 1 20.2 7v2.4h-3v11.4H6.8V9.4h-3V7a2.6 2.6 0 0 1 1.5-1.9Z" />
    <path d="M12 6v5.2" />
  </svg>
)

export const IconeCalendario = (p: Props) => (
  <svg {...traco} {...p}>
    <rect x="3.4" y="5" width="17.2" height="16" rx="2.2" />
    <path d="M3.4 9.8h17.2M8.4 3v4M15.6 3v4" />
  </svg>
)

export const Seta = (p: Props) => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.7}
       strokeLinecap="round" strokeLinejoin="round" width="15" height="15"
       aria-hidden="true" {...p}>
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
)
