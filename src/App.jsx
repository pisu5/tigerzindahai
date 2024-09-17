import { useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import HighlightedText from "./components/HighlightedText";
import CustomCarousel from "./components/HeroSection";
import images from "./data/ImagesHero";
import OurServicesSection from "./components/ServicesCard";
import GridView from "./components/ProductCategory";
import ResponsiveGrid from "./components/ProductCategory";
import NewArrivals from "./components/NewArrivals";
import Footer from "./components/Footer";
import CardContainer from "./components/HorizontalCards";

import Carousel from "./components/Carousel";
import ImagesStories from "./components/Imagies";

import ProductGrid from "./components/ProductsDetails/ProductOverView";
import ReesponsiveGrid from "./components/ProductsDetails/ProductOverView";
import ResponsiveeGrid from "./components/ProductsDetails/ProductOverView";
import HomePage from "./components/HomePage";

function App() {
  // Dummy data for new arrivals

  return (
    <>
    

      {/*<Carousel />
      <HomePage/>
      <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>

      <OurServicesSection />
      <ResponsiveGrid />

      <NewArrivals headerText={"New Arrivals"} data={newArrivals} />
      <NewArrivals
        headerText={"Buy more , Spend less"}
        data={buyMoreSpendLess}
      />
      <NewArrivals headerText={"best Sellers"} data={bestSeller} />
      <CustomCarousel>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomCarousel>
      <NewArrivals headerText={"What to wear for"} data={bestSeller} />
      <CardContainer />
      <Footer />
      <ResponsiveeGrid/>*/}
    </>
  );
}

export default App;
