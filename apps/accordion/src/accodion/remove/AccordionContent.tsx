import { useContext, type ReactNode } from "react";

import AccordionContext from "./AccordionContext";
import AccodionItemContext from "./AccordionItemContext";

interface IAccordionProps {
  children: ReactNode;
}

export const AccordionContent = ({ children }: IAccordionProps) => {
  const { openValue } = useContext(AccordionContext);
  const { itemValue } = useContext(AccodionItemContext);
  const isOpen = openValue.includes(itemValue);

  if (!isOpen) return null;
  return <article>{children}</article>;
};
