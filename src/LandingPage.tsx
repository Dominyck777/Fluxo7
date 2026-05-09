import { useState, useEffect } from 'react'
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

// ─── CAROUSEL ───────────────────────────────────────────────────────────────
function Carousel({ images, className = '' }: { images: string[], className?: string }) {
  const [current, setCurrent] = useState(0)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % images.length)
    }, 4000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <div className={`product-cta-block ${className}`}>
      <div className={`carousel-container ${className.includes('carousel-main') ? 'carousel-main' : ''}`}>
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="carousel-slide" onClick={() => setLightboxImg(img)}>
              <img src={img} alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>
        <div className="carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${current === i ? 'carousel-dot-active' : ''}`}
              onClick={() => setCurrent(i)}
            />
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)}>
          <img src={lightboxImg} className="lightbox-content" alt="Zoom" />
        </div>
      )}
    </div>
  )
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
  const words = ['Quadras', 'Salões', 'Studios', 'Negócios']
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
          o dia a dia de Quadras esportivas e Studios —
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
              Sistema completo para Quadras esportivas — agendamento de quadras, PDV,
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
  // Variáveis das imagens (pode alterar os nomes aqui)
  const arenaImg1 = '/arena1.png'
  const arenaImg2 = '/arena2.png'
  const arenaImg3 = '/arena3.png'

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

        <Carousel images={[arenaImg1, arenaImg2, arenaImg3]} className="carousel-main" />
      </div>
    </section>
  )
}

// ─── ISIS AGENDA FEATURES ────────────────────────────────────────────────────
function IsisAgendaFeatures() {
  // Variáveis das imagens (pode alterar os nomes aqui)
  const isisImg1 = '/isis1.png'
  const isisImg2 = '/isis2.png'
  const isisImg3 = '/isis3.png'

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
            <div className="tag-icon-wrap">
              <img src="/isisagenda.png" alt="Ísis Agenda" className="features-header-isis-icon" />
            </div>
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

        <Carousel images={[isisImg1, isisImg2, isisImg3]} className="carousel-main" />
      </div>
    </section>
  )
}

// ─── MOCKUP ISIS CHAT ──────────────────────────────────────────────────────────
function MockupIsisChat({ type, avatar, title, msg, companyLogo, companyName, bottomLogo }: any) {
  const isArena = type === 'arena';

  const themeColor = isArena ? '#f59e0b' : '#0ea5e9';
  const themeLight = isArena ? 'rgba(245, 158, 11, 0.15)' : 'rgba(14, 165, 233, 0.15)';
  const themeBorder = isArena ? 'rgba(245, 158, 11, 0.4)' : 'rgba(14, 165, 233, 0.4)';
  const bubbleBg = isArena ? '#fbbf24' : '#0ea5e9';

  return (
    <div className={`mockup-isis-chat ${type}-theme`}>
      <div className="fluid-bg">
        <div className={`fluid-blob blob-1 ${type}-blob-1`}></div>
        <div className={`fluid-blob blob-2 ${type}-blob-2`}></div>
        <div className={`fluid-blob blob-3 ${type}-blob-3`}></div>
      </div>

      <div className="isis-header">
        <div className="header-left">
          <div className="avatar-wrapper">
            <div style={{ width: 38, height: 38, borderRadius: '50%', border: `2px solid ${themeColor}`, overflow: 'hidden', boxShadow: '0 0 10px rgba(255,255,255,0.2)' }}>
              <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isArena ? 'none' : 'scale(1.5)' }} alt="Isis" />
            </div>
            <div className="online-dot"></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontWeight: 600, fontSize: '1.05rem', lineHeight: '1.2' }}>Ísis</span>
            {isArena ? (
              <span className="badge-chat arena-badge-chat" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.3)', color: '#f59e0b' }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                chat
              </span>
            ) : (
              <span className="badge-chat agenda-badge-chat" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#38bdf8' }}></div>
                CHAT
              </span>
            )}
          </div>
        </div>
        <div className="header-right">
          <div className="pill-company" style={{ border: `1px solid ${themeBorder}`, background: themeLight, boxShadow: `0 0 12px ${themeBorder}` }}>
            <img src={companyLogo} alt={companyName} />
            <span>{companyName}</span>
          </div>
        </div>
      </div>

      <div className="chat-window">
        <div className="chat-content">
          <div className="chat-line isis-line">
            <div style={{ width: 36, height: 36, borderRadius: '50%', border: `2px solid rgba(255,255,255,0.8)`, overflow: 'hidden', marginRight: 8, marginTop: 10, flexShrink: 0 }}>
              <img src={avatar} style={{ width: '100%', height: '100%', objectFit: 'cover', transform: isArena ? 'none' : 'scale(1.5)' }} alt="Isis" />
            </div>
            <div className={`chat-bubble isis ${isArena ? 'arena-bubble' : 'agenda-bubble'}`}>
              {msg}
              <div className="bubble-time" style={{ color: isArena ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.6)' }}>12:27</div>
            </div>
          </div>
        </div>
      </div>

      <div className="chat-footer">
        <div className="chat-input-wrapper" style={{ borderRadius: '16px', padding: '16px', background: '#121214', border: '1px solid #27272a' }}>
          <svg width="20" height="20" fill="none" stroke="#52525b" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.273-3.973-6.869-6.869l1.293-.97c.362-.271.527-.733.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
          <input type="text" placeholder="(00) 00000-0000" disabled style={{ color: '#52525b' }} />
          <button className="send-btn" disabled>
            <svg width="20" height="20" fill="none" stroke="#52525b" strokeWidth={2} viewBox="0 0 24 24" style={{ transform: 'rotate(45deg) translate(-2px, 2px)' }}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
          </button>
        </div>
        <button className="text-btn" style={{ color: themeColor, fontSize: '0.9rem', marginTop: '4px' }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
          Prefiro usar e-mail
        </button>
      </div>

      <div className="isis-footer-brand" style={{ display: 'flex', justifyContent: 'center', padding: '16px 0 24px', background: '#000' }}>
        <img src={bottomLogo} alt="Logo" style={{ height: '56px', opacity: 0.9 }} />
      </div>
    </div>
  )
}

function MockupIsisChatCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent(c => (c + 1) % 2);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        display: 'flex',
        width: '200%',
        height: '100%',
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        transform: `translateX(-${current * 50}%)`
      }}>
        <div style={{ width: '50%', height: '100%' }}>
          <MockupIsisChat
            type="agenda"
            avatar="/isisagenda.png"
            companyLogo="/salaologo.jfif"
            companyName="Hair Style"
            bottomLogo="/fluxo7team.png"
            title="Ísis Agenda"
            msg={
              <>Opa! <strong>Boa noite!</strong> 🎤 <strong>Ísis</strong> aqui, sua assistente virtual da <strong>Hair Style Beauty</strong>!<br /><br />
                Vamos <strong>marcar seu horário</strong>? É rapidinho!<br /><br />
                Me informa seu <strong>telefone</strong> ou <strong>e-mail</strong> para começarmos:</>
            }
          />
        </div>
        <div style={{ width: '50%', height: '100%' }}>
          <MockupIsisChat
            type="arena"
            avatar="/isisfluxo7arena.png"
            companyLogo="/quadralogo.png"
            companyName="Quadra Prime"
            bottomLogo="/fluxo7team.png" /* alterado para fluxo7team conforme pedido */
            title="Fluxo7Arena"
            msg={
              <>Boa tarde! Tudo bem? 😊<br /><br />
                Sou a <strong>Ísis</strong>, assistente virtual da <strong>Quadra Prime</strong> e estou aqui para tornar seu <strong>agendamento</strong> super fácil!<br /><br />
                Para começar, qual seu <strong>telefone</strong> ou <strong>e-mail</strong>?</>
            }
          />
        </div>
      </div>
      <div className="carousel-dots" style={{ bottom: '6px', zIndex: 30 }}>
        <button className={`carousel-dot ${current === 0 ? 'carousel-dot-active' : ''}`} onClick={() => setCurrent(0)} />
        <button className={`carousel-dot ${current === 1 ? 'carousel-dot-active' : ''}`} onClick={() => setCurrent(1)} />
      </div>
    </div>
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
            <div className="isis-mobile-mockup">
              <div className="isis-mobile-inner">
                <MockupIsisChatCarousel />
              </div>
            </div>
          </div>

          <div className="isis-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, flexWrap: 'wrap' }}>
              <div>
                <div className="tag tag-blue">✨ Assistente Virtual</div>
                <h2 className="section-title" style={{ marginBottom: 0 }}>
                  Conheça a <span className="gradient-text">Ísis</span>
                </h2>
              </div>

              <div className="isis-duo-mini">
                <div className="avatar-img-wrap mini">
                  <img src="/isisfluxo7arena.png" alt="" className="isis-avatar-img" />
                </div>
                <div className="avatar-img-wrap mini">
                  <img src="/isisagenda.png" alt="" className="isis-avatar-img" />
                </div>
              </div>
            </div>

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
              <a
                href={`https://wa.me/5534998936088?text=${encodeURIComponent('Olá! Tenho interesse no Fluxo7Arena.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-arena"
              >
                <img src="/f7arena.png" alt="" className="btn-logo" />
                Quero o Fluxo7Arena
              </a>
              <a
                href={`https://wa.me/5534998936088?text=${encodeURIComponent('Olá! Tenho interesse no Ísis Agenda.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-isis"
              >
                <img src="/isisagenda.png" alt="" className="btn-logo btn-logo-circle" />
                Quero o Ísis Agenda
              </a>
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
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
      <div className="footer-glow" aria-hidden="true" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand-col">
            <img src="/fluxo7team.png" alt="Fluxo7" className="footer-logo-main" style={{ height: '110px', objectFit: 'contain', objectPosition: 'left center', transform: 'scale(1.2)', transformOrigin: 'left center' }} />
            <p className="footer-desc-text">
              Transformando negócios com tecnologia inteligente e automação.
              Sua gestão em um novo fluxo.
            </p>
            <div className="footer-socials">
              <a href="https://wa.me/5534998936088" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              </a>
              <a href="mailto:fluxo7finan@gmail.com" aria-label="E-mail">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 7 10-7" /></svg>
              </a>
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="footer-link-group">
              <h4 className="footer-link-title">Produtos</h4>
              <a href="#arena">Fluxo7Arena</a>
              <a href="#isis-agenda">Ísis Agenda</a>
              <a href="#isis">Assistente Ísis</a>
            </div>
            <div className="footer-link-group">
              <h4 className="footer-link-title">Empresa</h4>
              <a href="#sobre">Sobre nós</a>
              <a href="#produtos">Soluções</a>
              <a href="#contato">Contato</a>
            </div>
            <div className="footer-link-group">
              <h4 className="footer-link-title">Suporte</h4>
              <a href="https://wa.me/5534998936088">Dúvidas</a>
              <a href="https://wa.me/5534998936088">Comercial</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Fluxo7 Team. Todos os direitos reservados.</p>
          <div className="footer-bottom-links">
            <span>Tecnologia que flui.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── FLOATING WHATSAPP ───────────────────────────────────────────────────────
function FloatingWhatsApp() {
  const message = "Olá! Vim pelo site da Fluxo7 e tenho interesse nas soluções.";
  const url = `https://wa.me/5534998936088?text=${encodeURIComponent(message)}`;

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="Falar no WhatsApp">
      <div className="whatsapp-icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </div>
      <div className="whatsapp-tooltip">Fale com a gente!</div>
    </a>
  );
}

// ─── LANDING PAGE ────────────────────────────────────────────────────────────
export default function LandingPage() {
  useEffect(() => {
    // Função para scroll suave
    const scrollToSection = (id: string) => {
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    };

    // 1. Verificar Pathname (Clean URLs)
    const path = window.location.pathname.toLowerCase();
    if (path === '/fluxo7arena') {
      scrollToSection('arena');
    } else if (path === '/isisagenda') {
      scrollToSection('isis-agenda');
    } else {
      // 2. Verificar parâmetro de query '?p=...'
      const params = new URLSearchParams(window.location.search);
      const product = params.get('p');
      if (product === 'arena') {
        scrollToSection('arena');
      } else if (product === 'isis' || product === 'isis-agenda') {
        scrollToSection('isis-agenda');
      } else {
        // 3. Verificar o hash '#...'
        const hash = window.location.hash.replace('#', '');
        if (hash) {
          scrollToSection(hash);
        }
      }
    }
  }, []);

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
      <FloatingWhatsApp />
    </>
  )
}
