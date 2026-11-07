/* Endless scrolling strip of brand names (text only — no brand logos) */
const BRANDS = ["Apple iPhone", "Samsung", "Vivo", "Oppo", "OnePlus", "Xiaomi", "Realme", "& 100+ more brands"];

export default function BrandMarquee({ dark = false }) {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section
      aria-label="Brands available at Mauli Mobile Wala"
      className={`marquee relative overflow-hidden border-y py-6 md:py-8 ${dark ? "border-white/10 bg-[#0B0B0D]" : "border-beige bg-white"}`}
    >
      <div className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r md:w-40 ${dark ? "from-[#0B0B0D]" : "from-white"} to-transparent`} />
      <div className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l md:w-40 ${dark ? "from-[#0B0B0D]" : "from-white"} to-transparent`} />
      <ul className="animate-marquee flex w-max items-center">
        {row.map((b, i) => (
          <li key={i} aria-hidden={i >= BRANDS.length} className="flex items-center">
            <span className={`whitespace-nowrap px-6 font-serif text-[26px] font-semibold transition-colors duration-300 hover:text-blue md:px-10 md:text-[38px] ${dark ? "text-white/85" : "text-navy/85"}`}>
              {b}
            </span>
            <span className="h-2.5 w-2.5 rotate-45 bg-blue" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </section>
  );
}