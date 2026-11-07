import { useState } from "react";
import { Phone, MapPin, CheckCircle2, ArrowUpRight, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { media } from "../data/media";
import { site, stores, contactLinks, whatsappUrl, hasSocial } from "../data/site";
import { useProducts } from "../data/cms";
import useSeo from "../hooks/useSeo";
import { Page, Reveal } from "../components/Motion";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import { Whatsapp, Instagram, Facebook } from "../components/SocialIcons";

const initial = { name: "", phone: "", store: "", interest: "", message: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your name.";
  if (!/^[+\d][\d\s-]{7,}$/.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  return e;
}

export default function Contact() {
  const products = useProducts();
  useSeo({
    title: "Contact Us | Mauli Mobile Wala",
    description:
      "Have a question about smartphones, mobile accessories or electronics? Call Mauli Mobile Wala on +91 90112 39123, WhatsApp +91 97654 42962 or visit one of our four stores.",
  });

  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const c = site.contact;

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate(values);
    setErrors(er);
    if (Object.keys(er).length) {
      document.getElementById(Object.keys(er)[0])?.focus();
      return;
    }
    const text =
      `New enquiry from website\nName: ${values.name}\nPhone: ${values.phone}` +
      `\nPreferred store: ${values.store || "Any"}\nLooking for: ${values.interest || "Not sure"}\nMessage: ${values.message || "-"}`;
    window.open(whatsappUrl(text), "_blank", "noopener");
    setSent(true);
    setValues(initial);
  };

  const details = [
    { label: "Call Us", value: c.phone, Icon: Phone, href: contactLinks.tel },
    { label: "WhatsApp", value: c.whatsapp, Icon: Whatsapp, href: contactLinks.whatsapp, external: true },
    c.email && { label: "Email", value: c.email, Icon: Mail, href: contactLinks.email },
  ].filter(Boolean);

  const socials = [
    { key: "instagram", label: "Instagram", Icon: Instagram, handle: "@maulimobilewalaofficial" },
    { key: "facebook", label: "Facebook", Icon: Facebook, handle: "Mauli Mobile Wala" },
  ].filter((s) => hasSocial(s.key));

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "Contact" }]}
        eyebrow="Contact Us"
        title="Get in Touch with"
        accent="Mauli Mobile Wala"
        text="Have a question about smartphones, mobile accessories or electronics? Contact Mauli Mobile Wala. Our team will be happy to help."
        image={media.hero.contact}
        imageKey="contact-hero"
        imageAlt="Our team ready to help customers"
      />

      <section className="section bg-ivory">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow eyebrow-gold mb-5">Contact Details</p>
              <h2 className="text-[30px] leading-tight sm:text-[36px]">We're Here to Help</h2>
            </Reveal>
            <Reveal delay={0.1} as="ul" className="mt-8 border-t border-gold/40">
              {details.map(({ label, value, Icon, href, external }) => (
                <li key={label} className="border-b border-gold/40">
                  <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-5 py-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/50 bg-white text-gold transition-colors duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-white">
                      <Icon className="h-5 w-5" width={20} height={20} strokeWidth={1.4} aria-hidden="true" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-grey">{label}</p>
                      <p className="mt-1 break-words font-serif text-lg text-navy transition-colors group-hover:text-gold">{value}</p>
                    </div>
                  </a>
                </li>
              ))}
            </Reveal>

            {socials.length > 0 && (
              <Reveal delay={0.12} className="mt-10">
                <p className="eyebrow mb-4">Follow Us</p>
                <div className="flex flex-wrap gap-3">
                  {socials.map(({ key, label, Icon, handle }) => (
                    <a
                      key={key}
                      href={site.social[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Mauli Mobile Wala on ${label}`}
                      className="group flex items-center gap-3 rounded-full border border-beige bg-white py-2 pl-2 pr-5 transition-all hover:border-gold hover:shadow-soft"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-white">
                        <Icon width={18} height={18} />
                      </span>
                      <span className="leading-tight">
                        <span className="block text-[14px] font-semibold text-navy">{label}</span>
                        <span className="block text-[12.5px] text-grey">{handle}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.15} className="mt-10">
              <p className="eyebrow mb-4">Our Stores</p>
              <ul className="space-y-3">
                {stores.map((s) => (
                  <li key={s.no}>
                    <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 rounded-[6px] border border-beige bg-white p-4 transition-colors hover:border-gold">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                      <span className="min-w-0">
                        <span className="block font-serif text-lg text-navy">Store {s.no} — {s.name}</span>
                        <span className="mt-0.5 block text-[13.5px] leading-relaxed text-grey">{s.address}</span>
                        <span className="mt-1.5 inline-flex items-center gap-1 text-[13px] font-semibold text-blue group-hover:text-navy">
                          Get Directions <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <Link to="/stores" className="mt-4 inline-block text-[14px] font-semibold text-blue hover:text-navy">See all stores on the map →</Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="card relative p-6 sm:p-10 lg:sticky lg:top-32">
              <span className="absolute left-0 top-0 h-[3px] w-24 bg-gold" aria-hidden="true" />
              <h2 className="text-[30px] leading-tight sm:text-[36px]">Send an Enquiry</h2>
              <p className="mt-2 text-[15px] text-grey">Your enquiry opens in WhatsApp, ready to send. Fields marked * are required.</p>

              {sent ? (
                <div className="mt-10 flex flex-col items-start gap-4 border border-beige bg-cream p-8" role="status">
                  <CheckCircle2 className="h-9 w-9 text-gold" strokeWidth={1.3} />
                  <h3 className="text-2xl">Thank you!</h3>
                  <p className="text-[15px] text-grey">Please press send in WhatsApp. Our team will get back to you shortly.</p>
                  <button type="button" onClick={() => setSent(false)} className="btn btn-secondary mt-2">
                    <span>Send another enquiry</span>
                  </button>
                </div>
              ) : (
                <form className="mt-8 grid gap-6 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
                  <Field id="name" label="Name *" error={errors.name}>
                    <input id="name" name="name" autoComplete="name" className="field" value={values.name} onChange={onChange} aria-invalid={!!errors.name} />
                  </Field>
                  <Field id="phone" label="Phone *" error={errors.phone}>
                    <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={values.phone} onChange={onChange} aria-invalid={!!errors.phone} />
                  </Field>
                  <Field id="store" label="Preferred Store">
                    <select id="store" name="store" className="field" value={values.store} onChange={onChange}>
                      <option value="">Any store</option>
                      {stores.map((s) => <option key={s.no}>{s.name}</option>)}
                    </select>
                  </Field>
                  <Field id="interest" label="Looking For">
                    <select id="interest" name="interest" className="field" value={values.interest} onChange={onChange}>
                      <option value="">Select (optional)</option>
                      {products.map((p) => <option key={p.slug}>{p.name}</option>)}
                      <option>Not sure / Need help choosing</option>
                      <option>Franchise enquiry</option>
                    </select>
                  </Field>
                  <Field id="message" label="Message" full>
                    <textarea id="message" name="message" rows={5} className="field resize-y" placeholder="Model, budget or any question." value={values.message} onChange={onChange} />
                  </Field>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">Send on WhatsApp</Button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}

function Field({ id, label, error, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="field-label">{label}</label>
      {children}
      {error && <p className="mt-2 text-[13px] text-[#b4472f]">{error}</p>}
    </div>
  );
}