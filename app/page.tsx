import { WordleGame } from "./components/WordleGame";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900 dark:bg-black dark:text-zinc-50">
      <main className="mx-auto flex w-full max-w-3xl flex-col items-center">
        <WordleGame />
      </main>
    </div>
  );
}
