import { media } from "./media";

/* ==========================================================================
   MAULI MOBILE WALA — SITE CONTENT
   Change phone numbers, stores and text here; the whole website updates.
   ========================================================================== */

export const site = {
  name: "Mauli Mobile Wala",
  tagline: "Experience Excellence with Every Call",
  since: "2009",
  location: "Majalgaon · Beed · Talegaon Dabhade · Dehu",
  contact: {
    phone: "+91 90112 39123", // calling number
    whatsapp: "+91 97654 42962", // WhatsApp number
    email: "", // add an email here when available (leave "" to hide it)
    address: "4 stores — Majalgaon, Beed, Talegaon Dabhade & Dehu",
  },
  // Social media — leave "" (empty) to hide the icon. Paste the full link when available.
  social: {
    instagram: "https://www.instagram.com/maulimobilewalaofficial/",
    facebook: "https://www.facebook.com/share/1FNKdoG5iM/",
    linkedin: "",
    youtube: "",
  },
};

/* ---- Stores ------------------------------------------------------------ */
const mapsSearch = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const mapsEmbed = (q) => `https://maps.google.com/maps?q=${encodeURIComponent(q)}&z=15&output=embed`;

export const stores = [
  {
    no: "01",
    name: "Majalgaon",
    region: "Beed, Maharashtra",
    address:
      "Upper Ground Floor, Flat No. 1, Khan Complex, Main Road, Survey No. 385, Majalgaon Rural, Majalgaon, Beed, Maharashtra 431131",
    query: "Khan Complex, Main Road, Majalgaon, Beed, Maharashtra 431131",
    image: media.stores[0],
    imageKey: "store-1",
  },
  {
    no: "02",
    name: "Beed",
    region: "Beed, Maharashtra",
    tag: "Main Branch",
    address: "Shop No. 07, 1st Floor, Sarda Central, D P Road, Beed, Maharashtra 431122",
    query: "Sarda Central, D P Road, Beed, Maharashtra 431122",
    image: media.stores[1],
    imageKey: "store-2",
  },
  {
    no: "03",
    name: "Talegaon Dabhade",
    region: "Pune, Maharashtra",
    address:
      "B-4, Shrimant Sarsenapati Ajitsinhraje Dabhade Shopping Complex, Maroti Mandir Chowk, Talegaon Dabhade, Pune, Maharashtra 410506",
    query: "Ajitsinhraje Dabhade Shopping Complex, Maroti Mandir Chowk, Talegaon Dabhade, Pune 410506",
    image: media.stores[2],
    imageKey: "store-3",
  },
  {
    no: "04",
    name: "Dehu",
    region: "Pune, Maharashtra",
    address:
      "Shop No. 1, Ground Floor, S. No. 56/1, New Sonai Complex, Dehugaon Alandi Road, Back Side Zilla Parishad School, Dehugaon, Dehu, Pune, Maharashtra 412109",
    query: "New Sonai Complex, Dehugaon Alandi Road, Dehu, Pune 412109",
    image: media.stores[3],
    imageKey: "store-4",
  },
].map((s) => ({ ...s, mapUrl: mapsSearch(s.query), mapEmbed: mapsEmbed(s.query) }));

/* ---- Ready-made contact links ------------------------------------------ */
const digits = (v) => v.replace(/\D/g, "");
const withCountry = (v) => (digits(v).length === 10 ? "91" + digits(v) : digits(v));
export const whatsappUrl = (text = "Hello Mauli Mobile Wala, I would like to know more about your products.") =>
  `https://wa.me/${withCountry(site.contact.whatsapp)}?text=${encodeURIComponent(text)}`;

export const contactLinks = {
  tel: `tel:+${withCountry(site.contact.phone)}`,
  whatsapp: whatsappUrl(),
  email: site.contact.email ? `mailto:${site.contact.email}` : "",
  map: "/stores",
};

/* Only social accounts that have a real link (empty ones are hidden everywhere) */
export const hasSocial = (key) => /^https?:\/\//.test(site.social[key] || "");

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Our Stores", to: "/stores" },
  { label: "Franchise", to: "/franchise", highlight: true },
  { label: "Articles", to: "/articles" },
  { label: "Contact", to: "/contact" },
];

