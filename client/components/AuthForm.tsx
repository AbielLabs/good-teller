"use client";

import { z } from "zod";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

const AuthForm = ({ type }: AuthFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-[40%] min-h-[60%]  shadow-md rounded-lg shadow-gray-600 flex flex-col px-3 py-2 items-center">
      <div className="headers">
        {type === "sign-in" ? (
          <div>
            <h1 className="font-bold text-white  text-center text-2xl uppercase leading-loose   ">
              Welcome Back
            </h1>
            <p className="text-gray-400 capitalize text-sm">
              Login to your good-teller Account
            </p>
          </div>
        ) : (
          <div>
            <h1 className="font-bold text-white  text-center text-2xl uppercase leading-loose   ">
              Register Your Company
            </h1>
            <p className="text-gray-400 capitalize text-sm">
              Join us at good-teller where finance is made easy.
            </p>
          </div>
        )}
      </div>
      <div className="flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="w-full">Username</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="w-full">Username</FormLabel>
                  <FormControl className="w-full">
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <div className="headers">
        {type === "sign-in" ? (
          <Link
            className="text-center text-blue-500 capitalize"
            href={"/sign-up"}
          >
            Dont have an accout? register
          </Link>
        ) : (
          <Link
            className="text-center text-blue-500 capitalize"
            href={"/sign-in"}
          >
            Already have an account? login{" "}
          </Link>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
