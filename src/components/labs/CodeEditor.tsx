
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, RotateCw } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  placeholder?: string;
  onExecute?: (code: string) => void;
}

const CodeEditor = ({
  initialCode = "",
  language = "javascript",
  placeholder = "// Write your code here",
  onExecute
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setOutput("Executing...");
    
    // Simulate code execution
    setTimeout(() => {
      if (onExecute) {
        onExecute(code);
      }
      
      // For demo purposes
      if (code.includes("<script>") && code.includes("alert")) {
        setOutput("XSS vulnerability successfully exploited! Alert dialog would appear in a real scenario.");
      } else if (code.includes("' OR '1'='1")) {
        setOutput("SQL Injection successful! Authentication bypassed.");
      } else if (code.trim() === "") {
        setOutput("Error: No code to execute.");
      } else {
        setOutput("Executed. Check if your payload was successful.");
      }
      
      setIsExecuting(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput(null);
  };

  return (
    <Card className="mb-4 border border-gray-200">
      <div className="bg-gray-800 text-gray-200 px-4 py-2 text-sm flex items-center justify-between rounded-t-md">
        <div className="flex items-center">
          <span className="mr-2 font-mono">{language}</span>
        </div>
        <div className="flex space-x-1">
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
        </div>
      </div>
      <CardContent className="p-0">
        <textarea
          className="w-full h-48 p-4 font-mono text-sm bg-gray-900 text-gray-100 focus:outline-none resize-none"
          value={code}
          onChange={handleCodeChange}
          placeholder={placeholder}
        />
        {output && (
          <div className="border-t border-gray-700 p-4 bg-gray-800 text-gray-200 font-mono text-sm">
            <div className="text-gray-400 mb-1">Output:</div>
            <div className="whitespace-pre-wrap">{output}</div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between p-3 bg-gray-800 rounded-b-md">
        <Button
          variant="outline"
          size="sm"
          onClick={resetCode}
          className="border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <RotateCw className="h-3.5 w-3.5 mr-1" />
          Reset
        </Button>
        <Button
          onClick={handleExecute}
          className="bg-websec-purple hover:bg-websec-purple-dark"
          disabled={isExecuting}
          size="sm"
        >
          <Play className="h-3.5 w-3.5 mr-1" />
          {isExecuting ? "Executing..." : "Run Code"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CodeEditor;
