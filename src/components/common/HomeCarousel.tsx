import {
  Carousel,
  CarouselContent,
  CarouselItem,
  
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import CarouselOverlay from "@/components/common/CarouselOverlay";

export default function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative"
    >
      <CarouselContent>
        <CarouselItem className="relative p-0">
          <img
            src="https://i.ibb.co.com/cShsWpnZ/side-view-adult-paying-with-card.jpg"
            alt="Slide 1"
            className="w-full object-cover h-[calc(100vh-64px)] block"
          />
          <CarouselOverlay
            title="Smart Transactions"
            description="Your money, your control. Safe, simple, and fast."
          />
        </CarouselItem>
        <CarouselItem className="relative p-0">
          <img
            src="https://i.ibb.co.com/XrkHn5Qm/payment-goods-by-credit-card-via-smartphone.jpg"
            alt="Slide 2"
            className="w-full object-cover h-[calc(100vh-64px)] block"
          />
          <CarouselOverlay
            title="Fast & Secure Payments"
            description="Experience seamless transactions with our latest digital payment solutions."
          />
        </CarouselItem>
        <CarouselItem className="relative p-0">
          <img
            src="https://i.ibb.co.com/Kc7NPm26/wire-transfer-young-man-using-his-smartphone-laptop-banking-transaction-some-payments.jpg"
            alt="Slide 3"
            className="w-full object-cover h-[calc(100vh-64px)] block"
          />
          <CarouselOverlay
            title="Digital Banking Made Easy"
            description="Manage all your payments in one place with confidence and speed."
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
