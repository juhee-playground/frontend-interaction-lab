import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItemContext";

interface IAccordionContentProps {
  content: string;
}

export const AccordionContent = ({ content }: IAccordionContentProps) => {
  const { openValue } = useContext(AccordionContext);
  const { itemValue } = useContext(AccordionItemContext);
  return openValue === itemValue && <div>{content}</div>;
};
