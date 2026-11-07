import { Fragment } from "react";

/* Renders article text written in the admin panel.
     blank line → paragraph   ## → heading   ### → small heading
     - item → bullet list     > text → highlighted quote   **bold**
   Plain text only — no HTML is ever injected (safe). */

function inline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? <strong key={i} className="font-semibold text-navy">{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>
  );
}

export default function RichText({ text = "", className = "" }) {
  const blocks = String(text).replace(/\r\n/g, "\n").split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  return (
    <div className={className}>
      {blocks.map((b, i) => {
        if (b.startsWith("### ")) return <h3 key={i} className="mt-10 text-[22px] leading-snug sm:text-[24px]">{inline(b.slice(4))}</h3>;
        if (b.startsWith("## "))
          return (
            <h2 key={i} className="relative mt-14 pl-5 text-[26px] leading-snug sm:text-[32px]">
              <span className="absolute left-0 top-1 h-[calc(100%-8px)] w-[4px] rounded-full bg-blue" aria-hidden="true" />
              {inline(b.slice(3))}
            </h2>
          );
        if (b.startsWith("> "))
          return (
            <blockquote key={i} className="relative my-10 overflow-hidden rounded-[10px] bg-[#0B0B0D] px-7 py-8 font-serif text-[22px] italic leading-snug text-white sm:px-10 sm:text-[26px]">
              <span className="absolute -left-1 -top-6 font-serif text-[120px] leading-none text-blue/40" aria-hidden="true">“</span>
              <span className="relative">{inline(b.replace(/^>\s?/gm, ""))}</span>
            </blockquote>
          );
        const lines = b.split("\n");
        if (lines.every((l) => /^[-*]\s+/.test(l.trim())))
          return (
            <ul key={i} className="my-6 space-y-3">
              {lines.map((l, k) => (
                <li key={k} className="flex gap-3 text-[17px] leading-relaxed text-charcoal">
                  <span className="mt-[11px] h-2 w-2 shrink-0 rotate-45 bg-blue" aria-hidden="true" />
                  <span>{inline(l.trim().replace(/^[-*]\s+/, ""))}</span>
                </li>
              ))}
            </ul>
          );
        return (
          <p key={i} className="mt-6 text-[17px] leading-[1.85] text-charcoal sm:text-[18px]">
            {lines.map((l, k) => <Fragment key={k}>{k > 0 && <br />}{inline(l)}</Fragment>)}
          </p>
        );
      })}
    </div>
  );
}