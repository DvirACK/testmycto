"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Board, type GuessRow } from "./Board";
import { Keyboard } from "./Keyboard";
import {
  MAX_ATTEMPTS,
  WORD_LENGTH,
  WORD_SET,
  getRandomWord,
} from "../lib/words";
import {
  evaluateGuess,
  getStatusPriority,
  type LetterStatus,
} from "../lib/wordle";

type GameStatus = "playing" | "won" | "lost";

type ToastState = {
  message: string;
  kind: "error" | "info" | "success";
} | null;

function normalizeKey(key: string): string | null {
  if (key === "ENTER") return "ENTER";
  if (key === "BACKSPACE") return "BACKSPACE";
  if (key.length === 1 && /^[a-z]$/i.test(key)) return key.toUpperCase();
  return null;
}

function getToastClassName(toast: ToastState): string {
  if (!toast) return "";

  switch (toast.kind) {
    case "error":
      return "bg-red-600 text-white";
    case "success":
      return "bg-green-700 text-white";
    case "info":
      return "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900";
  }

  return "";
}

export function WordleGame() {
  const [targetWord, setTargetWord] = useState<string>(() => getRandomWord());
  const [guesses, setGuesses] = useState<GuessRow[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [status, setStatus] = useState<GameStatus>("playing");
  const [toast, setToast] = useState<ToastState>(null);
  const [keyStatuses, setKeyStatuses] = useState<
    Record<string, LetterStatus | undefined>
  >({});

  const toastTimeout = useRef<number | null>(null);

  const isGameOver = status !== "playing";
  const attemptNumber = isGameOver
    ? Math.max(guesses.length, 1)
    : Math.min(guesses.length + 1, MAX_ATTEMPTS);
  const remainingAttempts = MAX_ATTEMPTS - guesses.length;

  const submitGuess = useCallback(() => {
    if (isGameOver) return;

    if (currentGuess.length !== WORD_LENGTH) {
      setToast({ message: `Enter ${WORD_LENGTH} letters`, kind: "error" });
      return;
    }

    const normalized = currentGuess.toLowerCase();

    if (!WORD_SET.has(normalized)) {
      setToast({ message: "Not in word list", kind: "error" });
      return;
    }

    const result = evaluateGuess(normalized, targetWord);
    const nextGuesses: GuessRow[] = [...guesses, { guess: normalized, result }];

    setGuesses(nextGuesses);
    setCurrentGuess("");

    setKeyStatuses((prev) => {
      const next = { ...prev };

      for (let i = 0; i < WORD_LENGTH; i++) {
        const letter = normalized[i]?.toUpperCase();
        if (!letter) continue;

        const nextStatus = result[i] ?? "empty";
        const previousStatus = next[letter] ?? "empty";

        if (getStatusPriority(nextStatus) > getStatusPriority(previousStatus)) {
          next[letter] = nextStatus;
        }
      }

      return next;
    });

    if (normalized === targetWord) {
      setStatus("won");
      setToast({ message: "You got it!", kind: "success" });
      return;
    }

    if (nextGuesses.length >= MAX_ATTEMPTS) {
      setStatus("lost");
      setToast({
        message: `Out of attempts. The word was ${targetWord.toUpperCase()}.`,
        kind: "info",
      });
    }
  }, [currentGuess, guesses, isGameOver, targetWord]);

  const handleKeyPress = useCallback(
    (rawKey: string) => {
      const key = normalizeKey(rawKey);
      if (!key) return;
      if (isGameOver) return;

      if (key === "ENTER") {
        submitGuess();
        return;
      }

      if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
        return;
      }

      setCurrentGuess((prev) => {
        if (prev.length >= WORD_LENGTH) return prev;
        return `${prev}${key.toLowerCase()}`;
      });
    },
    [isGameOver, submitGuess],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const key = event.key;

      if (key === "Enter") {
        event.preventDefault();
        handleKeyPress("ENTER");
        return;
      }

      if (key === "Backspace") {
        event.preventDefault();
        handleKeyPress("BACKSPACE");
        return;
      }

      if (/^[a-z]$/i.test(key)) {
        handleKeyPress(key);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleKeyPress]);

  useEffect(() => {
    if (!toast) return;

    if (toastTimeout.current) window.clearTimeout(toastTimeout.current);
    toastTimeout.current = window.setTimeout(() => setToast(null), 2000);

    return () => {
      if (toastTimeout.current) window.clearTimeout(toastTimeout.current);
    };
  }, [toast]);

  const resetGame = useCallback(() => {
    setTargetWord(getRandomWord());
    setGuesses([]);
    setCurrentGuess("");
    setStatus("playing");
    setToast(null);
    setKeyStatuses({});
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-6">
      <header className="flex w-full flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Wordle</h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          Guess the {WORD_LENGTH}-letter word in {MAX_ATTEMPTS} tries.
        </p>
      </header>

      <div className="flex w-full max-w-xl flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-zinc-700 dark:text-zinc-200">
          <div>
            Attempt {attemptNumber} of {MAX_ATTEMPTS}
          </div>
          <div>Remaining: {Math.max(remainingAttempts, 0)}</div>
        </div>

        {toast ? (
          <div
            className={[
              "rounded-md px-3 py-2 text-sm font-medium",
              getToastClassName(toast),
            ].join(" ")}
            role="status"
            aria-live="polite"
          >
            {toast.message}
          </div>
        ) : null}

        <Board
          guesses={guesses}
          currentGuess={currentGuess}
          isGameOver={isGameOver}
        />

        {status === "won" ? (
          <div className="rounded-md border border-green-600 bg-green-50 p-3 text-sm text-green-900 dark:border-green-500 dark:bg-green-950 dark:text-green-100">
            You won in {guesses.length} {guesses.length === 1 ? "try" : "tries"}.
          </div>
        ) : null}

        {status === "lost" ? (
          <div className="rounded-md border border-amber-600 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-500 dark:bg-amber-950 dark:text-amber-100">
            Better luck next time. The word was {targetWord.toUpperCase()}.
          </div>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={resetGame}
            className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
          >
            Play again
          </button>

          <div className="text-sm text-zinc-500 dark:text-zinc-300">
            Press Enter to submit • Backspace to delete.
          </div>
        </div>

        <Keyboard
          keyStatuses={keyStatuses}
          disabled={isGameOver}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
}
