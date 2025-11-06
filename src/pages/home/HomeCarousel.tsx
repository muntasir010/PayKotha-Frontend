import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React from "react";
import CarouselOverlay from "@/components/common/CarouselOverlay";

export default function HomeCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <Carousel plugins={[plugin.current]} className="w-full my-8 rounded-xl relative">
      <CarouselContent>
        <CarouselItem className="relative">
          <img
            src="https://i.ibb.co.com/XrkHn5Qm/payment-goods-by-credit-card-via-smartphone.jpg"
            alt="Slide 1"
            className="object-cover rounded-xl w-full max-h-[620px]"
          />
          <CarouselOverlay
            title="Fast & Secure Payments"
            description="Experience seamless transactions with our latest digital payment solutions."
          />
        </CarouselItem>

        <CarouselItem className="relative">
          <img
            src="https://i.ibb.co.com/cShsWpnZ/side-view-adult-paying-with-card.jpg"
            alt="Slide 2"
            className="object-cover rounded-xl w-full max-h-[620px]"
          />
          <CarouselOverlay
            title="Smart Transactions"
            description="Your money, your control. Safe, simple, and fast."
          />
        </CarouselItem>

        <CarouselItem className="relative">
          <img
            src="https://i.ibb.co.com/Kc7NPm26/wire-transfer-young-man-using-his-smartphone-laptop-banking-transaction-some-payments.jpg"
            alt="Slide 3"
            className="object-cover rounded-xl w-full max-h-[620px]"
          />
          <CarouselOverlay
            title="Digital Banking Made Easy"
            description="Manage all your payments in one place with confidence and speed."
          />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
