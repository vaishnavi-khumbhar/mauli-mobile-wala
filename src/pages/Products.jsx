import { media } from "../data/media";
import { brands, whatsappUrl } from "../data/site";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, Stagger, Item } from "../components/Motion";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";

export default function Products() {
  useSeo({
    title: "Products | Smartphones, Mobile Accessories & Electronics — Mauli Mobile Wala",
    description:
      "Explore smartphones from Apple, Samsung, Vivo and more, along with mobile accessories and electronics at Mauli Mobile Wala. Genuine products with brand warranty.",
  });

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "Products" }]}
        eyebrow="Our Products"
        title="Find the Tech That"
        accent="Fits Your Everyday"
        text="Smartphones from leading brands like Apple, Samsung, Vivo and more, along with mobile accessories and electronics — genuine products with brand warranty."
        image={media.hero.products}
        imageKey="products-hero"
        imageAlt="Latest smartphones from leading brands"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-5">
          <Button href="#all-products" className="w-full sm:w-auto">Explore all Products</Button>
          <Button href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="secondary" className="w-full sm:w-auto">
            Ask on WhatsApp
          </Button>
        </div>
      </PageHero>

      {/* Brands strip */}
      <section className="border-b border-beige bg-white">
        <Stagger className="container-site flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-7 md:justify-between" s={0.08}>
          <Item as="p" className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.24em] text-grey md:w-auto md:text-left">
            Brands we offer
          </Item>
          {brands.map((b) => (
            <Item key={b} as="span" className="font-serif text-2xl font-semibold text-navy md:text-3xl">
              {b}
            </Item>
          ))}
        </Stagger>
      </section>

      <section id="all-products" className="section scroll-mt-24 bg-ivory">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore all Products"
            title="Smartphones, Accessories & More"
            text="Tap any category to ask our team about models, availability and prices on WhatsApp."
          />
          <div className="mt-14"><ProductGrid /></div>
         
        </div>
      </section>

      <CtaBanner />
    </Page>
  );
}
