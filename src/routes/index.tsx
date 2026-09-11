import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, ChevronLeft, ChevronRight, Facebook, Menu, Play, X } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

import heroImage from "@/assets/ds-hero.jpg";
import craftImage from "@/assets/ds-craft.jpg";
import installImage from "@/assets/ds-install.jpg";
import repairImage from "@/assets/ds-repair.jpg";
import detailsImage from "@/assets/ds-details.jpg";
import finishedImage from "@/assets/ds-finished.jpg";
import beforeImage from "@/assets/ds-before.jpg";
import afterImage from "@/assets/ds-after.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DS Roofing | Roofers in Littlehampton" },
      { name: "description", content: "Quality roofing in Littlehampton, backed by 14+ years of honest service and dependable workmanship." },
      { property: "og:title", content: "DS Roofing | Built to Last" },
      { property: "og:description", content: "Trusted roofing services in Littlehampton, United Kingdom." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const services = [
  ["Shingle Install", "Laying and nailing asphalt shingles with straight courses and consistent exposure.", installImage],
  ["Leak Tracing", "Following water back to where it actually enters — valleys, flashing, fasteners, penetrations.", repairImage],
  ["Flashing & Details", "Chimneys, walls, vents and skylights detailed so the transitions shed water properly.", detailsImage],
  ["Ventilation", "Ridge and intake venting so the attic breathes instead of cooking the underside of the deck.", craftImage],
  ["Tear-Off & Re-Roof", "Stripping worn layers, checking the deck, and rebuilding the roof from the sheathing up.", installImage],
  ["Eaves & Gutters", "Drip edge, fascia and gutter work that carries water off and away from the building.", finishedImage],
] as const;

const process = [
  ["Inspection", "Assess the condition of the existing roof.", beforeImage],
  ["Preparation", "Prepare materials, access and the work area.", craftImage],
  ["Installation", "Complete the roofing work with careful workmanship.", installImage],
  ["Final result", "Leave the property with a clean, finished roof.", finishedImage],
] as const;

const reels = ["ROOFING IN ACTION", "ROOF REPAIR", "FINISHED ROOF"];

function Label({ children, light = false }: { children: string; light?: boolean }) {
  return <p className={`section-label ${light ? "text-sand" : "text-primary"}`}><span />{children}</p>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [["Services", "#services"], ["Work", "#work"], ["About", "#about"], ["Reviews", "#reviews"]];
  return (
    <header className="absolute inset-x-0 top-0 z-50 border-b border-cream/15">
      <div className="shell grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center">
        <a href="#home" className="brand-mark" aria-label="DS Roofing home"><span>DS</span><small>ROOFING</small></a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <a className="nav-link" href={href} key={label}>{label}</a>)}
          <a className="btn btn-small" href="tel:+447904186514">Get a quote <ArrowRight size={15} /></a>
        </nav>
        <button className="icon-button lg:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav lg:hidden">{links.map(([label, href]) => <a href={href} onClick={() => setOpen(false)} key={label}>{label}</a>)}<a href="tel:+447904186514">Get a quote</a></nav>}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <Header />
      <img src={heroImage} width={1600} height={1008} alt="Roofer inspecting a traditional pitched roof at sunset" className="hero-image" fetchPriority="high" />
      <div className="hero-shade" />
      <div className="shell relative z-10 flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="hero-copy">
          <p className="eyebrow reveal-up">Roofing with integrity <span>Est. experience 14+ years</span></p>
          <h1 className="hero-title reveal-up delay-1">QUALITY ROOFING.<br /><em>BUILT TO LAST.</em></h1>
          <div className="hero-bottom reveal-up delay-2">
            <p>With over 14 years of experience, DS Roofing provides quality roofing solutions with honest service and workmanship you can rely on.</p>
            <div className="flex flex-wrap gap-3"><a className="btn" href="tel:+447904186514">Get a quote <ArrowRight size={17} /></a><a className="btn btn-ghost" href="#services">Our services <ArrowDown size={17} /></a></div>
          </div>
        </div>
        <div className="location-line"><span>50.8094° N, 0.5409° W</span><strong>Littlehampton, United Kingdom</strong><span className="hidden sm:inline">Scroll to explore ↓</span></div>
      </div>
    </section>
  );
}

function BrandStatement() {
  return <section className="section-pad bg-cream overflow-hidden"><div className="shell editorial-grid">
    <div><Label>What we do</Label><h2 className="statement-title">WE DON'T JUST<br />BUILD ROOFS.<br /><span>WE BUILD TRUST.</span></h2><p className="statement-copy">At DS Roofing, we take pride in delivering roofing work built to last, backed by more than 14 years of experience.</p></div>
    <figure className="craft-figure"><img src={craftImage} loading="lazy" width={1408} height={1104} alt="Roofer carefully fitting slate around chimney flashing" /><figcaption><span>01</span> Precision in every detail</figcaption></figure>
  </div></section>;
}

