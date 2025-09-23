import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Share2, 
  MoreVertical, 
  FileText, 
  Image, 
  Video,
  Archive,
  Lock,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileCardProps {
  name: string;
  size: string;
  type: "document" | "image" | "video" | "archive";
  uploadDate: string;
  isShared: boolean;
  isPublic: boolean;
  shares?: number;
  className?: string;
}

const getFileIcon = (type: string) => {
  switch (type) {
    case "image": return Image;
    case "video": return Video;
    case "archive": return Archive;
    default: return FileText;
  }
};

const FileCard = ({ 
  name, 
  size, 
  type, 
  uploadDate, 
  isShared, 
  isPublic, 
  shares = 0,
  className 
}: FileCardProps) => {
  const FileIcon = getFileIcon(type);
  
  return (
    <Card className={cn(
      "group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]",
      className
    )}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-secondary rounded-lg">
              <FileIcon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate">{name}</h3>
              <p className="text-sm text-muted-foreground">{size}</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            {isPublic ? (
              <Badge variant="secondary" className="text-xs">
                <Globe className="w-3 h-3 mr-1" />
                Public
              </Badge>
            ) : (
              <Badge variant="outline" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Private
              </Badge>
            )}
            {isShared && (
              <Badge variant="default" className="text-xs bg-primary/20 text-primary border-primary/30">
                {shares} shares
              </Badge>
            )}
          </div>
          <span className="text-xs text-muted-foreground">{uploadDate}</span>
        </div>
        
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="default">
            <Share2 className="w-4 h-4 mr-1" />
            Share
          </Button>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-accent/5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
      </CardContent>
    </Card>
  );
};

export default FileCard;