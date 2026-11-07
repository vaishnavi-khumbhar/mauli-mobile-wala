import { motion } from "framer-motion";
import { Users, Store } from "lucide-react";
import ImageSlot from "./ImageSlot";
import Breadcrumb from "./Breadcrumb";
import AnimatedTitle from "./AnimatedTitle";
import { ease } from "./Motion";

/* Shared inner-page hero (About, Products, Stores, Franchise, Contact)
   - title words rise one by one
   - image wipes in, then slowly zooms (Ken Burns)
   - floating info chips + soft moving pink glow */
export default function PageHero({ eyebrow, title, accent, text, image, imageKey, imageAlt, crumbs, children }) {
  return (
    <section className="relative isolate overflow-hidden bg-cream">
      {/* moving glow + rotating dashed ring */}
      <motion.span
        aria-hidden="true"
        className="absolute -left-32 top-1/3 -z-10 h-[420px] w-[420px] rounded-full bg-blue/10 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -right-20 -top-20 -z-10 hidden h-80 w-80 rounded-full border border-dashed border-blue/25 lg:block"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      />

      <div className="container-site grid items-center gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <div className="lg:col-span-6">
          {crumbs && <Breadcrumb items={crumbs} />}
          <motion.p
            className="eyebrow mt-8"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            {eyebrow}
          </motion.p>
          <h1 className="mt-6 text-[40px] font-bold leading-[1.08] sm:text-[52px] lg:text-[60px]">
            <AnimatedTitle text={title} delay={0.1} />{" "}
            {accent && (
              <span className="relative inline text-gold">
                <AnimatedTitle text={accent} delay={0.1 + title.split(" ").length * 0.06} />
              </span>
            )}
          </h1>
          <motion.span
            aria-hidden="true"
            className="mt-6 block h-[3px] w-20 origin-left rounded-full bg-gradient-to-r from-blue to-[#FF8FB1]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease, delay: 0.6 }}
          />
          {text && (
            <motion.div
              className="lead mt-6 max-w-xl space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
            >
              {(Array.isArray(text) ? text : [text]).map((t) => <p key={t}>{t}</p>)}
            </motion.div>
          )}
          {children && (
            <motion.div
              className="mt-9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.65 }}
            >
              {children}
            </motion.div>
          )}
        </div>

        <div className="relative lg:col-span-6">
        <motion.div
          className="relative"
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          transition={{ duration: 1.2, ease, delay: 0.1 }}
        >
          <div className="absolute -bottom-3 -right-3 hidden h-full w-full rounded-[6px] border border-gold/60 md:block" aria-hidden="true" />
          <div className="relative overflow-hidden rounded-[6px] shadow-card">
            <motion.div
              initial={{ scale: 1.25 }}
              animate={{ scale: [1.25, 1, 1.08] }}
              transition={{ duration: 14, times: [0, 0.12, 1], ease: "easeOut", repeat: Infinity, repeatType: "reverse" }}
            >
              <ImageSlot
                src={image}
                alt={imageAlt}
                slot={imageKey}
                size="1920 × 1080"
                eager
                className="relative aspect-[4/3] w-full lg:aspect-[5/4]"
              />
            </motion.div>
          </div>
        </motion.div>
          {/* floating chips (desktop) */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-10 bottom-10 z-10 hidden lg:block"
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 1.1 }}
          >
            <div className="animate-floaty flex items-center gap-3 rounded-[10px] border border-white bg-white/95 px-4 py-3 shadow-card backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-white"><Users className="h-5 w-5" /></span>
              <span className="leading-tight">
                <span className="block font-serif text-[20px] font-bold text-navy">2 Lakh+</span>
                <span className="block text-[12px] font-semibold uppercase tracking-wider text-grey">Happy Customers</span>
              </span>
            </div>
          </motion.div>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-5 right-6 z-10 hidden lg:block"
            initial={{ opacity: 0, scale: 0.6, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 1.35 }}
          >
            <div className="animate-floaty flex items-center gap-2.5 rounded-full bg-navy px-4 py-2.5 text-white shadow-card [animation-delay:1.5s]">
              <Store className="h-4 w-4 text-[#FF8FB1]" />
              <span className="text-[13px] font-semibold">4 Stores · Since 2009</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="h-px w-full bg-beige" aria-hidden="true" />
    </section>
  );
}