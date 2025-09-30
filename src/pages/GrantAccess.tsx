import { useState } from "react";
import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  UserPlus, 
  FileText, 
  Image, 
  Video, 
  Search,
  Shield,
  Calendar,
  Eye,
  Download,
  Edit,
  Trash2,
  Users,
  Clock,
  Key,
  CheckCircle,
  AlertCircle,
  Plus
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: number;
  shared: boolean;
  accessCount: number;
}

interface AccessGrant {
  id: string;
  recipientAddress: string;
  recipientName?: string;
  fileId: string;
  fileName: string;
  permissions: string[];
  expirationDate?: string;
  status: 'active' | 'expired' | 'revoked';
  grantedDate: string;
}

const GrantAccess = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [permissions, setPermissions] = useState<string[]>(['view']);
  const [expirationDate, setExpirationDate] = useState("");
  const [accessMessage, setAccessMessage] = useState("");
  const [notifyRecipient, setNotifyRecipient] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock data
  const files: FileItem[] = [
    { id: '1', name: 'Project Proposal.pdf', type: 'application/pdf', size: 2048000, shared: false, accessCount: 0 },
    { id: '2', name: 'Design Mockups.png', type: 'image/png', size: 5120000, shared: true, accessCount: 3 },
    { id: '3', name: 'Demo Video.mp4', type: 'video/mp4', size: 52428800, shared: true, accessCount: 7 },
    { id: '4', name: 'Budget Spreadsheet.xlsx', type: 'application/excel', size: 1024000, shared: false, accessCount: 0 },
    { id: '5', name: 'Team Photo.jpg', type: 'image/jpeg', size: 3072000, shared: true, accessCount: 12 },
  ];

  const accessGrants: AccessGrant[] = [
    {
      id: '1',
      recipientAddress: '0x1234...5678',
      recipientName: 'John Doe',
      fileId: '2',
      fileName: 'Design Mockups.png',
      permissions: ['view', 'download'],
      expirationDate: '2024-12-31',
      status: 'active',
      grantedDate: '2024-01-15'
    },
    {
      id: '2',
      recipientAddress: '0xabcd...efgh',
      recipientName: 'Jane Smith',
      fileId: '3',
      fileName: 'Demo Video.mp4',
      permissions: ['view'],
      expirationDate: '2024-11-30',
      status: 'active',
      grantedDate: '2024-02-01'
    },
  ];

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType.startsWith('video/')) return Video;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPermissionIcon = (permission: string) => {
    switch (permission) {
      case 'view': return Eye;
      case 'download': return Download;
      case 'edit': return Edit;
      default: return Shield;
    }
  };

  const handleFileSelect = (fileId: string, checked: boolean) => {
    if (checked) {
      setSelectedFiles(prev => [...prev, fileId]);
    } else {
      setSelectedFiles(prev => prev.filter(id => id !== fileId));
    }
  };

  const handlePermissionToggle = (permission: string) => {
    setPermissions(prev => {
      if (prev.includes(permission)) {
        return prev.filter(p => p !== permission);
      } else {
        return [...prev, permission];
      }
    });
  };

  const handleGrantAccess = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to grant access to.",
        variant: "destructive",
      });
      return;
    }

    if (!recipientAddress.trim()) {
      toast({
        title: "No recipient address",
        description: "Please enter a recipient wallet address.",
        variant: "destructive",
      });
      return;
    }

    if (permissions.length === 0) {
      toast({
        title: "No permissions selected",
        description: "Please select at least one permission level.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Access granted successfully",
      description: `Access granted to ${recipientAddress} for ${selectedFiles.length} file(s).`,
    });

    // Reset form
    setSelectedFiles([]);
    setRecipientAddress("");
    setPermissions(['view']);
    setExpirationDate("");
    setAccessMessage("");
    setIsDialogOpen(false);
  };

  const revokeAccess = (grantId: string) => {
    toast({
      title: "Access revoked",
      description: "File access has been revoked successfully.",
    });
  };

  const filteredFiles = files.filter(file => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Grant Access</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage file permissions and grant access to other users
              </p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Grant New Access
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Grant File Access</DialogTitle>
                  <DialogDescription>
                    Select files and configure access permissions for a user
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6">
                  {/* Recipient */}
                  <div className="space-y-2">
                    <Label htmlFor="recipient">Recipient Wallet Address</Label>
                    <Input
                      id="recipient"
                      placeholder="Enter wallet address (0x...)"
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>

                  {/* File Selection */}
                  <div className="space-y-3">
                    <Label>Select Files</Label>
                    <div className="border rounded-lg p-3 max-h-48 overflow-y-auto">
                      <div className="space-y-2">
                        {files.map((file) => {
                          const IconComponent = getFileIcon(file.type);
                          return (
                            <div key={file.id} className="flex items-center space-x-3 p-2 hover:bg-secondary/50 rounded">
                              <Checkbox
                                checked={selectedFiles.includes(file.id)}
                                onCheckedChange={(checked) => handleFileSelect(file.id, checked as boolean)}
                              />
                              <IconComponent className="w-4 h-4 text-primary" />
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">{file.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-3">
                    <Label>Permissions</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { id: 'view', label: 'View', icon: Eye },
                        { id: 'download', label: 'Download', icon: Download },
                        { id: 'edit', label: 'Edit', icon: Edit }
                      ].map((perm) => {
                        const IconComponent = perm.icon;
                        return (
                          <div
                            key={perm.id}
                            className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                              permissions.includes(perm.id)
                                ? 'border-primary bg-primary/10'
                                : 'border-border hover:border-primary/50'
                            }`}
                            onClick={() => handlePermissionToggle(perm.id)}
                          >
                            <div className="flex items-center space-x-2">
                              <IconComponent className="w-4 h-4" />
                              <span className="text-sm font-medium">{perm.label}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Expiration Date */}
                  <div className="space-y-2">
                    <Label htmlFor="expiration">Expiration Date (Optional)</Label>
                    <Input
                      id="expiration"
                      type="date"
                      value={expirationDate}
                      onChange={(e) => setExpirationDate(e.target.value)}
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Message (Optional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Add a message for the recipient..."
                      value={accessMessage}
                      onChange={(e) => setAccessMessage(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Notify Recipient</Label>
                      <div className="text-xs text-muted-foreground">
                        Send notification about granted access
                      </div>
                    </div>
                    <Switch
                      checked={notifyRecipient}
                      onCheckedChange={setNotifyRecipient}
                    />
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleGrantAccess} 
                      className="flex-1"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Grant Access
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Files List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Your Files
                </CardTitle>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search files..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredFiles.map((file) => {
                    const IconComponent = getFileIcon(file.type);
                    return (
                      <div key={file.id} className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <IconComponent className="w-8 h-8 text-primary flex-shrink-0" />
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-medium truncate">{file.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)} • {file.accessCount} access grants
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          {file.shared && (
                            <Badge variant="secondary" className="text-xs">
                              <Users className="w-3 h-3 mr-1" />
                              Shared
                            </Badge>
                          )}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Plus className="w-4 h-4 mr-1" />
                                Grant
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Grant Access to {file.name}</DialogTitle>
                                <DialogDescription>
                                  Configure access permissions for this file
                                </DialogDescription>
                              </DialogHeader>
                              {/* Same form content as main dialog but for single file */}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Statistics */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Key className="w-5 h-5 mr-2 text-primary" />
                  Access Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {accessGrants.filter(g => g.status === 'active').length}
                      </div>
                      <div className="text-xs text-muted-foreground">Active Grants</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">
                        {files.filter(f => f.shared).length}
                      </div>
                      <div className="text-xs text-muted-foreground">Shared Files</div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Access Grants</span>
                      <span className="font-medium">{accessGrants.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Expired Grants</span>
                      <span className="font-medium">
                        {accessGrants.filter(g => g.status === 'expired').length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Access Grants */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Recent Grants
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessGrants.slice(0, 3).map((grant) => (
                    <div key={grant.id} className="p-3 border border-border/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium truncate">
                            {grant.recipientName || grant.recipientAddress}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {grant.fileName}
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 ml-2">
                          {grant.status === 'active' ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-2">
                        {grant.permissions.map((permission) => {
                          const IconComponent = getPermissionIcon(permission);
                          return (
                            <Badge key={permission} variant="secondary" className="text-xs">
                              <IconComponent className="w-3 h-3 mr-1" />
                              {permission}
                            </Badge>
                          );
                        })}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          Granted {grant.grantedDate}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => revokeAccess(grant.id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GrantAccess;