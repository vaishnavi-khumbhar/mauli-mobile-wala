import { media } from "../data/media";
import ImageSlot from "./ImageSlot";
import Button from "./Button";
import { whatsappUrl } from "../data/site";
import { Reveal } from "./Motion";

export default function CtaBanner({
  title = "Looking for Your Next Smartphone?",
  text = "Visit one of our four outlets or message us on WhatsApp — our team will help you choose a device that suits your needs.",
  cta = "Find a Store Near You", to = "/stores",
}) {
  const hasImage = Boolean(media.sections.ctaBanner);
  return (
    <section className="relative isolate overflow-hidden">
      <ImageSlot
        src={media.sections.ctaBanner}
        alt="Smartphones on display at Mauli Mobile Wala"
        slot="cta-banner"
        size="1920 × 900"
        labelPosition="bottom-right"
        fit="cover"
        className="absolute inset-0 -z-10 h-full w-full"
      />
      <div
        className={`absolute inset-0 -z-10 ${hasImage ? "bg-gradient-to-r from-[#121214]/75 via-[#121214]/45 to-transparent" : "bg-gradient-to-r from-cream/95 via-cream/70 to-transparent"}`}
        aria-hidden="true"
      />
      <div className="container-site py-16 md:py-20 lg:py-24">
        <Reveal className="max-w-xl">
          <p className={`eyebrow ${hasImage ? "!text-gold-champagne" : "eyebrow-gold"} mb-5`}>Visit Mauli Mobile Wala</p>
          <h2 className={`text-[34px] leading-[1.1] sm:text-[44px] md:text-[52px] ${hasImage ? "!text-white" : ""}`}>{title}</h2>
          <p className={`lead mt-5 ${hasImage ? "!text-white/85" : ""}`}>{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button to={to} className="w-full sm:w-auto">{cta}</Button>
            <Button href={whatsappUrl()} target="_blank" rel="noopener noreferrer" variant="secondary" className={`w-full sm:w-auto ${hasImage ? "!border-white/70 !bg-white/10 !text-white" : ""}`}>WhatsApp Us</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}