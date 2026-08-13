import { ReAccordion } from "./accodion/ReAccordion";

import "./App.css";

function App() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="mb-4 text-xl font-bold text-green-600">Accordion</h1>
      {/* <Accordion>
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
      </Accordion> */}

      <ReAccordion />
    </div>
  );
}

export default App;
