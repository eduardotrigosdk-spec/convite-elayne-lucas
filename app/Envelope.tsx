'use client'

import { useEffect, useRef } from 'react'
import { Lacre, Ramo } from './enfeites'

/**
 * O envelope que abre conforme a pessoa arrasta a tela.
 *
 * A cena tem 260svh de altura e um palco grudado no topo. Enquanto a pessoa
 * rola esses 260svh, o palco fica parado e só o progresso muda — é isso que
 * dá a sensação de estar abrindo a carta com o dedo, em vez de assistir a
 * uma animação.
 *
 * O progresso (0 a 1) é escrito numa variável CSS e o resto é CSS puro. Três
 * tempos, que se sobrepõem de propósito para o movimento não ter degraus:
 *
 *   0,00 → 0,45   a aba levanta (gira 180° no eixo X)
 *   0,38 → 0,88   a carta sobe para fora do bolso e cresce
 *   0,86 → 1,00   o palco se apaga e o convite aparece atrás
 *
 * Não uso `animation-timeline: scroll()` porque ainda não funciona no Safari
 * — e convite de casamento é aberto no iPhone.
 */
export default function Envelope() {
  const cena = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elCena = cena.current
    const elPalco = palco.current
    if (!elCena || !elPalco) return

    const menos = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menos) {
      // Sem movimento: a carta já aparece aberta, e a cena encolhe para não
      // obrigar a pessoa a rolar três telas de nada.
      //
      // 0,86 e não 1: em 1 o palco termina de se apagar, e quem pediu menos
      // movimento veria uma tela verde vazia em vez da carta aberta.
      elPalco.style.setProperty('--p', '0.86')
      elPalco.classList.add('virou')
      elCena.style.height = '100svh'
      return
    }

    let pedido = 0

    function medir() {
      pedido = 0
      const r = elCena!.getBoundingClientRect()
      const curso = r.height - innerHeight     // quanto dá para rolar preso
      const andado = Math.min(Math.max(-r.top, 0), curso)
      const p = curso > 0 ? andado / curso : 0
      elPalco!.style.setProperty('--p', p.toFixed(4))
      // Passada a vertical, a aba vai para trás da carta.
      elPalco!.classList.toggle('virou', p > 0.26)
    }

    function aoRolar() {
      if (pedido) return
      pedido = requestAnimationFrame(medir)
    }

    medir()
    addEventListener('scroll', aoRolar, { passive: true })
    addEventListener('resize', aoRolar, { passive: true })
    return () => {
      cancelAnimationFrame(pedido)
      removeEventListener('scroll', aoRolar)
      removeEventListener('resize', aoRolar)
    }
  }, [])

  // Para quem toca em vez de arrastar: leva até o fim da cena.
  function pular() {
    const r = cena.current?.getBoundingClientRect()
    if (!r) return
    scrollTo({ top: scrollY + r.bottom - innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="cena" ref={cena}>
      <div className="palco" ref={palco}>
        {/* A carta sai daqui de dentro */}
        <div className="envelope">
          <div className="envelope__fundo" />

          <div className="carta">
            <Ramo className="carta__ramo" />
            <p className="carta__mono">Elayne &amp; Lucas</p>
            <p className="carta__traco" />
            <p className="carta__data">15 · Maio · 2027</p>
          </div>

          <div className="envelope__bolso" />

          <div className="envelope__aba">
            <div className="envelope__aba-face" />
          </div>

          <button className="envelope__lacre" type="button" onClick={pular}>
            <Lacre iniciais="LE" />
            <span className="oculto-visual">Abrir o convite</span>
          </button>
        </div>

        <p className="dica">
          <span>Arraste para abrir</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14M6 13l6 6 6-6" />
          </svg>
        </p>
      </div>
    </div>
  )
}
