"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { OctagonAlertIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth.client";
import { useRouter } from "next/navigation";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const SignInView = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setError(null);
    setPending(true);

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/agents",
      },
      {
        onSuccess: () => {
          router.push("/agents");
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      },
    );
  };

  const onSocial = (provider: "github" | "google") => {
    setError(null);
    setPending(true);

    authClient.signIn.social(
      {
        provider: provider,
        callbackURL: "/agents",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: ({ error }) => {
          setPending(false);
          setError(error.message);
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden border border-border/60 bg-card/95 p-0 shadow-2xl shadow-primary/10 backdrop-blur-sm">
        <CardContent className="grid p-0 md:grid-cols-[1fr_0.9fr]">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="p-6 md:border-r md:border-border/60 md:p-8"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <span className="mb-2 inline-flex rounded-full border border-border/70 bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                    Welcome back
                  </span>
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Sign in to continue your anime conversations
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="******"
                            className="h-11"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !text-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                <Button
                  disabled={pending}
                  type="submit"
                  className="h-11 w-full"
                >
                  Sign in
                </Button>
                <div
                  className="after:border-border relative text-center text-sm after:absolute
                after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
                >
                  <span className="bg-background text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    disabled={pending}
                    onClick={() => onSocial("google")}
                    variant="outline"
                    type="button"
                    className="h-11 w-full"
                  >
                    <FaGoogle /> Google
                  </Button>
                  <Button
                    disabled={pending}
                    onClick={() => onSocial("github")}
                    variant="outline"
                    type="button"
                    className="h-11 w-full"
                  >
                    <FaGithub /> GitHub
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    className="underline underline-offset-4"
                    href="/sign-up"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="relative isolate hidden overflow-hidden md:flex md:flex-col md:items-center md:justify-center md:gap-y-4 md:bg-gradient-to-br md:from-sidebar md:via-sidebar-accent md:to-primary md:p-10">
            <div className="absolute -left-14 -top-14 h-48 w-48 rounded-full bg-sidebar-accent/35 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative z-10 flex max-w-xs flex-col items-center text-center text-sidebar-foreground">
              <Image
                src="/logo-auth.svg"
                alt="AniTalk logo"
                width={96}
                height={96}
                className="mb-5"
              />
              <h2 className="text-2xl font-semibold leading-tight">
                Jump back into AniTalk
              </h2>
              <p className="mt-2 text-sm text-sidebar-foreground/90">
                Continue where your last meeting ended with instant AI anime
                voice chat.
              </p>
              <div className="mt-5 rounded-xl border border-sidebar-foreground/25 bg-sidebar-foreground/10 px-4 py-3 text-sm text-sidebar-foreground/90 backdrop-blur-sm">
                Real-time calls, roleplay agents, and saved sessions in one
                workspace.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div
        className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs
      text-balance *:[a]:underline *:[a]:underline-offset-4"
      >
        By clicking continue, you agree to our
        <a href="#"> Terms of Service </a>
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};
