
export interface Lab {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  objective: string;
  completionTime: number; // in minutes
  topics: string[];
}

const labs: Lab[] = [
  {
    id: "xss-stored",
    title: "Stored XSS in Comment Field",
    description: "Learn how to identify and exploit a stored XSS vulnerability in a website's comment section.",
    difficulty: "Beginner",
    category: "Cross-Site Scripting",
    objective: "Inject JavaScript that executes when other users view the comments page.",
    completionTime: 30,
    topics: ["XSS", "JavaScript", "Input Validation"]
  },
  {
    id: "xss-reflected",
    title: "Reflected XSS in Search Form",
    description: "Exploit a search form that reflects user input without proper sanitization.",
    difficulty: "Beginner",
    category: "Cross-Site Scripting",
    objective: "Create a malicious link that executes JavaScript when clicked by other users.",
    completionTime: 20,
    topics: ["XSS", "JavaScript", "URL Parameters"]
  },
  {
    id: "xss-dom",
    title: "DOM-based XSS Vulnerability",
    description: "Identify and exploit a DOM-based XSS vulnerability where client-side JavaScript modifies the DOM unsafely.",
    difficulty: "Intermediate",
    category: "Cross-Site Scripting",
    objective: "Find a way to execute JavaScript through client-side script manipulation.",
    completionTime: 45,
    topics: ["XSS", "DOM", "JavaScript", "Client-Side Security"]
  },
  {
    id: "sqli-login",
    title: "SQL Injection Authentication Bypass",
    description: "Bypass a login form by exploiting a SQL injection vulnerability.",
    difficulty: "Beginner",
    category: "SQL Injection",
    objective: "Gain access as an administrator without knowing the password.",
    completionTime: 25,
    topics: ["SQLi", "Authentication", "Input Validation"]
  },
  {
    id: "sqli-blind",
    title: "Blind SQL Injection Exploitation",
    description: "Extract sensitive information using blind SQL injection techniques.",
    difficulty: "Advanced",
    category: "SQL Injection",
    objective: "Extract the admin user's password hash using only true/false responses.",
    completionTime: 60,
    topics: ["SQLi", "Blind Injection", "Database Security"]
  },
  {
    id: "csrf-profile",
    title: "CSRF Profile Update Vulnerability",
    description: "Exploit a Cross-Site Request Forgery vulnerability in a profile update form.",
    difficulty: "Intermediate",
    category: "CSRF",
    objective: "Create a malicious page that updates a victim's profile information when visited.",
    completionTime: 40,
    topics: ["CSRF", "Same-Origin Policy", "HTTP Headers"]
  },
  {
    id: "ssrf-basic",
    title: "Basic SSRF Exploitation",
    description: "Exploit a Server-Side Request Forgery vulnerability in a URL fetching function.",
    difficulty: "Intermediate",
    category: "SSRF",
    objective: "Access internal resources that should not be accessible from the internet.",
    completionTime: 35,
    topics: ["SSRF", "Internal Networks", "URL Parsing"]
  },
  {
    id: "jwt-none",
    title: "JWT Algorithm 'none' Attack",
    description: "Exploit a JWT implementation that accepts the 'none' algorithm.",
    difficulty: "Intermediate",
    category: "JWT Security",
    objective: "Modify a JWT to gain elevated privileges without knowing the secret key.",
    completionTime: 30,
    topics: ["JWT", "Authentication", "Cryptographic Flaws"]
  },
  {
    id: "xxe-basic",
    title: "Basic XXE Injection",
    description: "Exploit an XML External Entity vulnerability in an XML parser.",
    difficulty: "Advanced",
    category: "XXE",
    objective: "Read local system files using XXE injection.",
    completionTime: 45,
    topics: ["XXE", "XML", "File System Access"]
  },
  {
    id: "insecure-deserial",
    title: "PHP Object Injection",
    description: "Exploit an insecure deserialization vulnerability in PHP.",
    difficulty: "Advanced",
    category: "Insecure Deserialization",
    objective: "Achieve remote code execution through manipulated serialized objects.",
    completionTime: 60,
    topics: ["Deserialization", "PHP", "Object Injection", "RCE"]
  },
  {
    id: "broken-auth",
    title: "Broken Authentication Flow",
    description: "Identify and exploit flaws in an authentication system.",
    difficulty: "Beginner",
    category: "Authentication Flaws",
    objective: "Bypass authentication controls to access protected resources.",
    completionTime: 30,
    topics: ["Authentication", "Session Management", "Security Controls"]
  },
  {
    id: "password-reset",
    title: "Insecure Password Reset",
    description: "Exploit vulnerabilities in a password reset mechanism.",
    difficulty: "Intermediate",
    category: "Authentication Flaws",
    objective: "Reset another user's password without proper authorization.",
    completionTime: 35,
    topics: ["Authentication", "Email Security", "Token Security"]
  }
];

export default labs;
