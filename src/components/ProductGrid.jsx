import { useProducts, useCmsStatus } from "../data/cms";
import ProductCard from "./ProductCard";
import { Stagger } from "./Motion";

export default function ProductGrid({ items, numbered = true }) {
  const all = useProducts();
  const status = useCmsStatus();
  const list = items ?? all;

  if (status === "loading") {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="card overflow-hidden">
            <div className="img-slot aspect-[4/3] animate-pulse" />
            <div className="space-y-3 p-6">
              <div className="h-3 w-24 animate-pulse rounded bg-beige" />
              <div className="h-5 w-3/4 animate-pulse rounded bg-beige" />
              <div className="h-3 w-full animate-pulse rounded bg-beige/70" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8" s={0.1}>
      {list.map((p) => (
        <ProductCard key={p.slug} product={p} index={numbered ? all.indexOf(p) : undefined} />
      ))}
    </Stagger>
  );
}
