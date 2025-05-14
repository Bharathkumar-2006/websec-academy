import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge"; // Assuming Badge component is available
import { formatDate } from "@/utils/formatDate"; // Utility function for date formatting

const markLabAsCompleted = async (labId: string) => {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Unauthorized. Please login.");
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/progress/complete-lab", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ labId }), // Sending labId in body to mark as completed
    });

    if (res.ok) {
      alert("Lab marked as completed!");
      // Optionally, refresh the list or update state here
    } else {
      throw new Error("Failed to update lab completion.");
    }
  } catch (err) {
    alert(err.message || "An error occurred");
  }
};

const CompletedLabs = () => {
  const [labs, setLabs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompletedLabs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized. Please login.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:5000/api/progress", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            setError("Unauthorized. Please log in again.");
            localStorage.removeItem("token");
          } else {
            throw new Error("Failed to fetch completed labs.");
          }
        }

        const data = await res.json();
        setLabs(data.completedLabs);
      } catch (err) {
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
            <Card key={lab.id} className="hover:shadow-md transition-all duration-200">
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
                  <button
                    onClick={() => markLabAsCompleted(lab.id)}
                    className="ml-4 text-blue-500 hover:text-blue-700"
                  >
                    <RefreshCw className="h-5 w-5 inline-block mr-1" />
                    Update Status
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default CompletedLabs;
