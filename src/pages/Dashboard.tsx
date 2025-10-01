import Navigation from "../components/navigation/Navigation";
import StatsCard from "../components/dashboard/StatsCard";
import FileCard from "../components/files/FileCard";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  Upload, 
  Files, 
  Share2, 
  HardDrive, 
  Activity,
  TrendingUp,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("Current user:", user);
  
  const recentFiles = [
    {
      name: "Contract_Agreement.pdf",
      size: "2.4 MB",
      type: "document" as const,
      uploadDate: "2 hours ago",
      isShared: true,
      isPublic: false,
      shares: 3
    },
    {
      name: "Project_Presentation.pptx",
      size: "15.8 MB", 
      type: "document" as const,
      uploadDate: "1 day ago",
      isShared: false,
      isPublic: true,
      shares: 0
    },
    {
      name: "Team_Photo.jpg",
      size: "4.2 MB",
      type: "image" as const,
      uploadDate: "3 days ago",
      isShared: true,
      isPublic: false,
      shares: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 md:px-6 py-4 md:py-8">
        {user && (
          <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-4">
            <div className="font-semibold text-primary">Welcome, {user.displayName || user.email}!</div>
            <div className="text-xs text-muted-foreground">({user.email})</div>
          </div>
        )}
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              Manage your secure blockchain file storage
            </p>
          </div>
          <Button 
            className="bg-gradient-primary hover:opacity-90 transition-opacity w-full sm:w-auto"
            onClick={() => navigate('/upload')}
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Upload File</span>
            <span className="sm:hidden">Upload</span>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Files"
            value="24"
            icon={Files}
            trend="+12% from last month"
          />
          <StatsCard
            title="Storage Used"
            value="1.2 GB"
            icon={HardDrive}
            trend="of 10 GB available"
          />
          <StatsCard
            title="Shared Files"
            value="8"
            icon={Share2}
            trend="+3 this week"
          />
          <StatsCard
            title="Total Downloads"
            value="156"
            icon={TrendingUp}
            trend="+28% increase"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-lg md:text-xl font-semibold flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-primary" />
                  Recent Files
                </CardTitle>
                <Button variant="ghost" size="sm" className="w-full sm:w-auto">View All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentFiles.map((file, index) => (
                  <FileCard key={index} {...file} />
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4 md:space-y-6">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="text-base md:text-lg font-semibold">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 md:space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={() => navigate('/upload')}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New File
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={() => navigate('/shared')}
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share with Address
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start text-sm"
                  onClick={() => navigate('/my-files')}
                >
                  <Files className="w-4 h-4 mr-2" />
                  Browse Files
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-accent/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <HardDrive className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-2">Storage Status</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  You're using 12% of your available storage
                </p>
                <div className="w-full bg-secondary rounded-full h-2 mb-4">
                  <div className="bg-gradient-primary h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
                <Button variant="outline" size="sm">Upgrade Storage</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;