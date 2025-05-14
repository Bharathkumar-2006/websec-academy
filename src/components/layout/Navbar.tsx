import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-websec-purple text-white p-1.5 rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24" fill="none" stroke="currentColor"
                   strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                <path d="m8 11 3 3 5-5" />
              </svg>
            </div>
            <span className="font-bold text-xl">WebSecLearn</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="font-medium hover:text-websec-purple">Home</Link>
            <Link to="/learning-paths" className="font-medium hover:text-websec-purple">Learn</Link>
            <Link to="/labs" className="font-medium hover:text-websec-purple">Labs</Link>
            {isLoggedIn && (
              <Link to="/dashboard" className="font-medium hover:text-websec-purple">Dashboard</Link>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            {isLoggedIn ? (
              <Button
                variant="outline"
                onClick={handleSignOut}
                className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white"
              >
                Sign Out
              </Button>
            ) : (
              <Link to="/auth">
                <Button className="bg-websec-purple hover:bg-websec-purple-dark text-white">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} size="icon">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-2 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="font-medium hover:text-websec-purple px-2 py-1" onClick={toggleMenu}>Home</Link>
              <Link to="/learning-paths" className="font-medium hover:text-websec-purple px-2 py-1" onClick={toggleMenu}>Learn</Link>
              <Link to="/labs" className="font-medium hover:text-websec-purple px-2 py-1" onClick={toggleMenu}>Labs</Link>
              {isLoggedIn && (
                <Link to="/dashboard" className="font-medium hover:text-websec-purple px-2 py-1" onClick={toggleMenu}>Dashboard</Link>
              )}

              {isLoggedIn ? (
                <Button
                  variant="outline"
                  onClick={() => {
                    handleSignOut();
                    toggleMenu();
                  }}
                  className="border-websec-purple text-websec-purple hover:bg-websec-purple hover:text-white"
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth" onClick={toggleMenu} className="w-full">
                  <Button className="bg-websec-purple hover:bg-websec-purple-dark text-white w-full">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
