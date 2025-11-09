import { RegisterForm } from "@/modules/Authentication/RegisterForm";
import { Link } from "react-router";

export default function Register() {
  return (
    <div className="grid lg:grid-cols-2 m-4">
      <div className="relative hidden bg-muted lg:block">
        <img
          src={"https://i.ibb.co.com/n8Pqmf4r/computer-security-with-login-password-padlock-1.jpg"}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium">
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}