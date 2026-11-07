import { motion, useScroll, useSpring } from "framer-motion";

/* Thin pink bar at the very top that fills as you scroll the page */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[80] h-[3px] origin-left bg-gradient-to-r from-blue via-[#FF5C8A] to-blue"
      style={{ scaleX }}
    />
  );
}