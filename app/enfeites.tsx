/**
 * Ornamentos e ícones, desenhados à mão em SVG.
 *
 * Nada vem de biblioteca: num convite o peso importa (a pessoa abre pelo
 * WhatsApp, às vezes com internet ruim), e são poucos desenhos.
 */

type Props = React.SVGProps<SVGSVGElement>

/* ── O lacre de cera ──────────────────────────────────────────────────────

   Cera prensada tem três coisas que um círculo chapado não tem: contorno
   irregular, a borda levantada onde o carimbo empurrou a cera para fora, e
   o fundo rebaixado onde ele afundou. O ramo é relevo — mais claro em cima,
   sombra embaixo — e não um desenho pintado por cima.                     */

export function Lacre(p: Props) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" {...p}>
      <defs>
        <radialGradient id="ceraCorpo" cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor="#d08a6d" />
          <stop offset="46%" stopColor="#b5654a" />
          <stop offset="100%" stopColor="#7d3f2b" />
        </radialGradient>
        <radialGradient id="ceraFundo" cx="40%" cy="34%" r="70%">
          <stop offset="0%" stopColor="#a65941" />
          <stop offset="100%" stopColor="#8a4631" />
        </radialGradient>
        <linearGradient id="ceraRelevo" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b296" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#8a4631" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* corpo, com o contorno derramado */}
      <path
        d="M60 7c13 .3 24 5 32 14 6 7 16 10 19 19 3 10-3 18-3 27 0 10-6 18-14 24-8 5-13 13-23 14-11 1-18-6-27-10-9-4-18-10-21-20-3-9-8-17-6-27 2-10 11-16 17-24C41 15 47 6.7 60 7Z"
        fill="url(#ceraCorpo)"
      />

      {/* fundo rebaixado, onde o carimbo afundou */}
      <circle cx="60" cy="60" r="38" fill="url(#ceraFundo)" />

      {/* a borda levantada: um anel claro em cima, escuro embaixo */}
      <circle cx="60" cy="60" r="38" fill="none" stroke="url(#ceraRelevo)" strokeWidth="2.4" />

      {/* o ramo, em relevo */}
      <g transform="translate(60 61)">
        {/* sombra do relevo, deslocada um fio para baixo */}
        <g transform="translate(0 1.2)" opacity="0.45">
          <RamoSelo cor="#6d3522" />
        </g>
        <RamoSelo cor="#e3a988" />
      </g>

      {/* brilho alto, como cera ainda macia */}
      <ellipse cx="42" cy="34" rx="17" ry="11" fill="#f0c3a6" opacity="0.26"
               transform="rotate(-22 42 34)" />
    </svg>
  )
}

/* O raminho de dentro do lacre — caule curvo e folhas alternadas. */
function RamoSelo({ cor }: { cor: string }) {
  const folhas: [number, number, number][] = [
    [-11, -4, -40], [-5, 6, 35], [-1, -8, -32],
    [5, 4, 30], [8, -7, -26], [13, 2, 24],
  ]
  return (
    <g>
      <path d="M-17 9C-10 1-2-5 8-9c4-1.6 8-2.4 11-2.6"
            stroke={cor} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {folhas.map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx="5" ry="2.9" fill={cor}
                 transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </g>
  )
}

/* ── Monograma em relevo, para a aba do envelope ────────────────────────── */

export const Monograma = (p: Props) => (
  <svg viewBox="0 0 120 60" aria-hidden="true" {...p}>
    <text x="60" y="38" textAnchor="middle" className="monograma__letras">
      E &amp; L
    </text>
  </svg>
)

/* ── Ramo de eucalipto ───────────────────────────────────────────────────
   Caule curvo e folhas alternadas, decrescendo até a ponta. Ramo simétrico
   de linha reta parece carimbo.                                          */

export const Ramo = (p: Props) => {
  const folhas: [number, number, number, number][] = [
    [30, 14, -32, 1.0], [44, 34, 28, 0.95],
    [56, 12, -26, 0.92], [70, 35, 24, 0.88],
    [82, 11, -22, 0.82], [96, 34, 20, 0.76],
    [108, 13, -18, 0.68], [120, 32, 16, 0.6],
  ]
  return (
    <svg viewBox="0 0 160 48" fill="none" aria-hidden="true" {...p}>
      <path d="M14 26c26-7 54-6 80-2 18 3 34 2 52-2"
            stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.75" />
      {folhas.map(([x, y, r, e], i) => (
        <ellipse key={i} cx={x} cy={y} rx={10 * e} ry={6.2 * e} fill="currentColor"
                 opacity={0.78 - i * 0.045} transform={`rotate(${r} ${x} ${y})`} />
      ))}
      <circle cx="146" cy="22" r="2.8" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

/* Ramo vertical, para o relevo dos cantos da aba do envelope. */
export const RamoCanto = (p: Props) => {
  const folhas: [number, number, number, number][] = [
    [18, 86, -52, 1.0], [34, 72, 42, 0.94],
    [30, 62, -48, 0.88], [45, 50, 40, 0.8],
    [42, 40, -44, 0.72], [56, 30, 36, 0.62],
    [54, 21, -40, 0.52],
  ]
  return (
    <svg viewBox="0 0 80 100" fill="none" aria-hidden="true" {...p}>
      <path d="M8 98C20 80 36 60 50 42c6-8 10-14 13-19"
            stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.8" />
      {folhas.map(([x, y, r, e], i) => (
        <ellipse key={i} cx={x} cy={y} rx={9 * e} ry={5.4 * e} fill="currentColor"
                 opacity={0.7 - i * 0.04} transform={`rotate(${r} ${x} ${y})`} />
      ))}
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
