import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";
import { logout } from "../../lib/auth";
import { cn } from "../../lib/utils";
import { 
  Home, 
  Upload, 
  Files, 
  Share2, 
  Shield, 
  Wallet 
} from "lucide-react";
import { Button } from "../ui/button";

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { href: "/", label: "Dashboard", icon: Home },
    { href: "/upload", label: "Upload", icon: Upload },
    { href: "/my-files", label: "My Files", icon: Files },
    { href: "/shared", label: "Shared Files", icon: Share2 },
    { href: "/permissions", label: "Permissions", icon: Shield },
  ];

  return (
    <nav className="flex items-center justify-between w-full px-6 py-4 bg-card/50 backdrop-blur-md border-b border-border">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            BlockShare
          </span>
        </div>
        
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link key={item.href} to={item.href}>
                <Button
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={cn(
                    "flex items-center space-x-2 transition-all duration-200",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-lg" 
                      : "hover:bg-secondary/50"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              </Link>
            );
          })}
        </div>
      </div>
      
      {user ? (
        <Button
          variant="outline"
          className="flex items-center space-x-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
          onClick={handleLogout}
        >
          <Wallet className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      ) : (
        <Link to="/login">
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 border-primary/20 hover:border-primary/40 hover:bg-primary/10"
          >
            <Wallet className="w-4 h-4" />
            <span>Login</span>
          </Button>
        </Link>
      )}
    </nav>
  );
};

export default Navigation;