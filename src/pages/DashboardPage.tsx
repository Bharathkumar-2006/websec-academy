
import { useState, useEffect } from "react";
import { getCompletedLabs, getUserProgress, type UserProgress } from "@/utils/dataUtils";
import ProgressStats from "@/components/dashboard/ProgressStats";
import CompletedLabs from "@/components/dashboard/CompletedLabs";
import labs from "@/data/labs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Lab } from "@/data/labs";

const DashboardPage = () => {
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [completedLabsData, setCompletedLabsData] = useState<{ lab: Lab; completedDate: Date }[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const progress = await getUserProgress();
        setUserProgress(progress);
        
        const completedLabs = await getCompletedLabs();
        setCompletedLabsData(completedLabs);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Recommended labs - just a simple example
  const recommendedLabs = labs
    .filter(lab => !userProgress?.completedLabs?.includes(lab.id))
    .slice(0, 3);
  
  if (loading) {
    return <div className="container mx-auto px-4 py-12">Loading dashboard data...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Your Dashboard</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressStats 
            completedLabs={userProgress?.completedLabs?.length || 0}
            totalLabs={labs.length}
            earnedBadges={userProgress?.earnedBadges?.length || 0}
            totalHours={userProgress?.totalHours || 0}
            currentStreak={userProgress?.currentStreak || 0}
          />
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Recommended Labs</CardTitle>
              <CardDescription>
                Continue your learning journey with these labs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedLabs.map(lab => (
                  <div key={lab.id} className="flex items-start">
                    <div className="bg-websec-purple/10 p-2 rounded mr-4">
                      <BookOpen className="h-5 w-5 text-websec-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-medium">{lab.title}</h4>
                        <Badge className={
                          lab.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                          lab.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }>
                          {lab.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{lab.description.substring(0, 100)}...</p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-websec-purple border-websec-purple hover:bg-websec-purple hover:text-white"
                        asChild
                      >
                        <Link to={`/labs/${lab.id}`}>Start Lab</Link>
                      </Button>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white mt-2"
                  asChild
                >
                  <Link to="/labs">Browse All Labs</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <CompletedLabs labs={completedLabsData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
