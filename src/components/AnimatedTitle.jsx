import { motion } from "framer-motion";
import { ease } from "./Motion";

/* Splits text into words; each word slides up from behind a mask.
   inView=true → plays when scrolled into view, otherwise plays on page load. */
export default function AnimatedTitle({ text = "", className = "", delay = 0, inView = false, stagger = 0.06 }) {
  const words = String(text).split(" ").filter(Boolean);
  const trigger = inView
    ? { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "-60px" } }
    : { initial: "hidden", animate: "show" };
  return (
    <motion.span
      className={`inline ${className}`}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
            <motion.span
              className="inline-block"
              variants={{ hidden: { y: "110%", rotate: 4 }, show: { y: "0%", rotate: 0, transition: { duration: 0.85, ease } } }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </motion.span>
  );
}