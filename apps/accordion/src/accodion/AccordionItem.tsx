import { AccordionContent } from "./AccordionContent";
import { AccordionItemContext } from "./AccordionItemContext";
import { AccordionTrigger } from "./AccordionTrigger";
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
    <AccordionItemContext.Provider
      value={{
        itemValue: sectionId,
      }}
    >
      <section className="px-1 border border-indigo-500">
        <AccordionTrigger title={sectionName} />
        <AccordionContent content={content} />
      </section>
    </AccordionItemContext.Provider>
  );
};
