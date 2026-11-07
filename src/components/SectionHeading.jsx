import { motion } from "framer-motion";
import AnimatedTitle from "./AnimatedTitle";
import { ease } from "./Motion";

export default function SectionHeading({ eyebrow, title, text, align = "left", gold = false, className = "" }) {
  const center = align === "center";
  const view = { once: true, margin: "-60px" };
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <motion.p
          className={`eyebrow ${gold ? "eyebrow-gold" : ""} ${center ? "eyebrow-plain" : ""} mb-5`}
          initial={{ opacity: 0, x: center ? 0 : -24, y: center ? 12 : 0 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={view}
          transition={{ duration: 0.7, ease }}
        >
          {eyebrow}
        </motion.p>
      )}
      <h2 className="text-[34px] leading-[1.1] sm:text-[42px] md:text-5xl">
        <AnimatedTitle text={title} inView delay={0.1} />
      </h2>
      <motion.span
        aria-hidden="true"
        className={`mt-6 block h-[3px] w-16 rounded-full bg-gradient-to-r from-blue to-[#FF8FB1] ${center ? "mx-auto origin-center" : "origin-left"}`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={view}
        transition={{ duration: 0.9, ease, delay: 0.4 }}
      />
      {text && (
        <motion.p
          className={`lead mt-5 ${center ? "mx-auto" : ""} max-w-xl`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={view}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}