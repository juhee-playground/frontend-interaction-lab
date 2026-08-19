import React from "react";

type TSingle = string | null;
type TMultiple = string[];
type TAccordionType = "single" | "multiple";
interface IAccordionContextValue {
  openValue: TSingle | TMultiple;
  type: TAccordionType;
  toggle: (itemValue: string) => void;
}

export const AccordionContext = React.createContext<IAccordionContextValue>({
  openValue: null,
  toggle: () => {},
  type: "single",
});
