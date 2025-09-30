import { useState, useRef } from "react";
import Navigation from "@/components/navigation/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Upload, 
  FileText, 
  Image, 
  Video, 
  Music, 
  Archive, 
  X, 
  Check,
  CloudUpload,
  FolderOpen,
  Shield,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  file: File;
  id: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  preview?: string;
}

const UploadNew = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadCategory, setUploadCategory] = useState("");
  const [uploadDescription, setUploadDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType.startsWith('video/')) return Video;
    if (fileType.startsWith('audio/')) return Music;
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('archive')) return Archive;
    return FileText;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generatePreview = (file: File): Promise<string | undefined> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        resolve(undefined);
      }
    });
  };

  const handleFileSelect = async (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const preview = await generatePreview(file);
      
      newFiles.push({
        file,
        id: Math.random().toString(36).substring(7),
        progress: 0,
        status: 'uploading',
        preview
      });
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadedFile, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, progress: 100, status: 'completed' }
              : f
          )
        );
      }, 2000 + index * 500);
    });

    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) uploaded successfully.`,
    });
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== id));
    toast({
      title: "File removed",
      description: "File has been removed from upload queue.",
    });
  };

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
    handleFileSelect(e.dataTransfer.files);
  };

  const handleUploadComplete = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files to upload",
        description: "Please select files before uploading.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Upload completed",
      description: `${uploadedFiles.length} file(s) have been uploaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8 max-w-6xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Upload New Files</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Securely upload and manage your files with blockchain storage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CloudUpload className="w-5 h-5 mr-2 text-primary" />
                  File Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-xl p-8 md:p-12 text-center transition-all cursor-pointer ${
                    isDragOver 
                      ? 'border-primary bg-primary/10' 
                      : 'border-border/50 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileSelect(e.target.files)}
                    accept="*/*"
                  />
                  
                  <CloudUpload className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <div className="text-lg font-medium mb-2">
                    Drop files here or click to browse
                  </div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Support for all file types up to 100MB per file
                  </div>
                  <Button variant="outline" size="sm">
                    <FolderOpen className="w-4 h-4 mr-2" />
                    Browse Files
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upload Queue */}
            {uploadedFiles.length > 0 && (
              <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-lg">
                    <div className="flex items-center">
                      <Upload className="w-5 h-5 mr-2 text-primary" />
                      Upload Queue ({uploadedFiles.length})
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleUploadComplete}
                      disabled={uploadedFiles.some(f => f.status === 'uploading')}
                    >
                      Complete Upload
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {uploadedFiles.map((uploadedFile) => {
                      const IconComponent = getFileIcon(uploadedFile.file.type);
                      
                      return (
                        <div key={uploadedFile.id} className="border border-border/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            {uploadedFile.preview ? (
                              <img 
                                src={uploadedFile.preview} 
                                alt="Preview" 
                                className="w-12 h-12 object-cover rounded border"
                              />
                            ) : (
                              <IconComponent className="w-12 h-12 text-primary flex-shrink-0" />
                            )}
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium truncate">
                                    {uploadedFile.file.name}
                                  </div>
                                  <div className="text-xs text-muted-foreground">
                                    {formatFileSize(uploadedFile.file.size)} • {uploadedFile.file.type || 'Unknown type'}
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2 ml-2">
                                  {uploadedFile.status === 'completed' && (
                                    <Badge variant="default" className="text-xs">
                                      <Check className="w-3 h-3 mr-1" />
                                      Complete
                                    </Badge>
                                  )}
                                  {uploadedFile.status === 'uploading' && (
                                    <Badge variant="secondary" className="text-xs">
                                      <Clock className="w-3 h-3 mr-1" />
                                      Uploading
                                    </Badge>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(uploadedFile.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Progress</span>
                                  <span>{Math.round(uploadedFile.progress)}%</span>
                                </div>
                                <Progress value={uploadedFile.progress} className="h-2" />
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Upload Settings */}
          <div className="space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Shield className="w-5 h-5 mr-2 text-primary" />
                  Upload Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={uploadCategory} onValueChange={setUploadCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="images">Images</SelectItem>
                      <SelectItem value="videos">Videos</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="archives">Archives</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Add a description for your files..."
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">Privacy Setting</Label>
                      <div className="text-xs text-muted-foreground">
                        Choose who can access your files
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    <div 
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        isPrivate 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setIsPrivate(true)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Private</div>
                          <div className="text-xs text-muted-foreground">Only you can access</div>
                        </div>
                        {isPrivate && <Badge variant="default" className="text-xs">Selected</Badge>}
                      </div>
                    </div>
                    
                    <div 
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                        !isPrivate 
                          ? "border-primary bg-primary/10" 
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setIsPrivate(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm font-medium">Public</div>
                          <div className="text-xs text-muted-foreground">Anyone can view</div>
                        </div>
                        {!isPrivate && <Badge variant="default" className="text-xs">Selected</Badge>}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Upload Stats */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">
                      {uploadedFiles.filter(f => f.status === 'completed').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Files Uploaded</div>
                  </div>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-lg font-semibold">
                        {uploadedFiles.length}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Files</div>
                    </div>
                    <div>
                      <div className="text-lg font-semibold">
                        {formatFileSize(uploadedFiles.reduce((acc, f) => acc + f.file.size, 0))}
                      </div>
                      <div className="text-xs text-muted-foreground">Total Size</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UploadNew;