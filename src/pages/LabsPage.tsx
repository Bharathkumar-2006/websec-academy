
import { useState } from "react";
import LabCard from "@/components/labs/LabCard";
import labs from "@/data/labs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const LabsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = Array.from(new Set(labs.map(lab => lab.category)));
  
  const filterLabs = (difficulty: string) => {
    return labs
      .filter(lab => lab.difficulty === difficulty)
      .filter(lab => {
        const matchesSearch = lab.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             lab.description.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesCategory = selectedCategory ? lab.category === selectedCategory : true;
        
        return matchesSearch && matchesCategory;
      });
  };
  
  const beginnerLabs = filterLabs("Beginner");
  const intermediateLabs = filterLabs("Intermediate");
  const advancedLabs = filterLabs("Advanced");
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Practice Labs</h1>
        <p className="text-gray-600 max-w-3xl">
          Apply your knowledge in our interactive labs. Each lab simulates a real-world vulnerability,
          allowing you to practice offensive and defensive security techniques in a safe environment.
        </p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search labs..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => setSelectedCategory(null)}
            className={selectedCategory === null ? "bg-websec-purple hover:bg-websec-purple-dark" : ""}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-websec-purple hover:bg-websec-purple-dark" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="beginner" className="space-y-6">
        <TabsList className="w-full border-b pb-px justify-start">
          <TabsTrigger value="beginner" className="data-[state=active]:text-websec-purple data-[state=active]:border-websec-purple">
            Beginner
          </TabsTrigger>
          <TabsTrigger value="intermediate" className="data-[state=active]:text-websec-purple data-[state=active]:border-websec-purple">
            Intermediate
          </TabsTrigger>
          <TabsTrigger value="advanced" className="data-[state=active]:text-websec-purple data-[state=active]:border-websec-purple">
            Advanced
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="beginner" className="pt-4">
          {beginnerLabs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No labs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beginnerLabs.map(lab => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="intermediate" className="pt-4">
          {intermediateLabs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No labs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {intermediateLabs.map(lab => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="advanced" className="pt-4">
          {advancedLabs.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No labs found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advancedLabs.map(lab => (
                <LabCard key={lab.id} lab={lab} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LabsPage;
