import { AccordionContent } from "./AccordionContent";
import { AccordionTrigger } from "./AccordionTrigger";

interface IAccordionItemProps {
  sectionId: string;
  sectionName: string;
  content: string;
  sectionHeader: string | null;
  onToggle(value: string): void;
}

export const AccordionItem = ({
  sectionId,
  sectionName,
  content,
  sectionHeader,
  onToggle,
}: IAccordionItemProps) => {
  return (
    <section className="px-1 border border-indigo-500">
      <AccordionTrigger
        title={sectionName}
        onClick={onToggle}
        sectionId={sectionId}
      />
      {sectionHeader === sectionId && <AccordionContent content={content} />}
    </section>
  );
};
