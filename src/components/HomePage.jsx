import { faInstagramSquare } from "@fortawesome/free-brands-svg-icons";
import Carousel from "./Carousel";
import CustomCarousel from "./HeroSection";
import ResponsiveGrid from "./ProductCategory";
import OurServicesSection from "./ServicesCard";
import HighlightedText from "./HighlightedText";
import Header from "./Header";
import NewArrivals from "./NewArrivals";
import { bestSeller, buyMoreSpendLess } from "../data/dummydata";
import newArrivals from "../data/DataNewArrivals";
import CardContainer from "./HorizontalCards";
import Example from "./ProductsDetails/ProductToCart";
import ProductPage from "./YouMayAlsoLike";
import CustomerReviews from "./CustomerReview";
import Footer from "./Footer";
import Offerbanner from "./OfferBanner";
import Test from "./Test";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Test/>
      <CustomCarousel />
      <OurServicesSection />
      <ResponsiveGrid />
      <NewArrivals
        headerText={"New Arrivals"}
        pTag={"Arrivals For The Finest"}
        collection={"New Arrivals"}
      />

      <NewArrivals
        headerText={"Sale"}
        pTag={"Buy More, Spend Less"}
        collection={"Sale"}
      />
      <NewArrivals
        headerText={"Best Sellers"}
        pTag={"Deal With Best Calender Sellers"}
        collection={"Best Seller"}
      />
      <Offerbanner />
      <NewArrivals
        headerText={"What To Wear For"}
        pTag={"Shop Based On Event"}
        collection={"Event Wear"}
      />
      <CardContainer />
      <CustomerReviews />
    </div>
  );
};
export default HomePage;
