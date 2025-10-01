import { useState } from "react";
import { register as firebaseRegister } from "../lib/auth";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import { Checkbox } from "../components/ui/checkbox";
import { Wallet, Mail, Lock, Shield, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleWalletConnect = () => {
    // Wallet connection logic here
    console.log("Connecting wallet for registration...");
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (!formData.acceptTerms) {
      setError("Please accept terms and conditions");
      return;
    }
    setLoading(true);
    try {
  await firebaseRegister(formData.email, formData.password, formData.name);
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            Join BlockShare
          </h1>
          <p className="text-muted-foreground">
            Create your secure file sharing account
          </p>
        </div>

        <Card className="glass-card border-primary/20 shadow-glow">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create Account</CardTitle>
            <CardDescription>
              Start with your wallet or email address
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
                Connect Wallet to Register
              </Button>
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-12 border-primary/30 hover:bg-primary/20 hover:border-primary/60 hover:shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group"
                  onClick={() => console.log("MetaMask registration")}
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
                  onClick={() => console.log("WalletConnect registration")}
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
                  ⚡ Instant registration • 🔐 Secure • 🚀 No passwords needed
                </p>
              </div>
            </div>

            <div className="relative">
              <Separator className="bg-border/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-card px-3 text-sm text-muted-foreground">
                  or create with email
                </span>
              </div>
            </div>

            {/* Email Registration Form */}
            <form onSubmit={handleEmailRegister} className="space-y-4">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-primary/20 focus:border-primary/60 transition-colors"
                    required
                  />
                </div>
              </div>

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
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
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
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-primary/20 focus:border-primary/60 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => updateFormData("confirmPassword", e.target.value)}
                    className="pl-10 h-11 bg-background/50 border-primary/20 focus:border-primary/60 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => updateFormData("acceptTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:text-primary/80 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-primary hover:text-primary/80 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button 
                type="submit" 
                className={`w-full h-11 transition-all duration-300 ${
                  formData.acceptTerms 
                    ? "bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-glow hover:shadow-glow/80" 
                    : "bg-primary hover:bg-secondary"
                }`}
                size="lg"
                disabled={!formData.acceptTerms || loading}
              >
                {loading ? "Registering..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link 
                to="/login" 
                className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors"
              >
                Sign in
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