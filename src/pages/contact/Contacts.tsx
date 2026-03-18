/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import DecryptedText from "../../components/ui/shadcn-io/decrypted-text";
import toast from "react-hot-toast";
import { useSendMessageMutation } from "@/redux/features/contact/contactApi";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const Contacts = ({
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "+880 1302037958",
  email = "naeemtasir03@gmail.com",
}: Contact2Props) => {
  const [sendMessage, { isLoading }] = useSendMessageMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const messageData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const res = await sendMessage(messageData).unwrap();
      if (res.success) {
        toast.success("Message sent successfully!");
        form.reset();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message");
    }
  };
  return (
    <section className="max-w-7xl mt-6 md:mt-10 mx-2 md:mx-4 lg:mx-auto ">
      <div className="">
        <div className="flex flex-col justify-between gap-10 lg:flex-row lg:gap-20">
          <div className="mx-auto flex flex-col justify-between gap-10">
            <div className="text-center lg:text-left">
              <div className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold mt-3 md:mt-10">
                      <DecryptedText
                      className="text-5xl w-full mx-auto mt-10 font-bold"
                        text="Reach Us"
                        animateOn="view"
                        speed={150}
                        revealDirection="center"
                      />
                    </div>
              <p className="text-muted-foreground w-3/4 mx-auto">{description}</p>
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
            <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg border p-4 md:p-10">
            <div className="flex gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="firstName">First Name</Label>
                <Input type="text" name="firstName" id="firstName" required placeholder="First Name" />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="lastName">Last Name</Label>
                <Input type="text" name="lastName" id="lastName" required placeholder="Last Name" />
              </div>
            </div>
            {/* Email, Subject, Message Input and Name Property */}
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input type="email" name="email" id="email" required placeholder="Email" />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subject">Subject</Label>
              <Input type="text" name="subject" id="subject" required placeholder="Subject" />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea name="message" id="message" required placeholder="Type your message here." />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </div>
      <br />
      <hr />
    </section>
  );
};

export default Contacts;