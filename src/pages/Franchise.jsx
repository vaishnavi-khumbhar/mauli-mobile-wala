import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { media } from "../data/media";
import { franchise, stores, whatsappUrl, contactLinks, site } from "../data/site";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, ease } from "../components/Motion";
import PageHero from "../components/PageHero";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatsCounter from "../components/StatsCounter";
import AuthorisedBadges from "../components/AuthorisedBadges";
import { franchiseWhatsapp } from "../components/FranchiseCta";

const initial = { name: "", phone: "", city: "", space: "", business: "", message: "" };

export default function Franchise() {
  useSeo({
    title: "Franchise Opportunity | Mauli Mobile Wala",
    description:
      "Own a Mauli Mobile Wala mobile store franchise. Trusted since 2009, 2 lakh+ customers, 100+ brands, Samsung authorised distributor and Apple iPhone authorised reseller. Enquire today.",
  });

  const [v, setV] = useState(initial);
  const [err, setErr] = useState({});
  const [sent, setSent] = useState(false);

  const onChange = (e) => {
    setV((x) => ({ ...x, [e.target.name]: e.target.value }));
    if (err[e.target.name]) setErr((x) => ({ ...x, [e.target.name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = {};
    if (!v.name.trim()) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s-]{7,}$/.test(v.phone.trim())) er.phone = "Please enter a valid phone number.";
    if (!v.city.trim()) er.city = "Please enter your city.";
    setErr(er);
    if (Object.keys(er).length) {
      document.getElementById(`f-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    const text =
      `*FRANCHISE ENQUIRY* (website)\nName: ${v.name}\nPhone: ${v.phone}\nCity / Location: ${v.city}` +
      `\nShop space: ${v.space || "-"}\nCurrent business: ${v.business || "-"}\nMessage: ${v.message || "-"}`;
    window.open(whatsappUrl(text), "_blank", "noopener");
    setSent(true);
    setV(initial);
  };

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "Franchise" }]}
        eyebrow="Franchise Opportunity"
        title="Grow With"
        accent="Mauli Mobile Wala"
        text={[
          "We are now offering Mauli Mobile Wala franchises. Bring a trusted mobile retail brand to your city, backed by 17 years of experience, 100+ brands and strong partnerships with leading phone companies.",
        ]}
        image={media.hero.franchise || media.stores[2]}
        imageKey="franchise-hero"
        imageAlt="Customers inside a busy Mauli Mobile Wala store"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Button href="#franchise-form" className="w-full sm:w-auto">Apply for Franchise</Button>
          <Button href={franchiseWhatsapp} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full sm:w-auto">
            WhatsApp Us
          </Button>
        </div>
      </PageHero>

      <StatsCounter />

      {/* Why partner */}
      <section className="section bg-cream">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-plain mb-5">Why Partner With Us</p>
            <h2 className="text-[34px] leading-[1.1] sm:text-[42px] md:text-5xl">
              A Brand Customers <span className="text-gold">Already Trust</span>
            </h2>
            <span className="mx-auto mt-6 block h-px w-16 bg-gold" aria-hidden="true" />
          </Reveal>

          <motion.div
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            {franchise.benefits.map((b) => (
              <motion.div
                key={b.title}
                variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } }}
                whileHover={{ y: -6 }}
                className="group relative overflow-hidden rounded-[8px] border border-beige bg-white p-7 transition-shadow duration-500 hover:shadow-card"
              >
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-blue transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue/10 transition-colors duration-500 group-hover:bg-blue">
                  <Icon name={b.icon} className="h-7 w-7 text-blue transition-colors duration-500 group-hover:text-white" strokeWidth={1.5} />
                </span>
                <h3 className="mt-5 text-[22px]">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-grey">{b.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AuthorisedBadges />

      {/* Process */}
      <section className="section bg-white">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-plain mb-5">How It Works</p>
            <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">4 Simple Steps to Your Own Store</h2>
          </Reveal>
          <div className="relative mt-14">
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 top-7 hidden h-[2px] origin-left bg-gradient-to-r from-blue/20 via-blue to-blue/20 lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6, ease }}
            />
            <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {franchise.steps.map((s, i) => (
                <motion.li
                  key={s.title}
                  className="relative text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease, delay: 0.3 + i * 0.2 }}
                >
                  <span className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue font-serif text-[22px] font-bold text-white ring-8 ring-white">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-[21px]">{s.title}</h3>
                  <p className="mx-auto mt-2 max-w-[240px] text-[15px] leading-relaxed text-grey">{s.text}</p>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="franchise-form" className="section scroll-mt-28 bg-ivory">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow eyebrow-gold mb-5">Franchise Enquiry</p>
            <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">Let's Build Your Store Together</h2>
            <p className="lead mt-5">
              Share a few details and our franchise team will contact you to discuss the opportunity,
              investment and next steps.
            </p>
            <div className="mt-8 space-y-3 text-[15px]">
              <a href={contactLinks.tel} className="flex items-center gap-3 font-semibold text-navy hover:text-blue">
                <span className="h-2 w-2 rounded-full bg-blue" /> Call: {site.contact.phone}
              </a>
              <a href={franchiseWhatsapp} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 font-semibold text-navy hover:text-blue">
                <span className="h-2 w-2 rounded-full bg-[#25D366]" /> WhatsApp: {site.contact.whatsapp}
              </a>
              <p className="flex items-center gap-3 text-grey">
                <span className="h-2 w-2 rounded-full bg-gold/50" /> Existing stores: {stores.map((s) => s.name).join(", ")}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="card relative p-6 sm:p-10">
              <span className="absolute left-0 top-0 h-[3px] w-24 bg-blue" aria-hidden="true" />
              {sent ? (
                <div className="flex flex-col items-start gap-4" role="status">
                  <CheckCircle2 className="h-10 w-10 text-blue" strokeWidth={1.3} />
                  <h3 className="text-2xl">Thank you for your interest!</h3>
                  <p className="text-[15px] text-grey">Please press send in WhatsApp. Our franchise team will get back to you.</p>
                  <button type="button" onClick={() => setSent(false)} className="btn btn-secondary mt-2"><span>Send another enquiry</span></button>
                </div>
              ) : (
                <form className="grid gap-6 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
                  <F id="name" label="Full Name *" error={err.name}>
                    <input id="f-name" name="name" autoComplete="name" className="field" value={v.name} onChange={onChange} aria-invalid={!!err.name} />
                  </F>
                  <F id="phone" label="Phone *" error={err.phone}>
                    <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" className="field" value={v.phone} onChange={onChange} aria-invalid={!!err.phone} />
                  </F>
                  <F id="city" label="City / Location *" error={err.city}>
                    <input id="f-city" name="city" className="field" placeholder="e.g. Ahilyanagar" value={v.city} onChange={onChange} aria-invalid={!!err.city} />
                  </F>
                  <F id="space" label="Shop Space">
                    <select id="f-space" name="space" className="field" value={v.space} onChange={onChange}>
                      <option value="">Select</option>
                      <option>I own a shop space</option>
                      <option>I will rent a shop space</option>
                      <option>Not yet decided</option>
                    </select>
                  </F>
                  <F id="business" label="Current Business / Occupation" full>
                    <input id="f-business" name="business" className="field" placeholder="e.g. Mobile shop owner, business, job" value={v.business} onChange={onChange} />
                  </F>
                  <F id="message" label="Message" full>
                    <textarea id="f-message" name="message" rows={4} className="field resize-y" placeholder="Anything you would like to ask us" value={v.message} onChange={onChange} />
                  </F>
                  <div className="sm:col-span-2">
                    <Button type="submit" className="w-full sm:w-auto">Send Franchise Enquiry</Button>
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

function F({ id, label, error, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label htmlFor={`f-${id}`} className="field-label">{label}</label>
      {children}
      {error && <p className="mt-2 text-[13px] text-[#b4472f]">{error}</p>}
    </div>
  );
}