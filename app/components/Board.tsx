import { MAX_ATTEMPTS, WORD_LENGTH } from "../lib/words";
import type { LetterStatus } from "../lib/wordle";

export type GuessRow = {
  guess: string;
  result: LetterStatus[];
};

const statusClassName: Record<LetterStatus, string> = {
  correct: "bg-green-600 border-green-600 text-white",
  present: "bg-yellow-500 border-yellow-500 text-white",
  absent: "bg-zinc-400 border-zinc-400 text-white",
  empty:
    "bg-transparent border-zinc-300 text-zinc-900 dark:border-zinc-700 dark:text-zinc-50",
};

function Tile({ letter, status }: { letter: string; status: LetterStatus }) {
  return (
    <div
      className={[
        "flex aspect-square w-12 items-center justify-center rounded-md border text-xl font-bold uppercase sm:w-14",
        statusClassName[status],
      ].join(" ")}
      aria-label={letter ? `${letter} ${status}` : "empty"}
    >
      {letter}
    </div>
  );
}

export function Board({
  guesses,
  currentGuess,
  isGameOver,
}: {
  guesses: GuessRow[];
  currentGuess: string;
  isGameOver: boolean;
}) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateRows: `repeat(${MAX_ATTEMPTS}, 1fr)` }}
    >
      {Array.from({ length: MAX_ATTEMPTS }, (_, rowIndex) => {
        const row = guesses[rowIndex];

        const letters = Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
          if (row) return row.guess[colIndex]?.toUpperCase() ?? "";
          if (!isGameOver && rowIndex === guesses.length)
            return currentGuess[colIndex]?.toUpperCase() ?? "";
          return "";
        });

        const statuses: LetterStatus[] = Array.from({ length: WORD_LENGTH }, (_, colIndex) => {
          if (row) return row.result[colIndex] ?? "empty";
          return "empty";
        });

        return (
          <div
            key={rowIndex}
            className="grid grid-cols-5 gap-2"
            aria-label={`row ${rowIndex + 1}`}
          >
            {letters.map((letter, idx) => (
              <Tile key={idx} letter={letter} status={statuses[idx] ?? "empty"} />
            ))}
          </div>
        );
      })}
    </div>
  );
}
