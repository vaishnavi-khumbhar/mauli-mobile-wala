import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ChevronDown, Phone, Mail, MapPin } from "lucide-react";
import { media } from "../data/media";
import { navLinks, site, hasSocial } from "../data/site";
import { Instagram, Facebook, Linkedin, Youtube, Whatsapp } from "./SocialIcons";
import { useProducts } from "../data/cms";
import useScrolled from "../hooks/useScrolled";
import { ease } from "./Motion";

function Logo({ scrolled }) {
  // Framed "signboard" plaque: hangs below the slim bar on desktop, tucks in on scroll
  return (
    <Link
      to="/"
      aria-label="Mauli Mobile Wala — Home"
      className={`group relative z-10 block shrink-0 transition-all duration-500 ${
        scrolled ? "self-center" : "self-center lg:mt-3 lg:self-start"
      }`}
    >
      <span className="relative block rounded-[3px] bg-white p-1 shadow-[0_10px_28px_-12px_rgba(20, 20, 22,0.35)] ring-1 ring-beige transition-shadow duration-500 group-hover:shadow-[0_14px_32px_-12px_rgba(238, 20, 80,0.45)] lg:p-1.5">
        <img
          src={media.branding.logo}
          alt="Mauli Mobile Wala"
          className={`block w-auto rounded-[2px] object-contain transition-all duration-500 ${
            scrolled ? "h-10 lg:h-[46px]" : "h-10 lg:h-[76px]"
          }`}
          width="700"
          height="289"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 -bottom-px h-[3px] rounded-b-[3px] bg-gradient-to-r from-gold-champagne via-gold to-gold-champagne"
        />
      </span>
    </Link>
  );
}

