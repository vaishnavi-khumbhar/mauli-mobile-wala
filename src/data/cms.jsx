import { createContext, useContext, useEffect, useState } from "react";
import { products as staticProducts, categories as staticCategories } from "./products";
import { articles as staticArticles } from "./articles";

/* ==========================================================================
   WEBSITE DATA FROM THE ADMIN PANEL (PHP API)
   --------------------------------------------------------------------------
   Categories, products and articles come from ONE request:
       <VITE_API_URL>/site.php   →  { categories: [], products: [], articles: [] }

   VITE_API_URL is set in:
     .env.development  → laptop (XAMPP)   e.g. http://localhost/mauli-backend/api
     .env.production   → Hostinger        /api

   No VITE_API_URL → the website uses the built-in data
   (products.js + articles.js), so it never looks empty.
   If the API is down, the last data received (saved in the browser) is shown.
   ========================================================================== */

const API = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, "") : null;
const CACHE_KEY = "mm_cms_v2";
const TIMEOUT_MS = 8000;

const builtIn = { categories: staticCategories, products: staticProducts, articles: staticArticles };

const CmsContext = createContext({ ...builtIn, status: "ready", source: "built-in" });

/* Admin items without an uploaded image use the built-in photo with the same slug */
const withImages = (list, builtInList) =>
  list.map((x) => {
    if (x.image) return x;
    const b = builtInList.find((y) => y.slug === x.slug);
    return b ? { ...x, image: b.image, imageKey: b.imageKey } : x;
  });

const valid = (d) => d && Array.isArray(d.categories) && Array.isArray(d.products) && Array.isArray(d.articles);

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (valid(c)) return c;
  } catch {
    /* storage blocked or bad data */
  }
  return null;
}

function writeCache(data) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    /* storage full or blocked — not important */
  }
}

export function CmsProvider({ children }) {
  // Saved data shows instantly on repeat visits, then refreshes in the background
  const [state, setState] = useState(() => {
    if (!API) return { ...builtIn, status: "ready", source: "built-in" };
    const cached = readCache();
    return cached
      ? { ...cached, status: "ready", source: "cache" }
      : { categories: [], products: [], articles: [], status: "loading", source: "none" };
  });

  useEffect(() => {
    if (!API) return undefined;
    let alive = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

    fetch(`${API}/site.php`, { signal: ctrl.signal, cache: "no-store", headers: { Accept: "application/json" } })
      .then((r) => {
        if (!r.ok) throw new Error(`site.php → ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (!valid(data)) throw new Error("Unexpected API data");
        const clean = {
          categories: data.categories,
          products: withImages(data.products, staticProducts),
          articles: withImages(data.articles, staticArticles),
        };
        if (!alive) return;
        setState({ ...clean, status: "ready", source: "api" });
        writeCache(clean);
      })
      .catch((err) => {
        if (!alive) return;
        if (import.meta.env.DEV) console.warn("[Mauli] Admin API not reachable, using fallback data:", err.message);
        setState((s) => (s.source === "cache" ? s : { ...builtIn, status: "ready", source: "built-in" }));
      })
      .finally(() => clearTimeout(timer));

    return () => {
      alive = false;
      clearTimeout(timer);
      ctrl.abort();
    };
  }, []);

  return <CmsContext.Provider value={state}>{children}</CmsContext.Provider>;
}

/* ---------- Hooks used by pages and components ---------- */
export const useProducts = () => useContext(CmsContext).products;
export const useCategories = () => useContext(CmsContext).categories;
export const useArticles = () => useContext(CmsContext).articles;
export const useCmsStatus = () => useContext(CmsContext).status; // "loading" | "ready"

export const findArticle = (articles, slug) => articles.find((a) => a.slug === slug);

/* Featured products for the Home page (falls back to the first 6) */
export function featuredProducts(products, count = 6) {
  const f = products.filter((p) => p.featured);
  return (f.length ? f : products).slice(0, count);
}

/* "7 Nov 2026" */
export const formatDate = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
};

/* Approx. reading time in minutes */
export const readMinutes = (text = "") => Math.max(1, Math.round(String(text).split(/\s+/).length / 200));