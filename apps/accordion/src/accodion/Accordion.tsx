import { useState } from "react";
import AccordionContext from "./AccordionContext";

export const Accordion = ({ children }) => {
  const [openValue, setOpenValue] = useState([]);
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
