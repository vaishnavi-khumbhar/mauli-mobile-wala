import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X, Send, CheckCircle2, MessageSquareText, Check, Phone, User } from "lucide-react";
import { site } from "../data/site";
import { useProducts } from "../data/cms";
import { Whatsapp } from "./SocialIcons";
import { ease } from "./Motion";

/* ==========================================================================
   ENQUIRY POP-UP
   - Opens automatically 2 s after the Home page is loaded / refreshed
   - Opens from the floating "Enquire Now" button on every page
   - Any component can open it:  const { openEnquiry } = useEnquiry();
   ========================================================================== */

/* ---- Settings ---------------------------------------------------------- */
const AUTO_OPEN_MS = 2000;          // pop-up opens 2 seconds after the page loads
const AUTO_OPEN_PAGES = ["/"];      // pages where it auto-opens ("/" = Home). Use ["*"] for every page
const ONCE_PER_VISIT = false;       // false = opens on every load/refresh; true = only once per visit
const SESSION_KEY = "mm_enquiry_seen";

const EnquiryContext = createContext({ openEnquiry: () => {}, closeEnquiry: () => {} });
export const useEnquiry = () => useContext(EnquiryContext);

/* WhatsApp link from site.js — adds 91 for 10-digit Indian numbers */
export function whatsappLink(text = "Hello Mauli Mobile Wala, I would like to know more about your products.") {
  const wa = site.contact.whatsapp.replace(/\D/g, "");
  if (wa.length < 10) return null;
  const num = wa.length === 10 ? `91${wa}` : wa;
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}

