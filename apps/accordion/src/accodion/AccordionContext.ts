import React from "react";

interface IAccordionContextValue {
  openValue: string | null;
  toggle: (itemValue: string) => void;
}

export const AccordionContext = React.createContext<IAccordionContextValue>({
  openValue: null,
  toggle: () => {},
});
