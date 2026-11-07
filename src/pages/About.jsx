import { media } from "../data/media";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, ImageReveal, Stagger, Item } from "../components/Motion";
import PageHero from "../components/PageHero";
import ImageSlot from "../components/ImageSlot";
import Button from "../components/Button";
import CtaBanner from "../components/CtaBanner";
import Icon from "../components/Icon";
import { stores, whyUs } from "../data/site";
import StatsCounter from "../components/StatsCounter";
import AuthorisedBadges from "../components/AuthorisedBadges";
import FranchiseCta from "../components/FranchiseCta";

export default function About() {
  useSeo({
    title: "About Us | Mauli Mobile Wala — Smartphone Store Since 2009",
    description:
      "Established in 2009, Mauli Mobile Wala has grown from a single storefront into four retail destinations, offering smartphones from Apple, Samsung, Vivo and more with genuine products and brand warranty.",
  });

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "About" }]}
        eyebrow="About Us"
        title="A Trusted Destination"
        accent="for Smartphones"
        text="Established in 2009, Mauli Mobile Wala has grown from a single storefront into a network of four retail destinations."
        image={media.hero.about}
        imageKey="about-hero"
        imageAlt="Inside a Mauli Mobile Wala store"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Button to="/stores" className="w-full sm:w-auto">Visit a Store</Button>
          <Button to="/products" variant="secondary" className="w-full sm:w-auto">Explore Products</Button>
        </div>
      </PageHero>

      <StatsCounter />

      <section className="section bg-ivory">
        <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="eyebrow eyebrow-gold mb-5">Since 2009</p>
              <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">
                From One Storefront <span className="text-gold">to Four Stores</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lead space-y-5 lg:col-span-7 lg:pt-2">
            <p>
              Established in 2009, Mauli Mobile Wala has grown from a single storefront into a network of four
              retail destinations. Our growth reflects our focus on customer satisfaction and making the latest
              technology accessible to more people.
            </p>
            <p>
              We offer smartphones from leading brands, including Apple, Samsung, Vivo and more, alongside mobile
              accessories and other electronics. Our aim is to provide a reliable shopping experience built around
              genuine products, brand warranty and knowledgeable support.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory pb-12 md:pb-16 lg:pb-20">
        <div className="container-site grid gap-6 md:grid-cols-12">
          <ImageReveal className="md:col-span-7">
            <ImageSlot src={media.sections.storeInterior} alt="Smartphones on display inside the store" slot="store-interior" size="1400 × 1000" className="aspect-[4/3] w-full rounded-[3px]" />
          </ImageReveal>
          <ImageReveal className="md:col-span-5 md:mt-24" delay={0.15}>
            <ImageSlot src={media.sections.aboutDetail} alt="Our team helping a customer choose a phone" slot="about-detail" size="1000 × 1200" className="aspect-[4/5] w-full rounded-[3px]" />
          </ImageReveal>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="container-site grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow mb-5">More Than a Mobile Store</p>
            <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">
              Simple, Informed <span className="text-gold">Phone Shopping.</span>
            </h2>
            <p className="lead mt-6">
              We believe choosing a phone should feel simple and informed. Our team is here to understand what you
              need, help you explore available options and make your visit to Mauli Mobile Wala worthwhile.
            </p>
            <p className="lead mt-5">
              Whether you're searching for the latest smartphone or looking for mobile accessories, visit one of our
              four outlets and explore the range.
            </p>
            <div className="mt-9"><Button to="/stores" variant="secondary">Find Your Nearest Store</Button></div>
          </Reveal>
          <Stagger className="border-t border-gold/40">
            {whyUs.map((w) => (
              <Item key={w.title} className="flex items-start gap-5 border-b border-gold/40 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10">
                  <Icon name={w.icon} className="h-5 w-5 text-gold" strokeWidth={1.6} />
                </span>
                <div>
                  <h3 className="text-xl">{w.title}</h3>
                  <p className="mt-1 text-[15px] text-grey">{w.text}</p>
                </div>
              </Item>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-site">
          <Reveal className="text-center">
            <p className="eyebrow eyebrow-plain mb-4 justify-center">Visit Us</p>
            <h2 className="text-[34px] leading-[1.1] sm:text-[42px]">Our Four Stores</h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-px overflow-hidden border border-beige bg-beige sm:grid-cols-2 lg:grid-cols-4">
            {stores.map((s) => (
              <Item key={s.no} className="bg-white p-7">
                <span className="font-serif text-4xl font-semibold text-gold">{s.no}</span>
                <h3 className="mt-3 text-2xl">{s.name}</h3>
                <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.16em] text-grey">{s.region}</p>
              </Item>
            ))}
          </Stagger>
          <Reveal className="mt-10 text-center">
            <Button to="/stores" variant="secondary">Store Addresses & Directions</Button>
          </Reveal>
        </div>
      </section>

      <AuthorisedBadges />

      <FranchiseCta />

      <CtaBanner />
    </Page>
  );
}