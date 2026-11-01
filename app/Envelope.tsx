'use client'

import { useEffect, useRef } from 'react'
import { Lacre, Monograma, Ramo, RamoCanto } from './enfeites'

/**
 * O envelope que abre conforme a pessoa arrasta a tela.
 *
 * Duas coisas fazem o movimento parecer caro, e nenhuma delas é "mais
 * animação":
 *
 * 1. O progresso PERSEGUE a rolagem, não a copia. O dedo joga o alvo para
 *    frente; o valor desenhado vai atrás, um pedaço do caminho por quadro.
 *    Arrasto picotado — que é como todo mundo rola de verdade — vira
 *    movimento contínuo, e no fim há um assentamento em vez de uma parada
 *    seca. É a diferença inteira entre "animação ligada à rolagem" e
 *    "abrir uma carta".
 *
 * 2. Cada parte tem a sua curva. A aba desacelera no fim (easeOutCubic),
 *    como tampa de caixa. A carta acelera e desacelera (easeInOutCubic),
 *    como objeto com peso. Se as duas usassem a mesma curva, o conjunto
 *    pareceria uma peça só se deformando.
 *
 * Só transform e opacity são animados — as duas coisas que o navegador
 * resolve sem refazer o layout.
 */

/* Curvas. Nomeadas porque o que elas fazem importa mais que a fórmula. */
const desacelera = (t: number) => 1 - Math.pow(1 - t, 3)
const comPeso = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const acelera = (t: number) => t * t

/** Recorta um trecho do progresso e devolve 0..1 dentro dele. */
const trecho = (p: number, de: number, ate: number) =>
  Math.min(Math.max((p - de) / (ate - de), 0), 1)

export default function Envelope() {
  const cena = useRef<HTMLDivElement>(null)
  const palco = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const elCena = cena.current
    const elPalco = palco.current
    if (!elCena || !elPalco) return

    function pintar(p: number) {
      const s = elPalco!.style
      s.setProperty('--aba', desacelera(trecho(p, 0, 0.42)).toFixed(4))
      s.setProperty('--sobe', comPeso(trecho(p, 0.34, 0.86)).toFixed(4))
      s.setProperty('--letra', trecho(p, 0.44, 0.66).toFixed(4))
      s.setProperty('--some', acelera(trecho(p, 0.88, 1)).toFixed(4))
      s.setProperty('--inicio', trecho(p, 0, 0.1).toFixed(4))
      // Passada a vertical, a aba precisa ir para trás da carta que sobe.
      elPalco!.classList.toggle('virou', p > 0.24)
    }

    const menos = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (menos) {
      // Sem movimento: a carta já aparece aberta, e a cena encolhe para não
      // obrigar a pessoa a rolar três telas de nada. 0,86 e não 1, senão o
      // palco terminaria de se apagar e sobraria uma tela vazia.
      pintar(0.86)
      elCena.style.height = '100svh'
      return
    }

    let alvo = 0
    let atual = 0
    let quadro = 0

    function medir() {
      const r = elCena!.getBoundingClientRect()
      const curso = r.height - innerHeight
      alvo = curso > 0 ? Math.min(Math.max(-r.top, 0), curso) / curso : 0
    }

    function laco() {
      const falta = alvo - atual
      // 0,14 do caminho por quadro. Menor = mais mole, maior = mais colado
      // no dedo. Abaixo de 0,0004 a diferença não aparece em tela: encosta
      // no alvo e dorme, para não ficar um laço rodando à toa.
      if (Math.abs(falta) < 0.0004) {
        atual = alvo
        pintar(atual)
        quadro = 0
        return
      }
      atual += falta * 0.14
      pintar(atual)
      quadro = requestAnimationFrame(laco)
    }

    function acordar() {
      medir()
      if (!quadro) quadro = requestAnimationFrame(laco)
    }

    medir()
    atual = alvo
    pintar(atual)

    addEventListener('scroll', acordar, { passive: true })
    addEventListener('resize', acordar, { passive: true })
    return () => {
      cancelAnimationFrame(quadro)
      removeEventListener('scroll', acordar)
      removeEventListener('resize', acordar)
    }
  }, [])

  /** Para quem toca em vez de arrastar: leva até o fim da cena. */
  function pular() {
    const r = cena.current?.getBoundingClientRect()
    if (!r) return
    scrollTo({ top: scrollY + r.bottom - innerHeight, behavior: 'smooth' })
  }

  return (
    <div className="cena" ref={cena}>
      <div className="palco" ref={palco}>
        <div className="envelope">
          <div className="envelope__fundo" />

          <div className="carta">
            <div className="carta__dentro">
              <Ramo className="carta__ramo" />
              <p className="carta__mono">Ellayne &amp; Lucas</p>
              <span className="carta__traco" />
              <p className="carta__data">20 · Março · 2027</p>
            </div>
          </div>

          <div className="envelope__bolso" />

          <div className="envelope__aba">
            <div className="envelope__aba-face">
              <RamoCanto className="aba__ramo aba__ramo--esq" />
              <RamoCanto className="aba__ramo aba__ramo--dir" />
              <Monograma className="aba__mono" />
            </div>
          </div>

          <button className="envelope__lacre" type="button" onClick={pular}>
            <Lacre />
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
