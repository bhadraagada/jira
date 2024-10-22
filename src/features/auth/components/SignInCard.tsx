"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { DottedSeparator } from "@/components/dotted-sep";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useLogin } from "../api/useLogin";
import { LoginSchema } from "../schemas";

export const SignInCard = () => {
  const { mutate, isPending: isLoading } = useLogin();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    // console.log(values);
    mutate({json: values});
  };

  return (
    <Card className="w-full h-full md:w-[487px] broder-none shadow-none">
      <CardHeader className="flex items-center justify-center text-center p-7">
        <CardTitle className="text-2xl">Welcome Back!!</CardTitle>
      </CardHeader>
      <div className="px-7 mb-3">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} size={"lg"} className="w-full">
              Sign In
            </Button>
          </form>
        </Form>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7 flex flex-col  gap-y-4">
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={isLoading}
        >
          <FcGoogle className="mr-2 size-5" />
          Login With Google
        </Button>
        <Button
          variant={"secondary"}
          size={"lg"}
          className="w-full"
          disabled={isLoading}
        >
          <FaGithub className="mr-2 size-5" />
          Login With GitHub
        </Button>
      </CardContent>
      <div className="px-7">
        <DottedSeparator />
        <CardContent className="p-7 flex items-center justify-center">
          <p>
            Don&apos;t have an account?
            <Link href="/sign-up" className="text-blue-700 font-semibold">
              {" "}
              Sign Up
            </Link>
          </p>
        </CardContent>
      </div>
    </Card>
  );
};
