import DecryptedText from "../../components/ui/shadcn-io/decrypted-text";

const features = [
  {
    title: "Secure Transactions",
    description:
      "Our wallet app ensures every transaction is encrypted and safe from unauthorized access.",
    image: "https://i.ibb.co.com/m5SpFxs5/4482405.jpg",
  },
  {
    title: "Instant Payments",
    description:
      "Send and receive money instantly with low fees and reliable processing.",
    image: "https://i.ibb.co.com/cShsWpnZ/side-view-adult-paying-with-card.jpg",
  },
  {
    title: "Expense Tracking",
    description:
      "Easily track your spending and monitor your financial health with smart analytics.",
    image: "https://i.ibb.co.com/WW8HzTzd/business-person-looking-finance-graphs.jpg",
  },
  {
    title: "Multi-Currency Support",
    description:
      "Manage multiple currencies seamlessly and make international payments hassle-free.",
    image: "https://i.ibb.co.com/8Lt2w2ft/money-around-world.jpg",
  },
];

const Features = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="container">
        <div className="mb-24 flex flex-col items-center gap-6">
          <div className="flex justify-center text-3xl md:text-4xl lg:text-5xl mb-4 font-bold items-center">
            <DecryptedText
              className="text-5xl w-full mx-auto mb-4 text-center font-bold"
              text="Features of Our Wallet App"
              animateOn="view"
              speed={150}
              revealDirection="center"
            />
          </div>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            Explore the key features that make managing your finances easy, secure, and fast.
          </p>
        </div>

        <div className="relative flex justify-center">
          <div className="border-muted2 relative flex w-full flex-col border md:w-1/2 lg:w-full">
            <div className="relative flex flex-col lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-3/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{features[0].title}</h2>
                <p className="text-muted-foreground">{features[0].description}</p>
                <img
                  src={features[0].image}
                  alt={features[0].title}
                  className="mt-8 bg-black aspect-[1.5] h-full w-full rounded-xl object-cover lg:aspect-[2.4]"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-2/5">
                <h2 className="text-xl font-semibold">{features[1].title}</h2>
                <p className="text-muted-foreground">{features[1].description}</p>
                <img
                  src={features[1].image}
                  alt={features[1].title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover rounded-xl"
                />
              </div>
            </div>
            <div className="border-muted2 relative flex flex-col border-t border-solid lg:flex-row">
              <div className="border-muted2 flex flex-col justify-between border-b border-solid p-10 lg:w-2/5 lg:border-r lg:border-b-0">
                <h2 className="text-xl font-semibold">{features[2].title}</h2>
                <p className="text-muted-foreground">{features[2].description}</p>
                <img
                  src={features[2].image}
                  alt={features[2].title}
                  className="mt-8 aspect-[1.45] h-full w-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-between p-10 lg:w-3/5">
                <h2 className="text-xl font-semibold">{features[3].title}</h2>
                <p className="text-muted-foreground">{features[3].description}</p>
                <img
                  src={features[3].image}
                  alt={features[3].title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4] rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;