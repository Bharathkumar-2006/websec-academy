
import { useState } from "react";
import LearningPathCard from "@/components/learning/LearningPathCard";
import learningPaths, { LearningPath } from "@/data/learningPaths";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const LearningPathsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  
  const filteredPaths = learningPaths.filter((path) => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         path.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDifficulty = selectedDifficulty ? path.difficulty === selectedDifficulty : true;
    
    return matchesSearch && matchesDifficulty;
  });
  
  const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Learning Paths</h1>
        <p className="text-gray-600 max-w-3xl">
          Choose a structured learning path to master specific web security concepts.
          Each path includes comprehensive lessons, examples, and hands-on labs.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search learning paths..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedDifficulty === null ? "default" : "outline"}
            onClick={() => setSelectedDifficulty(null)}
            className={selectedDifficulty === null ? "bg-websec-purple hover:bg-websec-purple-dark" : ""}
          >
            All
          </Button>
          {difficultyOptions.map((difficulty) => (
            <Button
              key={difficulty}
              variant={selectedDifficulty === difficulty ? "default" : "outline"}
              onClick={() => setSelectedDifficulty(difficulty)}
              className={selectedDifficulty === difficulty ? "bg-websec-purple hover:bg-websec-purple-dark" : ""}
            >
              {difficulty}
            </Button>
          ))}
        </div>
      </div>
      
      {filteredPaths.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium mb-2">No learning paths found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPaths.map((path) => (
            <LearningPathCard key={path.id} path={path} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LearningPathsPage;
