import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Shield, 
  Key, 
  Users, 
  Clock,
  Plus,
  Trash2,
  Edit,
  Calendar,
  Lock,
  Unlock,
  Eye,
  Download
} from "lucide-react";

const Permissions = () => {
  const accessControls = [
    {
      file: "Blockchain_Whitepaper.pdf",
      address: "0x1234567890abcdef1234567890abcdef12345678",
      permissions: ["view", "download"],
      expires: "Never",
      granted: "2 days ago",
      status: "active"
    },
    {
      file: "Smart_Contract_Code.sol",
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      permissions: ["view"],
      expires: "7 days",
      granted: "1 week ago",
      status: "expiring"
    },
    {
      file: "Token_Metrics.xlsx",
      address: "0x567890abcdef1234567890abcdef1234567890ab",
      permissions: ["view", "download"],
      expires: "Yesterday",
      granted: "2 weeks ago",
      status: "expired"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-success/20 text-success border-success/30">Active</Badge>;
      case "expiring":
        return <Badge variant="outline" className="border-warning text-warning">Expiring Soon</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case "view": return <Eye className="w-3 h-3" />;
      case "download": return <Download className="w-3 h-3" />;
      default: return <Key className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Access Control</h1>
            <p className="text-muted-foreground">
              Manage file permissions and access controls
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Plus className="w-4 h-4 mr-2" />
            Grant Access
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{accessControls.length}</div>
              <div className="text-sm text-muted-foreground">Total Permissions</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {new Set(accessControls.map(a => a.address)).size}
              </div>
              <div className="text-sm text-muted-foreground">Unique Users</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {accessControls.filter(a => a.status === "active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Key className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">
                {accessControls.filter(a => a.status === "expiring" || a.status === "expired").length}
              </div>
              <div className="text-sm text-muted-foreground">Need Attention</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Access Control List */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Permission Management
                  </span>
                  <Badge variant="secondary">{accessControls.length} permissions</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {accessControls.map((control, index) => (
                  <div key={index} className="p-4 bg-secondary/30 rounded-lg border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-medium text-foreground">{control.file}</h3>
                          {getStatusBadge(control.status)}
                        </div>
                        <p className="text-sm text-muted-foreground font-mono">
                          {control.address.slice(0, 10)}...{control.address.slice(-8)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-muted-foreground">Permissions:</span>
                          {control.permissions.map((perm, i) => (
                            <Badge key={i} variant="outline" className="text-xs flex items-center space-x-1">
                              {getPermissionIcon(perm)}
                              <span>{perm}</span>
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Expires: {control.expires}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Grant New Access */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-primary" />
                  Grant Access
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="wallet">Wallet Address</Label>
                  <Input 
                    id="wallet" 
                    placeholder="0x..."
                    className="mt-2 font-mono text-sm"
                  />
                </div>
                
                <div>
                  <Label htmlFor="file-select">Select File</Label>
                  <select 
                    id="file-select"
                    className="w-full mt-2 p-2 bg-background border border-input rounded-md text-sm"
                  >
                    <option>Choose a file...</option>
                    <option>Blockchain_Whitepaper.pdf</option>
                    <option>Smart_Contract_Code.sol</option>
                    <option>Token_Metrics.xlsx</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <Label>Permissions</Label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="w-4 h-4 text-muted-foreground" />
                        <Label className="text-sm">View Access</Label>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Download className="w-4 h-4 text-muted-foreground" />
                        <Label className="text-sm">Download Access</Label>
                      </div>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="expiry">Access Expiry</Label>
                  <select 
                    id="expiry"
                    className="w-full mt-2 p-2 bg-background border border-input rounded-md text-sm"
                  >
                    <option>Never</option>
                    <option>1 day</option>
                    <option>7 days</option>
                    <option>30 days</option>
                    <option>Custom date</option>
                  </select>
                </div>

                <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity">
                  <Key className="w-4 h-4 mr-2" />
                  Grant Access
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gradient-accent/10 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="w-5 h-5 mr-2 text-primary" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Auto-Revoke Expired</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically revoke expired permissions
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Notify on permission changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-medium">Audit Logging</Label>
                    <p className="text-xs text-muted-foreground">
                      Track all access attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Permissions;