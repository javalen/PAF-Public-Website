import { CallToAction } from "../components/CallToAction";
import { Faqs } from "../components/Faqs";
import { Hero } from "../components/Hero";
import ImageGrid from "../components/ImageGrid";
import KeyFeatures from "../components/KeyFeatures";
// import { Reviews } from "@/components/Reviews";
// import { SecondaryFeatures } from "@/components/SecondaryFeatures";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import About from "../components/About";
import SocialProof from "../components/SocialProof";
import WhoWeServe from "../components/WhoWeServe";
import { Pricing } from "../components/Pricing";
import PricePredictor from "../components/PricePredictor";
import LeadForm from "../components/LeadForm";
import { Mission } from "../components/Mission";
import gridImg1 from "../assets/img-grid1-img1.jpg";
import gridImg2 from "../assets/img-grid1-img2.jpg";
import gridImg3 from "../assets/img-grid1-img3.jpg";
import gridImg4 from "../assets/img-grid1-img4.jpg";
import grid2Img1 from "../assets/img-grid2-img1.jpg";
import grid2Img2 from "../assets/img-grid2-img2.jpg";
import grid2Img3 from "../assets/img-grid2-img3.jpg";
import grid2Img4 from "../assets/img-grid2-img4.jpg";

const HOME_GRID_IMAGES = [
  { src: gridImg1, alt: "Property showing" },
  { src: gridImg2, alt: "Inspection clipboard" },
  { src: gridImg3, alt: "Engineers reviewing systems" },
  { src: gridImg4, alt: "Pipe maintenance" },
];

const HOME_GRID_IMAGES_2 = [
  { src: grid2Img1, alt: "HVAC exterior units" },
  { src: grid2Img2, alt: "Interior living space" },
  { src: grid2Img3, alt: "Landscaped pathway" },
  { src: grid2Img4, alt: "Residential building exterior" },
];

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <ImageGrid images={HOME_GRID_IMAGES} fullWidth={false} />
      <WhoWeServe />
      <ImageGrid images={HOME_GRID_IMAGES_2} fullWidth={false} layout="split-middle" />
      <KeyFeatures />
      <SocialProof />
      <Pricing />
      
      <PricePredictor /> 
      {/* <LeadForm />  */}
      <Mission />
      {/* <LeadForm />  */}
      
      {/*<SecondaryFeatures />
      <CallToAction />
      <Reviews />*/}
      {/* <CallToAction /> */}
      {/* <Faqs /> */}
      {/* <About /> */}
    

      <Footer />
    </>
  );
}
