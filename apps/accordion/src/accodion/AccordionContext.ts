import { createContext } from "react";

interface IAccordionContext {
  openValue: string[];
  toggle: (itemValue: string) => void;
}

const AccordionContext = createContext<IAccordionContext>({
  openValue: [],
  toggle: () => {},
});

export default AccordionContext;
