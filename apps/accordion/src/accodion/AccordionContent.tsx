import { useContext } from "react";
import { AccordionContext } from "./AccordionContext";
import { AccordionItemContext } from "./AccordionItemContext";

interface IAccordionContentProps {
  content: string;
}

export const AccordionContent = ({ content }: IAccordionContentProps) => {
  const { openValue, type } = useContext(AccordionContext);
  const { itemValue } = useContext(AccordionItemContext);
  if (type === "single") {
    return openValue === itemValue ? <div>{content}</div> : null;
  }

  if (!Array.isArray(openValue)) {
    return null;
  }

  return openValue.includes(itemValue) && <div>{content}</div>;
};
