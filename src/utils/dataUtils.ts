
import { Lab } from "@/data/labs";
import { LearningPath } from "@/data/learningPaths";
import labs from "@/data/labs";
import learningPaths from "@/data/learningPaths";

// Lab related functions
export const getLabById = (labId: string): Lab | undefined => {
  return labs.find(lab => lab.id === labId);
};

export const getLabsByCategory = (category: string): Lab[] => {
  return labs.filter(lab => lab.category === category);
};

export const getLabsByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): Lab[] => {
  return labs.filter(lab => lab.difficulty === difficulty);
};

// Learning path related functions
export const getLearningPathById = (pathId: string): LearningPath | undefined => {
  return learningPaths.find(path => path.id === pathId);
};

export const getLearningPathsByDifficulty = (difficulty: 'Beginner' | 'Intermediate' | 'Advanced'): LearningPath[] => {
  return learningPaths.filter(path => path.difficulty === difficulty);
};

// User progress functions (in a real app, these would interact with backend API)
export interface UserProgress {
  completedLabs: string[];
  labProgress: Record<string, number>; // labId -> percentage complete
  earnedBadges: string[];
  totalHours: number;
  currentStreak: number;
  lastActive: Date;
}

export const getUserProgress = (): UserProgress => {
  // In a real app, this would fetch from an API or localStorage
  const mockProgress: UserProgress = {
    completedLabs: ["xss-reflected", "sqli-login", "broken-auth"],
    labProgress: {
      "xss-stored": 60,
      "csrf-profile": 30,
    },
    earnedBadges: ["xss-master", "sql-novice", "auth-novice"],
    totalHours: 12,
    currentStreak: 3,
    lastActive: new Date()
  };
  
  return mockProgress;
};

export const getCompletedLabs = (): { lab: Lab, completedDate: Date }[] => {
  const progress = getUserProgress();
  const completedLabs = progress.completedLabs
    .map(labId => {
      const lab = getLabById(labId);
      return lab ? { 
        lab, 
        completedDate: new Date(Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000) // Random date within last 10 days
      } : null;
    })
    .filter((item): item is { lab: Lab, completedDate: Date } => item !== null);
  
  return completedLabs;
};
