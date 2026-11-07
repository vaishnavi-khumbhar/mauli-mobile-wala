import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Clock, Link2, Check } from "lucide-react";
import { useArticles, useCmsStatus, findArticle, formatDate, readMinutes } from "../data/cms";
import useSeo from "../hooks/useSeo";
import { Page, Reveal, Stagger, ease } from "../components/Motion";
import Breadcrumb from "../components/Breadcrumb";
import ImageSlot from "../components/ImageSlot";
import RichText from "../components/RichText";
import ArticleCard from "../components/ArticleCard";
import FranchiseCta from "../components/FranchiseCta";
import Button from "../components/Button";
import AnimatedTitle from "../components/AnimatedTitle";
import { Whatsapp, Facebook } from "../components/SocialIcons";
import NotFound from "./NotFound";

export default function ArticleDetail() {
  const { slug } = useParams();
  const articles = useArticles();
  const status = useCmsStatus();
  const a = findArticle(articles, slug);

  useSeo({
    title: a ? `${a.title} | Mauli Mobile Wala` : "Article | Mauli Mobile Wala",
    description: a?.excerpt || "Articles and stories from Mauli Mobile Wala.",
  });

  if (status === "loading") return <Page><div className="min-h-[70vh] bg-cream" aria-busy="true" /></Page>;
  if (!a) return <NotFound />;

  const others = articles.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <Page>
      <article lang={a.language === "mr" ? "mr" : undefined}>
        {/* Header */}
        <header className="relative isolate overflow-hidden bg-cream">
          <motion.span
            aria-hidden="true"
            className="absolute -left-32 top-10 -z-10 h-[420px] w-[420px] rounded-full bg-blue/10 blur-3xl"
            animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="container-site max-w-[900px] pb-10 pt-12 text-center md:pt-16">
            <div className="flex justify-center">
              <Breadcrumb items={[{ label: "Articles", to: "/articles" }, { label: a.category || "Article" }]} />
            </div>
            {a.category && (
              <motion.span
                className="mt-8 inline-block rounded-full bg-blue px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.18em] text-white"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
              >
                {a.category}
              </motion.span>
            )}
            <h1 className="mt-6 text-[34px] font-bold leading-[1.15] sm:text-[46px] lg:text-[54px]">
              <AnimatedTitle text={a.title} delay={0.15} stagger={0.04} />
            </h1>
            {a.subtitle && (
              <motion.p
                className="lead mx-auto mt-6 max-w-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease, delay: 0.5 }}
              >
                {a.subtitle}
              </motion.p>
            )}
            <motion.p
              className="mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[14px] font-semibold text-grey"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <span>By {a.author || "Mauli Mobile Wala"}</span>
              {a.date && <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-4 w-4 text-blue" />{formatDate(a.date)}</span>}
              <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-blue" />{readMinutes(a.content)} min read</span>
            </motion.p>
          </div>

          <motion.div
            className="container-site max-w-[1100px]"
            initial={{ opacity: 0, y: 40, clipPath: "inset(10% 10% 0 10% round 12px)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0% 0% 0 0% round 12px)" }}
            transition={{ duration: 1.1, ease, delay: 0.3 }}
          >
            <div className="overflow-hidden rounded-[12px] shadow-card">
              <ImageSlot src={a.image} alt={a.title} slot={a.imageKey || "article-cover"} size="1600 × 900" eager className="aspect-[16/9] w-full" />
            </div>
          </motion.div>
          <div className="h-12 bg-gradient-to-b from-cream to-white" />
        </header>

        {/* Body */}
        <div className="bg-white pb-20">
          <div className="container-site grid max-w-[1100px] gap-10 lg:grid-cols-[64px_1fr]">
            <ShareBar title={a.title} />
            <Reveal className="max-w-[760px]">
              {a.excerpt && (
                <p className="border-l-4 border-blue pl-5 font-serif text-[20px] leading-relaxed text-navy sm:text-[22px]">{a.excerpt}</p>
              )}
              <RichText text={a.content} />
              <div className="mt-14 flex flex-col gap-3 border-t border-beige pt-8 sm:flex-row">
                <Button to="/articles" variant="secondary">All Articles</Button>
                <Button to="/stores">Visit Our Stores</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="section bg-ivory">
          <div className="container-site">
            <Reveal>
              <p className="eyebrow mb-4">Keep Reading</p>
              <h2 className="text-[32px] sm:text-[40px]">More Articles</h2>
            </Reveal>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8" s={0.1}>
              {others.map((x) => <ArticleCard key={x.slug} article={x} />)}
            </Stagger>
          </div>
        </section>
      )}

      <FranchiseCta />
    </Page>
  );
}

function ShareBar({ title }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  };
  const btn = "flex h-11 w-11 items-center justify-center rounded-full border border-beige bg-white text-navy transition-all hover:-translate-y-1 hover:border-blue hover:bg-blue hover:text-white";
  return (
    <aside aria-label="Share this article" className="lg:pt-8">
      <div className="flex items-center gap-3 lg:sticky lg:top-36 lg:flex-col">
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-grey lg:[writing-mode:vertical-rl]">Share</span>
        <a className={btn} href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
          <Whatsapp width={18} height={18} />
        </a>
        <a className={btn} href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
          <Facebook width={18} height={18} />
        </a>
        <button type="button" className={btn} onClick={copy} aria-label="Copy link">
          {copied ? <Check className="h-[18px] w-[18px]" /> : <Link2 className="h-[18px] w-[18px]" />}
        </button>
      </div>
    </aside>
  );
}