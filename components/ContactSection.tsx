import { contact, site } from "@/lib/profile";
import SectionHead from "./SectionHead";

export default function ContactSection() {
  return (
    <>
      <section id="contact" className="section section--subtle" aria-labelledby="contact-title">
        <div className="container contact-inner">
          <SectionHead id="contact-title" index="06" title="Contact" lead={contact.lead} />
          <a href={`mailto:${contact.email}`} className="contact-email">{contact.email}</a>
          <div className="contact-links">
            {contact.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="btn"
                target={l.external ? "_blank" : undefined}
                rel={l.external ? "noopener noreferrer" : undefined}
              >
                {l.label}
                {l.external && <><span aria-hidden="true">↗</span><span className="sr-only">(새 창)</span></>}
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} {site.name} · {site.nameEn}</span>
          <a href="#top" className="text-link text-link--muted">맨 위로 <span aria-hidden="true">↑</span></a>
        </div>
      </footer>
    </>
  );
}
