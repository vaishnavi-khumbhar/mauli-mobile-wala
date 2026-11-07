import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { media } from "../data/media";
import { useProducts, useCategories } from "../data/cms";
import { whatsappUrl } from "../data/site";
import useSeo from "../hooks/useSeo";
import { Page, Reveal } from "../components/Motion";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import CtaBanner from "../components/CtaBanner";
import Button from "../components/Button";
import BrandMarquee from "../components/BrandMarquee";
import StatsCounter from "../components/StatsCounter";

export default function Products() {
  const products = useProducts();
  const categories = useCategories();
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  // Only show category tabs that have products
  const tabs = useMemo(
    () => categories.filter((c) => products.some((p) => p.categorySlug === c.slug || p.category === c.name)),
    [categories, products]
  );
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter(
      (p) =>
        (cat === "all" || p.categorySlug === cat || p.category === categories.find((c) => c.slug === cat)?.name) &&
        (!s || `${p.name} ${p.category} ${p.shortDescription || ""}`.toLowerCase().includes(s))
    );
  }, [products, categories, cat, q]);

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

      {/* Brands strip (endless scroll) */}
      <BrandMarquee />

      <section id="all-products" className="section scroll-mt-24 bg-ivory">
        <div className="container-site">
          <SectionHeading
            eyebrow="Explore all Products"
            title="Smartphones, Accessories & More"
            text="Tap any category to ask our team about models, availability and prices on WhatsApp."
          />
          {/* Category tabs + search */}
          <Reveal className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
              {[{ slug: "all", name: "All" }, ...tabs].map((c) => (
                <button
                  key={c.slug}
                  type="button"
                  role="tab"
                  aria-selected={cat === c.slug}
                  onClick={() => setCat(c.slug)}
                  className={`rounded-full border px-5 py-2 text-[14px] font-semibold transition-all duration-300 ${
                    cat === c.slug
                      ? "border-blue bg-blue text-white shadow-[0_10px_24px_-12px_rgba(238,20,80,0.8)]"
                      : "border-beige bg-white text-navy hover:-translate-y-0.5 hover:border-blue hover:text-blue"
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
            <label className="relative block w-full lg:w-[300px]">
              <span className="sr-only">Search products</span>
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-grey" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="field !rounded-full !pl-11"
              />
            </label>
          </Reveal>
          <div className="mt-10">
            {list.length ? (
              <ProductGrid key={cat + q} items={list} numbered={false} />
            ) : (
              <p className="rounded-[8px] border border-dashed border-beige bg-white p-10 text-center text-grey">
                No products found. Try another category or ask us on WhatsApp.
              </p>
            )}
          </div>
          <Reveal className="mt-10">
            <p className="text-[14px] text-grey">
              Availability of models and colours may vary by store. Please check with our team before visiting.
            </p>
          </Reveal>
        </div>
      </section>

      <StatsCounter />

      <CtaBanner />
    </Page>
  );
}