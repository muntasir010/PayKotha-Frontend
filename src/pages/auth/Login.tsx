import { LoginForm } from "@/modules/Authentication/LoginFrom";
import { Link } from "react-router";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link to="/" className="flex items-center gap-2 font-medium"></Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="h-2/3 lg:mt-20 lg:overflow-y-hidden hidden bg-muted lg:flex justify-center items-center">
        <img
          src={
            "https://i.ibb.co.com/BV57RbNS/3d-render-secure-login-password-illustration.jpg"
          }
          alt="Image"
          className="inset-0 h-full w-full object-cover dark:brightness-[0.8]"
        />
      </div>
    </div>
  );
}
