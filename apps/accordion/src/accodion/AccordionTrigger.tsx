import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItemContext";

interface AccordionTriggerProps {
  title: string;
}

export const AccordionTrigger = ({ title }: AccordionTriggerProps) => {
  const { toggle } = useContext(AccordionContext);
  const { itemValue } = useContext(AccordionItemContext);
  return <div onClick={() => toggle(itemValue)}>{title}</div>;
};
