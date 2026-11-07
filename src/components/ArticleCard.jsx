import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import ImageSlot from "./ImageSlot";
import { Item } from "./Motion";
import { formatDate, readMinutes } from "../data/cms";

export default function ArticleCard({ article, large = false }) {
  const a = article;
  return (
    <Item as="article" className="h-full" lang={a.language === "mr" ? "mr" : undefined}>
      <Link
        to={`/articles/${a.slug}`}
        className={`card shine-card group flex h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue/40 hover:shadow-[0_24px_50px_-20px_rgba(238,20,80,0.45)] ${
          large ? "flex-col lg:flex-row" : "flex-col"
        }`}
      >
        <div className={`relative overflow-hidden ${large ? "aspect-[16/10] lg:aspect-auto lg:w-[55%]" : "aspect-[16/10]"}`}>
          <ImageSlot
            src={a.image}
            alt={a.title}
            slot={a.imageKey || "article-cover"}
            size="1600 × 900"
            className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          {a.category && (
            <span className="absolute left-4 top-4 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white shadow-card">
              {a.category}
            </span>
          )}
        </div>
        <div className={`relative flex flex-1 flex-col p-6 md:p-7 ${large ? "lg:justify-center lg:p-10" : ""}`}>
          <span className="absolute left-6 top-0 h-[2px] w-10 bg-blue md:left-7" aria-hidden="true" />
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[12.5px] font-semibold text-grey">
            {a.date && <span className="inline-flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-blue" />{formatDate(a.date)}</span>}
            <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5 text-blue" />{readMinutes(a.content)} min read</span>
          </p>
          <h3 className={`mt-3 leading-snug ${large ? "text-[26px] sm:text-[32px]" : "text-[22px]"}`}>
            <span className="gold-underline pb-1">{a.title}</span>
          </h3>
          {a.excerpt && <p className={`mt-3 flex-1 text-[15px] leading-relaxed text-grey ${large ? "" : "line-clamp-3"}`}>{a.excerpt}</p>}
          <span className="mt-6 inline-flex items-center gap-2 font-serif text-[15px] text-blue transition-colors group-hover:text-gold">
            Read Article
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
    </Item>
  );
}