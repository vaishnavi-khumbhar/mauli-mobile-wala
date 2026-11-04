import { motion } from "framer-motion";
import ImageSlot from "./ImageSlot";
import Breadcrumb from "./Breadcrumb";
import { ease } from "./Motion";

/* Shared inner-page hero: cream background, editorial split, same type system as Home */
export default function PageHero({ eyebrow, title, accent, text, image, imageKey, imageAlt, crumbs, children }) {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="container-site grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-6">
          {crumbs && <Breadcrumb items={crumbs} />}
          <motion.p
            className="eyebrow mt-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            className="mt-6 text-[40px] font-bold leading-[1.05] sm:text-[52px] lg:text-[60px]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.08 }}
          >
            {title} {accent && <span className="text-gold">{accent}</span>}
          </motion.h1>
          {text && (
            <motion.div
              className="lead mt-6 max-w-xl space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.16 }}
            >
              {(Array.isArray(text) ? text : [text]).map((t) => <p key={t}>{t}</p>)}
            </motion.div>
          )}
          {children && (
            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.24 }}
            >
              {children}
            </motion.div>
          )}
        </div>
        <motion.div
          className="relative lg:col-span-6"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        >
          <div className="absolute -bottom-3 -right-3 hidden h-full w-full border border-gold/60 md:block" aria-hidden="true" />
          <ImageSlot
            src={image}
            alt={imageAlt}
            slot={imageKey}
            size="1920 × 1080"
            eager
            className="relative aspect-[4/3] w-full rounded-[3px] lg:aspect-[5/4]"
          />
        </motion.div>
      </div>
      <div className="h-px w-full bg-beige" aria-hidden="true" />
    </section>
  );
}
