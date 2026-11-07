import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView } from "framer-motion";
import { stats } from "../data/site";
import { ease } from "./Motion";

/* Indian number format: 200000 -> 2,00,000 */
const inr = (n) => Math.round(n).toLocaleString("en-IN");

function Counter({ value, prefix = "", suffix = "", duration = 2.2 }) {
  const ref = useRef(null);
  const seen = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!seen) return;
    const c = animate(0, value, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: setN });
    return () => c.stop();
  }, [seen, value, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}{inr(n)}<span className="text-gold-champagne">{suffix}</span>
    </span>
  );
}

/* Dark band with 4 animated numbers. variant="light" for a white background. */
export default function StatsCounter({ variant = "dark", className = "" }) {
  const dark = variant === "dark";
  return (
    <section
      aria-label="Mauli Mobile Wala in numbers"
      className={`relative isolate overflow-hidden ${dark ? "bg-[#0B0B0D]" : "bg-white"} ${className}`}
    >
      {dark && (
        <>
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(238,20,80,0.28),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(238,20,80,0.18),transparent_50%)]" aria-hidden="true" />
          <motion.span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-transparent via-blue to-transparent"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease }}
          />
        </>
      )}

      <div className="container-site py-14 md:py-20">
        <motion.ul
          className="grid grid-cols-2 gap-y-10 lg:grid-cols-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.15 } } }}
        >
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease } },
              }}
              className={`group relative px-3 text-center sm:px-6 ${
                i % 2 === 0 ? "border-r" : ""
              } ${i < stats.length - 1 ? "lg:border-r" : "lg:border-r-0"} ${dark ? "border-white/10" : "border-beige"}`}
            >
              <p className={`font-serif text-[34px] font-bold leading-none sm:text-[46px] xl:text-[56px] ${dark ? "text-white" : "text-navy"}`}>
                <Counter value={s.value} prefix={s.prefix} suffix={s.suffix} duration={2 + i * 0.25} />
              </p>
              <span className="mx-auto mt-4 block h-[2px] w-8 bg-blue transition-all duration-500 group-hover:w-16" aria-hidden="true" />
              <p className={`mt-4 text-[12px] font-bold uppercase tracking-[0.2em] sm:text-[13px] ${dark ? "text-gold-champagne" : "text-gold"}`}>{s.label}</p>
              <p className={`mt-1.5 hidden text-[13.5px] sm:block ${dark ? "text-white/60" : "text-grey"}`}>{s.note}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}