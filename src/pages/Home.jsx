import { motion } from "framer-motion";
import { media } from "../data/media";
import { stores, whyUs } from "../data/site";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, ease } from "../components/Motion";
import HeroSlider from "../components/HeroSlider";
import ImageSlot from "../components/ImageSlot";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import Icon from "../components/Icon";
import StatsCounter from "../components/StatsCounter";
import AuthorisedBadges from "../components/AuthorisedBadges";
import FranchiseCta from "../components/FranchiseCta";
import BrandMarquee from "../components/BrandMarquee";
import ArticleCard from "../components/ArticleCard";
import { Stagger } from "../components/Motion";
import { useProducts, useArticles, featuredProducts } from "../data/cms";

/* Shared animation settings for this page */
const inView = { once: true, margin: "-80px" };
const fromLeft = { hidden: { opacity: 0, x: -60 }, show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } } };
const fromRight = { hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease } } };
const rise = { hidden: { opacity: 0, y: 40, scale: 0.96 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease } } };
const group = (stagger = 0.12, delay = 0) => ({ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } });

export default function Home() {
  const products = useProducts();
  const articles = useArticles();
  useSeo({
    title: "Mauli Mobile Wala | Smartphones, Mobile Accessories & Electronics",
    description:
      "Discover the latest smartphones from Apple, Samsung, Vivo and more, plus mobile accessories and electronics at Mauli Mobile Wala. Genuine products, brand warranty and expert support at four stores.",
  });


  return (
    <Page>
      <HeroSlider />

      {/* ───────── Numbers (count-up) ───────── */}
      <StatsCounter />

      {/* ───────── Section 2 — brand intro ───────── */}
      <section id="intro" className="section relative overflow-hidden bg-cream">
        {/* slow-rotating decorative ring */}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-10 hidden h-72 w-72 rounded-full border border-dashed border-gold/30 lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <div className="container-site grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div className="relative lg:col-span-7" variants={fromLeft} initial="hidden" whileInView="show" viewport={inView}>
            <div className="group overflow-hidden rounded-[3px]">
              <div>
                <ImageSlot
                  src={media.sections.brandStory}
                  alt="Customer exploring smartphones at Mauli Mobile Wala"
                  slot="brand-story"
                  size="1400 × 1000"
                  className="aspect-[7/4] w-full transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                />
              </div>
            </div>

            {/* "Since 2009" badge pops in */}
            <motion.div
              className="absolute -bottom-6 right-4 z-10 hidden md:block lg:-right-6"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={inView}
              transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.6 }}
              whileHover={{ y: -4 }}
            >
              <div className="border-l-[3px] border-gold bg-white px-7 py-5 shadow-card">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">Since</p>
                <p className="mt-1 font-serif text-[44px] font-bold leading-none text-navy">2009</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div className="lg:col-span-5" variants={group(0.14, 0.2)} initial="hidden" whileInView="show" viewport={inView}>
            <motion.p variants={fromRight} className="eyebrow eyebrow-gold mb-5">Since 2009</motion.p>
            <motion.h2 variants={fromRight} className="text-[34px] leading-[1.1] sm:text-[42px] md:text-5xl">
              Redefining the Mobile <span className="relative inline-block text-gold">
                Shopping Experience
                <motion.span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gold/60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={inView}
                  transition={{ duration: 1, ease, delay: 0.9 }}
                />
              </span>
            </motion.h2>
            <motion.p variants={fromRight} className="lead mt-7">
              At Mauli Mobile Wala, buying a smartphone is about more than choosing a device. We bring
              together the latest technology, authentic products and helpful guidance to make your shopping
              experience simple and enjoyable.
            </motion.p>
            <motion.p variants={fromRight} className="lead mt-5">
              From your first smartphone to your next upgrade, explore a wide range of mobile phones and
              accessories at our outlets.
            </motion.p>
            <motion.div variants={fromRight} className="mt-10">
              <Button to="/about" variant="secondary">Our Story</Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────── Samsung / Apple authorisations ───────── */}
      <AuthorisedBadges />

      {/* ───────── Products ───────── */}
      <section className="section bg-ivory">
        <div className="container-site">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Our Products"
              title="Find the Tech That Fits Your Everyday"
              text="Smartphones from Apple, Samsung, Vivo and more, along with mobile accessories and electronics."
            />
            <Reveal className="shrink-0" delay={0.2}>
              <Button to="/products" variant="secondary">Explore all Products</Button>
            </Reveal>
          </div>
          <div className="mt-14 [&_article>a]:transition-all [&_article>a]:duration-500 [&_article>a:hover]:-translate-y-2">
            <ProductGrid items={featuredProducts(products)} numbered={false} />
          </div>
        </div>
      </section>

      <BrandMarquee dark />

      {/* ───────── Why us ───────── */}
      <section className="section bg-cream">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Why Mauli Mobile Wala"
              title="Why Choose Mauli Mobile Wala?"
              text="Shop with confidence with genuine products, brand warranty, competitive prices and expert support from a team that puts your needs first."
            />
            <Reveal className="mt-9" delay={0.2}>
              <Button to="/about" variant="secondary">About Us</Button>
            </Reveal>
          </div>

          <motion.div
            className="grid gap-px overflow-hidden border border-beige bg-beige sm:grid-cols-2 lg:col-span-8"
            variants={group(0.15)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
          >
            {whyUs.map((w, i) => (
              <motion.div
                key={w.title}
                variants={rise}
                whileHover={{ y: -4 }}
                className={`group relative bg-white p-7 transition-colors duration-500 hover:bg-ivory md:p-9 ${i === whyUs.length - 1 && whyUs.length % 2 ? "sm:col-span-2" : ""}`}
              >
                {/* gold top bar grows on hover */}
                <span className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" aria-hidden="true" />
                <motion.span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 transition-colors duration-500 group-hover:bg-gold"
                  initial={{ scale: 0, rotate: -90 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={inView}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                >
                  <Icon name={w.icon} className="h-7 w-7 text-gold transition-colors duration-500 group-hover:text-white" strokeWidth={1.4} />
                </motion.span>
                <h3 className="mt-6 text-[22px]">{w.title}</h3>
                <span className="mt-4 block h-px w-8 bg-gold transition-all duration-500 group-hover:w-16" />
                <p className="mt-4 text-[15px] leading-relaxed text-grey">{w.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ───────── Our stores ───────── */}
      <section className="section bg-cream">
        <div className="container-site">
          <SectionHeading
            eyebrow="Our Stores"
            title="Four Stores. One Trusted Name."
            text="Choose your nearest store and plan your visit."
            align="center"
          />

          <div className="relative mt-16">
            {/* gold timeline line draws across (desktop) */}
            <motion.span
              aria-hidden="true"
              className="absolute left-0 right-0 top-[38px] hidden h-px origin-left bg-gradient-to-r from-gold/20 via-gold to-gold/20 lg:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={inView}
              transition={{ duration: 1.6, ease }}
            />
            <motion.div
              className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
              variants={group(0.25, 0.4)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
            >
              {stores.map((a) => (
                <motion.div key={a.no} variants={rise} className="group relative text-center lg:text-left">
                  <div className="relative inline-flex items-center gap-3">
                    <span className="relative z-10 font-serif text-6xl font-semibold text-blue-soft/90 transition-colors duration-500 group-hover:text-gold">
                      {a.no}
                    </span>
                    {/* dot on the timeline */}
                    <motion.span
                      aria-hidden="true"
                      className="hidden h-3 w-3 rounded-full bg-gold ring-4 ring-cream lg:block"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={inView}
                      transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1 }}
                    />
                  </div>
                  <h3 className="mt-4 text-2xl">{a.name}</h3>
                  <p className="mt-1 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold">{a.region}</p>
                  <p className="mt-3 text-[15px] leading-relaxed text-grey">{a.address}</p>
                  <a href={a.mapUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-blue hover:text-navy">
                    Get Directions →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <Reveal className="mt-14 text-center" delay={0.3}>
            <Button to="/stores" variant="secondary">View All Stores</Button>
          </Reveal>
        </div>
      </section>

      {/* ───────── Latest articles ───────── */}
      {articles.length > 0 && (
        <section className="section bg-ivory">
          <div className="container-site">
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <SectionHeading eyebrow="Articles & Stories" title="From Our Journal" text="Our story, store news and smart buying tips." />
              <Reveal className="shrink-0" delay={0.2}>
                <Button to="/articles" variant="secondary">View All Articles</Button>
              </Reveal>
            </div>
            <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" s={0.12}>
              {articles.slice(0, 3).map((a) => <ArticleCard key={a.slug} article={a} />)}
            </Stagger>
          </div>
        </section>
      )}

      {/* ───────── Franchise appeal ───────── */}
      <FranchiseCta />

      <CtaBanner />
    </Page>
  );
}