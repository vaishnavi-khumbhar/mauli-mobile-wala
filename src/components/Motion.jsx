import { motion } from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } },
};

export const stagger = (s = 0.12, d = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: s, delayChildren: d } },
});

export function Reveal({ as = "div", children, className = "", delay = 0, y = 28, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function Stagger({ as = "div", children, className = "", s = 0.12, d = 0, ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={stagger(s, d)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      {...rest}
    >
      {children}
    </M>
  );
}

export function Item({ as = "div", children, className = "", ...rest }) {
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp} {...rest}>
      {children}
    </M>
  );
}

/* Clip-path reveal for editorial images */
export function ImageReveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(0 0 100% 0)", opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0 0% 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.1, ease, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Page({ children }) {
  return (
    <>
      {/* Page-change curtain: pink + dark panels sweep up and away */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] origin-top bg-blue"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.65, ease, delay: 0.05 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[91] origin-top bg-[#0B0B0D]"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.55, ease }}
      />
      <motion.main
        id="main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease, delay: 0.25 }}
      >
        {children}
      </motion.main>
    </>
  );
}