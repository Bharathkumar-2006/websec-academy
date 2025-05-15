
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Award, Clock, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress"; 

interface ProgressStatsProps {
  completedLabs: number;
  totalLabs: number;
  earnedBadges: number;
  totalHours: number;
  currentStreak: number;
}

const ProgressStats = ({ 
  completedLabs, 
  totalLabs, 
  earnedBadges, 
  totalHours, 
  currentStreak 
}: ProgressStatsProps) => {
  const completionPercentage = totalLabs > 0 ? Math.round((completedLabs / totalLabs) * 100) : 0;

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Your Progress</h3>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Lab Completion</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <p className="text-2xl font-bold">{completionPercentage}%</p>
            <p className="text-sm text-gray-500">{completedLabs} of {totalLabs} completed</p>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-websec-purple/10 p-2 mr-4">
                <Award className="h-5 w-5 text-websec-purple" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Badges Earned</p>
                <p className="text-xl font-bold">{earnedBadges}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-websec-purple/10 p-2 mr-4">
                <Clock className="h-5 w-5 text-websec-purple" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Hours</p>
                <p className="text-xl font-bold">{totalHours}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-websec-purple/10 p-2 mr-4">
                <CheckCircle className="h-5 w-5 text-websec-purple" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Labs Completed</p>
                <p className="text-xl font-bold">{completedLabs}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="rounded-full bg-websec-purple/10 p-2 mr-4">
                <TrendingUp className="h-5 w-5 text-websec-purple" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Streak</p>
                <p className="text-xl font-bold">{currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProgressStats;
