import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Stores from "./pages/Stores";
import Franchise from "./pages/Franchise";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  const location = useLocation();
  // reducedMotion="never" = always play animations, even if Windows/phone "reduce animations" is on
  return (
    <MotionConfig reducedMotion="never">
      <Layout>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/franchise" element={<Franchise />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<ArticleDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/404" element={<NotFound />} />
            {/* Any unknown address shows the 404 page without changing the URL */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}