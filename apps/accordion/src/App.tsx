import { Accordion } from "./accodion/Accordion";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="mb-4 text-xl font-bold text-green-600">Accordion</h1>
      <Accordion />
    </div>
  );
}

export default App;
