import { useContext } from "react";

import AccordionContext from "./AccordionContext";
import AccodionItemContext from "./AccordionItemContext";

export const AccordionContent = ({ children }) => {
  const { openValue } = useContext(AccordionContext);
  const { itemValue } = useContext(AccodionItemContext);
  const isOpen = openValue.includes(itemValue);

  if (!isOpen) return null;
  return <article>{children}</article>;
};
