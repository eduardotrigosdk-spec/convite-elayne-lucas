'use client'

import { useEffect, useState } from 'react'

const UNIDADES = [
  { chave: 'dias', rotulo: 'dias' },
  { chave: 'horas', rotulo: 'horas' },
  { chave: 'min', rotulo: 'min' },
  { chave: 'seg', rotulo: 'seg' },
] as const

type Restante = { dias: number; horas: number; min: number; seg: number }

function faltam(alvo: number): Restante {
  const ms = Math.max(0, alvo - Date.now())
  const s = Math.floor(ms / 1000)
  return {
    dias: Math.floor(s / 86400),
    horas: Math.floor((s % 86400) / 3600),
    min: Math.floor((s % 3600) / 60),
    seg: s % 60,
  }
}

/**
 * Contagem regressiva até a cerimônia.
 *
 * `quando` chega como texto ISO com o fuso -03:00 declarado. Sem o fuso, quem
 * abrisse o convite de outro estado ou país veria uma contagem errada.
 *
 * Começa vazia e só preenche depois de montar: o servidor e o navegador nunca
 * calculariam o mesmo segundo, e o React reclamaria da diferença.
 */
export default function Contagem({ quando }: { quando: string }) {
  const alvo = new Date(quando).getTime()
  const [r, setR] = useState<Restante | null>(null)

  useEffect(() => {
    setR(faltam(alvo))
    const t = setInterval(() => setR(faltam(alvo)), 1000)
    return () => clearInterval(t)
  }, [alvo])

  return (
    <div className="contagem" role="timer" aria-live="off">
      {UNIDADES.map(({ chave, rotulo }) => (
        <div className="contagem__caixa" key={chave}>
          <span className="contagem__n">
            {r ? String(r[chave]).padStart(2, '0') : '--'}
          </span>
          <span className="contagem__r">{rotulo}</span>
        </div>
      ))}
    </div>
  )
}
