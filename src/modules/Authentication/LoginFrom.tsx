/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Lock } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/hook";
import { authApi, useLoginMutation } from "@/redux/features/auth/auth";
import toast from "react-hot-toast";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

type LoginFormValues = { email: string; password: string; };

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const form = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res.success) {
        toast.success("Logged in successfully");
        localStorage.setItem("token", res.data.token);
        dispatch(authApi.util.invalidateTags(["USER"]));
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      if (err?.data?.message === "Password does not match") {
        toast.error("Invalid credentials");
      } else if (err?.data?.message === "User is not verified") {
        toast.error("Your account is not verified");
        navigate("/verify", { state: data.email });
      } else {
        toast.error("Login failed. Please try again.");
      }
    }
  };

  const handleQuickLogin = async (email: string, password: string) => {
    await onSubmit({ email, password });
  };

  return (
    <Card className="w-full max-w-md bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl">
      <CardContent className="p-5 md:p-10 space-y-5">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">PayKotha</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Transfer money instantly to anyone,
            <br /> anywhere in the world
          </p>
        </div>

        {/* FORM START */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Email"
                        {...field}
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white placeholder:text-gray-400"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white placeholder:text-gray-400"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Login Button */}
            <Button
              type="submit"
              className="w-full h-12 rounded-full bg-linear-to-r from-orange-400 to-pink-500 hover:opacity-90 text-white font-semibold"
            >
              Login Securely
            </Button>
          </form>
        </Form>
        {/* FORM END */}

        {/* Quick Login */}
        <div className="text-center space-y-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">Quick login</p>
          <div className="flex justify-center gap-3">
            <Button
              variant="outline"
              onClick={() => handleQuickLogin("user@mail.com", "11111111")}
              className="rounded-full border-gray-300 dark:border-white/20 text-gray-700 dark:text-white"
            >
              User
            </Button>
            <Button
              variant="outline"
              onClick={() => handleQuickLogin("agent@mail.com", "11111111")}
              className="rounded-full border-gray-300 dark:border-white/20 text-gray-700 dark:text-white"
            >
              Agent
            </Button>
            <Button
              onClick={() => handleQuickLogin("admin@mail.com", "11111111")}
              className="rounded-full bg-linear-to-r from-orange-400 to-pink-500 text-white"
            >
              Admin
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 dark:text-gray-400">
          Don’t have an account? <Link to="/signup" className="font-semibold text-orange-400">Register Please</Link>
        </div>
      </CardContent>
    </Card>
  );
}
