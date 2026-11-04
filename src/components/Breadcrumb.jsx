import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.16em] text-grey">
        <li><Link to="/" className="hover:text-gold">Home</Link></li>
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 text-gold" aria-hidden="true" />
            {it.to && i < items.length - 1 ? (
              <Link to={it.to} className="hover:text-gold">{it.label}</Link>
            ) : (
              <span aria-current="page" className="text-navy">{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
