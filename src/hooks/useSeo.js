import { useEffect } from "react";

const BRAND = "Mauli Mobile Wala";

export default function useSeo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title}` : BRAND;
    const set = (selector, attr, value) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        const [k, v] = attr;
        el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute("content", value);
    };
    if (description) {
      set('meta[name="description"]', ["name", "description"], description);
      set('meta[property="og:description"]', ["property", "og:description"], description);
    }
    set('meta[property="og:title"]', ["property", "og:title"], document.title);
  }, [title, description]);
}
