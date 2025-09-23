import Navigation from "@/components/navigation/Navigation";
import FileCard from "@/components/files/FileCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Share2, 
  Download, 
  Clock,
  Shield,
  Users,
  Eye,
  UserPlus
} from "lucide-react";

const SharedFiles = () => {
  const sharedWithMe = [
    {
      name: "Team_Roadmap_2024.pdf",
      size: "1.8 MB",
      type: "document" as const,
      uploadDate: "Shared 2 hours ago",
      isShared: true,
      isPublic: false,
      shares: 1,
      sharedBy: "0x1234...abcd"
    },
    {
      name: "Project_Budget.xlsx",
      size: "756 KB",
      type: "document" as const,
      uploadDate: "Shared yesterday",
      isShared: true,
      isPublic: false,
      shares: 1,
      sharedBy: "0x5678...efgh"
    },
    {
      name: "Logo_Design_Final.png",
      size: "2.3 MB",
      type: "image" as const,
      uploadDate: "Shared 3 days ago",
      isShared: true,
      isPublic: true,
      shares: 1,
      sharedBy: "0x9abc...ijkl"
    }
  ];

  const mySharedFiles = [
    {
      name: "API_Documentation.pdf",
      size: "4.2 MB",
      type: "document" as const,
      uploadDate: "Shared with 5 users",
      isShared: true,
      isPublic: false,
      shares: 5
    },
    {
      name: "Demo_Video.mp4",
      size: "45.8 MB",
      type: "video" as const,
      uploadDate: "Public share",
      isShared: true,
      isPublic: true,
      shares: 12
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Shared Files</h1>
            <p className="text-muted-foreground">
              Files shared with you and files you've shared with others
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90 transition-opacity">
            <UserPlus className="w-4 h-4 mr-2" />
            Share File
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Download className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{sharedWithMe.length}</div>
              <div className="text-sm text-muted-foreground">Shared With Me</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Share2 className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">{mySharedFiles.length}</div>
              <div className="text-sm text-muted-foreground">My Shared Files</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">17</div>
              <div className="text-sm text-muted-foreground">Total Recipients</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardContent className="p-4 text-center">
              <Eye className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold text-foreground">89</div>
              <div className="text-sm text-muted-foreground">Total Views</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Files Shared With Me */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Download className="w-5 h-5 mr-2 text-primary" />
                  Shared With Me
                </CardTitle>
                <Badge variant="secondary">{sharedWithMe.length} files</Badge>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search shared files..." 
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-4">
                  {sharedWithMe.map((file, index) => (
                    <div key={index} className="relative">
                      <FileCard {...file} />
                      <div className="absolute top-2 right-2">
                        <Badge variant="outline" className="text-xs">
                          From: {file.sharedBy}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {sharedWithMe.length === 0 && (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No files shared with you</h3>
                    <p className="text-sm text-muted-foreground">
                      Files shared with your wallet address will appear here
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* My Shared Files */}
          <div>
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold flex items-center">
                  <Share2 className="w-5 h-5 mr-2 text-primary" />
                  My Shared Files
                </CardTitle>
                <Badge variant="secondary">{mySharedFiles.length} files</Badge>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input 
                    placeholder="Search my shared files..." 
                    className="pl-10"
                  />
                </div>
                
                <div className="space-y-4">
                  {mySharedFiles.map((file, index) => (
                    <FileCard key={index} {...file} />
                  ))}
                </div>

                {mySharedFiles.length === 0 && (
                  <div className="text-center py-12">
                    <Share2 className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No shared files</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Share your files with others to see them here
                    </p>
                    <Button variant="outline" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share a File
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Team_Roadmap_2024.pdf was shared with you</p>
                  <p className="text-xs text-muted-foreground">by 0x1234...abcd • 2 hours ago</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">You shared Demo_Video.mp4 publicly</p>
                  <p className="text-xs text-muted-foreground">1 day ago • 5 new views</p>
                </div>
                <Badge variant="outline" className="text-xs">+5 views</Badge>
              </div>
              
              <div className="flex items-center space-x-4 p-4 bg-secondary/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Access granted to API_Documentation.pdf</p>
                  <p className="text-xs text-muted-foreground">to 0x9abc...ijkl • 2 days ago</p>
                </div>
                <Badge variant="outline" className="text-xs">New access</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SharedFiles;