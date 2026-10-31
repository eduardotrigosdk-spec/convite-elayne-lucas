import Image from 'next/image'
import Envelope from './Envelope'
import Contagem from './Contagem'
import {
  Ramo, IconeLocal, IconePresenca, IconePresente, IconeTraje, IconeCalendario, Seta,
} from './enfeites'

/* ═══ TROQUE AQUI ═══════════════════════════════════════════════════════════
   Tudo que é informação do casamento mora neste bloco. Os nomes dos pais e
   os textos dos cartões são provisórios — é só substituir.
   ═════════════════════════════════════════════════════════════════════════ */

const NOIVA = 'Elayne'
const NOIVO = 'Lucas Gabriel'

// Com o fuso -03:00 declarado. Sem ele, quem abrisse de outro estado veria a
// contagem regressiva errada.
const QUANDO = '2027-05-15T17:30:00-03:00'
const DIA = '15'
const MES = 'Maio'
const ANO = '2027'
const SEMANA = 'Sábado'
const HORA = '17:30h'

const IGREJA = 'Paróquia Nossa Senhora da Conceição'
const ENDERECO = 'Sen. Carlos Jereissati, Pacatuba — CE, 61800-000'

const PAIS_NOIVA = ['— nome da mãe —', '— nome do pai —']
const PAIS_NOIVO = ['— nome da mãe —', '— nome do pai —']

const WHATSAPP_CONFIRMA = '5585988594548'   // para onde vão as confirmações

/* ═════════════════════════════════════════════════════════════════════════ */

const BUSCA = encodeURIComponent(`${IGREJA}, ${ENDERECO}`)
const MAPA_EMBED = `https://www.google.com/maps?q=${BUSCA}&hl=pt-BR&z=16&output=embed`
const MAPA_LINK = `https://www.google.com/maps/search/?api=1&query=${BUSCA}`
const ROTA = `https://www.google.com/maps/dir/?api=1&destination=${BUSCA}`

const CONFIRMA = `https://wa.me/${WHATSAPP_CONFIRMA}?text=${encodeURIComponent(
  `Olá! Confirmo minha presença no casamento de ${NOIVA} e ${NOIVO}. Meu nome é `
)}`

const INFOS = [
  {
    Icone: IconeLocal,
    nome: 'Saiba como chegar',
    nota: 'Rota pelo Google Maps',
    href: ROTA,
    externo: true,
  },
  {
    Icone: IconePresenca,
    nome: 'Confirmar presença',
    nota: 'Até 15 de abril',
    href: CONFIRMA,
    externo: true,
  },
  {
    Icone: IconePresente,
    nome: 'Para nos presentear',
    nota: 'Lista e chave Pix',
    href: '#presentes',
    externo: false,
  },
  {
    Icone: IconeTraje,
    nome: 'Dress code',
    nota: 'Traje social',
    href: '#traje',
    externo: false,
  },
]