export function EnquiryProvider({ children }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  const openEnquiry = useCallback(() => setOpen(true), []);
  const closeEnquiry = useCallback(() => {
    setOpen(false);
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch { /* storage blocked */ }
  }, []);

  // Auto-open only on a real page load / refresh (not when clicking between pages)
  const firstLoadPath = useRef(pathname);
  useEffect(() => {
    if (pathname !== firstLoadPath.current) return; // visitor navigated inside the site
    if (!AUTO_OPEN_PAGES.includes("*") && !AUTO_OPEN_PAGES.includes(pathname)) return;
    if (ONCE_PER_VISIT) {
      let seen = false;
      try { seen = sessionStorage.getItem(SESSION_KEY) === "1"; } catch { /* ignore */ }
      if (seen) return;
    }
    const t = setTimeout(() => setOpen(true), AUTO_OPEN_MS);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <EnquiryContext.Provider value={{ openEnquiry, closeEnquiry }}>
      {children}
      <EnquiryModal open={open} onClose={closeEnquiry} />
      <FloatingActions onEnquire={openEnquiry} />
    </EnquiryContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */

const empty = { name: "", phone: "", product: "", message: "" };

function EnquiryModal({ open, onClose }) {
  const products = useProducts();
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const firstField = useRef(null);
  const dialogRef = useRef(null);

  // Lock page scroll, focus first field, close on Esc, keep Tab inside the pop-up
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstField.current?.focus(), 350);
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll("button, input, select, textarea, a[href]");
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open, onClose]);

  useEffect(() => { if (!open) { setSent(false); setErrors({}); } }, [open]);

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!values.name.trim()) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(values.phone.trim())) er.phone = "Please enter a valid phone number.";
    setErrors(er);
    if (Object.keys(er).length) return;

    // Sends the enquiry to WhatsApp once a real number is set in site.js.
    // (Connect a CRM / form service here later if needed.)
    const link = whatsappLink(
      `New enquiry from website\nName: ${values.name}\nPhone: ${values.phone}\nProduct: ${values.product || "Not sure"}\nMessage: ${values.message || "-"}`
    );
    if (link) window.open(link, "_blank", "noopener");
    setSent(true);
    setValues(empty);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close enquiry form"
            className="absolute inset-0 cursor-default bg-[#0B0B0D]/60 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="enquiry-title"
            className="relative grid max-h-[100dvh] w-full overflow-y-auto overflow-x-hidden rounded-t-[16px] bg-cream shadow-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:max-w-[820px] sm:rounded-[10px] md:grid-cols-[290px_1fr]"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25 md:bg-navy/5 md:text-navy md:hover:bg-navy/10"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left: brand panel */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0B0B0D] via-[#141416] to-[#2A2A2E] px-6 pb-5 pt-6 text-white md:px-7 md:py-8">
              <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-gold/20 blur-2xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-[#EE1450]/30 blur-2xl" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold-champagne via-gold to-gold-champagne md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[3px] md:bg-gradient-to-b" aria-hidden="true" />

              <p className="relative font-sans text-[11px] font-semibold uppercase tracking-[0.26em] text-gold-champagne">Quick Enquiry</p>
              <h2 id="enquiry-title" className="relative mt-2 pr-10 font-serif text-[24px] leading-[1.15] !text-white md:pr-0 md:text-[30px]">
                Find the Right Phone for You
              </h2>
              <p className="relative mt-2 hidden text-[13.5px] leading-relaxed text-white/80 min-[400px]:block md:mt-3 md:text-[14px]">
                Tell us what you are looking for — our team will get back to you.
              </p>

              <ul className="relative mt-6 hidden space-y-3 text-[14px] text-white/90 md:block">
                {["Serving customers since 2009", "Genuine products & brand warranty", "Competitive prices", "Four retail stores"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/90">
                      <Check className="h-3 w-3 text-white" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>

              {whatsappLink() && (
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
                  className="relative mt-8 hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#1EBE5A] md:inline-flex">
                  <Whatsapp width={15} height={15} /> Chat on WhatsApp
                </a>
              )}
            </div>

            {/* Right: form */}
            {sent ? (
              <div className="flex flex-col items-center justify-center px-6 py-10 text-center md:px-10" role="status">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
                  <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.5} />
                </span>
                <h3 className="mt-4 text-[26px]">Thank you!</h3>
                <p className="mt-2 max-w-xs text-[15px] text-grey">We have received your enquiry. Our team will contact you shortly.</p>
                <button type="button" onClick={onClose} className="btn btn-primary mt-6">
                  <span>Close</span>
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid grid-cols-2 gap-x-3 gap-y-3.5 px-6 pb-6 pt-5 md:gap-x-4 md:px-8 md:pb-8 md:pt-10">
                <Field label="Name *" error={errors.name} icon={User}>
                  <input ref={firstField} id="eq-name" name="name" autoComplete="name" placeholder="Name"
                    className="eq-input pl-10" value={values.name} onChange={onChange} aria-invalid={!!errors.name} />
                </Field>
                <Field label="Phone *" error={errors.phone} icon={Phone}>
                  <input id="eq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="Mobile"
                    className="eq-input pl-10" value={values.phone} onChange={onChange} aria-invalid={!!errors.phone} />
                </Field>
                <Field label="Product" full>
                  <select id="eq-product" name="product" className="eq-input" value={values.product} onChange={onChange}>
                    <option value="">What are you looking for? (optional)</option>
                    {products.map((p) => <option key={p.slug}>{p.name}</option>)}
                    <option>Not sure / Need help choosing</option>
                  </select>
                </Field>
                <Field label="Message" full>
                  <textarea id="eq-message" name="message" rows={2} className="eq-input resize-none"
                    placeholder="Model, budget or nearest store, etc." value={values.message} onChange={onChange} />
                </Field>
                <div className="col-span-2 pt-1">
                  <button type="submit" className="btn btn-primary w-full !py-3.5">
                    <span>Send Enquiry</span>
                    <Send className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                  {whatsappLink() && (
                    <a href={whatsappLink()} target="_blank" rel="noopener noreferrer"
                      className="mt-3 flex items-center justify-center gap-2 text-[13.5px] font-semibold text-[#1EBE5A] hover:underline md:hidden">
                      <Whatsapp width={15} height={15} /> Or chat on WhatsApp
                    </a>
                  )}
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, error, icon: Icon, full, children }) {
  const id = children.props.id;
  return (
    <div className={full ? "col-span-2" : "col-span-1"}>
      <label htmlFor={id} className="mb-1.5 block text-[11.5px] font-semibold uppercase tracking-[0.14em] text-navy">{label}</label>
      <div className="relative">
        {Icon && <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gold" strokeWidth={1.75} aria-hidden="true" />}
        {children}
      </div>
      {error && <p className="mt-1 text-[12.5px] text-[#b4472f]">{error}</p>}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Floating buttons — bottom-right on every page                              */

function FloatingActions({ onEnquire }) {
  const wa = whatsappLink();
  return (
    <div className="fixed bottom-[84px] right-4 z-[60] flex items-center gap-3 sm:bottom-6 sm:right-6">
      {/* Enquire Now */}
      <motion.button
        type="button"
        onClick={onEnquire}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6, ease }}
        className="group hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#141416] to-[#2A2A2E] py-3 pl-4 pr-5 font-serif text-[15px] font-medium text-white shadow-[0_12px_30px_-10px_rgba(11, 11, 13,0.6)] ring-2 ring-gold/70 transition-all hover:-translate-y-0.5 hover:ring-gold sm:flex"
      >
        <MessageSquareText className="h-[18px] w-[18px] text-gold-champagne" strokeWidth={1.75} />
        Enquire Now
      </motion.button>

      {/* WhatsApp */}
      <motion.a
        href={wa || `${import.meta.env.BASE_URL}contact`}
        target={wa ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5, ease }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,0.7)] transition-transform hover:scale-105"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-25" aria-hidden="true" />
        <Whatsapp width={28} height={28} className="relative" />
      </motion.a>
    </div>
  );
}