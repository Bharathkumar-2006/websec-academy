
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'


window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});


window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

try {
  const root = createRoot(document.getElementById("root")!);
  root.render(<App />);
} catch (error) {
  console.error('Failed to render the application:', error);
}
