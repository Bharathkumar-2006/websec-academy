import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-websec-purple-bg to-white">
      <div className="container mx-auto px-4 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-websec-dark">
              Learn Web Security <span className="text-websec-purple">Hands-On</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Master web security through interactive labs and structured learning paths. Practice exploits safely in our sandbox environment.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/learning-paths">
                <Button size="lg" className="bg-websec-purple hover:bg-websec-purple-dark text-white">
                  Start Learning
                </Button>
              </Link>
              <Link to="/labs">
                <Button size="lg" variant="outline" className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white">
                  Explore Labs
                </Button>
              </Link>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>No prior experience needed. Learn at your own pace.</span>
            </div>
          </div>

          <div className="relative hidden md:block">
            <div className="absolute inset-0 bg-websec-purple rounded-lg opacity-5 animate-float"></div>
            <div className="relative bg-white shadow-lg rounded-lg p-6 transform rotate-2 animate-float">
              <div className="bg-gray-100 rounded-md p-4 font-mono text-sm">
                <div className="flex items-center mb-2">
                  <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div className="text-gray-800">
                  <span className="text-blue-600">$</span> <span className="text-green-600">curl</span> -X POST https://api.example.com/login<br />
                  <span className="text-red-600">-d</span> <span className="text-purple-600">{'{"username": "admin", "password": "' }<span className="text-websec-purple font-semibold">OR 1=1 --</span>{'}"'}</span><br />
                  <span className="text-gray-600"># Executing SQL injection...</span><br />
                  <span className="text-websec-purple">Authentication bypass successful!</span><br />
                  <span className="text-blue-600">$</span> <span className="animate-pulse">█</span>
                </div>
              </div>
            </div>
            <div className="absolute top-1/2 right-0 transform translate-x-1/4 -translate-y-1/2 bg-white shadow-lg rounded-lg p-4 -rotate-3 animate-float" style={{animationDelay: "0.5s"}}>
              <div className="font-mono text-sm">
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded mb-2 text-xs">
                  VULNERABILITY DETECTED
                </div>
                <div className="text-gray-800">
                  <span className="text-websec-purple font-semibold">SQL Injection</span> in login form <br />
                  <span className="text-gray-600">Severity: High</span><br />
                  <span className="text-gray-600">Impact: Authentication Bypass</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
