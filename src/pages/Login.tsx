import { useState } from "react";
import { login as firebaseLogin } from "../lib/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Wallet, Mail, Lock, Shield } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";


export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWalletConnect = () => {
    // Wallet connection logic here
    console.log("Connecting wallet...");
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await firebaseLogin(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-xl bg-gradient-primary/20 border border-primary/20">
              <Shield className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Connect your wallet or sign in to access BlockShare
          </p>
        </div>

        <Card className="glass-card border-primary/20 shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Sign In</CardTitle>
            <CardDescription>
              Choose your preferred authentication method
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Wallet Connection */}
            <div className="space-y-4">
              <Button 
                onClick={handleWalletConnect}
                className="w-full h-14 bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground font-semibold text-base transition-all duration-300 hover:shadow-glow hover:scale-[1.02] active:scale-[0.98] group"
                size="lg"
              >
                <Wallet className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                Connect Wallet
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-12 border-primary/30 hover:bg-primary/20 hover:border-primary/60 hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group"
                  onClick={() => console.log("MetaMask")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center group-hover:animate-bounce">
                      <Wallet className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">MetaMask</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-primary/30 hover:bg-primary/20 hover:border-primary/60 hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group"
                  onClick={() => console.log("WalletConnect")}
                >
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center group-hover:animate-bounce">
                      <Wallet className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-medium">WalletConnect</span>
                  </div>
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-xs text-muted-foreground">
                  ⚡ One-click login • 🔐 Secure • 🚀 Web3 ready
                </p>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-border/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-3 text-sm text-muted-foreground">
                  or continue with email
                </span>
              </div>
            </div>

            {/* Email Login Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-primary/20 focus:border-primary/60 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-primary/20 focus:border-primary/60 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link 
                  to="/forgot-password" 
                  className="text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 bg-primary hover:bg-secondary/90 transition-all duration-300"
                size="lg"
                disabled={loading}
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link 
                to="/register" 
                className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
              >
                Create account
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Link 
            to="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}