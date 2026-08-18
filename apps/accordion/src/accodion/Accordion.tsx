import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { AccordionContext } from "./AccordionContext";

export const Accordion = () => {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const clickToggle = (id: string) => {
    if (openValue === id) {
      setOpenValue(null);
    } else {
      setOpenValue(id);
    }
  };

  return (
    <React.Fragment>
      <AccordionContext.Provider
        value={{
          openValue,
          toggle: clickToggle,
        }}
      >
        <div className="flex flex-col gap-1">
          <AccordionItem
            sectionId="item-1"
            sectionName="Section 1"
            content="Content 1"
          />
          <AccordionItem
            sectionId="item-2"
            sectionName="Section 2"
            content="Content 2"
          />
          <AccordionItem
            sectionId="item-3"
            sectionName="Section 3"
            content="Content 3"
          />
        </div>
      </AccordionContext.Provider>
      <div className="mt-2">{openValue}</div>
    </React.Fragment>
  );
};
