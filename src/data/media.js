/* ==========================================================================
   MAULI MOBILE WALA — CENTRAL MEDIA FILE
   --------------------------------------------------------------------------
   HOW TO ADD YOUR IMAGES  (no code editing needed)

   1. Copy your image into:   src/assets/images/
   2. Rename it to the EXACT name shown below (.jpg .jpeg .png .webp .avif)
   3. Save — the image appears on the site automatically.

   If a file is missing, that spot shows a blank labelled placeholder.

   Recommended sizes:
   - Hero images ........ 1920 × 1080
   - Product images ..... 1200 × 900
   - Section images ..... 1400 × 1000
   - Store photos ....... 1200 × 900
   ========================================================================== */

// Loads every image inside src/assets/images automatically
const images = import.meta.glob("../assets/images/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP}", {
  eager: true,
  import: "default",
});
const brandFiles = import.meta.glob("../assets/*.{png,webp,svg,jpg,jpeg}", {
  eager: true,
  import: "default",
});

// Finds an image by name, ignoring the extension and upper/lower case
const find = (files, name) => {
  const key = Object.keys(files).find((path) => {
    const file = path.split("/").pop().replace(/\.[^.]+$/, "");
    return file.toLowerCase() === name.toLowerCase();
  });
  return key ? files[key] : null;
};
const img = (name) => find(images, name);

// Logo from the client PDF (transparent). Stacked = 2 lines, horizontal = 1 line.
const logo = find(brandFiles, "logo-stacked") || find(brandFiles, "logo");
const logoHorizontal = find(brandFiles, "logo");

export const media = {
  branding: { logo, logoHorizontal },

  hero: {
    homeSlides: [img("home-hero-1"), img("home-hero-2"), img("home-hero-3")],
    about: img("about-hero"),
    products: img("products-hero"),
    stores: img("stores-hero"),
    contact: img("contact-hero"),
  },

  products: {
    apple: img("product-apple"),
    samsung: img("product-samsung"),
    vivo: img("product-vivo"),
    moreBrands: img("product-more-brands"),
    accessories: img("product-accessories"),
    electronics: img("product-electronics"),
  },

  sections: {
    heroCorner: img("hero-corner"), // angled image next to the strip under the hero
    brandStory: img("brand-story"), // "Redefining the Mobile Shopping Experience"
    storeInterior: img("store-interior"), // About page
    aboutDetail: img("about-detail"), // About page second image
    ctaBanner: img("cta-banner"), // full-width banner background at the bottom of pages
  },

  stores: [img("store-1"), img("store-2"), img("store-3"), img("store-4")],

  // Not used by the website any more (kept so older code never breaks)
  gallery: [],
};