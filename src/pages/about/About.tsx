import { Button } from "@/components/ui/button";
import DecryptedText from "@/components/ui/shadcn-io/decrypted-text";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultCompanies = [
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-1.svg",
    alt: "Arc",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-2.svg",
    alt: "Descript",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-3.svg",
    alt: "Mercury",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-4.svg",
    alt: "Ramp",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-5.svg",
    alt: "Retool",
  },
  {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/company/fictional-company-logo-6.svg",
    alt: "Watershed",
  },
];

const defaultAchievements = [
  { label: "Active Users", value: "50K+" },
  { label: "Wallets Created", value: "120K+" },
  { label: "Transactions Processed", value: "1M+" },
  { label: "Global Coverage", value: "10+" },
];



const About = ({
    description = "Pay_Kotha is a fast, secure, and reliable digital wallet platform enabling users to send, receive, and manage money effortlessly.",
  mainImage = {
    src: "https://i.ibb.co.com/C3MTkmkM/18228.jpg",
    alt: "Digital wallet interface",
  },
  secondaryImage = {
    src: "https://i.ibb.co.com/XZcbkrD8/06.jpg",
    alt: "Mobile app interface",
  },
  breakout = {
    src: "https://i.ibb.co.com/8n83P6P8/69.jpg",
    alt: "Secure wallet",
    title: "Top-notch Security",
    description:
      "Your funds are protected with state-of-the-art encryption and secure authentication.",
    buttonText: "Learn More",
    buttonUrl: "/security",
  },
  companiesTitle = "",
  companies = defaultCompanies,
  achievementsTitle = "Our Growth in Numbers",
  achievementsDescription = "Pay_Kotha has rapidly grown to become a leading digital wallet solution, trusted by users globally.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section className="py-10 lg:py-16">
      <div className="container">
        {/* Intro */}
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <div className="text-3xl md:text-4xl lg:text-5xl text-primary font-bold">
                  <DecryptedText
                    className="text-2xl md:text-3xl lg:text-5xl text-primary font-bold"
                    text="About Pay_Kotha"
                    animateOn="view"
                    speed={150}
                    revealDirection="center"
                  />
                </div>
          <p className="text-muted-foreground">{description}</p>
        </div>

        {/* Images + Breakout */}
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img src={breakout.src} alt={breakout.alt} className="mr-auto h-12" />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground">{breakout.description}</p>
              </div>
              <Button variant="default" className="mr-auto" asChild>
                <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
              </Button>
            </div>
            <img
              src={secondaryImage.src}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        {/* Companies */}
        <div className="py-32">
          <p className="text-center text-primary">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto invert md:h-8"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold">{achievementsTitle}</h2>
            <p className="max-w-xl text-muted-foreground">{achievementsDescription}</p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl text-primary font-semibold md:text-5xl">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] bg-[size:80px_80px] opacity-15 md:block"></div>
        </div>
      </div>
    </section>
  );
};

export default About;