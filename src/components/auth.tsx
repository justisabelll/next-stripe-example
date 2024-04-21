"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom";

import { signIn } from "next-auth/react";
import type { AuthResponse } from "~/server/actions";
import { SignUp } from "~/server/actions";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";

export const Auth = () => {
  const [isAuthMode, setAuthMode] = useState(false);
  const [isRegisterMode, setRegisterMode] = useState(false);

  const toggleAuthMode = () => setAuthMode(!isAuthMode);
  const toggleRegisterMode = () => setRegisterMode(!isRegisterMode);

  const authContent = () => (
    <div>
      <Button
        variant="secondary"
        onClick={toggleAuthMode}
        className="my-2 font-bold underline"
      >
        Close
      </Button>
      {isRegisterMode ? (
        <Register setRegisterMode={() => setRegisterMode(false)} />
      ) : (
        <SignIn />
      )}
      <div className="mt-4 flex items-center justify-center">
        <p className="text-sm">
          {isRegisterMode
            ? "Already have an account?"
            : "Don't have an account?"}
        </p>
        <Button
          variant="link"
          onClick={toggleRegisterMode}
          className="font-semibold underline"
        >
          {isRegisterMode ? "Login" : "Register"}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="">
      {isAuthMode ? (
        authContent()
      ) : (
        <Button size="lg" onClick={toggleAuthMode} className="w-80">
          Sign In / Register
        </Button>
      )}
    </div>
  );
};

const SignIn = () => {
  return (
    <Card className="mx-auto w-full px-4">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          action={async (formData) => {
            await signIn("credentials", {
              email: formData.get("email"),
              password: formData.get("password"),
            });
          }}
        >
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="anything@really.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Doesn't have to be good"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const Register = ({ setRegisterMode }: { setRegisterMode: () => void }) => {
  const initState = {
    message: "",
  } as AuthResponse;

  const [state, action] = useFormState(SignUp, initState);

  useEffect(() => {
    if (state.message === "User created successfully. 🎉") {
      toast(state.message);
      setRegisterMode(); // Automatically switch to login after successful registration
    } else if (state.message) {
      toast(state.message);
    }
  }, [state.message, setRegisterMode]);

  return (
    <Card className="mx-auto w-full px-4">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email below to register for an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="grid gap-4 ">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                id="name"
                type="text"
                placeholder="Cool Name"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                id="email"
                type="email"
                placeholder="anything@really.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                name="password"
                id="password"
                type="password"
                placeholder="Doesn't have to be good"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
