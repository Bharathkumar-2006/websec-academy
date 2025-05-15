
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge"; 
import { formatDate } from "@/utils/formatDate"; 
import { Lab } from "@/data/labs";
import { completeLabProgress } from "@/utils/dataUtils";
import { useToast } from "@/hooks/use-toast";

interface CompletedLabProps {
  labs: { lab: Lab; completedDate: Date }[];
}

const CompletedLabs = ({ labs }: CompletedLabProps) => {
  const { toast } = useToast();

  const handleMarkLabAsCompleted = async (labId: string) => {
    try {
      const success = await completeLabProgress(labId);
      
      if (success) {
        toast({
          title: "Success",
          description: "Lab completion status updated.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to update lab completion status.",
          variant: "destructive",
        });
      }
    } catch (err) {
      console.error("Error updating lab completion:", err);
      toast({
        title: "Error",
        description: "Failed to update lab completion status.",
        variant: "destructive",
      });
    }
  };

  if (labs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">
            You haven't completed any labs yet. Start learning and practicing!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Completed Labs</h3>

      <div className="space-y-3">
        {[...labs]
          .sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime())
          .map(({ lab, completedDate }) => (
            <Card key={lab.id} className="hover:shadow-md transition-all duration-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <h4 className="font-medium">{lab.title}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
                          {lab.category}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          Completed {formatDate(completedDate.toString())}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CompletedLabs;