export const heroSlides = [
  {
    eyebrow: "Smartphones · Accessories · Electronics",
    line1: "Experience Excellence",
    line2: "with Every Call.",
    text: "Discover the latest smartphones and electronics from leading brands like Apple, Samsung, Vivo and more, along with mobile accessories.",
    image: media.hero.homeSlides[0],
    imageKey: "home-hero-1",
  },
  {
    eyebrow: "Genuine Products · Brand Warranty",
    line1: "Shop with",
    line2: "Confidence.",
    text: "Genuine products, brand warranty, competitive prices and expert support from a team that puts your needs first.",
    image: media.hero.homeSlides[1],
    imageKey: "home-hero-2",
  },
  {
    eyebrow: "Four Stores · Since 2009",
    line1: "Visit Your",
    line2: "Nearest Store.",
    text: "Explore smartphones and mobile accessories at our four retail outlets and get help from our team.",
    image: media.hero.homeSlides[2],
    imageKey: "home-hero-3",
  },
];

export const segments = [
  { label: "Smartphones", icon: "Smartphone" },
  { label: "Accessories", icon: "Headphones" },
  { label: "Electronics", icon: "Tv" },
  { label: "Brand Warranty", icon: "ShieldCheck" },
];

export const whyUs = [
  {
    title: "Genuine Products",
    text: "Genuine products sourced through authorized brand distributors.",
    icon: "BadgeCheck",
  },
  {
    title: "Brand Warranty",
    text: "Brand warranty for added confidence.",
    icon: "ShieldCheck",
  },
  {
    title: "Competitive Prices",
    text: "Competitive prices on smartphones and accessories.",
    icon: "Tag",
  },
  {
    title: "Expert Support",
    text: "Expert support to help you choose a device that suits your needs.",
    icon: "UserCheck",
  },
  {
    title: "Four Retail Locations",
    text: "Four convenient retail locations to visit and explore the range.",
    icon: "Store",
  },
];

export const brands = ["Apple", "Samsung", "Vivo", "& more"];

/* ---- Numbers (animated counters) — edit values here ---------------------
   value = number to count up to, prefix/suffix = text around it            */
export const stats = [
  { value: 200000, suffix: "+", label: "Happy Customers", note: "Products sold since 2009", format: "lakh" },
  { value: 100, suffix: "+", label: "Brands", note: "Smartphones, accessories & electronics" },
  { value: 100, suffix: "+", label: "Team Members", note: "Trained sales & support staff" },
  { value: 500, prefix: "₹", suffix: " Cr+", label: "Turnover", note: "Business volume till date" },
];

/* ---- Authorisations (shown as trust badges) ---------------------------- */
export const authorisations = [
  { brand: "Samsung", title: "Authorised Distributor", text: "Through our group company Navya Corporation — authorised Samsung distributor for Beed district, supplying genuine Samsung stock to retailers." },
  { brand: "Apple iPhone", title: "Authorised Reseller", text: "Original Apple iPhones with official brand warranty and genuine accessories." },
];

/* ---- Franchise ------------------------------------------------------------ */
export const franchise = {
  benefits: [
    { title: "Trusted Brand Since 2009", text: "Start with a name customers in Beed and Pune already know and trust.", icon: "BadgeCheck" },
    { title: "Strong Brand Partnerships", text: "Benefit from our relationships as a Samsung authorised distributor and Apple iPhone authorised reseller.", icon: "ShieldCheck" },
    { title: "100+ Brands to Sell", text: "Access a wide range of smartphones, accessories and electronics from day one.", icon: "Smartphone" },
    { title: "Proven Store Model", text: "Store setup, product display and selling methods tested across our own outlets.", icon: "Store" },
    { title: "Training & Support", text: "Guidance for you and your staff, learned from running a 100+ member team.", icon: "UserCheck" },
    { title: "Competitive Pricing", text: "Purchase advantages that help your store offer customers better prices.", icon: "Tag" },
  ],
  steps: [
    { title: "Send an Enquiry", text: "Fill the form or message us on WhatsApp." },
    { title: "Discussion", text: "Our team calls you to understand your location and plans." },
    { title: "Location Review", text: "We review the area and the shop space together with you." },
    { title: "Launch Your Store", text: "Setup, stock and training — and your Mauli Mobile Wala store opens." },
  ],
};