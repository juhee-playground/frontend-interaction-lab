import { AccordionContent } from "./AccordionContent";
import { AccordionTrigger } from "./AccordionTrigger";
import AccodionItemContext from "./remove/AccordionItemContext";

interface IAccordionItemProps {
  sectionId: string;
  sectionName: string;
  content: string;
}

export const AccordionItem = ({
  sectionId,
  sectionName,
  content,
}: IAccordionItemProps) => {
  return (
    <AccodionItemContext.Provider
      value={{
        itemValue: sectionId,
      }}
    >
      <section className="px-1 border border-indigo-500">
        <AccordionTrigger title={sectionName} />
        <AccordionContent content={content} />
      </section>
    </AccodionItemContext.Provider>
  );
};
