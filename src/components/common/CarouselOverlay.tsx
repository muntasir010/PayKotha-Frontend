import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { redirectToDashboard } from "@/utils/redirectDashboard";
import { useUserInfoQuery } from "@/redux/features/auth/auth";

interface CarouselOverlayProps {
  title: string;
  description: string;
}

const CarouselOverlay: React.FC<CarouselOverlayProps> = ({
  title,
  description,
}) => {
  const { data } = useUserInfoQuery(undefined);
  const navigate = useNavigate();
  const user = data?.data?.user;
  const handleGetStarted = () => redirectToDashboard(navigate, user);
  return (
    <div className="absolute inset-0 bg-black/40 flex flex-col rounded-xl justify-center items-center text-center text-white px-6">
      <h2 className="text-2xl md:text-5xl font-bold mb-4 drop-shadow-lg">
        {title}
      </h2>
      <p className="text-[16px] md:text-xl mb-6 max-w-2xl">{description}</p>
      <div className="flex gap-4">
        <Link to={"/features"}>
          <Button
            variant="default"
            className="px-2 md:px-6 md:py-3 py-1.5 rounded-lg text-base"
          >
            Explore Features
          </Button>
        </Link>
        <Link to={"/login"}></Link>
        <Button
          onClick={handleGetStarted}
          variant="secondary"
          className="px-2 md:px-6 md:py-3 py-1.5 rounded-lg text-base"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default CarouselOverlay;
