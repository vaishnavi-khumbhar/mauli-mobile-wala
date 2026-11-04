import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTA from "./MobileCTA";
import { EnquiryProvider } from "./Enquiry";

export default function Layout({ children }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <EnquiryProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <div className="flex-1 pt-[105px] lg:pt-[117px]">{children}</div>
        <Footer />
        <MobileCTA />
      </div>
    </EnquiryProvider>
  );
}