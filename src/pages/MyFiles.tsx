import Navigation from "@/components/navigation/Navigation";
import FileCard from "@/components/files/FileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List,
  SortAsc,
  Upload,
  Files,
  Share2,
  Lock
} from "lucide-react";
import { useState } from "react";

const MyFiles = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const files = [
    {
      name: "Blockchain_Whitepaper.pdf",
      size: "3.2 MB",
      type: "document" as const,
      uploadDate: "Today",
      isShared: true,
      isPublic: false,
      shares: 12
    },
    {
      name: "Smart_Contract_Code.sol",
      size: "156 KB",
      type: "document" as const,
      uploadDate: "Yesterday",
      isShared: false,
      isPublic: false,
      shares: 0
    },
    {
      name: "DeFi_Presentation.pptx",
      size: "24.8 MB",
      type: "document" as const,
      uploadDate: "2 days ago",
      isShared: true,
      isPublic: true,
      shares: 8
    },
    {
      name: "NFT_Collection.zip",
      size: "128 MB",
      type: "archive" as const,
      uploadDate: "1 week ago",
      isShared: false,
      isPublic: false,
      shares: 0
    },
    {
      name: "Crypto_Charts.png",
      size: "2.1 MB",
      type: "image" as const,
      uploadDate: "2 weeks ago",
      isShared: true,
      isPublic: true,
      shares: 25
    },
    {
      name: "Token_Metrics.xlsx",
      size: "890 KB",
      type: "document" as const,
      uploadDate: "3 weeks ago",
      isShared: false,
      isPublic: false,
      shares: 0
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Files</h1>
            <p className="text-muted-foreground">
              Manage and organize your uploaded files
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <Upload className="w-4 h-4 mr-2" />
            Upload New
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Files className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{files.length}</div>
              <div className="text-sm text-muted-foreground">Total Files</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Share2 className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Shared Files</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Lock className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">3</div>
              <div className="text-sm text-muted-foreground">Private Files</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <div className="text-lg font-bold text-foreground">162 MB</div>
              <div className="text-sm text-muted-foreground">Total Size</div>
              <div className="w-full bg-secondary rounded-full h-1 mt-2">
                <div className="bg-gradient-primary h-1 rounded-full" style={{ width: '16%' }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search files..." 
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <SortAsc className="w-4 h-4 mr-2" />
                  Sort
                </Button>
              </div>
              
              <div className="flex items-center space-x-2">
                <Badge variant="outline">All Files</Badge>
                <div className="flex bg-secondary rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="h-8 w-8 p-0"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="h-8 w-8 p-0"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Files Grid */}
        <div className={`grid gap-6 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {files.map((file, index) => (
            <FileCard key={index} {...file} />
          ))}
        </div>

        {/* Empty State - Show when no files */}
        {files.length === 0 && (
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-gradient-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Files className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No files uploaded yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first file to get started with secure blockchain storage
              </p>
              <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
                <Upload className="w-4 h-4 mr-2" />
                Upload Your First File
              </Button>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default MyFiles;