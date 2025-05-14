
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  modules: number;
  estimatedHours: number;
  color: string;
}

const learningPaths: LearningPath[] = [
  {
    id: "xss",
    title: "Cross-Site Scripting (XSS)",
    description: "Learn how attackers inject client-side scripts into web pages viewed by others and how to prevent these attacks.",
    icon: "code",
    difficulty: "Beginner",
    modules: 5,
    estimatedHours: 4,
    color: "blue"
  },
  {
    id: "sqli",
    title: "SQL Injection",
    description: "Understand how malicious SQL statements can be inserted into entry fields and how to implement proper input validation.",
    icon: "database",
    difficulty: "Beginner",
    modules: 6,
    estimatedHours: 5,
    color: "green"
  },
  {
    id: "csrf",
    title: "Cross-Site Request Forgery",
    description: "Explore how attackers trick users into performing unwanted actions and how to implement CSRF tokens.",
    icon: "repeat",
    difficulty: "Intermediate",
    modules: 4,
    estimatedHours: 3,
    color: "yellow"
  },
  {
    id: "ssrf",
    title: "Server-Side Request Forgery",
    description: "Learn about SSRF vulnerabilities that allow attackers to induce server-side applications to make requests to unintended locations.",
    icon: "server",
    difficulty: "Advanced",
    modules: 7,
    estimatedHours: 6,
    color: "red"
  },
  {
    id: "auth",
    title: "Authentication Flaws",
    description: "Explore common authentication vulnerabilities and learn how to implement secure authentication systems.",
    icon: "key",
    difficulty: "Intermediate",
    modules: 5,
    estimatedHours: 4,
    color: "purple"
  },
  {
    id: "jwt",
    title: "JWT Security",
    description: "Understand JSON Web Token vulnerabilities and how to implement secure token-based authentication.",
    icon: "file-text",
    difficulty: "Intermediate",
    modules: 4,
    estimatedHours: 3,
    color: "indigo"
  },
  {
    id: "xxe",
    title: "XML External Entities",
    description: "Learn about XXE attacks that exploit vulnerable XML processors and how to prevent them.",
    icon: "file-code",
    difficulty: "Advanced",
    modules: 6,
    estimatedHours: 5,
    color: "orange"
  },
  {
    id: "deserialization",
    title: "Insecure Deserialization",
    description: "Explore how untrusted data is used to abuse application logic and execute arbitrary code when deserialized.",
    icon: "package",
    difficulty: "Advanced",
    modules: 5,
    estimatedHours: 6,
    color: "teal"
  }
];

export default learningPaths;
