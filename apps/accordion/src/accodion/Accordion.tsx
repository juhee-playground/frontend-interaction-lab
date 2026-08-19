import React, { useState } from "react";
import { AccordionItem } from "./AccordionItem";
import { AccordionContext } from "./AccordionContext";

interface IAccordionProps {
  type: "single" | "multiple";
}

type TSingle = string | null;
type TMultiple = string[];

export const Accordion = ({ type }: IAccordionProps) => {
  const initialValue = type === "single" ? null : [];
  const [openValue, setOpenValue] = useState<TSingle | TMultiple>(initialValue);
  const clickToggle = (itemValue: string) => {
    if (type === "single") {
      // type이 single이면
      if (openValue === itemValue) {
        setOpenValue(null);
      } else {
        setOpenValue(itemValue);
      }
    } else {
      // type이 multiple이면
      // openValue안에 id 있는지 확인
      if (!Array.isArray(openValue)) {
        return;
      }

      if (openValue.includes(itemValue)) {
        setOpenValue(openValue.filter((value) => value !== itemValue));
      } else {
        setOpenValue([...openValue, itemValue]);
      }
    }
  };
  return (
    <React.Fragment>
      <AccordionContext.Provider
        value={{
          openValue,
          toggle: clickToggle,
          type,
        }}
      >
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
      </AccordionContext.Provider>
      <div className="mt-2">Current: {openValue}</div>
    </React.Fragment>
  );
};
