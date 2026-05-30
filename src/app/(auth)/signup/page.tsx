"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md border-slate-800 bg-slate-900">
        <CardHeader className="items-center text-center">
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-xl text-white">Internal access only</CardTitle>
          <CardDescription className="text-slate-400">
            ResponseOS-Lite accounts are provisioned by an admin.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-4 text-sm text-slate-300">
            Public sign-up has been disabled for this workspace. If you need an
            account, contact the workspace owner to provision access and then
            sign in with your approved credentials.
          </div>

          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
          <Link href="/login">
            <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Back to sign in
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
