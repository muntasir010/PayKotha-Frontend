/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useRegisterMutation } from "@/redux/features/auth/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Mail, User } from "lucide-react";

const registerSchema = z
  .object({
    name: z.string().min(3, { message: "Name is too short" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
      .string()
      .min(10, { message: "Phone number is too short" })
      .max(15, { message: "Phone number is too long" }),
    role: z.enum(["USER", "AGENT"]),
    password: z.string().min(8, { message: "Password is too short" }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password is too short",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "USER",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      password: data.password,
    };
    try {
      await register(userInfo).unwrap();
      toast.success(`${data.role} created successfully`);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed");
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/80 dark:bg-white/5 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-3xl shadow-2xl">
      <CardContent className="px-10 py-6 space-y-4">
        {/* Header */}
        <div className="text-center space-y-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">PayKotha</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Join us and start managing your money
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        placeholder="Full Name"
                        {...field}
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

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
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <select
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      className="w-full rounded-full h-12 px-4 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 text-gray-900 dark:text-gray-400 focus:border-orange-600"
                    >
                      <option value="">Select Role</option>
                      <option value="USER">User</option>
                      <option value="AGENT">Agent</option>
                    </select>
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
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-4 top-3 w-5 h-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                        className="pl-12 bg-white dark:bg-transparent border border-gray-300 dark:border-orange-400/40 focus:border-orange-500 rounded-full h-12 text-gray-900 dark:text-white"
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button className="w-full h-12 rounded-full bg-linear-to-r from-orange-400 to-pink-500 text-white font-semibold">
              Create Account
            </Button>
          </form>
        </Form>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account? <Link to="/login" className="text-orange-500 font-semibold hover:underline">Log in</Link>
        </div>
      </CardContent>
    </Card>
  );
}
