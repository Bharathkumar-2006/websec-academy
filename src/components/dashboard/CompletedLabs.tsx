
import { Lab } from "@/data/labs";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface CompletedLabsProps {
  labs: {
    lab: Lab;
    completedDate: Date;
  }[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date);
};

const CompletedLabs = ({ labs }: CompletedLabsProps) => {
  // Sort labs by most recently completed
  const sortedLabs = [...labs].sort((a, b) => b.completedDate.getTime() - a.completedDate.getTime());

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Completed Labs</h3>
      
      {sortedLabs.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-gray-500">You haven't completed any labs yet. Start learning and practicing!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {sortedLabs.map(({ lab, completedDate }) => (
            <Link to={`/labs/${lab.id}`} key={lab.id}>
              <Card className="hover:shadow-md transition-all duration-200">
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
                            Completed {formatDate(completedDate)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedLabs;
