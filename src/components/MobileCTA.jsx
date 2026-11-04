import { useLocation } from "react-router-dom";
import { Phone, MessageSquareText } from "lucide-react";
import { site } from "../data/site";
import { useEnquiry } from "./Enquiry";

/* Sticky bottom bar on mobile. Phone link activates once a real number is set. */
export default function MobileCTA() {
  const { pathname } = useLocation();
  const { openEnquiry } = useEnquiry();
  if (pathname === "/contact") return null;
  const tel = site.contact.phone.replace(/[^\d+]/g, "");
  return (
    <>
      <div className="h-[68px] sm:hidden" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-beige bg-cream/95 p-2.5 backdrop-blur sm:hidden">
        <a
          href={tel ? `tel:${tel}` : `${import.meta.env.BASE_URL}contact`}
          className="btn btn-secondary !py-3 !text-[15px]"
          aria-label="Call Mauli Mobile Wala"
        >
          <Phone className="h-4 w-4" strokeWidth={1.5} />
          <span>Call Us</span>
        </a>
        <button type="button" onClick={openEnquiry} className="btn btn-primary !py-3 !text-[15px]">
          <MessageSquareText className="h-4 w-4" strokeWidth={1.75} />
          <span>Enquire Now</span>
        </button>
      </div>
    </>
  );
}