import { useEffect, useMemo, useRef, useState } from 'react';
import {
  candidateTestimonials,
  clientLogos,
  clientTestimonial,
  navGroups,
  peerTestimonial,
  services
} from './data/siteContent';

const googleFormUrl =
  'https://docs.google.com/forms/d/e/1FAIpQLScCwUkA9ebAhVieAVVernYUVQHrhYIUE8seNRd8YPttLmswmQ/viewform';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const dropdownCloseTimer = useRef<number | null>(null);

  const clearDropdownCloseTimer = () => {
    if (dropdownCloseTimer.current !== null) {
      window.clearTimeout(dropdownCloseTimer.current);
      dropdownCloseTimer.current = null;
    }
  };

  const openDropdown = (title: string) => {
    clearDropdownCloseTimer();
    setActiveDropdown(title);
  };

  const scheduleDropdownClose = (title: string) => {
    clearDropdownCloseTimer();
    dropdownCloseTimer.current = window.setTimeout(() => {
      setActiveDropdown((prev) => (prev === title ? null : prev));
    }, 140);
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % candidateTestimonials.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const close = () => {
      setActiveDropdown(null);
      setMenuOpen(false);
      clearDropdownCloseTimer();
    };

    window.addEventListener('hashchange', close);
    return () => window.removeEventListener('hashchange', close);
  }, []);

  useEffect(() => () => clearDropdownCloseTimer(), []);

  const marqueeItems = useMemo(() => [...clientLogos, ...clientLogos], []);

  return (
    <div className="min-h-screen bg-fog text-ink">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_12%_10%,rgba(37,99,235,0.12),transparent_42%),radial-gradient(circle_at_85%_20%,rgba(15,23,42,0.08),transparent_45%),linear-gradient(to_bottom,#ffffff,#f8fafc_35%,#f1f5f9)]" />

      <header className="sticky top-0 z-40 border-b border-shell/80 bg-white/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <a href="#home" className="font-display text-lg font-semibold tracking-wide text-ink">
            AURTIRO
          </a>

          <button
            className="inline-flex rounded-md border border-shell px-3 py-2 font-mono text-xs font-semibold uppercase tracking-wide text-slate-600 md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
          >
            Menu
          </button>

          <div className="hidden items-center gap-3 md:flex">
            {navGroups.map((group) => (
              <div
                key={group.title}
                className="relative"
                onMouseEnter={() => openDropdown(group.title)}
                onMouseLeave={() => scheduleDropdownClose(group.title)}
              >
                <button
                  className="rounded-md px-3 py-2 font-mono text-xs font-medium uppercase tracking-[0.14em] text-slate-600 transition hover:bg-slate-100 hover:text-ink"
                  onClick={() =>
                    setActiveDropdown((prev) => (prev === group.title ? null : group.title))
                  }
                >
                  {group.title}
                </button>

                {activeDropdown === group.title && (
                  <div
                    className="absolute right-0 top-full z-30 w-72 rounded-xl border border-shell bg-white p-3 shadow-panel"
                    onMouseEnter={clearDropdownCloseTimer}
                    onMouseLeave={() => scheduleDropdownClose(group.title)}
                  >
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-ink"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-shell bg-slate-50 px-3 py-2 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-ink transition hover:border-slate-300 hover:bg-white"
            >
              Submit Resume / Hiring Request
            </a>
          </div>
        </nav>

        {menuOpen && (
          <div className="border-t border-shell bg-white px-4 py-4 md:hidden">
            <div className="grid gap-3">
              {navGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-1 font-mono text-[11px] uppercase tracking-[0.14em] text-slate-500">
                    {group.title}
                  </p>
                  <div className="grid">
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="rounded-md px-1 py-1.5 text-sm text-slate-700"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-1 rounded-md border border-shell px-2 py-2 text-center text-sm font-semibold text-ink"
              >
                Open Form
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="home" className="mx-auto max-w-7xl px-4 pb-20 pt-12 md:px-8 md:pt-20">
        <section className="grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
          <div className="animate-riseIn">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-shell bg-white px-3 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-slate-600">
              Technical Staffing Partner for AI + Product Teams
            </p>
            <h1 className="font-display text-4xl font-semibold leading-tight text-ink md:text-6xl">
              Bespoke recruiting systems for teams that cannot miss on talent.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Aurtiro blends high-context technical recruiting with white-glove execution so engineering leaders can hire with speed, quality, and confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#services-overview"
                className="rounded-md bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Explore Services
              </a>
              <a
                href="#contact"
                className="rounded-md border border-shell bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:border-slate-300"
              >
                Contact Aurtiro
              </a>
            </div>
          </div>

          <aside className="rounded-2xl border border-shell bg-white p-6 shadow-panel animate-riseIn [animation-delay:.1s]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Live Candidate Signal</p>
            <h2 className="mt-3 font-display text-2xl font-semibold">Candidate Testimonial Spotlight</h2>
            <blockquote className="mt-4 border-l-2 border-shell pl-4 text-slate-600">
              “{candidateTestimonials[testimonialIndex].quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink">
              {candidateTestimonials[testimonialIndex].author} · {candidateTestimonials[testimonialIndex].role}
            </p>
            <div className="mt-4 flex gap-1.5">
              {candidateTestimonials.map((item, index) => (
                <button
                  key={`${item.role}-${index}`}
                  className={`h-2.5 w-2.5 rounded-full ${
                    index === testimonialIndex ? 'bg-ink' : 'bg-slate-300'
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                  onClick={() => setTestimonialIndex(index)}
                />
              ))}
            </div>
          </aside>
        </section>

        <section id="past-clients" className="mt-16 rounded-2xl border border-shell bg-white py-7">
          <div className="mb-4 px-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Past Clients</p>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Trusted by startups and global brands for critical technical hiring across product,
              platform, and infrastructure teams.
            </p>
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee font-mono text-xs uppercase tracking-[0.14em] text-slate-500">
              {marqueeItems.map((client, index) => (
                <span key={`${client}-${index}`} className="mx-6 inline-block">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section id="services-overview" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Services</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Technical talent acquisition built for growth.
          </h2>
          <p className="mt-3 max-w-3xl text-slate-600">
            Aurtiro partners with hiring teams to define role strategy, source difficult technical profiles, and drive process discipline from first outreach through close.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-28 rounded-xl border border-shell bg-white p-6 shadow-panel"
              >
                <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{service.summary}</p>
              </article>
            ))}
          </div>

          <article id="hiring-managers" className="mt-6 scroll-mt-28 rounded-xl border border-shell bg-slate-50 p-6">
            <h3 className="font-display text-xl font-semibold">For Hiring Managers</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Coming soon. Tooling for interviewer selection, training, tracking, and pipeline management for high-performing teams.
            </p>
          </article>
          <article id="for-job-seekers" className="mt-6 scroll-mt-28 rounded-xl border border-shell bg-slate-50 p-6">
            <h3 className="font-display text-xl font-semibold">For Job Seekers</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Candidate tooling is coming soon. In the meantime, submit your profile and resume for
              opportunities aligned to your experience and growth goals.
            </p>
            <a
              href="#contact-candidates"
              className="mt-5 inline-flex rounded-md border border-shell bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-slate-300"
            >
              Go to Candidate Intake
            </a>
          </article>
        </section>

        <section id="client-testimonial" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Client Testimonial</p>
          <article className="mt-4 rounded-xl border border-shell bg-white p-6 shadow-panel">
            <blockquote className="border-l-2 border-shell pl-4 leading-7 text-slate-700">
              “{clientTestimonial.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink">
              {clientTestimonial.author}, {clientTestimonial.role}
            </p>
          </article>
        </section>

        <section id="candidate-testimonials" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Candidate Testimonials</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {candidateTestimonials.map((item, index) => (
              <article key={`${item.role}-${index}`} className="rounded-xl border border-shell bg-white p-6">
                <blockquote className="text-sm leading-6 text-slate-600">“{item.quote}”</blockquote>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {item.author} · {item.role}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="peer-testimonial" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Peer Testimonial</p>
          <article className="mt-4 rounded-xl border border-shell bg-white p-6 shadow-panel">
            <blockquote className="border-l-2 border-shell pl-4 leading-7 text-slate-700">
              “{peerTestimonial.quote}”
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-ink">
              {peerTestimonial.author}, {peerTestimonial.role}
            </p>
          </article>
        </section>

        <section id="about" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">About Aurtiro</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            <article id="recruitment-process" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Recruitment Process</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Each search starts with calibration workshops, profile mapping, and market narrative positioning, followed by tightly managed sourcing, structured interview feedback, and evidence-based close support.
              </p>
            </article>
            <article id="philosophy" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Philosophy</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Recruiting should feel consultative, not transactional. Aurtiro operates as an extension of leadership teams, translating hiring intent into outcomes.
              </p>
            </article>
            <article id="talent-bar" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Talent Bar</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                High standards are maintained through rigorous technical calibration, role-specific scorecards, and signal-driven candidate assessment aligned with long-term team quality.
              </p>
            </article>
            <article id="recognitions" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6">
              <h3 className="font-display text-xl font-semibold">Recognitions</h3>
              <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                <li>Rookie of the Year (Motion Recruitment)</li>
                <li>Textio Interrupting Bias in Hiring Certification</li>
                <li>Multi-functional interview training leadership at enterprise scale</li>
              </ul>
            </article>
          </div>
        </section>

        <section id="contact" className="mt-20 scroll-mt-28">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-slate-500">Contact</p>
          <h2 className="mt-3 font-display text-3xl font-semibold">Connect through the right intake path.</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <article id="contact-clients" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6 shadow-panel">
              <h3 className="font-display text-xl font-semibold">For Hiring Teams</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Share hiring priorities, timeline, and role context. Aurtiro will respond with a fit and engagement recommendation.
              </p>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Submit Hiring Request
              </a>
            </article>
            <article id="contact-candidates" className="scroll-mt-28 rounded-xl border border-shell bg-white p-6 shadow-panel">
              <h3 className="font-display text-xl font-semibold">For Job Seekers</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Share your resume, ideal role profile, and location preferences to be considered for current and upcoming opportunities.
              </p>
              <a
                href={googleFormUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Submit Candidate Profile
              </a>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-shell bg-white py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-4 text-sm text-slate-500 md:flex-row md:items-center md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.18em]">Aurtiro © 2026</p>
          <p>San Francisco, California · <a className="underline" href="https://www.aurtiro.com">www.aurtiro.com</a></p>
        </div>
      </footer>
    </div>
  );
}

export default App;
