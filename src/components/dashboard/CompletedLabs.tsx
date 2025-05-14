import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

interface Lab {
  id: string;
  title: string;
  category: string;
}

interface CompletedLab {
  lab: Lab;
  completedDate: string; // coming as string from backend
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

const CompletedLabs = () => {
  const [labs, setLabs] = useState<CompletedLab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedLabs = async () => {
      const token = localStorage.getItem("token"); // JWT token stored in localStorage

      if (!token) {
        setError("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/progress", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Attach JWT token in the header
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized. Please log in again.");
            localStorage.removeItem("token"); // Remove token on unauthorized
          } else {
            throw new Error("Failed to fetch completed labs.");
          }
        }

        const data = await res.json();
        setLabs(data.completedLabs);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedLabs();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading completed labs...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (labs.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">
            You haven't completed any labs yet. Start learning and practicing!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold">Completed Labs</h3>

      <div className="space-y-3">
        {[...labs]
          .sort((a, b) => new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime())
          .map(({ lab, completedDate }) => (
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
    </div>
  );
};

export default CompletedLabs;
