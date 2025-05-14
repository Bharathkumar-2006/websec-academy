
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Code, 
  Trophy,
  Shield,
  User,
  Layers
} from "lucide-react";

const FeatureSection = () => {
  const features = [
    {
      icon: <BookOpen className="h-8 w-8 text-websec-purple" />,
      title: "Learning Paths",
      description: "Structured courses covering essential web security concepts from beginner to advanced levels.",
      link: "/learning-paths"
    },
    {
      icon: <Code className="h-8 w-8 text-websec-purple" />,
      title: "Hands-on Labs",
      description: "Interactive environments to practice identifying and exploiting vulnerabilities safely.",
      link: "/labs"
    },
    {
      icon: <Trophy className="h-8 w-8 text-websec-purple" />,
      title: "Track Progress",
      description: "Monitor your learning journey, earn badges, and validate your growing expertise.",
      link: "/dashboard"
    }
  ];

  const extraFeatures = [
    {
      icon: <Shield className="h-6 w-6 text-websec-purple" />,
      title: "Safe Environment",
      description: "Practice exploits in isolated sandboxes without legal or ethical concerns."
    },
    {
      icon: <User className="h-6 w-6 text-websec-purple" />,
      title: "Beginner Friendly",
      description: "Start with the basics and progressively tackle more complex security challenges."
    },
    {
      icon: <Layers className="h-6 w-6 text-websec-purple" />,
      title: "Industry Relevant",
      description: "Learn about real-world vulnerabilities based on OWASP Top 10 and beyond."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Master Web Security with <span className="text-websec-purple">WebSecLearn</span></h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform offers everything you need to become proficient in identifying and remediating web vulnerabilities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
          >
            <div className="bg-websec-purple-bg p-3 rounded-lg inline-block mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            <Link to={feature.link} className="text-websec-purple hover:text-websec-purple-dark font-medium inline-flex items-center">
              Explore
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {extraFeatures.map((feature, index) => (
          <div key={index} className="flex items-start">
            <div className="mr-4 mt-1">
              {feature.icon}
            </div>
            <div>
              <h4 className="font-semibold mb-1">{feature.title}</h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
