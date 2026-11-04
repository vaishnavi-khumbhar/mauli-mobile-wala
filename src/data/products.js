import { media } from "./media";

/*
  Product categories shown on the website.
  Text is based only on the client's approved copy — no prices, models or
  specifications have been added. Each card opens a WhatsApp enquiry.
*/

export const products = [
  {
    id: 1,
    slug: "apple-iphones",
    name: "Apple iPhones",
    category: "Smartphones",
    image: media.products.apple,
    imageKey: "product-apple",
    shortDescription: "Explore the latest Apple iPhones with genuine products and brand warranty.",
  },
  {
    id: 2,
    slug: "samsung-smartphones",
    name: "Samsung Galaxy",
    category: "Smartphones",
    image: media.products.samsung,
    imageKey: "product-samsung",
    shortDescription: "Explore Samsung Galaxy smartphones with genuine products and brand warranty.",
  },
  {
    id: 3,
    slug: "vivo-smartphones",
    name: "Vivo Smartphones",
    category: "Smartphones",
    image: media.products.vivo,
    imageKey: "product-vivo",
    shortDescription: "Explore Vivo smartphones with genuine products and brand warranty.",
  },
  {
    id: 4,
    slug: "more-brands",
    name: "More Leading Brands",
    category: "Smartphones",
    image: media.products.moreBrands,
    imageKey: "product-more-brands",
    shortDescription: "Smartphones from more leading brands — ask our team about current availability.",
  },
  {
    id: 5,
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    category: "Accessories",
    image: media.products.accessories,
    imageKey: "product-accessories",
    shortDescription: "Mobile accessories to go with your smartphone, available at our stores.",
  },
  {
    id: 6,
    slug: "electronics",
    name: "Electronics",
    category: "Electronics",
    image: media.products.electronics,
    imageKey: "product-electronics",
    shortDescription: "Other electronics at our outlets — ask our team about the current range.",
  },
];
