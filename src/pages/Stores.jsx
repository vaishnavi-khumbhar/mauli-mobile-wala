import { useState } from "react";
import { MapPin, Navigation, Phone } from "lucide-react";
import { media } from "../data/media";
import { stores, site, contactLinks, whatsappUrl } from "../data/site";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, Stagger, Item } from "../components/Motion";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import Button from "../components/Button";
import CtaBanner from "../components/CtaBanner";
import FranchiseCta from "../components/FranchiseCta";
import { Whatsapp } from "../components/SocialIcons";

export default function Stores() {
  useSeo({
    title: "Our Stores | Mauli Mobile Wala — Majalgaon, Beed, Talegaon Dabhade & Dehu",
    description:
      "Visit Mauli Mobile Wala to explore smartphones from Apple, Samsung, Vivo and more, along with mobile accessories and electronics. Four stores: Majalgaon, Beed, Talegaon Dabhade and Dehu.",
  });
  const [active, setActive] = useState(0);
  const map = stores[active];

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "Our Stores" }]}
        eyebrow="Our Stores"
        title="Find a Mauli Mobile Wala"
        accent="Store Near You"
        text={[
          "Visit Mauli Mobile Wala to explore smartphones from Apple, Samsung, Vivo and more, along with mobile accessories and electronics. Our four retail outlets make it easier to browse products and get help from our team.",
          "Choose your nearest store and plan your visit.",
        ]}
        image={media.hero.stores}
        imageKey="stores-hero"
        imageAlt="Mauli Mobile Wala store front"
      />

      <section className="section bg-ivory">
        <div className="container-site">
          <Stagger className="grid gap-6 md:grid-cols-2 lg:gap-8" s={0.12}>
            {stores.map((s, i) => (
              <Item key={s.no} as="article" className="card shine-card group flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-20px_rgba(238,20,80,0.45)]">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <ImageSlot
                    src={s.image}
                    alt={`Mauli Mobile Wala ${s.name} store`}
                    slot={s.imageKey}
                    size="1200 × 900"
                    fit="cover"
                    className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-[1.05]"
                  />
                  <span className="absolute left-4 top-4 bg-white/95 px-3 py-1 font-serif text-sm font-semibold text-navy">
                    Store {s.no}
                  </span>
                  {s.tag && (
                    <span className="absolute right-4 top-4 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-card">
                      {s.tag}
                    </span>
                  )}
                </div>
                <div className="relative flex flex-1 flex-col p-6 md:p-7">
                  <span className="absolute left-6 top-0 h-[2px] w-10 bg-gold md:left-7" aria-hidden="true" />
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{s.region}</p>
                  <h2 className="mt-2 text-[28px] leading-tight">{s.name}</h2>
                  <p className="mt-3 flex flex-1 items-start gap-2.5 text-[15px] leading-relaxed text-grey">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
                    {s.address}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2.5">
                    <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary !px-4 !py-2.5 !text-[14px]">
                      <Navigation className="h-4 w-4" strokeWidth={1.75} /> <span>Get Directions</span>
                    </a>
                    <a href={contactLinks.tel} className="btn btn-secondary !px-4 !py-2.5 !text-[14px]">
                      <Phone className="h-4 w-4" strokeWidth={1.75} /> <span>Call</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => { setActive(i); document.getElementById("store-map")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                      className="btn btn-secondary !px-4 !py-2.5 !text-[14px]"
                    >
                      <MapPin className="h-4 w-4" strokeWidth={1.75} /> <span>View on Map</span>
                    </button>
                  </div>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Map with store tabs */}
      <section id="store-map" className="section scroll-mt-24 bg-cream" aria-label="Store map">
        <div className="container-site">
          <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow eyebrow-gold mb-4">Store Map</p>
              <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">Plan Your Visit</h2>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Choose a store">
              {stores.map((s, i) => (
                <button
                  key={s.no}
                  type="button"
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => setActive(i)}
                  className={`rounded-full border px-4 py-2 text-[14px] font-semibold transition-all ${
                    active === i ? "border-navy bg-navy text-white" : "border-beige bg-white text-navy hover:border-gold hover:text-gold"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative mt-10">
            <div className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-[8px] border border-gold/60 md:block" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-[8px] border border-beige bg-white shadow-card">
              <iframe
                key={map.no}
                title={`Mauli Mobile Wala ${map.name} on Google Maps`}
                src={map.mapEmbed}
                className="block h-[340px] w-full md:h-[440px]"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="pointer-events-none absolute left-4 top-4 hidden max-w-[320px] rounded-[6px] bg-white/95 p-5 shadow-card backdrop-blur sm:block">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">Store {map.no}</p>
                <p className="mt-1.5 font-serif text-xl text-navy">{site.name} — {map.name}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-charcoal/80">{map.address}</p>
              </div>
            </div>
          </Reveal>
          <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={map.mapUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              Directions to {map.name}
            </Button>
            <a
              href={whatsappUrl(`Hello Mauli Mobile Wala, I'd like to visit your ${map.name} store.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn w-full bg-[#25D366] text-white hover:bg-[#1EBE5A] sm:w-auto"
            >
              <Whatsapp width={18} height={18} /> <span>WhatsApp Before You Visit</span>
            </a>
          </Reveal>
        </div>
      </section>

      <FranchiseCta />

      <CtaBanner title="Have a Question Before You Visit?" text="Call or WhatsApp us — our team will be happy to help." cta="Contact Us" to="/contact" />
    </Page>
  );
}