import React, { useState, useEffect, useRef } from 'react'
import './LandingPage.css'

// Hook para animação de troca de palavra
function useAnimatedWord(words: string[], interval = 2500) {
  const [idx, setIdx] = useState(0)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length)
        setAnimating(false)
      }, 350)
    }, interval)
    return () => clearInterval(t)
  }, [])

  return { word: words[idx], animating }
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '#sobre', label: 'Sobre' },
    { href: '#produtos', label: 'Produtos' },
    { href: '#arena', label: 'Arena' },
    { href: '#isis-agenda', label: 'Ísis Agenda' },
    { href: '#contato', label: 'Contato' },
  ]

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`} role="navigation" aria-label="Navegação principal">
      <div className="container navbar-inner">
        <a href="#hero" className="navbar-logo">
          <img src="/f7.png" alt="Fluxo7" className="navbar-logo-img" />
        </a>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <a href="#contato" className="btn btn-primary navbar-cta">Fale Conosco</a>

        <button
          className="navbar-burger"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu">
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="#contato" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Fale Conosco</a>
        </div>
      )}
    </nav>
  )
}

// ─── HERO ────────────────────────────────────────────────────────────────────
function Hero() {
  const words = ['Arenas', 'Salões', 'Studios', 'Negócios']
  const { word, animating } = useAnimatedWord(words)

  return (
    <section id="hero" className="hero-section">
      <div className="hero-bg-glow" aria-hidden="true" />
      <div className="hero-particles" aria-hidden="true">
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
            width: `${2 + Math.random() * 3}px`,
            height: `${2 + Math.random() * 3}px`,
          }} />
        ))}
      </div>

      <div className="container hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          Software de Gestão Inteligente
        </div>

        <h1 className="hero-title">
          Tecnologia que flui<br />
          para <span className={`gradient-text hero-word ${animating ? 'word-exit' : 'word-enter'}`}>{word}</span>
        </h1>

        <p className="hero-desc">
          A <strong>Fluxo7</strong> desenvolve softwares de gestão que simplificam
          o dia a dia de arenas esportivas e salões de beleza —
          com inteligência artificial, automação e design pensado para você.
        </p>

        <div className="hero-actions">
          <a href="#arena" className="btn btn-arena">
            <img src="/f7arena.png" alt="" className="btn-logo" />
            Fluxo7Arena
          </a>
          <a href="#isis-agenda" className="btn btn-isis">
            <img src="/isisagenda.png" alt="" className="btn-logo btn-logo-circle" />
            Ísis Agenda
          </a>
          <a href="#sobre" className="btn btn-outline">Saiba mais ↓</a>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>2</strong><span>Softwares</span>
          </div>
          <div className="hero-stat-sep" />
          <div className="hero-stat">
            <strong>1</strong><span>Assistente IA</span>
          </div>
          <div className="hero-stat-sep" />
          <div className="hero-stat">
            <strong>24h</strong><span>Disponível</span>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" aria-hidden="true">
        <span />
      </div>
    </section>
  )
}

// ─── SOBRE ───────────────────────────────────────────────────────────────────
function About() {
  const pillars = [
    { icon: '⚡', title: 'Inovação', desc: 'Soluções modernas com IA integrada e automações que eliminam trabalho repetitivo.' },
    { icon: '🎯', title: 'Simplicidade', desc: 'Interfaces pensadas para serem intuitivas, com curva de aprendizado mínima.' },
    { icon: '📈', title: 'Resultado', desc: 'Ferramentas que geram dados reais e ajudam você a tomar decisões mais inteligentes.' },
  ]

  return (
    <section id="sobre" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-text">
            <div className="tag tag-blue">✦ Sobre nós</div>
            <h2 className="section-title">
              Gestão que <span className="gradient-text">transforma</span> seu negócio
            </h2>
            <p className="section-desc" style={{ marginBottom: 24 }}>
              A <strong>Fluxo7</strong> nasceu para resolver um problema real: a falta de ferramentas
              acessíveis e completas para quem gerencia quadras esportivas e salões de beleza no Brasil.
            </p>
            <p className="section-desc">
              Desenvolvemos softwares com tecnologia de ponta — inteligência artificial, dashboards em
              tempo real e agendamento automático — para que você foque no que realmente importa:
              seu negócio e seus clientes.
            </p>
          </div>

          <div className="about-pillars">
            {pillars.map((p, i) => (
              <div key={i} className="glass-card pillar-card" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="pillar-icon">{p.icon}</div>
                <div>
                  <h3 className="pillar-title">{p.title}</h3>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── PRODUCTS ────────────────────────────────────────────────────────────────
function Products() {
  return (
    <section id="produtos" className="section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="tag tag-blue" style={{ margin: '0 auto 12px' }}>✦ Nossos Produtos</div>
          <h2 className="section-title">Duas soluções, um ecossistema</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Cada software foi desenhado para um segmento específico, mas ambos compartilham
            a mesma base tecnológica e a assistente virtual <strong>Ísis</strong>.
          </p>
        </div>

        <div className="products-grid">
          {/* ARENA */}
          <a href="#arena" className="product-card product-card-arena glass-card">
            <div className="product-card-header">
              <img src="/f7arena.png" alt="Fluxo7Arena" className="product-logo" />
              <div className="product-card-badge arena-badge">Gestão Esportiva</div>
            </div>
            <h3 className="product-name">Fluxo7Arena</h3>
            <p className="product-desc">
              Sistema completo para arenas esportivas — agendamento de quadras, PDV,
              gestão financeira, nota fiscal e agendamento via IA.
            </p>
            <ul className="product-features">
              {['Agenda Visual em Tempo Real', 'PDV & Balcão Integrado', 'Hub Fiscal (NF-Se)', 'Dashboard com KPIs', 'Agendamento via IA (Ísis)'].map(f => (
                <li key={f}><span className="feat-check arena-check">✓</span>{f}</li>
              ))}
            </ul>
            <div className="product-cta arena-cta">Ver detalhes →</div>
          </a>

          {/* ISIS AGENDA */}
          <a href="#isis-agenda" className="product-card product-card-isis glass-card">
            <div className="product-card-header">
              <img src="/isisagenda.png" alt="Ísis Agenda" className="product-logo product-logo-circle" />
              <div className="product-card-badge isis-badge">Gestão de Salões</div>
            </div>
            <h3 className="product-name">Ísis Agenda</h3>
            <p className="product-desc">
              Calendário profissional e agendamento automático para salões, studios,
              barbearias e clínicas — com IA disponível 24h para seus clientes.
            </p>
            <ul className="product-features">
              {['Calendário Semanal Profissional', 'Gestão de Equipe & Serviços', 'Agendamento via Chat IA (Ísis)', 'Controle Financeiro', 'App Instalável (PWA)'].map(f => (
                <li key={f}><span className="feat-check isis-check">✓</span>{f}</li>
              ))}
            </ul>
            <div className="product-cta isis-cta">Ver detalhes →</div>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── ARENA FEATURES ──────────────────────────────────────────────────────────
function ArenaFeatures() {
  const features = [
    {
      icon: '📅',
      title: 'Agenda Visual em Tempo Real',
      desc: 'Grade semanal interativa com agendamentos que atualizam automaticamente. Visualize quadras ocupadas, em andamento e disponíveis de um relance.',
      color: 'arena',
    },
    {
      icon: '🛒',
      title: 'PDV & Balcão Completo',
      desc: 'Ponto de venda integrado com mesas, comandas e produtos. Controle o consumo dos clientes durante a partida com praticidade.',
      color: 'arena',
    },
    {
      icon: '📊',
      title: 'Dashboard Inteligente',
      desc: 'Faturamento do dia, taxa de ocupação das quadras, comandas abertas e alertas — tudo na tela inicial, sem precisar procurar.',
      color: 'arena',
    },
    {
      icon: '🧾',
      title: 'Hub Fiscal Completo',
      desc: 'Emissão de NF-Se, importação de XML de notas de entrada e controle fiscal integrado à operação da arena.',
      color: 'arena',
    },
    {
      icon: '💰',
      title: 'Gestão Financeira',
      desc: 'Controle de caixa, recebimentos, despesas, finalizadoras com taxa percentual e relatório dos últimos 14 dias com gráfico de saldo.',
      color: 'arena',
    },
    {
      icon: '🤖',
      title: 'Ísis — Agendamento via IA',
      desc: 'Seus clientes agendam a quadra pelo celular via chat inteligente, sem precisar ligar. A Ísis identifica, confirma horário e registra tudo automaticamente.',
      color: 'arena',
    },
  ]

  return (
    <section id="arena" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div className="features-header">
          <img src="/fluxo7arenacomp.png" alt="Fluxo7Arena" className="features-header-logo" />
          <h2 className="section-title">
            Gestão completa para <span style={{ color: 'var(--arena-brand)' }}>sua arena</span>
          </h2>
          <p className="section-desc">
            Do agendamento ao financeiro, tudo em um único sistema pensado para quem vive o esporte.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card feature-card-arena">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="product-cta-block">
          <div className="media-placeholder media-placeholder-arena">
            <div className="media-placeholder-inner">
              <span className="media-icon">🏟️</span>
              <p>Screenshot do Dashboard Arena</p>
              <small>Adicione uma imagem aqui</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ISIS AGENDA FEATURES ────────────────────────────────────────────────────
function IsisAgendaFeatures() {
  const features = [
    { icon: '🗓️', title: 'Calendário Profissional', desc: 'Grade semanal com agendamentos por profissional, filtros por serviço e status automático em tempo real.' },
    { icon: '👥', title: 'Gestão de Clientes & Equipe', desc: 'CRM completo de clientes, cadastro de profissionais, serviços com duração e preço.' },
    { icon: '💳', title: 'Financeiro Integrado', desc: 'Controle de recebimentos, histórico financeiro e relatórios por profissional ou serviço.' },
    { icon: '⚙️', title: 'Configurações Avançadas', desc: 'Horários de funcionamento por dia da semana, regras de agendamento e personalização do calendário.' },
    { icon: '📱', title: 'App Instalável (PWA)', desc: 'Seus clientes instalam o app com o nome e logo do seu salão direto no celular, sem loja de apps.' },
    { icon: '🤖', title: 'Ísis — Chat 24h', desc: 'Agendamento automático via chat para seus clientes, com identificação por telefone, listagem de horários e confirmação instantânea.' },
  ]

  return (
    <section id="isis-agenda" className="section">
      <div className="container">
        <div className="features-header">
          <div className="features-header-isis-tag">
            <img src="/isisagenda.png" alt="Ísis Agenda" className="features-header-isis-icon" />
            <span>Ísis Agenda</span>
          </div>
          <h2 className="section-title">
            Agendamento inteligente para <span style={{ color: 'var(--isis-light)' }}>o seu negócio</span>
          </h2>
          <p className="section-desc">
            Para salões, studios, barbearias e clínicas que querem organização profissional com toque de tecnologia.
          </p>
        </div>

        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card glass-card feature-card-isis">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="product-cta-block">
          <div className="media-placeholder media-placeholder-isis">
            <div className="media-placeholder-inner">
              <span className="media-icon">💆</span>
              <p>Screenshot do Calendário Ísis Agenda</p>
              <small>Adicione uma imagem aqui</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── ISIS CHARACTER ───────────────────────────────────────────────────────────
function IsisCharacter() {
  const bullets = [
    'Identifica o cliente pelo telefone ou e-mail',
    'Lista horários disponíveis em tempo real',
    'Confirma e registra o agendamento automaticamente',
    'Funciona 24h por dia, 7 dias por semana',
    'Disponível como app instalável no celular',
    'Presente no Fluxo7Arena e no Ísis Agenda',
  ]

  return (
    <section id="isis" className="section isis-section">
      <div className="container">
        <div className="isis-grid">
          <div className="isis-images">
            <div className="isis-avatar-wrap">
              <div className="isis-ring isis-ring-1" />
              <div className="isis-ring isis-ring-2" />
              <div className="isis-ring isis-ring-3" />

              <div className="isis-duo">
                <div className="isis-avatar-card">
                  <img src="/isisfluxo7arena.png" alt="Ísis — Fluxo7Arena" className="isis-avatar-img" />
                  <div className="isis-avatar-label isis-label-arena">🏟️ Arena</div>
                </div>
                <div className="isis-avatar-card">
                  <img src="/isisagenda.png" alt="Ísis — Ísis Agenda" className="isis-avatar-img" />
                  <div className="isis-avatar-label isis-label-isis">💆 Agenda</div>
                </div>
              </div>
            </div>
          </div>

          <div className="isis-content">
            <div className="tag tag-blue">✨ Assistente Virtual</div>
            <h2 className="section-title">
              Conheça a <span className="gradient-text">Ísis</span>
            </h2>
            <p className="section-desc" style={{ marginBottom: 28 }}>
              A <strong>Ísis</strong> é a assistente virtual inteligente da Fluxo7. Presente nos dois sistemas,
              ela realiza agendamentos completos via chat de forma automática e humanizada —
              sem intervenção manual.
            </p>

            <ul className="isis-bullets">
              {bullets.map((b, i) => (
                <li key={i}>
                  <span className="isis-bullet-dot" />
                  {b}
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 32 }}>
              <a href="#arena" className="btn btn-arena">Ver na Arena</a>
              <a href="#isis-agenda" className="btn btn-isis">Ver no Ísis Agenda</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── CTA / CONTATO ────────────────────────────────────────────────────────────
function CallToAction() {
  const whatsNumber = '5534998936088'
  const whatsMsg = encodeURIComponent('Olá! Vim pelo site da Fluxo7 e gostaria de saber mais sobre os softwares.')
  const whatsUrl = `https://wa.me/${whatsNumber}?text=${whatsMsg}`
  const emailUrl = 'mailto:fluxo7finan@gmail.com'

  return (
    <section id="contato" className="section cta-section">
      <div className="cta-bg-gradient" aria-hidden="true" />
      <div className="container cta-content">
        <div className="tag tag-blue" style={{ margin: '0 auto 16px', display: 'table' }}>✦ Entre em Contato</div>
        <h2 className="section-title" style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 16px' }}>
          Pronto para <span className="gradient-text">transformar</span> seu negócio?
        </h2>
        <p className="section-desc" style={{ textAlign: 'center', margin: '0 auto 40px' }}>
          Fale com a nossa equipe e descubra qual solução é a ideal para você.
        </p>

        <div className="cta-cards">
          <a href={whatsUrl} target="_blank" rel="noopener noreferrer" className="cta-card cta-card-whats glass-card">
            <div className="cta-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
            </div>
            <div>
              <h3 className="cta-card-title">WhatsApp</h3>
              <p className="cta-card-sub">(34) 99893-6088</p>
            </div>
            <span className="cta-card-arrow">→</span>
          </a>

          <a href={emailUrl} className="cta-card cta-card-email glass-card">
            <div className="cta-card-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--f7-cyan)" strokeWidth="1.8">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 7 10-7" />
              </svg>
            </div>
            <div>
              <h3 className="cta-card-title">E-mail</h3>
              <p className="cta-card-sub">fluxo7finan@gmail.com</p>
            </div>
            <span className="cta-card-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="footer">
      <div className="divider" />
      <div className="container footer-inner">
        <div className="footer-brand">
          <img src="/fluxo7team.png" alt="Fluxo7" className="footer-logo" />
          <p className="footer-tagline">Tecnologia que flui.</p>
        </div>

        <div className="footer-links">
          <strong>Produtos</strong>
          <a href="#arena">Fluxo7Arena</a>
          <a href="#isis-agenda">Ísis Agenda</a>
          <a href="#isis">Assistente Ísis</a>
        </div>

        <div className="footer-links">
          <strong>Contato</strong>
          <a href="https://wa.me/5534998936088" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          <a href="mailto:fluxo7finan@gmail.com">E-mail</a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Fluxo7 — Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="divider" />
        <About />
        <div className="divider" />
        <Products />
        <ArenaFeatures />
        <div className="divider" />
        <IsisAgendaFeatures />
        <div className="divider" />
        <IsisCharacter />
        <div className="divider" />
        <CallToAction />
      </main>
      <Footer />
    </>
  )
}
