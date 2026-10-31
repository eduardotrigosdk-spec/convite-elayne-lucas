# Convite — Elayne & Lucas Gabriel

Convite de casamento digital. Feito para o celular, porque é por WhatsApp
que ele chega.

---

## O que ainda falta preencher

Está tudo num bloco só, no topo de [app/page.tsx](app/page.tsx), marcado
`TROQUE AQUI`. O que estiver provisório aparece **em dourado itálico** na
página, para ninguém publicar sem ver.

| Item | Como está |
|---|---|
| Nomes dos pais | `— nome da mãe —`, `— nome do pai —` nos dois lados |
| Chave Pix e lista | texto provisório |
| Data e hora | sábado, 15/05/2027, 17:30 — **chutado** |
| WhatsApp das confirmações | está indo para o do Eduardo |

A data vive em `QUANDO`, com o fuso `-03:00` escrito. **Não tire o fuso:**
sem ele, quem abrir o convite de outro estado vê a contagem regressiva
errada.

---

## A abertura

O envelope abre conforme a pessoa arrasta a tela. A cena tem 260svh e o
palco fica grudado no topo — enquanto se rola essa altura, o palco não sai
do lugar e só o progresso muda. É isso que dá a sensação de abrir a carta
com o dedo, em vez de assistir a uma animação.

Três tempos, que se sobrepõem de propósito para o movimento não ter degraus:

| Arrasto | O que acontece |
|---|---|
| 0 → 45% | a aba levanta, girando 178° no eixo X |
| 38% → 88% | a carta sobe para fora do bolso e cresce |
| 86% → 100% | o palco se apaga e o convite aparece atrás |

**Não uso `animation-timeline: scroll()`**, que faria isso em CSS puro, porque
ainda não funciona no Safari — e convite de casamento é aberto no iPhone. O
progresso é calculado num `requestAnimationFrame` e escrito numa variável
CSS; daí para baixo é só CSS.

Quem preferir tocar: o lacre é um botão e desliza até o fim da cena.

Com `prefers-reduced-motion`, a cena encolhe para uma tela e a carta já
aparece aberta — em `--p: 0.86`, e não 1, senão o palco terminaria de se
apagar e a pessoa veria uma tela verde vazia.

---

## Empilhamento do envelope

A ordem importa e é fácil de quebrar:

```
aba (4, fechada)  ·  bolso (3)  ·  carta (2)  ·  fundo (1)
```

A carta precisa ficar **atrás do bolso** para parecer que está dentro. E a
aba, depois de passar da vertical, precisa ir **para trás da carta** — senão
cobre a carta que está subindo. Essa troca é feita pela classe `.virou`,
escrita pelo script. Dá para fazer só em CSS, mas sai uma conta ilegível e
com suporte irregular.

---

## Rodar

```bash
npm --prefix CASAMENTO run dev
```

Abre em `http://localhost:3200`.

Publicar é `git push` — a Vercel faz o resto.

---

## Decisões

**Largura de telefone, sempre.** No computador a página continua com 30rem,
centrada sobre o verde. Convite digital esticado em tela cheia perde a cara
de convite.

**Ornamentos desenhados à mão em SVG** — lacre, ramo de eucalipto e ícones.
Biblioteca de ícones traria centenas de desenhos para usar seis, e aqui o
peso importa: a pessoa abre no celular, às vezes com internet ruim.

O lacre tem contorno irregular de propósito. Cera derretida não faz círculo
perfeito, e um círculo perfeito entregaria o desenho como vetor.

**O ramo tem caule curvo e folhas alternadas**, decrescendo até a ponta. Ramo
simétrico de linha reta parece carimbo.

**`noindex`.** Convite não é para ser achado no Google — só quem recebe o
link entra. Em compensação, o Open Graph está completo, que é o que aparece
quando o link é colado no WhatsApp.

---

## O que foi conferido

| | |
|---|---|
| Contraste WCAG AA | **0 falhas** |
| Alvos de toque < 44px | **0** |
| Vazamento horizontal | nenhum |
| Build | limpo, estático |

A conta da rolagem foi medida: 0 → 0,25 → 0,50 → 0,75 → 1, linear e sem
retroceder, em 1299px de arrasto num telefone de 812px de altura.

### Uma armadilha que custou tempo

`page.tsx` só aceita as exportações que o Next conhece (`default`,
`metadata`, `viewport`…). Eu tinha exportado constantes de lá, e o
componente da capa **sumiu da página inteira**, sem erro nenhum no console
nem no terminal.

E a outra, que já apareceu em outros projetos: **nunca meça estilo logo
depois de mudá-lo por JavaScript.** O navegador não recalcula a tempo. Espere
dois `requestAnimationFrame`, ou recarregue.

---

*Next.js 16 · TypeScript · CSS puro · Sem dependência de runtime.*
