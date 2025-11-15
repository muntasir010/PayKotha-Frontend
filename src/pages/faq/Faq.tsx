import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DecryptedText from "../../components/ui/shadcn-io/decrypted-text";

const Faq = () => {
  return (
    <>
      <div className="flex justify-center text-3xl md:text-4xl lg:text-5xl mb-4 font-bold items-center" style={{ marginTop: "4rem" }}>
        <DecryptedText
        className="text-5xl w-full mx-auto mt-10 mb-4 text-center font-bold"
          text="Frequently Asked Questions"
          animateOn="view"
          speed={150}
          revealDirection="center"
        />
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger className="focus:text-primary">
            How do I register for a wallet account?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              To register, simply click the "Register" button on the homepage
              and fill out your personal information. Choose your role as either
              User or Agent. You will receive a confirmation email after
              successful registration.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="focus:text-primary">
            How do I deposit or withdraw money?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Users can deposit or withdraw money via authorized Agents.
              Navigate to the dashboard, select the action, and follow the
              on-screen instructions.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger className="focus:text-primary">
            How do I send money to another user?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              In your dashboard, go to "Send Money", enter the recipient's phone
              number or email, specify the amount, and confirm the transaction.
              Ensure the recipient is registered with the wallet service.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-4">
          <AccordionTrigger className="focus:text-primary">
            What fees are associated with transactions?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Transaction fees, if any, are displayed before you confirm a
              transaction. Fees may vary based on the type of transaction or
              user role (User/Agent).
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-5">
          <AccordionTrigger className="focus:text-primary">How is my account secured?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Our system uses JWT authentication and bcrypt password hashing to
              ensure that your account and transactions are secure. Never share
              your login credentials with anyone.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-6">
          <AccordionTrigger className="focus:text-primary">Can I recover a lost password?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Yes. Click "Forgot Password?" on the login page, provide your
              registered email, and follow the instructions to reset your
              password securely.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-7">
          <AccordionTrigger className="focus:text-primary">How do I contact support?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              You can reach our support team via the "Contact" page on the
              website. Fill out the inquiry form, and our team will get back to
              you promptly.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Faq;