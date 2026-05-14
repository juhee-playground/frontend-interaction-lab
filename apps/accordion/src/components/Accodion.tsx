import { useState } from "react";

interface IArticles {
  id: number;
  title: string;
  content: string;
}

const articles: IArticles[] = [
  { id: 1, title: "Item 1", content: "Content 1" },
  { id: 2, title: "Item 2", content: "Content 2" },
  { id: 3, title: "Item 3", content: "Content 3" },
  { id: 4, title: "Item 4", content: "Content 4" },
  { id: 5, title: "Item 5", content: "Content 5" },
];
const Accodion = () => {
  const [active, setActive] = useState<number>(1);

  const handleTrigger = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;

    const item = target.closest("li");

    if (!item) {
      return;
    }

    const id = Number(item.dataset.id);
    if (id === active) {
      setActive(0);
    } else {
      setActive(id);
    }
  };

  return (
    <>
      <div className="to-blue-400">
        <ul className="flex flex-col gap-1 w-100" onClick={handleTrigger}>
          {articles &&
            articles.map((article: IArticles) => {
              return (
                <li
                  key={article.id}
                  className="bg-neutral-900 border border-white/40 rounded-sm text-white p-4"
                  data-id={article.id}
                >
                  <article>
                    <h3 className="font-bold mb-2">{article.title}</h3>
                    {active === article.id && <p>{article.content}</p>}
                  </article>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Accodion;