function Services() {
  const [active, setActive] = useState(0);
  return <section id="services" className="section-pad bg-forest text-cream"><div className="shell">
    <div className="section-heading"><div><Label light>What we handle</Label><h2>ROOFING, DONE RIGHT.</h2></div><p>Complete care for the roof above you — from the first inspection to the final detail.</p></div>
    <div className="services-layout">
      <div className="services-list">{services.map(([title, desc], i) => <button key={title} className={`service-row ${active === i ? "active" : ""}`} onClick={() => setActive(i)} onMouseEnter={() => setActive(i)} aria-expanded={active === i}>
        <span className="service-number">{String(i + 1).padStart(2, "0")}</span><span className="service-content"><strong>{title}</strong><span className="service-desc">{desc}</span></span><ArrowRight className="service-arrow" />
      </button>)}</div>
      <div className="service-visual">{services.map(([title,, image], i) => <img key={title} src={image} loading="lazy" alt={`${title} roofing work`} className={active === i ? "active" : ""} />)}<span>{String(active + 1).padStart(2, "0")} / 06</span></div>
    </div>
  </div></section>;
}

function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    let frame = 0;
    const updateActiveStep = () => {
      frame = 0;
      const focusLine = window.innerHeight * (window.innerWidth <= 900 ? 0.72 : 0.5);
      let closest = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      refs.current.forEach((element, index) => {
        if (!element) return;
        const bounds = element.getBoundingClientRect();
        const distance = Math.abs(bounds.top + bounds.height / 2 - focusLine);
        if (distance < closestDistance) {
          closest = index;
          closestDistance = distance;
        }
      });

      setActive(current => current === closest ? current : closest);
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveStep);
    };

    updateActiveStep();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
  return <section className="process-section"><div className="shell"><div className="process-intro"><Label>Inside the work</Label><h2>THE METHOD<br />BEHIND THE FINISH.</h2></div>
    <div className="process-grid"><div className="process-sticky"><div className="process-image-stack">{process.map(([title,, img], i) => <img src={img} loading="lazy" alt={`${title} stage of roofing`} key={title} className={active === i ? "active" : ""} />)}<div className="progress-count">0{active + 1}<span>/ 04</span></div></div></div>
      <div className="process-steps">{process.map(([title, desc, img], i) => <div className={`process-step ${active === i ? "active" : ""}`} data-step={i} ref={el => { refs.current[i] = el; }} key={title}><div className="process-mobile-image"><img src={img} loading="lazy" alt={`${title} stage of roofing`} /><span>0{i + 1}<small>/04</small></span></div><span>0{i + 1}</span><div><h3>{title}</h3><p>{desc}</p></div></div>)}</div>
    </div>
  </div></section>;
}

function Gallery() {
  const shots = [[installImage, "Roof installation"], [repairImage, "Chimney flashing repair"], [detailsImage, "Finished roof details"], [finishedImage, "Completed residential roof"]];
  return <section id="work" className="section-pad bg-cream"><div className="shell"><div className="section-heading dark"><div><Label>Proof of work</Label><h2>CRAFT YOU CAN SEE.</h2></div><p>Careful preparation. Clean execution. A finish designed to stand up to the elements.</p></div><div className="gallery-grid">{shots.map(([src, alt], i) => <figure className={`gallery-item gallery-${i + 1}`} key={alt}><img src={src} loading="lazy" alt={alt} /><figcaption><span>0{i + 1}</span>{alt}</figcaption></figure>)}</div></div></section>;
}

function Comparison() {
  const [value, setValue] = useState(50); const frame = useRef<HTMLDivElement>(null); const dragging = useRef(false);
  const update = (clientX: number) => { const r = frame.current?.getBoundingClientRect(); if (r) setValue(Math.max(1, Math.min(99, ((clientX-r.left)/r.width)*100))); };
  const pointer = (e: PointerEvent) => { if (e.type === "pointerdown") dragging.current = true; if (dragging.current) update(e.clientX); };
  return <section className="comparison-section"><div className="shell"><div className="comparison-head"><div><Label light>The difference</Label><h2>FROM WORN OUT<br />TO WEATHER READY.</h2></div><p>Drag to reveal the transformation.</p></div>
    <div className="comparison" ref={frame} onPointerDown={pointer} onPointerMove={pointer} onPointerUp={() => dragging.current=false} onPointerLeave={() => dragging.current=false}>
      <img src={afterImage} loading="lazy" alt="Home after professional roof replacement" draggable={false} /><div className="before-layer" style={{ width: `${value}%` }}><img src={beforeImage} loading="lazy" alt="Home before roof replacement" draggable={false} /></div>
      <span className="compare-label before-label">Before</span><span className="compare-label after-label">After</span><div className="compare-handle" style={{ left: `${value}%` }}><span><ChevronLeft size={18}/><ChevronRight size={18}/></span></div>
    </div>
  </div></section>;
}

