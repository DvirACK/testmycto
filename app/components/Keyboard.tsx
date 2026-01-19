import type { LetterStatus } from "../lib/wordle";

const KEY_ROWS: Array<Array<string>> = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"],
];

const statusClassName: Record<LetterStatus, string> = {
  correct: "bg-green-600 text-white",
  present: "bg-yellow-500 text-white",
  absent: "bg-zinc-400 text-white",
  empty:
    "bg-zinc-200 text-zinc-900 hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700",
};

function KeyButton({
  label,
  status,
  disabled,
  onPress,
}: {
  label: string;
  status: LetterStatus;
  disabled: boolean;
  onPress: () => void;
}) {
  const isWide = label === "ENTER" || label === "BACKSPACE";

  return (
    <button
      type="button"
      className={[
        "rounded-md px-1 py-2 text-[0.65rem] font-semibold uppercase transition sm:px-2 sm:py-3 sm:text-sm",
        isWide
          ? "min-w-[3.1rem] sm:min-w-[3.5rem]"
          : "min-w-[1.9rem] sm:min-w-[2.25rem]",
        disabled ? "opacity-50" : "active:scale-[0.98]",
        statusClassName[status],
      ].join(" ")}
      disabled={disabled}
      onClick={onPress}
    >
      {label === "BACKSPACE" ? "⌫" : label}
    </button>
  );
}

export function Keyboard({
  keyStatuses,
  disabled,
  onKeyPress,
}: {
  keyStatuses: Record<string, LetterStatus | undefined>;
  disabled: boolean;
  onKeyPress: (key: string) => void;
}) {
  return (
    <div className="flex w-full max-w-xl flex-col gap-2">
      {KEY_ROWS.map((row, idx) => (
        <div key={idx} className="flex justify-center gap-1 sm:gap-2">
          {row.map((key) => {
            const status =
              key.length === 1 ? (keyStatuses[key] ?? "empty") : "empty";

            return (
              <KeyButton
                key={key}
                label={key}
                status={status}
                disabled={disabled}
                onPress={() => onKeyPress(key)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
