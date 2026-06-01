import { useState, type ReactNode } from "react";
import AccordionContext from "./AccordionContext";

interface IAccordionProps {
  children: ReactNode;
}

export const Accordion = ({ children }: IAccordionProps) => {
  const [openValue, setOpenValue] = useState<string[]>([]);
  const toggle = (itemValue: string) => {
    setOpenValue((prev) => {
      if (prev.includes(itemValue)) {
        return prev.filter((v) => v !== itemValue);
      } else {
        return [...prev, itemValue];
      }
    });
  };
  return (
    <AccordionContext.Provider value={{ openValue, toggle }}>
      {children}
    </AccordionContext.Provider>
  );
};
