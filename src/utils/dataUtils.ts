
import { Lab } from "@/data/labs";
import { LearningPath } from "@/data/learningPaths";
import labs from "@/data/labs";
import learningPaths from "@/data/learningPaths";

// Backend API URL - change this when deploying
const API_URL = 'http://localhost:5000/api';

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

// User progress functions (now interacting with backend API)
export interface UserProgress {
  completedLabs: string[];
  labProgress: Record<string, number>; // labId -> percentage complete
  earnedBadges: string[];
  totalHours: number;
  currentStreak: number;
  lastActive: Date;
}

// Default progress object to use when no data is available
const defaultProgress: UserProgress = {
  completedLabs: [],
  labProgress: {},
  earnedBadges: [],
  totalHours: 0,
  currentStreak: 0,
  lastActive: new Date()
};

export const getUserProgress = async (): Promise<UserProgress> => {
  const token = localStorage.getItem('webseclearn_token');
  if (!token) {
    // Return mock data if not authenticated
    return defaultProgress;
  }
  
  try {
    const response = await fetch(`${API_URL}/progress`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch user progress');
    }
    
    const data = await response.json();
    return {
      ...data,
      lastActive: new Date(data.lastActive),
      // Ensure these properties are always defined
      completedLabs: data.completedLabs || [],
      labProgress: data.labProgress || {},
      earnedBadges: data.earnedBadges || [],
      totalHours: data.totalHours || 0,
      currentStreak: data.currentStreak || 0
    };
  } catch (error) {
    console.error('Error fetching user progress:', error);
    // Return mock data as fallback
    return defaultProgress;
  }
};

export const getCompletedLabs = async (): Promise<{ lab: Lab, completedDate: Date }[]> => {
  try {
    const progress = await getUserProgress();
    
    if (!progress || !progress.completedLabs) {
      return [];
    }
    
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
  } catch (error) {
    console.error('Error getting completed labs:', error);
    return [];
  }
};

export const completeLabProgress = async (labId: string): Promise<boolean> => {
  const token = localStorage.getItem('webseclearn_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/progress/complete-lab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ labId })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error completing lab:', error);
    return false;
  }
};

export const updateLabProgress = async (labId: string, percentage: number): Promise<boolean> => {
  const token = localStorage.getItem('webseclearn_token');
  if (!token) return false;
  
  try {
    const response = await fetch(`${API_URL}/progress/update-lab`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ labId, percentage })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error updating lab progress:', error);
    return false;
  }
};
