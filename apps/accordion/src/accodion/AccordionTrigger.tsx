import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";
import AccodionItemContext from "./remove/AccordionItemContext";

interface AccordionTriggerProps {
  title: string;
}

export const AccordionTrigger = ({ title }: AccordionTriggerProps) => {
  const { toggle } = useContext(AccordionContext);
  const { itemValue } = useContext(AccodionItemContext);
  return <div onClick={() => toggle(itemValue)}>{title}</div>;
};
