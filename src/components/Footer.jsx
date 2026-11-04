import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { Instagram, Facebook, Linkedin, Youtube, Whatsapp } from "./SocialIcons";
import { media } from "../data/media";
import { navLinks, site, contactLinks, hasSocial } from "../data/site";
import { useProducts } from "../data/cms";

const socials = [
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
  { key: "youtube", label: "YouTube", Icon: Youtube },
].filter((s) => hasSocial(s.key)); // hidden until a real link is added in site.js

function ColTitle({ children }) {
  return (
    <h3 className="mb-6 flex items-center justify-center gap-3 font-sans md:justify-start text-[13px] font-bold uppercase tracking-[0.24em] text-gold-champagne">
      {children}
    </h3>
  );
}

export default function Footer() {
  const products = useProducts();
  const c = site.contact;
  return (
    <footer className="relative bg-gradient-to-b from-[#141416] to-[#121214] text-white/75">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="container-site grid gap-12 py-16 text-center md:grid-cols-2 md:py-20 md:text-left lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <Link to="/" aria-label="Mauli Mobile Wala — Home" className="inline-block">
            <img src={media.branding.logo} alt="Mauli Mobile Wala" className="h-20 w-auto rounded-[3px] bg-white p-1.5 shadow-lg" loading="lazy" width="700" height="289" />
          </Link>
          <p className="mt-6 font-serif text-[22px] italic text-white md:text-2xl">{site.tagline}</p>
          <p className="mx-auto mt-4 max-w-sm text-[16px] leading-relaxed text-white/75 md:mx-0">
            Smartphones from Apple, Samsung, Vivo and more, along with mobile accessories and electronics — genuine products, brand warranty and expert support. Serving customers since 2009.
          </p>
          {socials.length > 0 && (
          <ul className="mt-7 flex justify-center gap-3 md:justify-start" aria-label="Social media">
            {socials.map(({ key, label, Icon }) => (
              <li key={key}>
                <a
                  href={site.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/85 transition-colors hover:border-gold hover:bg-gold hover:text-white"
                >
                  <Icon width={18} height={18} />
                </a>
              </li>
            ))}
          </ul>
          )}
        </div>

        <nav aria-label="Footer" className="lg:col-span-2">
          <ColTitle>Explore</ColTitle>
          <ul className="space-y-3.5 text-[16px]">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="gold-underline pb-0.5 transition-colors hover:text-gold-champagne">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-3">
          <ColTitle>Products</ColTitle>
          <ul className="space-y-3.5 text-[16px]">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to="/products" className="gold-underline pb-0.5 transition-colors hover:text-gold-champagne">{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <ColTitle>Contact</ColTitle>
          <ul className="space-y-4 text-[16px]">
            {[
              { href: contactLinks.tel, label: c.phone, icon: <Phone className="mt-1 h-[18px] w-[18px] shrink-0 text-gold-champagne" strokeWidth={1.5} />, aria: "Call Mauli Mobile Wala" },
              { href: contactLinks.whatsapp, label: c.whatsapp, icon: <Whatsapp width={18} height={18} className="mt-1 shrink-0 text-gold-champagne" />, aria: "Chat on WhatsApp", external: true },
              c.email && { href: contactLinks.email, label: c.email, icon: <Mail className="mt-1 h-[18px] w-[18px] shrink-0 text-gold-champagne" strokeWidth={1.5} />, aria: "Email Mauli Mobile Wala" },
              { href: `${import.meta.env.BASE_URL}stores`, label: site.location, icon: <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-gold-champagne" strokeWidth={1.5} />, aria: "See our store locations" },
            ].filter(Boolean).map((r) => (
              <li key={r.aria}>
                <a
                  href={r.href}
                  aria-label={r.aria}
                  {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group inline-flex justify-center gap-3 break-words text-left transition-colors hover:text-gold-champagne md:justify-start"
                >
                  {r.icon}
                  <span className="gold-underline pb-0.5">{r.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#0B0B0D]">
        <div className="container-site flex flex-col items-center gap-2 py-5 text-center text-[15px] text-white/70 sm:flex-row sm:pr-[250px] lg:pr-[260px] sm:text-left sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Mauli Mobile Wala. All rights reserved.</p>
          <p>
            Designed &amp; Developed By{" "}
            <a
              href="https://www.advertisingandbrandingmarketing.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white underline decoration-gold/70 underline-offset-4 transition-colors hover:text-gold-champagne"
            >
              Advertising Branding &amp; Marketing
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}