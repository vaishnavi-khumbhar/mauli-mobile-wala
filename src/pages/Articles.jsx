import { useMemo, useState } from "react";
import { media } from "../data/media";
import { useArticles, useCmsStatus } from "../data/cms";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, Stagger } from "../components/Motion";
import PageHero from "../components/PageHero";
import ArticleCard from "../components/ArticleCard";
import CtaBanner from "../components/CtaBanner";

export default function Articles() {
  useSeo({
    title: "Articles & Stories | Mauli Mobile Wala",
    description: "Stories, news and smartphone buying tips from Mauli Mobile Wala — including the journey of founders Datta and Rahul Amte.",
  });
  const articles = useArticles();
  const status = useCmsStatus();
  const cats = useMemo(() => ["All", ...new Set(articles.map((a) => a.category).filter(Boolean))], [articles]);
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const [first, ...rest] = list;

  return (
    <Page>
      <PageHero
        crumbs={[{ label: "Articles" }]}
        eyebrow="Articles & Stories"
        title="Stories, News &"
        accent="Smart Buying Tips"
        text="Read our journey, store news and helpful guides to choose the right smartphone and accessories."
        image={media.hero.articles || media.sections.brandStory}
        imageKey="articles-hero"
        imageAlt="Mauli Mobile Wala store"
      />

      <section className="section bg-ivory">
        <div className="container-site">
          {cats.length > 2 && (
            <Reveal className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Article categories">
              {cats.map((c) => (
                <button
                  key={c}
                  type="button"
                  role="tab"
                  aria-selected={cat === c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-5 py-2 text-[14px] font-semibold transition-all ${
                    cat === c ? "border-blue bg-blue text-white shadow-[0_10px_24px_-12px_rgba(238,20,80,0.8)]" : "border-beige bg-white text-navy hover:border-blue hover:text-blue"
                  }`}
                >
                  {c}
                </button>
              ))}
            </Reveal>
          )}

          {status === "loading" ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
              {[0, 1, 2].map((i) => <div key={i} className="card h-[380px] animate-pulse bg-white" />)}
            </div>
          ) : !first ? (
            <p className="text-center text-grey">No articles yet. Please check back soon.</p>
          ) : (
            <>
              <Stagger s={0.1}>
                <ArticleCard article={first} large />
              </Stagger>
              {rest.length > 0 && (
                <Stagger className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" s={0.1}>
                  {rest.map((a) => <ArticleCard key={a.slug} article={a} />)}
                </Stagger>
              )}
            </>
          )}
        </div>
      </section>

      <CtaBanner />
    </Page>
  );
}