import { Reveal } from "./Motion";

export default function SectionHeading({ eyebrow, title, text, align = "left", gold = false, className = "" }) {
  const center = align === "center";
  return (
    <Reveal className={`${center ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      {eyebrow && (
        <p className={`eyebrow ${gold ? "eyebrow-gold" : ""} ${center ? "eyebrow-plain" : ""} mb-5`}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-[34px] leading-[1.1] sm:text-[42px] md:text-5xl">{title}</h2>
      {center && <span className="mx-auto mt-6 block h-px w-16 bg-gold" aria-hidden="true" />}
      {text && <p className={`lead mt-5 ${center ? "mx-auto" : ""} max-w-xl`}>{text}</p>}
    </Reveal>
  );
}
