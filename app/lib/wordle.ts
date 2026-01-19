import { WORD_LENGTH } from "./words";

export type LetterStatus = "correct" | "present" | "absent" | "empty";

export function evaluateGuess(guess: string, target: string): LetterStatus[] {
  const normalizedGuess = guess.toLowerCase();
  const normalizedTarget = target.toLowerCase();

  if (
    normalizedGuess.length !== WORD_LENGTH ||
    normalizedTarget.length !== WORD_LENGTH
  ) {
    throw new Error("Guess and target must be 5 letters long");
  }

  const result: LetterStatus[] = Array.from({ length: WORD_LENGTH }, () => "absent");
  const remaining: Record<string, number> = {};

  for (let i = 0; i < WORD_LENGTH; i++) {
    const g = normalizedGuess[i];
    const t = normalizedTarget[i];

    if (g === t) {
      result[i] = "correct";
    } else {
      remaining[t] = (remaining[t] ?? 0) + 1;
    }
  }

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === "correct") continue;

    const g = normalizedGuess[i];
    const count = remaining[g] ?? 0;

    if (count > 0) {
      result[i] = "present";
      remaining[g] = count - 1;
    }
  }

  return result;
}

export function getStatusPriority(status: LetterStatus): number {
  switch (status) {
    case "correct":
      return 3;
    case "present":
      return 2;
    case "absent":
      return 1;
    case "empty":
      return 0;
  }
}
