import { useContext, type ReactNode } from "react";

import AccordionContext from "./AccordionContext";
import AccodionItemContext from "./AccordionItemContext";
interface IAccordionProps {
  children: ReactNode;
}

export const AccordionTrigger = ({ children }: IAccordionProps) => {
  const { toggle } = useContext(AccordionContext);
  const { itemValue } = useContext(AccodionItemContext);
  return (
    <button
      className="bg-neutral-900 border border-white/40 rounded-sm text-white p-4"
      onClick={() => toggle(itemValue)}
    >
      {children}
    </button>
  );
};