function Reels() {
  const [active, setActive] = useState(1); const start = useRef(0);
  const rotate = (dir: number) => setActive(v => (v + dir + 3) % 3);
  return <section className="reels-section"><div className="shell text-center"><Label light>See us in action</Label><h2>THE WORK, IN MOTION.</h2><p className="reels-note">Project reels coming soon</p>
    <div className="reel-stage" onPointerDown={e => { start.current=e.clientX; e.currentTarget.setPointerCapture(e.pointerId); }} onPointerUp={e => { const d=e.clientX-start.current; if(Math.abs(d)>35) rotate(d<0?1:-1); }}>
      {reels.map((label, i) => { const offset=((i-active+4)%3)-1; return <article className={`reel-card reel-pos-${offset}`} key={label} onClick={() => setActive(i)}><div className="reel-empty"><div className="play"><Play fill="currentColor" size={20}/></div><span className="vertical-type">DS ROOFING</span></div><div className="reel-meta"><span>Reel</span><strong>{label}</strong><Facebook size={15}/></div></article>; })}
    </div>
    <div className="reel-controls"><button onClick={()=>rotate(-1)}><ChevronLeft size={17}/> Prev</button><span>Drag to rotate</span><button onClick={()=>rotate(1)}>Next <ChevronRight size={17}/></button></div>
  </div></section>;
}

function About() {
  return <section id="about" className="section-pad bg-sand"><div className="shell about-grid"><div className="about-image"><img src={craftImage} loading="lazy" alt="Experienced DS Roofing professional at work" /><div className="experience"><strong>14+</strong><span>Years<br/>experience</span></div></div><div className="about-copy"><Label>The people behind the work</Label><h2>BUILT ON PRIDE.<br />BACKED BY EXPERIENCE.</h2><p>At DS Roofing we don't just build roofs, we build trust. With over 14 years of experience we provide quality roofing solutions with honest service and workmanship you can rely on. Whatever the job, we take pride in delivering a roof that's built to last.</p><div className="values"><span>Quality workmanship</span><span>Honest service</span><span>Built to last</span></div><p className="service-area">Based in <strong>Littlehampton, United Kingdom</strong></p></div></div></section>;
}

function Testimonial() { return <section id="reviews" className="testimonial-section"><div className="shell testimonial"><div className="testimonial-heading"><Label>Trusted by our clients</Label><span aria-hidden="true">01 / 01</span></div><figure className="testimonial-frame"><span className="quote-mark" aria-hidden="true">“</span><blockquote>Excellent service from start to finish. The roof repair was complete to a high standard, everything was left clean and tidy, and the price was fair. Professional.</blockquote><figcaption><span className="testimonial-rule" aria-hidden="true"/><div><strong>Dominique Jenner</strong><span>Client review</span></div></figcaption></figure></div></section>; }

function FinalCta() { return <section id="contact" className="final-cta"><img src={finishedImage} loading="lazy" alt="Completed coastal home roof at sunset"/><div/><div className="shell final-copy"><Label light>Let's get to work</Label><h2>READY TO PROTECT<br/>YOUR HOME?</h2><p>Quality roofing, honest service and workmanship built to last.</p><a className="btn" href="tel:+447904186514">Get a quote <ArrowRight size={18}/></a></div></section>; }

function Footer() { return <footer className="footer"><div className="shell"><div className="footer-top"><a href="#home" className="brand-mark dark"><span>DS</span><small>ROOFING</small></a><div className="footer-contact"><a href="tel:+447904186514">+44 7904 186514</a><address>42 Olliver Acre,<br/>Littlehampton,<br/>United Kingdom, BN17 6FD</address></div><nav>{[["Home","#home"],["Services","#services"],["Work","#work"],["About","#about"],["Reviews","#reviews"],["Contact","#contact"]].map(([l,h])=><a href={h} key={l}>{l}</a>)}</nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} DS Roofing</span><span>Littlehampton, United Kingdom</span><a href="https://www.facebook.com/messages/t/61591832164879/" target="_blank" rel="noreferrer"><Facebook size={15}/> Facebook</a></div></div></footer>; }

function Index() { return <main><Hero/><BrandStatement/><Services/><Process/><Gallery/><Comparison/><Reels/><About/><Testimonial/><FinalCta/><Footer/></main>; }