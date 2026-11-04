import { createContext, useContext, useEffect, useState } from "react";
import { products as staticProducts } from "./products";
import { media } from "./media";

/* ==========================================================================
   WEBSITE DATA FROM THE ADMIN PANEL (PHP API)
   --------------------------------------------------------------------------
   Products and gallery images come from the admin panel:
     <VITE_API_URL>/products.php   and   <VITE_API_URL>/gallery.php

   VITE_API_URL is set in:
     .env.development  → laptop (XAMPP)   e.g. http://localhost/mauli-backend/api
     .env.production   → Hostinger        /api

   Safety net: if the API cannot be reached, the website shows the last
   data it received (saved in the browser), or else the built-in data from
   products.js and the gallery folder — so the site never looks empty.
   ========================================================================== */

// No VITE_API_URL → the site simply uses the built-in data (no admin backend yet)
const API = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/+$/, "") : null;
const CACHE_KEY = "mm_cms_v1";
const TIMEOUT_MS = 8000;

const builtIn = { products: staticProducts, gallery: media.gallery };

const CmsContext = createContext({ ...builtIn, status: "ready", source: "built-in" });

function readCache() {
  try {
    const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
    if (c && Array.isArray(c.products) && Array.isArray(c.gallery)) return c;
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

async function getJson(path, signal) {
  const res = await fetch(`${API}/${path}`, { signal, cache: "no-store", headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error(`${path} → ${res.status}`);
  return res.json();
}

export function CmsProvider({ children }) {
  // Show saved data instantly on repeat visits, then refresh it in the background
  const [state, setState] = useState(() => {
    if (!API) return { ...builtIn, status: "ready", source: "built-in" };
    const cached = readCache();
    return cached
      ? { ...cached, status: "ready", source: "cache" }
      : { products: [], gallery: [], status: "loading", source: "none" };
  });

  useEffect(() => {
    if (!API) return undefined;
    let alive = true;
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS);

    Promise.all([getJson("products.php", ctrl.signal), getJson("gallery.php", ctrl.signal)])
      .then(([products, gallery]) => {
        if (!Array.isArray(products) || !Array.isArray(gallery?.items)) throw new Error("Unexpected API data");
        const data = { products, gallery: gallery.items };
        if (!alive) return;
        setState({ ...data, status: "ready", source: "api" });
        writeCache(data);
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
export const useGallery = () => useContext(CmsContext).gallery;
export const useCmsStatus = () => useContext(CmsContext).status; // "loading" | "ready"

export function findProduct(products, slug) {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(products, slug, count = 3) {
  const i = products.findIndex((p) => p.slug === slug);
  if (i < 0 || products.length < 2) return [];
  return Array.from({ length: Math.min(count, products.length - 1) }, (_, k) => products[(i + k + 1) % products.length]);
}
