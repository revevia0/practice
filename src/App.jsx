import { useRef, useState } from 'react'

const solutionItems = [
  'Budget review',
  'Escrow audit',
  'Financial audit',
  'Interim audit',
  'Property budget preparation',
]

const toolItems = [
  'Purchase-order extraction',
  'Vouching automation',
  'Expense working automation',
  'Financial report review',
  'Tender verification',
  'Reconciliation',
]

const stages = [
  {
    name: 'Read',
    eyebrow: '01 / READ THE DOCUMENT',
    title: 'Details, captured.',
    copy: 'Figures and terms are lifted from the source document into a structured starting point.',
    status: 'Fields extracted',
    rows: [
      ['Document', 'Purchase order'],
      ['Reference', 'PO-1048'],
      ['Supplier', 'Sample supplier'],
      ['Total', 'AED 18,450.00'],
    ],
  },
  {
    name: 'Compare',
    eyebrow: '02 / COMPARE AND MATCH',
    title: 'Records, connected.',
    copy: 'The extracted details are compared with the records they need to agree with.',
    status: 'Comparison prepared',
    rows: [
      ['PO total', 'AED 18,450.00'],
      ['Invoice total', 'AED 18,450.00'],
      ['Supplier', 'Matched'],
      ['Reference', 'Matched'],
    ],
  },
  {
    name: 'Check',
    eyebrow: '03 / CHECK THE RULES',
    title: 'Exceptions, surfaced.',
    copy: 'Agreed rules bring missing details, duplicates and differences into view.',
    status: '1 item for review',
    rows: [
      ['Amount', 'Within limit'],
      ['Supplier', 'Matched'],
      ['Approval', 'Needs review'],
      ['Duplicate check', 'Clear'],
    ],
  },
  {
    name: 'Prepare',
    eyebrow: '04 / PREPARE A DRAFT',
    title: 'Your review, ready.',
    copy: 'A draft working is prepared with the open question still visible for a person to decide.',
    status: 'Draft prepared',
    rows: [
      ['Document', 'PO-1048'],
      ['Checks passed', '3 of 4'],
      ['Open item', 'Approval'],
      ['Final decision', 'Your team'],
    ],
  },
]

