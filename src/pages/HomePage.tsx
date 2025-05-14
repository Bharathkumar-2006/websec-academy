
import Hero from "@/components/home/Hero";
import FeatureSection from "@/components/home/FeatureSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, Award, ChevronRight } from "lucide-react";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      
      {/* Getting Started Section */}
      <div className="bg-websec-purple/5 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Getting Started with WebSecLearn</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our platform makes it easy to learn and practice web security concepts, 
              even if you're just beginning your cybersecurity journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4 bg-websec-purple-bg p-3 rounded-full">
                <BookOpen className="h-6 w-6 text-websec-purple" />
              </div>
              <h3 className="font-semibold text-lg mb-2">1. Choose a Learning Path</h3>
              <p className="text-gray-600 mb-4">
                Select a security topic that interests you and follow our structured learning path.
              </p>
              <Link to="/learning-paths" className="mt-auto">
                <Button variant="outline" className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white">
                  Browse Paths
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4 bg-websec-purple-bg p-3 rounded-full">
                <Code className="h-6 w-6 text-websec-purple" />
              </div>
              <h3 className="font-semibold text-lg mb-2">2. Practice with Labs</h3>
              <p className="text-gray-600 mb-4">
                Apply your knowledge in our interactive labs designed to simulate real-world vulnerabilities.
              </p>
              <Link to="/labs" className="mt-auto">
                <Button variant="outline" className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white">
                  Explore Labs
                </Button>
              </Link>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col items-center text-center">
              <div className="mb-4 bg-websec-purple-bg p-3 rounded-full">
                <Award className="h-6 w-6 text-websec-purple" />
              </div>
              <h3 className="font-semibold text-lg mb-2">3. Track Your Progress</h3>
              <p className="text-gray-600 mb-4">
                Monitor your learning journey, earn badges, and showcase your achievements.
              </p>
              <Link to="/dashboard" className="mt-auto">
                <Button variant="outline" className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-websec-purple rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Begin Your Learning Journey?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Join WebSecLearn today and start mastering web security skills through hands-on practice.
          </p>
          <Link to="/auth">
            <Button size="lg" className="bg-white text-websec-purple hover:bg-gray-100">
              Create Free Account
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
