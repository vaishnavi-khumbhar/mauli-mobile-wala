import { ArrowRight } from "lucide-react";
import { whatsappUrl } from "../data/site";
import ImageSlot from "./ImageSlot";
import { Item } from "./Motion";

export default function ProductCard({ product, index }) {
  return (
    <Item as="article" className="h-full">
      <a
        href={whatsappUrl(`Hello Mauli Mobile Wala, I'm interested in ${product.name}. Please share details.`)}
        target="_blank"
        rel="noopener noreferrer"
        className="card shine-card group flex h-full flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:border-blue/40 hover:shadow-[0_24px_50px_-20px_rgba(238,20,80,0.45)]"
        aria-label={`Enquire about ${product.name} on WhatsApp`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <ImageSlot
            src={product.image}
            alt={product.name}
            slot={product.imageKey}
            size="1200 × 900"
            className="h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]"
          />
          {product.badge && (
            <span className="absolute right-4 top-4 z-10 rounded-full bg-blue px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-card">
              {product.badge}
            </span>
          )}
          {typeof index === "number" && (
            <span className="absolute left-4 top-4 bg-cream/95 px-2.5 py-1 font-serif text-sm text-navy">
              {String(index + 1).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="relative flex flex-1 flex-col p-6 md:p-7">
          <span className="absolute left-6 top-0 h-[2px] w-10 bg-gold md:left-7" aria-hidden="true" />
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">{product.category}</p>
          <h3 className="mt-3 text-[24px] leading-tight">
            <span className="gold-underline pb-1">{product.name}</span>
          </h3>
          <p className="mt-3 flex-1 text-[15px] leading-relaxed text-grey">{product.shortDescription}</p>
          {product.price && <p className="mt-4 font-serif text-[20px] font-semibold text-navy">{product.price}</p>}
          <span className="mt-6 inline-flex items-center gap-2 font-serif text-[15px] text-blue transition-colors group-hover:text-gold">
            Enquire on WhatsApp
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={1.5} />
          </span>
        </div>
      </a>
    </Item>
  );
}