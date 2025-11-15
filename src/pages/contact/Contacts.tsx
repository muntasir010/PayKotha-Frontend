import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DecryptedText from "../../components/ui/shadcn-io/decrypted-text";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contacts = ({
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "01582369875",
  email = "muntasirasif324@gmail.com",
}: Contact2Props) => {
  return (
    <section className="py-0 lg:py-16">
      <div className="">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className=" text-3xl md:text-4xl lg:text-5xl mb-4 font-bold" style={{ marginTop: "4rem" }}>
                      <DecryptedText
                      className="text-5xl w-full mx-auto mt-10 mb-4 font-bold"
                        text="Reach Us"
                        animateOn="view"
                        speed={150}
                        revealDirection="center"
                      />
                    </div>
              <p className="text-muted-foreground w-3/4">{description}</p>
            </div>
            <div className="mx-auto w-fit lg:mx-0">
              <h3 className="mb-6 text-center text-2xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  <span className="text-primary">{phone}</span>
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline text-primary">
                    {email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstname">First Name</Label>
                <Input type="text" id="firstname" placeholder="First Name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastname">Last Name</Label>
                <Input type="text" id="lastname" placeholder="Last Name" />
              </div>
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" id="subject" placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea placeholder="Type your message here." id="message" />
            </div>
            <Button className="w-full">Send Message</Button>
          </div>
        </div>
      </div>
      <br />
      <hr />
    </section>
  );
};

export default Contacts;