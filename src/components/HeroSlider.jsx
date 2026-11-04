import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heroSlides, segments } from "../data/site";
import { media } from "../data/media";
import ImageSlot from "./ImageSlot";
import Button from "./Button";
import Icon from "./Icon";
import { ease } from "./Motion";

const AUTOPLAY_MS = 5000; // time per slide (ms)

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const slide = heroSlides[index];

  const go = useCallback((dir) => setIndex((i) => (i + dir + count) % count), [count]);

  // Auto slide: moves to the next slide every AUTOPLAY_MS, always
  useEffect(() => {
    if (count < 2) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, go, count]);

  return (
    <section aria-roledescription="carousel" aria-label="Mauli Mobile Wala highlights" className="relative">
      <div
        className="relative isolate h-[600px] overflow-hidden sm:h-[600px] lg:h-[clamp(540px,calc(100vh-100px),740px)]"
      >
        {/* Background image (crossfade) */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0 -z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
          >
            {slide.image ? (
              /* Desktop: whole photo visible on the right (no cropping), its left edge fades
                 into a soft blurred copy of the same photo.
                 Mobile: photo fills the tall hero. */
              <div className="relative h-full w-full overflow-hidden bg-[#0B0B0D]">
                <img
                  src={slide.image}
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 hidden h-full w-full scale-110 object-cover opacity-70 blur-2xl lg:block"
                />
                <img
                  src={slide.image}
                  alt="Latest smartphones at Mauli Mobile Wala"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="relative h-full w-full object-cover object-[70%_center] lg:absolute lg:right-0 lg:top-1/2 lg:h-[108%] lg:w-auto lg:max-w-none lg:-translate-y-1/2 lg:[mask-image:linear-gradient(to_right,transparent,#000_25%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent,#000_25%)]"
                />
              </div>
            ) : (
              <ImageSlot
                src={null}
                alt="Latest smartphones at Mauli Mobile Wala"
                slot={slide.imageKey}
                size="1920 × 1080"
                labelPosition="right"
                className="h-full w-full"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dark navy wash on the left so the headline reads */}
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0B0B0D]/80 via-[#121214]/75 to-[#141416]/20 md:bg-gradient-to-r md:from-[#0B0B0D]/92 md:via-[#141416]/65 md:to-transparent"
          aria-hidden="true"
        />

        <div className="flex h-full items-center px-5 sm:px-8 lg:px-10 xl:px-14">
          <div className="max-w-[680px] lg:max-w-[820px]" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial="hidden"
                animate="show"
                exit="exit"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  exit: { opacity: 0, transition: { duration: 0.3 } },
                }}
              >
                <motion.p variants={line} className="eyebrow !text-gold-champagne sm:!text-[13px]">
                  {slide.eyebrow}
                </motion.p>
                <h1 className="mt-5 font-serif text-[48px] font-bold leading-[1.02] sm:text-[60px] lg:text-[64px] xl:text-[72px]">
                  <motion.span variants={line} className="block !text-white">{slide.line1}</motion.span>
                  <motion.span variants={line} className="block !text-gold-champagne">{slide.line2}</motion.span>
                </h1>
                <motion.p variants={line} className="mt-5 max-w-[560px] text-[17px] leading-relaxed text-white/90 sm:text-[18px]">
                  {slide.text}
                </motion.p>
                <motion.div variants={line} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-5 [&_.btn]:sm:!px-7 [&_.btn]:sm:!text-[16px]">
                  <Button to="/products" className="w-full sm:w-auto">Explore Products</Button>
                  <Button to="/stores" variant="secondary" className="w-full !border-white/70 !bg-white/10 !text-white hover:!border-gold-champagne hover:!text-gold-champagne sm:w-auto">Find a Store</Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Segment strip + angled corner image */}
      <div className="relative bg-ivory">
        <div className="container-site relative">
          <ul className="grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4 md:py-10 lg:flex lg:items-center lg:gap-0 lg:pr-[360px] xl:pr-[400px]">
            {segments.map((s, i) => (
              <li
                key={s.label}
                className={`flex items-center gap-3 lg:gap-4 lg:px-6 xl:px-9 ${i === 0 ? "lg:pl-0" : ""} ${
                  i < segments.length - 1 ? "lg:border-r lg:border-beige" : ""
                }`}
              >
                <Icon name={s.icon} className="h-8 w-8 shrink-0 text-gold md:h-10 md:w-10" strokeWidth={1.25} />
                <span className="font-serif text-[15px] text-ink md:text-[17px]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="absolute -top-6 bottom-0 right-0 hidden w-[340px] lg:block xl:w-[400px]"
          style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="absolute inset-0 bg-gold-champagne" />
          <div className="absolute inset-[5px] right-0 bottom-0" style={{ clipPath: "polygon(22% 0, 100% 0, 100% 100%, 0 100%)" }}>
            <ImageSlot
              src={media.sections.heroCorner}
              alt="Smartphones and accessories on display"
              slot="hero-corner"
              className="h-full w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const line = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};