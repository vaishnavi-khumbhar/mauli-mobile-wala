import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { authorisations } from "../data/site";
import { ease } from "./Motion";

/* "Samsung Authorised Distributor" + "Apple iPhone Authorised Reseller" trust cards.
   Brand names are shown as text only (no brand logos are used). */
export default function AuthorisedBadges({ className = "" }) {
  return (
    <section className={`relative overflow-hidden bg-ivory py-14 md:py-20 ${className}`} aria-label="Brand authorisations">
      <div className="container-site">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="eyebrow eyebrow-plain mb-4">Official Brand Partner</p>
          <h2 className="text-[30px] leading-[1.1] sm:text-[40px]">
            Authorised. Genuine. <span className="text-gold">Trusted.</span>
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:mt-14 md:grid-cols-2 lg:gap-8">
          {authorisations.map((a, i) => (
            <motion.article
              key={a.brand}
              initial={{ opacity: 0, x: i === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, ease, delay: 0.15 * i }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[8px] border border-beige bg-white p-7 shadow-soft transition-shadow duration-500 hover:shadow-card sm:p-9"
            >
              {/* light sweep on hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -left-1/2 top-0 h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-blue/10 to-transparent transition-transform duration-1000 group-hover:translate-x-[300%]"
              />
              <span className="absolute left-0 top-0 h-full w-[4px] bg-blue" aria-hidden="true" />

              <div className="flex items-start gap-5">
                <motion.span
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue text-white shadow-[0_10px_30px_-10px_rgba(238,20,80,0.8)]"
                  initial={{ scale: 0, rotate: -120 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 180, damping: 13, delay: 0.4 + 0.15 * i }}
                >
                  <ShieldCheck className="h-8 w-8" strokeWidth={1.6} aria-hidden="true" />
                </motion.span>
                <div className="min-w-0">
                  <p className="font-sans text-[13px] font-bold uppercase tracking-[0.22em] text-gold">{a.brand}</p>
                  <h3 className="mt-1.5 text-[26px] leading-tight sm:text-[30px]">{a.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-grey">{a.text}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}