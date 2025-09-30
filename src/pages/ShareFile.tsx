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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Share2, 
  Upload, 
  Copy, 
  Users, 
  Globe, 
  Shield, 
  Clock,
  FileText,
  Image,
  Video,
  Download,
  UserPlus,
  Link as LinkIcon,
  QrCode,
  Calendar
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ShareFile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shareType, setShareType] = useState<"private" | "public">("private");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [newRecipient, setNewRecipient] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [downloadLimit, setDownloadLimit] = useState("");
  const [allowComments, setAllowComments] = useState(false);
  const [shareLink, setShareLink] = useState("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const addRecipient = () => {
    if (newRecipient.trim() && !recipients.includes(newRecipient.trim())) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (address: string) => {
    setRecipients(recipients.filter(r => r !== address));
  };

  const generateShareLink = () => {
    const link = `https://blockshare.app/file/${Math.random().toString(36).substring(7)}`;
    setShareLink(link);
    toast({
      title: "Share link generated",
      description: "Your file share link is ready to be copied.",
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The share link has been copied to your clipboard.",
    });
  };

  const handleShare = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to share.",
        variant: "destructive",
      });
      return;
    }

    if (shareType === "private" && recipients.length === 0) {
      toast({
        title: "No recipients",
        description: "Please add at least one recipient for private sharing.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "File shared successfully",
      description: `${selectedFile.name} has been shared with ${shareType === "public" ? "everyone" : `${recipients.length} recipient(s)`}.`,
    });
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType.startsWith('video/')) return Video;
    return FileText;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Share File</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Securely share your files with others using blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* File Selection & Upload */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Upload className="w-5 h-5 mr-2 text-primary" />
                  Select File to Share
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <div className="text-sm font-medium mb-2">Click to select a file</div>
                    <div className="text-xs text-muted-foreground">
                      Support for all file types up to 100MB
                    </div>
                  </label>
                </div>

                {selectedFile && (
                  <div className="flex items-center space-x-3 p-4 bg-secondary/50 rounded-lg animate-fade-in">
                    {(() => {
                      const IconComponent = getFileIcon(selectedFile.type);
                      return <IconComponent className="w-8 h-8 text-primary" />;
                    })()}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{selectedFile.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB • {selectedFile.type}
                      </div>
                    </div>
                    <Badge variant="secondary">Ready</Badge>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Share Type Selection */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Share Type
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      shareType === "private" 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setShareType("private")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Users className="w-5 h-5 text-primary" />
                      {shareType === "private" && <Badge variant="default" className="text-xs">Selected</Badge>}
                    </div>
                    <div className="text-sm font-medium">Private Share</div>
                    <div className="text-xs text-muted-foreground">
                      Share with specific wallet addresses
                    </div>
                  </div>

                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      shareType === "public" 
                        ? "border-primary bg-primary/10" 
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setShareType("public")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Globe className="w-5 h-5 text-primary" />
                      {shareType === "public" && <Badge variant="default" className="text-xs">Selected</Badge>}
                    </div>
                    <div className="text-sm font-medium">Public Share</div>
                    <div className="text-xs text-muted-foreground">
                      Anyone with the link can access
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Share Configuration */}
          <div className="space-y-6">
            {/* Recipients (for private sharing) */}
            {shareType === "private" && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <UserPlus className="w-5 h-5 mr-2 text-primary" />
                    Recipients
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                      placeholder="Enter wallet address (0x...)"
                      value={newRecipient}
                      onChange={(e) => setNewRecipient(e.target.value)}
                      className="flex-1"
                    />
                    <Button onClick={addRecipient} size="sm" className="w-full sm:w-auto">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {recipients.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Recipients ({recipients.length})</Label>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {recipients.map((address, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary/50 rounded">
                            <span className="text-sm font-mono truncate">{address}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeRecipient(address)}
                              className="text-destructive hover:text-destructive"
                            >
                              ×
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Share Settings */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Share Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="message">Share Message (Optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Add a message for recipients..."
                    value={shareMessage}
                    onChange={(e) => setShareMessage(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Label htmlFor="expiration">Expiration Date</Label>
                      <Input
                        id="expiration"
                        type="date"
                        value={expirationDate}
                        onChange={(e) => setExpirationDate(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor="downloads">Download Limit</Label>
                      <Select value={downloadLimit} onValueChange={setDownloadLimit}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="No limit" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unlimited">No limit</SelectItem>
                          <SelectItem value="1">1 download</SelectItem>
                          <SelectItem value="5">5 downloads</SelectItem>
                          <SelectItem value="10">10 downloads</SelectItem>
                          <SelectItem value="25">25 downloads</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Allow Comments</Label>
                      <div className="text-xs text-muted-foreground">
                        Let recipients add comments to the file
                      </div>
                    </div>
                    <Switch
                      checked={allowComments}
                      onCheckedChange={setAllowComments}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Share Actions */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button 
                    onClick={handleShare} 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
                    disabled={!selectedFile}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Share File
                  </Button>

                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">or</span>
                  </div>

                  <Button 
                    onClick={generateShareLink} 
                    variant="outline" 
                    className="w-full"
                    disabled={!selectedFile}
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    Generate Share Link
                  </Button>

                  <div className="text-center">
                    <span className="text-xs text-muted-foreground">or</span>
                  </div>

                  <Button 
                    onClick={() => navigate('/upload')} 
                    variant="secondary" 
                    className="w-full"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Go to Upload Page
                  </Button>

                  {shareLink && (
                    <div className="p-3 bg-secondary/50 rounded-lg animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="text-xs text-muted-foreground mb-1">Share Link</div>
                          <div className="text-sm font-mono truncate">{shareLink}</div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(shareLink)}
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShareFile;