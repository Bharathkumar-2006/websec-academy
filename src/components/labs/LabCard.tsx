
import { Lab } from "@/data/labs";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Tag } from "lucide-react";


const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner':
      return 'bg-green-100 text-green-800';
    case 'Intermediate':
      return 'bg-yellow-100 text-yellow-800';
    case 'Advanced':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  const categoryMap: Record<string, string> = {
    'Cross-Site Scripting': 'bg-blue-100 text-blue-800',
    'SQL Injection': 'bg-green-100 text-green-800',
    'CSRF': 'bg-yellow-100 text-yellow-800',
    'SSRF': 'bg-orange-100 text-orange-800',
    'JWT Security': 'bg-indigo-100 text-indigo-800',
    'XXE': 'bg-purple-100 text-purple-800',
    'Insecure Deserialization': 'bg-red-100 text-red-800',
    'Authentication Flaws': 'bg-teal-100 text-teal-800',
  };

  return categoryMap[category] || 'bg-gray-100 text-gray-800';
};

interface LabCardProps {
  lab: Lab;
}

const LabCard = ({ lab }: LabCardProps) => {
  return (
    <Link to={`/labs/${lab.id}`}>
      <Card className="h-full hover:shadow-md transition-all duration-200 hover:-translate-y-1 cursor-pointer">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <Badge className={getCategoryColor(lab.category)}>
              {lab.category}
            </Badge>
            <Badge className={getDifficultyColor(lab.difficulty)}>
              {lab.difficulty}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2">{lab.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{lab.description}</p>
          <div className="flex flex-wrap gap-1 mb-2">
            {lab.topics.slice(0, 3).map((topic, index) => (
              <Badge key={index} variant="outline" className="bg-gray-50">
                {topic}
              </Badge>
            ))}
            {lab.topics.length > 3 && (
              <Badge variant="outline" className="bg-gray-50">
                +{lab.topics.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>

        <CardFooter className="px-6 py-3 border-t bg-gray-50 flex items-center">
          <Clock className="h-4 w-4 mr-1 text-gray-500" />
          <span className="text-sm text-gray-600">
            {lab.completionTime} mins
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default LabCard;
