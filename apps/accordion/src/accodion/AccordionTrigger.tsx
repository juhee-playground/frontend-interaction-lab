interface AccordionTriggerProps {
  sectionId: string;
  title: string;
  onClick(value: string): void;
}

export const AccordionTrigger = ({
  sectionId,
  title,
  onClick,
}: AccordionTriggerProps) => {
  return <div onClick={() => onClick(sectionId)}>{title}</div>;
};
