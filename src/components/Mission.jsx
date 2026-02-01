import { Container } from "./Container";

export function Mission() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-t border-gray-200 py-20 sm:py-32 bg-gray-50"
    >
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <h1
            id="about-title"
            className="text-4xl sm:text-5xl font-extrabold mb-6 text-gray-800"
          >
            Our Mission
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-medium mb-4">
            Predictaf empowers HOA, COA, and POA communities to protect property
            values, reduce risk, and prevent costly surprises by transforming
            maintenance, compliance, and capital planning into a proactive,
            transparent, and intelligent system.
          </p>

          <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
            We help community associations govern with confidence, preserve
            long-term assets, and create safer, more stable neighborhoods—so
            boards can lead responsibly and residents can live with peace of
            mind.
          </p>
        </div>
      </Container>
    </section>
  );
}
