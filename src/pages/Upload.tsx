import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload as UploadIcon, 
  FileText,
  Globe,
  Lock,
  Shield,
  Clock,
  Zap,
  X,
  Check,
  AlertCircle,
  Image,
  Film,
  Music,
  Archive
} from "lucide-react";
import { useState, useRef, useCallback } from "react";

interface UploadedFile {
  id: string;
  file: File;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [encryptionEnabled, setEncryptionEnabled] = useState(true);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (file: File) => {
    const type = file.type;
    if (type.startsWith('image/')) return <Image className="w-4 h-4" />;
    if (type.startsWith('video/')) return <Film className="w-4 h-4" />;
    if (type.startsWith('audio/')) return <Music className="w-4 h-4" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-4 h-4" />;
    return <FileText className="w-4 h-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const validateFile = (file: File) => {
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      alert(`File ${file.name} is too large. Maximum size is 20MB.`);
      return false;
    }
    return true;
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
        ));
        setIsUploading(false);
      } else {
        setUploadedFiles(prev => prev.map(f => 
          f.id === fileId ? { ...f, progress } : f
        ));
      }
    }, 200);
  };

  const handleFiles = useCallback((files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter(validateFile);
    
    if (validFiles.length === 0) return;

    setIsUploading(true);
    
    validFiles.forEach((file) => {
      const fileId = Date.now() + Math.random().toString();
      const newFile: UploadedFile = {
        id: fileId,
        file,
        progress: 0,
        status: 'uploading'
      };

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, preview: e.target?.result as string } : f
          ));
        };
        reader.readAsDataURL(file);
      }

      setUploadedFiles(prev => [...prev, newFile]);
      simulateUpload(fileId);
    });
  }, []);

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
    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Upload Files</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Securely upload and share your files on the blockchain
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Upload Area */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6">
                  <div
                    className={`border-2 border-dashed rounded-lg p-4 md:p-8 text-center transition-all duration-300 cursor-pointer group ${
                      isDragOver 
                        ? "border-primary bg-primary/20 scale-105 shadow-glow" 
                        : "border-border hover:border-primary/50 hover:bg-primary/5 hover:scale-102"
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={handleFileSelect}
                  >
                    <div className={`w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 ${
                      isDragOver ? 'animate-bounce' : 'group-hover:scale-110'
                    }`}>
                      <UploadIcon className={`w-8 h-8 text-primary-foreground transition-all duration-300 ${
                        isDragOver ? 'animate-pulse' : ''
                      }`} />
                    </div>
                    <h3 className="text-lg md:text-xl font-semibold mb-2">
                      {isDragOver ? 'Drop files here!' : 'Drop files here'}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm md:text-base">
                      or click to browse from your device
                    </p>
                    <Button 
                      variant="outline" 
                      className="hover:bg-primary/10 hover:border-primary/40 transition-all duration-300"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Browse Files
                    </Button>
                    <div className="mt-4 text-sm text-muted-foreground">
                      Maximum file size: 20MB • Supported formats: All types
                    </div>
                  </div>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileInputChange}
                    accept="*/*"
                  />
                </CardContent>
              </Card>

              {/* Uploaded Files List */}
              {uploadedFiles.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Uploaded Files ({uploadedFiles.length})</span>
                      {isUploading && (
                        <Badge variant="outline" className="animate-pulse">
                          <Clock className="w-3 h-3 mr-1" />
                          Uploading...
                        </Badge>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {uploadedFiles.map((uploadedFile) => (
                      <div key={uploadedFile.id} className="flex items-center space-x-4 p-3 bg-background/50 rounded-lg border border-border/50">
                        <div className="flex-shrink-0">
                          {uploadedFile.preview ? (
                            <div className="w-12 h-12 rounded-lg overflow-hidden border border-border/30">
                              <img 
                                src={uploadedFile.preview} 
                                alt={uploadedFile.file.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                              {getFileIcon(uploadedFile.file)}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                          <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</p>
                          
                          {uploadedFile.status === 'uploading' && (
                            <div className="mt-2">
                              <Progress value={uploadedFile.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">
                                {Math.round(uploadedFile.progress)}% uploaded
                              </p>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-shrink-0 flex items-center space-x-2">
                          {uploadedFile.status === 'completed' && (
                            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                          {uploadedFile.status === 'error' && (
                            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                              <AlertCircle className="w-4 h-4 text-white" />
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(uploadedFile.id)}
                            className="w-6 h-6 p-0 hover:bg-red-500/20 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

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
            <div className="space-y-4 md:space-y-6">
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

              <Button 
                className={`w-full transition-all duration-300 ${
                  uploadedFiles.length > 0 && uploadedFiles.every(f => f.status === 'completed')
                    ? "bg-gradient-primary hover:bg-gradient-primary/90 text-primary-foreground shadow-glow hover:shadow-glow/80 hover:scale-105"
                    : "bg-secondary/50 hover:bg-secondary/60"
                }`}
                size="lg"
                disabled={uploadedFiles.length === 0 || isUploading || !uploadedFiles.every(f => f.status === 'completed')}
              >
                <UploadIcon className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload to Blockchain"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;