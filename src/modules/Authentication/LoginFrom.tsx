/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { authApi, useLoginMutation } from "@/redux/features/auth/auth";
import { useAppDispatch } from "@/redux/hook";
import { useForm, type FieldValues, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [login] = useLoginMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Logged in successfully");

        // ✅ Force refetch user info so Navbar updates instantly
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

  // 🔥 Quick login helper
  const handleQuickLogin = async (email: string, password: string) => {
    await onSubmit({ email, password });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="john@example.com"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="********"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>

    
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuickLogin("oikawa@gmail.com", "Oikawa123")}
          >
            Login as User
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleQuickLogin("agent@example.com", "agent123")}
          >
            Login as Agent
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              handleQuickLogin("admin@digitalwallet.com", "admin123")
            }
          >
            Login as Admin
          </Button>
        </div>
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/signup" replace className="underline underline-offset-4">
          Register
        </Link>
      </div>
    </div>
  );
}