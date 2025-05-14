
import { useParams, Link } from "react-router-dom";
import { getLabById } from "@/utils/dataUtils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Clock, Target, CheckCircle } from "lucide-react";
import CodeEditor from "@/components/labs/CodeEditor";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const LabDetailPage = () => {
  const { labId } = useParams<{ labId: string }>();
  const { toast } = useToast();
  const lab = labId ? getLabById(labId) : undefined;
  const [isLaunched, setIsLaunched] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  
  if (!lab) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-6">
          <Link to="/labs" className="inline-flex items-center text-websec-purple hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Labs
          </Link>
        </div>
        <div className="text-center py-16">
          <h1 className="text-2xl font-bold mb-4">Lab Not Found</h1>
          <p className="text-gray-600 mb-8">The lab you're looking for doesn't exist or has been removed.</p>
          <Button asChild className="bg-websec-purple hover:bg-websec-purple-dark">
            <Link to="/labs">Browse All Labs</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const handleLaunch = () => {
    setIsLaunched(true);
    toast({
      title: "Lab Launched",
      description: "The lab environment is now ready for you to start hacking!",
    });
  };
  
  const handleExecute = (code: string) => {
    if (code.includes(lab.title.toLowerCase().includes("xss") ? "<script>" : "' OR '1'='1")) {
      if (!isCompleted) {
        setIsCompleted(true);
        toast({
          title: "Congratulations!",
          description: "You've successfully completed this lab!",
        });
      }
    }
  };
  
  // Generate a difficulty badge
  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return <Badge className="bg-green-100 text-green-800">Beginner</Badge>;
      case 'Intermediate':
        return <Badge className="bg-yellow-100 text-yellow-800">Intermediate</Badge>;
      case 'Advanced':
        return <Badge className="bg-red-100 text-red-800">Advanced</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-6">
        <Link to="/labs" className="inline-flex items-center text-websec-purple hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Labs
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className="bg-purple-100 text-purple-800">{lab.category}</Badge>
              {getDifficultyBadge(lab.difficulty)}
              <div className="flex items-center text-sm text-gray-600 ml-auto">
                <Clock className="h-4 w-4 mr-1" />
                <span>Estimated time: {lab.completionTime} mins</span>
              </div>
            </div>
            
            <h1 className="text-3xl font-bold mb-4">{lab.title}</h1>
            <p className="text-lg text-gray-600 mb-6">{lab.description}</p>
            
            <div className="flex items-start mb-6">
              <div className="p-2 rounded-full bg-websec-purple/10 mr-3">
                <Target className="h-5 w-5 text-websec-purple" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Objective</h3>
                <p className="text-gray-600">{lab.objective}</p>
              </div>
            </div>
            
            {isCompleted ? (
              <div className="flex items-center p-4 bg-green-50 text-green-800 rounded-md mb-6">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-medium">You've successfully completed this lab!</span>
              </div>
            ) : (
              !isLaunched ? (
                <Button 
                  size="lg"
                  className="bg-websec-purple hover:bg-websec-purple-dark"
                  onClick={handleLaunch}
                >
                  Launch Lab
                </Button>
              ) : null
            )}
          </div>
          
          {isLaunched && (
            <>
              <Separator className="my-8" />
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Lab Environment</h2>
                <p className="text-gray-600 mb-6">
                  Use the code editor below to test and exploit the vulnerability. Try to craft a payload that will achieve the lab's objective.
                </p>
                
                <CodeEditor 
                  initialCode={
                    lab.category === 'Cross-Site Scripting' 
                      ? '// Try injecting a script tag\n' 
                      : lab.category === 'SQL Injection'
                      ? "// Try modifying the SQL query with ' OR '1'='1\n"
                      : '// Write your exploit code here\n'
                  }
                  language={
                    lab.category === 'Cross-Site Scripting' ? 'html' : 
                    lab.category === 'SQL Injection' ? 'sql' : 'javascript'
                  }
                  onExecute={handleExecute}
                />
                
                <Card className="mb-6">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Hint</h3>
                    <p className="text-sm text-gray-600">
                      {lab.category === 'Cross-Site Scripting' 
                        ? 'Think about how you can insert JavaScript that executes when the page loads. The <script> tag is a good starting point.' 
                        : lab.category === 'SQL Injection'
                        ? "The login form likely has a query like: SELECT * FROM users WHERE username='$username' AND password='$password'"
                        : 'Look carefully at how the application processes your input.'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
        
        <div className="lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Related Topics</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {lab.topics.map((topic, index) => (
                  <Badge key={index} variant="outline" className="bg-gray-50">
                    {topic}
                  </Badge>
                ))}
              </div>
              
              <h3 className="font-semibold text-lg mb-4">Recommended Resources</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="flex items-center text-websec-purple hover:underline">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    Understanding {lab.category} - Beginner's Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-websec-purple hover:underline">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    OWASP Guide on {lab.category}
                  </a>
                </li>
                <li>
                  <a href="#" className="flex items-center text-websec-purple hover:underline">
                    <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Mitigation Strategies for {lab.category}
                  </a>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LabDetailPage;