function ProductsMenu({ open }) {
  const products = useProducts();
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.25, ease }}
          className="absolute left-1/2 top-full z-50 w-[300px] -translate-x-1/2 pt-4"
        >
          <div className="border border-beige border-t-gold bg-cream py-3 shadow-card" style={{ borderTopWidth: 2 }}>
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/products"
                className="group flex items-center justify-between px-5 py-2.5 font-serif text-[15px] text-navy transition-colors hover:bg-ivory hover:text-gold"
              >
                {p.name}
                <ArrowRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            ))}
            <div className="mx-5 mt-2 border-t border-beige pt-3">
              <Link to="/products" className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-blue hover:text-gold">
                View all products
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Blue top bar with contact details — reads from site.js, collapses on scroll */
function TopBar({ hidden }) {
  const c = site.contact;
  const digits = (v) => v.replace(/[^\d+]/g, "");
  const tel = digits(c.phone);
  const wa = c.whatsapp.replace(/\D/g, "");
  const socials = [
    { key: "instagram", label: "Instagram", Icon: Instagram },
    { key: "facebook", label: "Facebook", Icon: Facebook },
    { key: "linkedin", label: "LinkedIn", Icon: Linkedin },
    { key: "youtube", label: "YouTube", Icon: Youtube },
  ].filter((s) => hasSocial(s.key)); // hidden until a real link is added in site.js
  const item = "group flex items-center gap-2 whitespace-nowrap text-white/90 transition-colors hover:text-white";
  const dot = "flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-champagne transition-colors group-hover:bg-gold group-hover:text-white";
  const brandHover = {
    instagram: "hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:border-transparent",
    facebook: "hover:bg-[#1877F2] hover:border-transparent",
    linkedin: "hover:bg-[#0A66C2] hover:border-transparent",
    youtube: "hover:bg-[#FF0000] hover:border-transparent",
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-r from-[#0B0B0D] via-[#17171A] to-[#3A0B1C] transition-all duration-500 ${
        hidden ? "max-h-0" : "max-h-12"
      }`}
    >
      {/* thin pink line along the bottom */}
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden="true" />
      <div className="container-site flex h-10 items-center justify-between gap-3 text-[12.5px] lg:h-11 lg:text-[13.5px]">
        <ul className="flex min-w-0 items-center gap-4 lg:gap-7">
          <li>
            <a href={tel ? `tel:${tel}` : `${import.meta.env.BASE_URL}contact`} className={item} aria-label={`Call ${c.phone}`}>
              <span className={dot}><Phone className="h-3 w-3" strokeWidth={2} aria-hidden="true" /></span>
              <span className="font-semibold tracking-wide">{c.phone}</span>
            </a>
          </li>
          {c.email && (
            <li className="hidden sm:block">
              <a href={`mailto:${c.email}`} className={item}>
                <span className={dot}><Mail className="h-3 w-3" strokeWidth={2} aria-hidden="true" /></span>
                <span>{c.email}</span>
              </a>
            </li>
          )}
          <li className="hidden lg:block">
            <Link to="/stores" className={item} aria-label="See our store locations">
              <span className={dot}><MapPin className="h-3 w-3" strokeWidth={2} aria-hidden="true" /></span>
              <span>{site.location}</span>
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-2.5 sm:gap-3.5">
          {socials.length > 0 && (
            <>
              <span className="hidden text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55 xl:block">Follow us</span>
              <ul className="flex items-center gap-1.5 sm:gap-2" aria-label="Social media">
                {socials.map(({ key, label, Icon }) => (
                  <li key={key}>
                    <a
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mauli Mobile Wala on ${label}`}
                      title={label}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-all duration-300 hover:-translate-y-0.5 ${brandHover[key] || "hover:bg-gold"}`}
                    >
                      <Icon width={15} height={15} />
                    </a>
                  </li>
                ))}
              </ul>
              <span className="hidden h-5 w-px bg-white/20 sm:block" aria-hidden="true" />
            </>
          )}
          {/* WhatsApp button — number comes from site.js (contact.whatsapp) */}
          <a
            href={wa.length >= 10 ? `https://wa.me/${wa.length === 10 ? "91" + wa : wa}?text=${encodeURIComponent("Hello Mauli Mobile Wala, I would like to know more about your products.")}` : `${import.meta.env.BASE_URL}contact`}
            target={wa.length >= 10 ? "_blank" : undefined}
            rel="noopener noreferrer"
            aria-label="Chat with Mauli Mobile Wala on WhatsApp"
            className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-[#25D366] px-3 py-1.5 text-[12px] font-bold leading-none text-white shadow-[0_4px_14px_-4px_rgba(37,211,102,0.7)] transition-all hover:-translate-y-0.5 hover:bg-[#1EBE5A] lg:px-4 lg:text-[13px]"
          >
            <Whatsapp width={15} height={15} />
            <span>WhatsApp<span className="hidden sm:inline"> Us</span></span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const products = useProducts();
  const scrolled = useScrolled();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const closeTimer = useRef();

  useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e) => e.key === "Escape" && (setMobileOpen(false), setMenuOpen(false));
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  const openMenu = () => { clearTimeout(closeTimer.current); setMenuOpen(true); };
  const closeMenu = () => { closeTimer.current = setTimeout(() => setMenuOpen(false), 140); };

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-navy">
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#FFFFFF]/90 shadow-[0_6px_24px_-14px_rgba(20, 20, 22,0.25)] backdrop-blur-md"
            : "bg-[#FFFFFF]"
        }`}
      >
        <TopBar hidden={scrolled} />
        <div className="container-site flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <Logo scrolled={scrolled} />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((l) =>
                l.hasMenu ? (
                  <li key={l.to} className="relative" onMouseEnter={openMenu} onMouseLeave={closeMenu}>
                    <NavLink
                      to={l.to}
                      className={({ isActive }) => `nav-link group relative flex items-center gap-1 whitespace-nowrap py-2 font-serif text-[16px] font-medium text-navy xl:text-[18px] ${isActive ? "is-active" : ""}`}
                      aria-haspopup="true"
                      aria-expanded={menuOpen}
                      onFocus={openMenu}
                    >
                      {l.label}
                      <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${menuOpen ? "rotate-180" : ""}`} />
                      <NavUnderline />
                    </NavLink>
                    <ProductsMenu open={menuOpen} />
                  </li>
                ) : (
                  <li key={l.to}>
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) => `nav-link group relative block whitespace-nowrap py-2 font-serif text-[16px] font-medium text-navy xl:text-[18px] ${isActive ? "is-active" : ""}`}
                    >
                      {l.label}
                      {l.highlight && (
                        <span className="absolute -right-3 top-1.5 flex h-2 w-2" aria-hidden="true">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-blue" />
                        </span>
                      )}
                      <NavUnderline />
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn btn-primary hidden whitespace-nowrap !px-5 !py-2.5 !text-[15px] sm:inline-flex lg:hidden xl:inline-flex">
              <span>Enquire Now</span>
              <ArrowRight className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center border border-beige bg-white/60 lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <span className={`absolute h-px w-5 bg-navy transition-all duration-300 ${mobileOpen ? "rotate-45" : "-translate-y-[6px]"}`} />
              <span className={`absolute h-px w-5 bg-gold transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`absolute h-px w-5 bg-navy transition-all duration-300 ${mobileOpen ? "-rotate-45" : "translate-y-[6px]"}`} />
            </button>
          </div>
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            className={`fixed inset-x-0 bottom-0 z-[45] overflow-y-auto bg-cream lg:hidden ${scrolled ? "top-[65px]" : "top-[105px]"}`}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease }}
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-8">
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } } }}
                className="divide-y divide-beige border-y border-beige"
              >
                {navLinks.map((l) => (
                  <motion.li
                    key={l.to}
                    variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center justify-between py-4 font-serif text-[26px] ${isActive ? "text-gold" : "text-navy"}`
                      }
                    >
                      <span className="flex items-center gap-3">
                        {l.label}
                        {l.highlight && <span className="rounded-full bg-blue px-2.5 py-0.5 font-sans text-[11px] font-bold uppercase tracking-wider text-white">New</span>}
                      </span>
                      <ArrowRight className="h-5 w-5 text-gold" strokeWidth={1.25} />
                    </NavLink>
                  </motion.li>
                ))}
              </motion.ul>
              <div className="mt-8">
                <p className="eyebrow eyebrow-gold mb-4">Our Products</p>
                <div className="flex flex-wrap gap-2">
                  {products.map((p) => (
                    <Link key={p.slug} to="/products" className="border border-beige bg-white px-3 py-2 text-[13px] text-navy">
                      {p.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary mt-auto w-full !py-4">
                <span>Enquire Now</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavUnderline() {
  return (
    <span
      aria-hidden="true"
      className="nav-underline absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100 group-[.is-active]:scale-x-100"
    />
  );
}