// src/app/auth/login/page.tsx
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import "./CardComponent.css";
import { registerSchema } from "@/schemas/login";
import { useForm } from "react-hook-form";
import { ZodError, ZodObject, ZodString, ZodTypeAny } from "zod";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [slideOut, setSlideOut] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track component mount
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Set a timer to trigger the slide out effect after 2 seconds
    setIsMounted(true);
    const timer = setTimeout(() => {
      setSlideOut(true);
    }, 2000); // 2000 milliseconds = 2 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const handleSubmit = () => {
    try {
      const userData = { email, password, username };
      console.log(userData);
      registerSchema.parse(userData);
      console.log("Validation succeeded:", userData);
      toast({
        title: "Registeration Successfull",
        variant: "default",
        duration: 2000,
      });
      router.push("/auth/login");
    } catch (error: any) {
      console.log("Login :: Error", error.errors[0].message);
      toast({
        title: error.errors[0].message,
        variant: "destructive",
        duration: 2000,
      });
    }
  };
  if (!isMounted) {
    return null; // Prevent rendering until mounted
  }

  return (
    <div className="flex justify-center items-center h-screen relative">
      {/* Second Card that will slide out */}
      <div className="flex gap-3">
        {/* Second Card that will slide out */}
        <div
          className={`absolute transition-all duration-1000 ease-in-out ${
            slideOut ? "slide-out" : "opacity-0"
          }`}
        >
          <Card className="bg-black">
            <CardHeader>
              <CardTitle className="text-white">Mayank's Company</CardTitle>
              <CardDescription>
                <p className="text-white">Welcome to Mayank's Company</p>
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-end"></CardFooter>
          </Card>
        </div>

        {/* First Card */}
        <div
          className={`transition-all duration-1000 ease-in-out z-10 ${
            slideOut ? "translate-x-20" : ""
          }`}
        >
          <Card className="w-[350px] bg-black z-10 transition-transform duration-1000">
            <CardHeader>
              <CardTitle className="text-white">Register</CardTitle>
              <CardDescription>Please Register</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username" className="text-white">
                    Username
                  </Label>
                  <Input
                    id="text"
                    type="username"
                    placeholder="Your username"
                    className="text-white"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    className="text-white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Your password"
                    className="text-white"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="hover:bg-slate-200">
                Cancel
              </Button>
              <Button
                className="hover:bg-black border border-white"
                onClick={handleSubmit}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
