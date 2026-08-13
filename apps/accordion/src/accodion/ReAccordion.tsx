import React, { useState } from "react";

export const ReAccordion = () => {
  const [openValue, setOpenValue] = useState<string | null>(null);
  const clickToggle = (id: string) => {
    console.log("click", id);
    if (openValue === id) {
      setOpenValue(null);
    } else {
      setOpenValue(id);
    }
  };
  return (
    <React.Fragment>
      <div className="flex flex-col gap-1">
        <section className="px-2 border border-indigo-500">
          <div onClick={() => clickToggle("item-1")}>Section 1</div>
          {openValue === "item-1" && <div>Content 1</div>}
        </section>
        <section className="px-1 border border-indigo-500">
          <div onClick={() => clickToggle("item-2")}>Section 2</div>
          {openValue === "item-2" && <div>Content 2</div>}
        </section>
        <section className="px-1 border border-indigo-500">
          <div onClick={() => clickToggle("item-3")}>Section 3</div>
          {openValue === "item-3" && <div>Content 3</div>}
        </section>
      </div>
      <div className="mt-2">Current: {openValue}</div>
    </React.Fragment>
  );
};
