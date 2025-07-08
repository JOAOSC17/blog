import { Article, getArticles } from "@/src/lib/articles";
import moment from "moment";
import Link from "next/link";
// import { Tag } from "./[slug]/page";

export default async function ArticlesPage() {
  const articles = getArticles();
  return (
    <div>
      <h1 className="mb-16 mt-4 text-center text-5xl max-sm:text-4xl">
        Articles
      </h1>

      {/* TODO: add tags filter (OR between all selections)
      <p>{JSON.stringify(getAllTags())}</p> */}
      <div className="space-y-20 text-center">
        <blockquote className="text-zinc-800 dark:text-zinc-300">Coming soon</blockquote>
      </div>
      {/* <section className="flex flex-col divide-y divide-zinc-400 overflow-hidden rounded ring-1 ring-zinc-400 dark:divide-zinc-500 dark:ring-zinc-500">
        {articles.map((article: Article) => (
          <Link
            className="flex items-center justify-between px-4 py-2 transition-all sm:p-4 sm:hover:bg-zinc-200 sm:dark:hover:bg-zinc-800"
            key={article.id}
            href={`/articles/${article.id}`}
          >
            <div className="flex gap-1 gap-x-2 max-sm:flex-col sm:items-center">
              {article.title}{" "}
              <span className="flex gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                {article?.tags?.map((tag) => <span key={tag}>#{tag}</span>)}
              </span>
            </div>
            <span className="text-zinc-500 max-sm:text-sm dark:text-zinc-400">
              {moment(article.date, "YYYY-MM-DD").format("MMM/YYYY")}
            </span>
          </Link>
        ))}
      </section> */}
    </div>
  );
}
