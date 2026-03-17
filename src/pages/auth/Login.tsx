import { LoginForm } from "@/modules/Authentication/LoginFrom";

export default function Login() {
  return (
    <div className="min-h-screen px-0 md:px-8 lg:px-16 grid lg:grid-cols-2 bg-white dark:bg-[#0B0F1A] transition-colors duration-300">
      {/* LEFT SIDE IMAGE */}
      <div className="hidden lg:flex items-center justify-center dark:from-[#0B0F1A] dark:to-[#111827]">
        <img
          src="/src/assets/payment-locker.png"
          className="w-[70%] object-contain"
        />
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center p-6">
        <LoginForm />
      </div>
    </div>
  );
}
