import { createContext } from "react";

const AccordionContext = createContext({
  openValue: [],
  toggle: (itemValue: string) => {},
});

export default AccordionContext;
