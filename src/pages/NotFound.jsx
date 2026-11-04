import useSeo from "../hooks/useSeo";
import { Page, Reveal } from "../components/Motion";
import Button from "../components/Button";

export default function NotFound() {
  useSeo({ title: "Page Not Found | Mauli Mobile Wala", description: "The page you are looking for could not be found." });
  return (
    <Page>
      <section className="bg-cream">
        <div className="container-site flex min-h-[70vh] flex-col items-start justify-center py-24">
          <Reveal>
            <p className="eyebrow">Error 404</p>
            <h1 className="mt-6 text-[56px] font-bold leading-none sm:text-[88px]">
              Page <span className="text-gold">Not Found.</span>
            </h1>
            <p className="lead mt-6 max-w-lg">The page you are looking for has moved or does not exist.</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-5">
              <Button to="/">Back to Home</Button>
              <Button to="/products" variant="secondary">View Products</Button>
            </div>
          </Reveal>
        </div>
      </section>
    </Page>
  );
}
