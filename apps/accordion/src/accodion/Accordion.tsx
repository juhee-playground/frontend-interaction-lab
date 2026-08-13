import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";

export const Accordion = () => {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const clickToggle = (id: string) => {
    console.log("click", id);
    if (openValue === id) {
      setOpenValue(null);
    } else {
      setOpenValue(id);
    }
  };

  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <AccordionItem
          sectionId="item-1"
          sectionName="Section 1"
          content="Content 1"
          sectionHeader={openValue}
          onToggle={clickToggle}
        />
        <AccordionItem
          sectionId="item-2"
          sectionName="Section 2"
          content="Content 2"
          sectionHeader={openValue}
          onToggle={clickToggle}
        />
        <AccordionItem
          sectionId="item-3"
          sectionName="Section 3"
          content="Content 3"
          sectionHeader={openValue}
          onToggle={clickToggle}
        />
      </div>
      <div className="mt-2">{openValue}</div>
    </React.Fragment>
  );
};
