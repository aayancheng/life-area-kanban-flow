
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

type AuthFormProps = {
  defaultMode?: "signin" | "signup";
};

const AuthForm: React.FC<AuthFormProps> = ({ defaultMode = "signin" }) => {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signIn, signUp, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (mode === "signin") {
      await signIn(email, password);
    } else {
      await signUp(email, password);
    }
  };

  React.useEffect(() => {
    if (error) {
      toast({
        title: mode === "signin" ? "Sign In Error" : "Sign Up Error",
        description: error,
        variant: "destructive",
      });
    }
  }, [error, mode]);

  const toggleMode = () => {
    setMode(mode === "signin" ? "signup" : "signin");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{mode === "signin" ? "Sign In" : "Create Account"}</CardTitle>
        <CardDescription>
          {mode === "signin"
            ? "Enter your email and password to access your Kanban board"
            : "Sign up to start organizing your life with our Kanban board"}
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Loading..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={toggleMode}
          >
            {mode === "signin"
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default AuthForm;