function ArrowIcon({ diagonal = false, size = 18 }) {
  return diagonal ? (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4.5 4.5L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FileIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 2.75h8l4 4v14.5H6a2 2 0 0 1-2-2v-16a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14 3v4h4M8 12h7M8 16h7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeStage, setActiveStage] = useState(0)
  const [draft, setDraft] = useState('')
  const [copied, setCopied] = useState(false)
  const stageRefs = useRef([])
  const stage = stages[activeStage]

  function handleStageKeyDown(event, index) {
    let next = index
    if (event.key === 'ArrowRight') next = (index + 1) % stages.length
    else if (event.key === 'ArrowLeft') next = (index - 1 + stages.length) % stages.length
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = stages.length - 1
    else return
    event.preventDefault()
    setActiveStage(next)
    stageRefs.current[next]?.focus()
  }

  function handleContact(event) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const message = [
      'Endloops demo enquiry',
      '',
      'Name: ' + values.name,
      'Email: ' + values.email,
      'Team: ' + values.team,
      '',
      'What we would like to discuss:',
      values.message,
    ].join('\n')
    setDraft(message)
    setCopied(false)
    window.location.href =
      'mailto:info@alkazimca.com?subject=' +
      encodeURIComponent('Endloops demo enquiry') +
      '&body=' +
      encodeURIComponent(message)
  }

  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft)
      setCopied(true)
    } catch {
      setCopied(false)
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="#top" aria-label="Endloops, back to top" onClick={() => setMenuOpen(false)}>
            <img src="/endloops-logo.jpg" alt="Endloops" width="168" height="49" />
          </a>
          <nav className={'site-nav ' + (menuOpen ? 'is-open' : '')} aria-label="Main navigation" id="site-navigation">
            <a href="#approach" onClick={() => setMenuOpen(false)}>Our approach</a>
            <a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions & tools</a>
            <a href="#demo" onClick={() => setMenuOpen(false)}>See it work</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className="nav-mobile-cta" href="#contact" onClick={() => setMenuOpen(false)}>Request a demo <ArrowIcon diagonal size={16} /></a>
          </nav>
          <a className="button button-dark header-cta" href="#contact">Request a demo <ArrowIcon diagonal size={16} /></a>
          <button
            type="button"
            className="menu-toggle"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span />
          </button>
        </div>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="shell hero-grid">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot" /> Automation for financial professionals</div>
              <h1 id="hero-title">Let the work move.<br /><span>Keep the judgement.</span></h1>
              <p>Endloops prepares the repetitive work behind accounting, audit and property finance, so your team can focus on the decisions that matter.</p>
              <div className="hero-actions">
                <a className="button button-green" href="#solutions">Explore what we build <ArrowIcon size={18} /></a>
                <a className="text-link" href="#demo">See the approach <ArrowIcon diagonal size={17} /></a>
              </div>
              <div className="hero-note"><span className="note-line" /> Built in Dubai. Designed for the details.</div>
            </div>
            <div className="hero-art" aria-label="Illustration of source documents being prepared by Endloops for a professional to review">
              <div className="hero-art-glow" />
              <div className="workspace-card">
                <div className="workspace-header">
                  <span className="workspace-brand"><span className="mark-orbit">∞</span> ENDLOOPS / WORKSPACE</span>
                  <span className="live-pill"><span /> WORK IN PROGRESS</span>
                </div>
                <div className="workspace-heading">
                  <div>
                    <span className="micro-label">A CLEARER WAY THROUGH</span>
                    <h2>From document<br />to decision.</h2>
                  </div>
                  <div className="workspace-index">01—03</div>
                </div>
                <div className="flow-row flow-input">
                  <div className="flow-icon"><FileIcon size={21} /></div>
                  <div className="flow-main"><strong>Source documents</strong><span>Invoices · ledgers · statements</span></div>
                  <span className="flow-tag">INPUT</span>
                </div>
                <div className="flow-connector"><span /><span /><span /></div>
                <div className="flow-row flow-process">
                  <div className="flow-icon green"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M3 13h5l3-7 3 12 3-7h4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                  <div className="flow-main"><strong>Endloops prepares</strong><span>Read · match · check · draft</span></div>
                  <span className="flow-pulse"><span /></span>
                </div>
                <div className="flow-connector"><span /><span /><span /></div>
                <div className="flow-row flow-review">
                  <div className="flow-icon navy"><CheckIcon size={20} /></div>
                  <div className="flow-main"><strong>Your team reviews</strong><span>Every final decision stays with you</span></div>
                  <span className="flow-tag teal">HUMAN SIGN-OFF</span>
                </div>
              </div>
              <span className="art-caption">01 / The Endloops principle</span>
            </div>
          </div>
        </section>

        <section className="audience-strip" aria-label="Who Endloops is for">
          <div className="shell audience-inner">
            <p>BUILT FOR THE PEOPLE BEHIND THE NUMBERS</p>
            <div className="audience-list">
              <span>Accountants</span><span>Auditors</span><span>Finance teams</span><span>Property managers</span>
            </div>
          </div>
        </section>

        <section className="section approach-section" id="approach" aria-labelledby="approach-title">
          <div className="shell">
            <div className="section-topline"><span>01 / OUR APPROACH</span><span>MORE SPACE FOR HUMAN JUDGEMENT</span></div>
            <div className="section-heading-row">
              <h2 id="approach-title">The groundwork, done.<br /><em>The thinking, yours.</em></h2>
              <p>Financial work asks for accuracy and attention. We take on the repeated steps, then make the result clear enough for a professional to question, refine and approve.</p>
            </div>
            <div className="approach-grid">
              <article className="approach-item">
                <span className="step-number">01</span>
                <div className="step-rule"><span /></div>
                <h3>Read the detail</h3>
                <p>Bring figures and terms out of documents, even when the volume is high.</p>
              </article>
              <article className="approach-item">
                <span className="step-number">02</span>
                <div className="step-rule"><span /></div>
                <h3>Find what matters</h3>
                <p>Compare records and flag differences, missing items or anything outside the rules.</p>
              </article>
              <article className="approach-item">
                <span className="step-number">03</span>
                <div className="step-rule"><span /></div>
                <h3>Review with confidence</h3>
                <p>Receive prepared drafts and working papers, with the final sign-off in your hands.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="section offerings-section" id="solutions" aria-labelledby="offerings-title">
          <div className="shell">
            <div className="section-topline"><span>02 / WHAT WE BUILD</span><span>ONE PARTNER. TWO WAYS TO START.</span></div>
            <div className="offerings-intro">
              <h2 id="offerings-title">The right scope<br />for the work.</h2>
              <p>Take a whole process from intake to review, or give one stubborn task its own focused tool.</p>
            </div>
            <div className="offerings-grid">
              <article className="offering-card solution-card">
                <div className="offering-top"><span className="offering-kind">01 / COMPLETE WORKFLOWS</span><span className="offering-symbol">↗</span></div>
                <div className="offering-visual solution-visual" aria-hidden="true">
                  <div className="mini-doc"><i /><i /><i /></div><span className="mini-route"><b /><b /><b /></span><div className="mini-output"><CheckIcon size={19} /><i /><i /></div>
                </div>
                <h3>End-to-end solutions</h3>
                <p>Software that prepares an entire financial process, from the first input to a draft ready for professional review.</p>
                <div className="offering-divider" />
                <span className="list-label">EXAMPLES OF FULL PROCESSES</span>
                <ul className="product-list">
                  {solutionItems.map((item) => <li key={item}><span>{item}</span><ArrowIcon diagonal size={15} /></li>)}
                </ul>
              </article>
              <article className="offering-card tool-card" id="tools">
                <div className="offering-top"><span className="offering-kind">02 / FOCUSED CAPABILITIES</span><span className="offering-symbol">↗</span></div>
                <div className="offering-visual tool-visual" aria-hidden="true">
                  <div className="mini-target"><span /><span /><span /></div>
                  <div className="mini-tool-card"><span>PO</span><i /><i /></div>
                </div>
                <h3>Standalone tools</h3>
                <p>Focused products that take one specific task off your team's list, on their own or alongside an existing workflow.</p>
                <div className="offering-divider" />
                <span className="list-label">EXAMPLES OF FOCUSED TOOLS</span>
                <ul className="product-list">
                  {toolItems.map((item) => <li key={item}><span>{item}</span><ArrowIcon diagonal size={15} /></li>)}
                </ul>
              </article>
            </div>
            <p className="availability-note">The portfolio is growing; some products are in use and others are in development.</p>
          </div>
        </section>

        <section className="section demo-section" id="demo" aria-labelledby="demo-title">
          <div className="shell">
            <div className="section-topline"><span>03 / SEE THE APPROACH</span><span>AN ILLUSTRATIVE EXAMPLE</span></div>
            <div className="demo-heading">
              <div><h2 id="demo-title">From a document<br />to a clearer next step.</h2><p>Step through a sample purchase order. The example shows how Endloops could prepare the work while keeping the review with your team.</p></div>
              <span className="demo-disclaimer">Illustrative sample data</span>
            </div>
            <div className="demo-tabs" role="tablist" aria-label="Purchase order workflow stages">
              {stages.map((item, index) => (
                <button
                  key={item.name}
                  ref={(node) => { stageRefs.current[index] = node }}
                  type="button"
                  role="tab"
                  id={'stage-tab-' + index}
                  aria-controls="stage-panel"
                  aria-selected={activeStage === index}
                  tabIndex={activeStage === index ? 0 : -1}
                  className={activeStage === index ? 'stage-tab active' : 'stage-tab'}
                  onClick={() => setActiveStage(index)}
                  onKeyDown={(event) => handleStageKeyDown(event, index)}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>{item.name}
                </button>
              ))}
            </div>
            <div className="demo-workspace" role="tabpanel" id="stage-panel" aria-labelledby={'stage-tab-' + activeStage}>
              <div className="sample-document">
                <div className="sample-doc-top"><span>DOCUMENT / 001</span><FileIcon size={19} /></div>
                <div className="sample-doc-title">Purchase<br />order</div>
                <div className="sample-doc-meta"><span>REFERENCE</span><strong>PO-1048</strong></div>
                <div className="sample-line"><span>Supplier</span><strong>Sample supplier</strong></div>
                <div className="sample-line"><span>Services</span><strong>Facilities support</strong></div>
                <div className="sample-line"><span>Approval</span><strong>Pending</strong></div>
                <div className="sample-total"><span>TOTAL</span><strong>AED 18,450.00</strong></div>
                <div className="sample-stamp">SAMPLE DOCUMENT</div>
              </div>
              <div className="demo-arrow" aria-hidden="true"><ArrowIcon size={24} /></div>
              <div className="stage-result" key={activeStage}>
                <div className="stage-result-top"><span className="micro-label">{stage.eyebrow}</span><span className="result-dot" /></div>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
                <div className="result-table">
                  {stage.rows.map(([label, value]) => (
                    <div className="result-row" key={label}><span>{label}</span><strong className={value === 'Needs review' || value === 'Approval' ? 'needs-review' : ''}>{value}</strong></div>
                  ))}
                </div>
                <div className="result-footer"><span><CheckIcon size={16} /> {stage.status}</span><button type="button" onClick={() => setActiveStage((activeStage + 1) % stages.length)} aria-label={activeStage === stages.length - 1 ? 'Restart workflow' : 'Next workflow stage'}><ArrowIcon size={18} /></button></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section about-section" id="about" aria-labelledby="about-title">
          <div className="shell about-grid">
            <div className="about-left"><span className="section-kicker">04 / WHY ENDLOOPS</span><h2 id="about-title">Built close<br />to the work.</h2><div className="about-orbit" aria-hidden="true"><span>∞</span></div></div>
            <div className="about-right">
              <p className="about-lead">Endloops grew out of the technology department of Alkazim, a Dubai accounting and audit firm.</p>
              <p>That grounding shapes the way we build: practical automation for detailed, time-sensitive financial work, with clarity and human oversight at every step.</p>
              <div className="about-principles"><div><span>01</span><strong>Prepared by software</strong></div><div><span>02</span><strong>Decided by people</strong></div></div>
            </div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="shell contact-grid">
            <div className="contact-copy"><span className="section-kicker">05 / GET IN TOUCH</span><h2 id="contact-title">What could your team do with the time back?</h2><p>Tell us about the task or process you want to improve. We’ll help you frame a conversation around the work that matters most.</p><span className="contact-accent" aria-hidden="true">↗</span></div>
            <form className="contact-form" onSubmit={handleContact}>
              <div className="form-header"><span>REQUEST A DEMO</span><span>01 / 01</span></div>
              <div className="form-row"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="Your name" required /></div>
              <div className="form-row"><label htmlFor="email">Work email</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></div>
              <div className="form-row"><label htmlFor="team">Your team</label><select id="team" name="team" required defaultValue=""><option value="" disabled>Select your team</option><option>Accounting</option><option>Audit</option><option>Finance</option><option>Property management</option><option>Other</option></select></div>
              <div className="form-row"><label htmlFor="message">What would you like to improve?</label><textarea id="message" name="message" rows="3" placeholder="A task, workflow or challenge..." required /></div>
              <button type="submit" className="button button-green form-submit">Create email request <ArrowIcon diagonal size={18} /></button>
              <p className="form-hint">Opens an email draft addressed to Alkazim, where Endloops began. No information is sent from this page.</p>
              {draft && <div className="draft-fallback" role="status"><span>If your email app did not open, copy your request instead.</span><button type="button" onClick={copyDraft}>{copied ? 'Copied' : 'Copy request'}</button></div>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="shell footer-inner"><a href="#top" aria-label="Endloops, back to top"><img src="/endloops-logo.jpg" alt="Endloops" width="150" height="43" /></a><p>Automation for financial professionals.<br />Built in Dubai.</p><a href="#top" className="back-top">Back to top ↑</a></div><div className="shell footer-bottom"><span>© {new Date().getFullYear()} Endloops</span><span>Work prepared. Judgement preserved.</span></div></footer>
    </>
  )
}

export default App
