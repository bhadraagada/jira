"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center gap-y-2 justify-center flex-col">
      <AlertTriangle className="size-10"/>
      <p className="text-center text-sm font-semibold">
        {" "}
        Something went wrong.
      </p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to Home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;
