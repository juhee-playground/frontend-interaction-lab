import AccordionItemContext from "./AccordionItemContext";

export const AccordionItem = ({ children, value }) => {
  return (
    <AccordionItemContext.Provider value={{ itemValue: value }}>
      {children}
    </AccordionItemContext.Provider>
  );
};
