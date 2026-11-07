import { motion } from "framer-motion";
import { ArrowRight, Handshake } from "lucide-react";
import { Link } from "react-router-dom";
import { whatsappUrl } from "../data/site";
import { Whatsapp } from "./SocialIcons";
import { ease } from "./Motion";

export const franchiseWhatsapp = whatsappUrl(
  "Hello Mauli Mobile Wala, I am interested in taking a franchise. Please share the details."
);

/* Eye-catching franchise appeal band (Home, About, Stores) */
export default function FranchiseCta() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0B0B0D] via-[#1A0A10] to-[#3A0B1C] py-16 md:py-24">
      {/* animated glow blobs */}
      <motion.span
        aria-hidden="true"
        className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-blue/30 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.85, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute -bottom-32 -left-20 -z-10 h-80 w-80 rounded-full bg-blue/20 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container-site grid items-center gap-10 lg:grid-cols-12">
        <motion.div
          className="lg:col-span-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-blue/60 bg-blue/15 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.22em] text-gold-champagne">
            <motion.span
              className="h-2 w-2 rounded-full bg-blue"
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
            Franchise Opportunity
          </span>
          <h2 className="mt-6 text-[34px] font-bold leading-[1.08] !text-white sm:text-[46px] lg:text-[54px]">
            Own a <span className="!text-gold-champagne">Mauli Mobile Wala</span> Store in Your City
          </h2>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-white/80">
            We are now offering franchises. Partner with a brand trusted by 2 lakh+ customers since 2009 —
            backed by 100+ brands, a Samsung authorised distributorship and Apple iPhone authorised reselling.
          </p>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[14.5px] font-semibold text-white/90">
            {["Trusted brand name", "Strong brand partnerships", "Training & support"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue" aria-hidden="true" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          className="lg:col-span-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease, delay: 0.2 }}
        >
          <div className="rounded-[10px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur sm:p-8">
            <motion.span
              className="flex h-14 w-14 items-center justify-center rounded-full bg-blue text-white"
              animate={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 2 }}
            >
              <Handshake className="h-7 w-7" strokeWidth={1.6} aria-hidden="true" />
            </motion.span>
            <p className="mt-5 font-serif text-[24px] leading-snug text-white">Start your franchise enquiry today</p>
            <p className="mt-2 text-[14.5px] text-white/65">Share your city and our team will call you back.</p>
            <div className="mt-6 flex flex-col gap-3">
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link to="/franchise" className="btn btn-primary w-full !justify-center">
                  <span>Apply for Franchise</span> <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
              <a
                href={franchiseWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="btn w-full !justify-center bg-[#25D366] text-white hover:bg-[#1EBE5A]"
              >
                <Whatsapp width={18} height={18} /> <span>Franchise on WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}