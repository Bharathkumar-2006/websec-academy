
import AuthForm from "@/components/auth/AuthForm";

const AuthPage = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-md mx-auto text-center mb-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to WebSecLearn</h1>
        <p className="text-gray-600">
          Sign in to track your progress and access all labs and learning paths.
        </p>
      </div>
      
      <AuthForm />
      
      <div className="mt-12 max-w-md mx-auto text-center text-sm text-gray-500">
        <p>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
        <p className="mt-2">
          WebSecLearn is for educational purposes only. Never apply these techniques to systems without explicit permission.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
