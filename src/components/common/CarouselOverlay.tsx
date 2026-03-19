import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { redirectToDashboard } from "@/utils/redirectDashboard";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

interface CarouselOverlayProps {
  title: string;
  description: string;
}

const CarouselOverlay: React.FC<CarouselOverlayProps> = ({ title, description }) => {
  const { data } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const user = data?.data?.user;
  const handleGetStarted = () => redirectToDashboard(navigate, user);

  return (
    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/20 flex flex-col rounded-xl justify-center items-center text-center text-white px-6 transition-all duration-700">
      <h2 className="text-3xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl animate-in fade-in slide-in-from-bottom-10 duration-700">
        {title}
      </h2>
      <p className="text-[16px] md:text-xl mb-8 max-w-2xl text-gray-200 drop-shadow-md animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
        {description}
      </p>
      <div className="flex gap-4 animate-in fade-in zoom-in-95 duration-700 delay-300">
        <Link to={"/features"}>
          <Button
            variant="default"
            className="px-4 md:px-8 md:py-6 py-2 rounded-full text-base font-semibold shadow-lg hover:shadow-[#FF500B]/50 hover:scale-105 transition-all duration-300"
          >
            Explore Features
          </Button>
        </Link>
        <Button
          onClick={handleGetStarted}
          variant="secondary"
          className="px-4 md:px-8 md:py-6 py-2 rounded-full text-base font-semibold shadow-lg hover:shadow-white/20 hover:scale-105 transition-all duration-300 bg-white/90 hover:bg-white text-black"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default CarouselOverlay;