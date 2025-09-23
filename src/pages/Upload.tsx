import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Upload as UploadIcon, 
  FileText,
  Globe,
  Lock,
  Shield,
  Clock,
  Zap
} from "lucide-react";
import { useState } from "react";

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    // Handle file drop logic here
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Upload Files</h1>
            <p className="text-muted-foreground">
              Securely upload and share your files on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Upload Area */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                      isDragOver 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50 hover:bg-primary/5"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <UploadIcon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Drop files here</h3>
                    <p className="text-muted-foreground mb-4">
                      or click to browse from your device
                    </p>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Files
                    </Button>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Maximum file size: 100MB • Supported formats: All types
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* File Details */}
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle>File Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="filename">File Name</Label>
                    <Input 
                      id="filename" 
                      placeholder="Enter file name..."
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Add a description for your file..."
                      className="mt-2"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input 
                      id="tags" 
                      placeholder="blockchain, document, important..."
                      className="mt-2"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-primary" />
                    Security Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-medium">File Encryption</Label>
                      <p className="text-sm text-muted-foreground">
                        Encrypt file before upload
                      </p>
                    </div>
                    <Switch 
                      checked={encryptionEnabled}
                      onCheckedChange={setEncryptionEnabled}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="font-medium">Public Access</Label>
                      <p className="text-sm text-muted-foreground">
                        Anyone can access this file
                      </p>
                    </div>
                    <Switch 
                      checked={isPublic}
                      onCheckedChange={setIsPublic}
                    />
                  </div>

                  <div className="pt-2">
                    <Label className="font-medium mb-3 block">Access Level</Label>
                    <div className="space-y-2">
                      <Badge 
                        variant={isPublic ? "default" : "outline"} 
                        className="w-full justify-center py-2"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {isPublic ? "Public" : "Public (Disabled)"}
                      </Badge>
                      <Badge 
                        variant={!isPublic ? "default" : "outline"} 
                        className="w-full justify-center py-2"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        {!isPublic ? "Private" : "Private (Disabled)"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-accent/10 border-accent/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <Zap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Gas Estimation</h3>
                      <p className="text-sm text-muted-foreground">Network fee</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Upload Fee:</span>
                      <span className="font-medium">~0.002 ETH</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Storage Fee:</span>
                      <span className="font-medium">~0.001 ETH</span>
                    </div>
                    <div className="border-t border-border/50 pt-2">
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span className="text-primary">~0.003 ETH</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full bg-gradient-primary hover:opacity-90 transition-opacity" size="lg">
                <UploadIcon className="w-4 h-4 mr-2" />
                Upload to Blockchain
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;