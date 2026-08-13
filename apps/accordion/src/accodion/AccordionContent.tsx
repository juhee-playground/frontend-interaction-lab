interface IAccordionContentProps {
  content: string;
}

export const AccordionContent = ({ content }: IAccordionContentProps) => {
  return <div>{content}</div>;
};
