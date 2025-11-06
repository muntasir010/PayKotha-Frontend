import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface CarouselOverlayProps {
  title: string;
  description: string;
}

const CarouselOverlay: React.FC<CarouselOverlayProps> = ({ title, description }) => {
  return (
    <div className="absolute inset-0 bg-black/40 flex flex-col rounded-xl justify-center items-center text-center text-white px-6">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-lg md:text-xl mb-6 max-w-2xl">
        {description}
      </p>
      <div className="flex gap-4">
        <Link to={"/features"}>
        <Button variant="default" className="px-6 py-3 rounded-lg text-base">
          Explore Features
        </Button></Link>
        <Link to={"/login"}></Link>
        <Button variant="secondary" className="px-6 py-3 rounded-lg text-base">
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default CarouselOverlay;
