
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { login, register } from "@/utils/authUtils";

const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle Register
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const name = (document.getElementById("register-name") as HTMLInputElement).value;
    const email = (document.getElementById("register-email") as HTMLInputElement).value;
    const password = (document.getElementById("register-password") as HTMLInputElement).value;
    const passwordConfirm = (document.getElementById("register-password-confirm") as HTMLInputElement).value;

    if (password !== passwordConfirm) {
      toast({ title: "Error", description: "Passwords do not match." });
      setIsLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      toast({ title: "Account created successfully", description: "Welcome to WebSecLearn!" });
      
      // Trigger a storage event to update navbar state
      window.dispatchEvent(new Event('storage'));
      
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Registration error:", err);
      toast({ title: "Registration failed", description: err.message || "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
      await login(email, password);
      toast({ title: "Logged in successfully", description: "Welcome back!" });
      
      
      window.dispatchEvent(new Event('storage'));
      
      navigate("/dashboard");
    } catch (err: any) {
      console.error("Login error:", err);
      toast({ title: "Login failed", description: err.message || "Something went wrong." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <Tabs defaultValue="login">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Authentication</CardTitle>
            <TabsList>
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>Access your WebSecLearn account</CardDescription>
        </CardHeader>

        {/* Login Tab */}
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-websec-purple hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input id="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-websec-purple hover:bg-websec-purple-dark"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>

        {/* Register Tab */}
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input id="register-name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="your@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input id="register-password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password-confirm">Confirm Password</Label>
                <Input id="register-password-confirm" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-websec-purple hover:bg-websec-purple-dark"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