export default function Pagina() {
  return (
    <>
      <Envelope />

      <main className="folha">
        {/* ── Foto ─────────────────────────────────────────────────────── */}
        <div className="foto">
          <Image
            src="/igreja.webp"
            alt={`${IGREJA}, em Pacatuba`}
            width={1064}
            height={1478}
            priority
            sizes="(max-width: 30rem) 100vw, 30rem"
          />
        </div>

        {/* ── Versículo ────────────────────────────────────────────────── */}
        <section className="bloco ar-p">
          <p className="versiculo revela">
            “O amor tudo sofre, tudo crê, tudo espera, tudo suporta.”
            <cite>1 Coríntios 13:7</cite>
          </p>
        </section>

        {/* ── Pais ─────────────────────────────────────────────────────── */}
        <section className="bloco revela">
          <div className="filete"><span /></div>
          <p className="rotulo">Com a bênção de nossos pais</p>
          <div className="pais">
            <div>
              {PAIS_NOIVA.map((n) => <p key={n}>{n}</p>)}
            </div>
            <div>
              {PAIS_NOIVO.map((n) => <p key={n}>{n}</p>)}
            </div>
          </div>
        </section>

        {/* ── Nomes ────────────────────────────────────────────────────── */}
        <section className="bloco ar">
          <h1 className="nomes revela">
            <span>{NOIVA}</span>
            <span className="e">&amp;</span>
            <span>{NOIVO}</span>
          </h1>
          <Ramo className="ramo ramo--med revela" style={{ marginTop: '1.5rem' }} />
        </section>

        {/* ── Faixa ────────────────────────────────────────────────────── */}
        <p className="faixa revela">
          Convidamos você para o nosso casamento
        </p>

        {/* ── Data ─────────────────────────────────────────────────────── */}
        <section className="bloco ar">
          <p className="texto revela" style={{ marginBottom: '1.75rem' }}>
            A realizar-se em…
          </p>

          <div className="data revela">
            <p className="data__mes">{MES}</p>
            <p className="data__linha">
              <span className="data__lado">{SEMANA}</span>
              <span className="data__dia">{DIA}</span>
              <span className="data__lado">{HORA}</span>
            </p>
            <p className="data__ano">{ANO}</p>
          </div>

          <div className="filete"><span /></div>

          <Contagem quando={QUANDO} />
        </section>

        {/* ── Local ────────────────────────────────────────────────────── */}
        <section className="bloco ar-p revela" id="local">
          <p className="rotulo" style={{ marginBottom: '1rem' }}>Onde será</p>
          <h2 className="local__nome">{IGREJA}</h2>
          <p className="local__endereco">{ENDERECO}</p>

          <div className="mapa">
            <iframe
              src={MAPA_EMBED}
              title={`Mapa da ${IGREJA}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <div className="acoes">
            <a className="botao botao--cheio" href={ROTA} target="_blank" rel="noopener noreferrer">
              <IconeLocal />
              Traçar rota
            </a>
            <a className="botao botao--vazio" href={MAPA_LINK} target="_blank" rel="noopener noreferrer">
              Ver no mapa
              <Seta />
            </a>
          </div>
        </section>

        {/* ── Cartões ──────────────────────────────────────────────────── */}
        <section className="bloco ar-p revela">
          <p className="escrita toque" aria-hidden="true">toque para interagir</p>

          <div className="infos">
            {INFOS.map(({ Icone, nome, nota, href, externo }) => (
              <a
                className="info"
                key={nome}
                href={href}
                {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <span className="info__icone"><Icone /></span>
                <span className="info__nome">
                  {nome}
                  <span className="info__nota">{nota}</span>
                </span>
                <Seta className="info__seta" />
                {externo && <span className="oculto-visual">(abre em nova aba)</span>}
              </a>
            ))}
          </div>
        </section>

        {/* ── Presentes ────────────────────────────────────────────────── */}
        <section className="bloco ar-p revela" id="presentes">
          <div className="filete"><span /></div>
          <p className="rotulo" style={{ marginBottom: '1rem' }}>Para nos presentear</p>
          <p className="texto">
            A sua presença já é o nosso maior presente. Mas se quiser nos
            ajudar a começar essa história, deixamos uma chave Pix e uma lista
            com algumas ideias.
          </p>
          <p className="texto provisorio">— chave Pix e link da lista entram aqui —</p>
        </section>

        {/* ── Traje ────────────────────────────────────────────────────── */}
        <section className="bloco ar-p revela" id="traje">
          <div className="filete"><span /></div>
          <p className="rotulo" style={{ marginBottom: '1rem' }}>Dress code</p>
          <p className="texto">
            Traje social. Pedimos carinhosamente que reservem o branco para a
            noiva, e o verde-musgo para os padrinhos.
          </p>
        </section>

        {/* ── Confirmação ──────────────────────────────────────────────── */}
        <section className="bloco ar-p revela">
          <div className="filete"><span /></div>
          <p className="rotulo" style={{ marginBottom: '1rem' }}>Confirme sua presença</p>
          <p className="texto" style={{ marginBottom: '1.5rem' }}>
            Para organizarmos tudo com carinho, pedimos que confirme até{' '}
            <strong>15 de abril de 2027</strong>.
          </p>
          <div className="acoes">
            <a className="botao botao--cheio" href={CONFIRMA} target="_blank" rel="noopener noreferrer">
              <IconeCalendario />
              Confirmar presença
            </a>
          </div>
        </section>

        {/* ── Encerramento ─────────────────────────────────────────────── */}
        <footer className="fim">
          <Ramo className="fim__ramo" />
          <p className="fim__escrita" style={{ marginBottom: '0.5rem' }}>
            Esperamos por você
          </p>
          <p className="fim__nota">
            {NOIVA} &amp; {NOIVO} · {DIA} de {MES.toLowerCase()} de {ANO}
          </p>
        </footer>
      </main>
    </>
  )
}
