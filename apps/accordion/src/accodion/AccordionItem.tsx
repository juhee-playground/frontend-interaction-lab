import type { ReactNode } from "react";
import AccordionItemContext from "./AccordionItemContext";

interface IAccordionProps {
  children: ReactNode;
  value: string;
}

export const AccordionItem = ({ children, value }: IAccordionProps) => {
  return (
    <AccordionItemContext.Provider value={{ itemValue: value }}>
      {children}
    </AccordionItemContext.Provider>
  );
};
