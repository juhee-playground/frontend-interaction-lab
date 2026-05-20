import { Accordion } from "./accodion/Accordion";
import { AccordionContent } from "./accodion/AccordionContent";
import { AccordionItem } from "./accodion/AccordionItem";
import { AccordionTrigger } from "./accodion/AccordionTrigger";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="text-2xl font-bold text-green-400">Interacion Lab</h1>
      <>
        <Accordion>
          <AccordionItem value="item-1">
            <AccordionTrigger>Section 1</AccordionTrigger>
            <AccordionContent>Content 1</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Section 2</AccordionTrigger>
            <AccordionContent>Content 2</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Section 3</AccordionTrigger>
            <AccordionContent>Content 3</AccordionContent>
          </AccordionItem>
        </Accordion>
      </>
    </div>
  );
}

export default App;
