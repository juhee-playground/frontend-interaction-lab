import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold text-green-400">Tailwind Works 🚀</h1>
    </div>
  );
}

export default App;
