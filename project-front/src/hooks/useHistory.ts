"use client";

import { useCallback, useEffect, useState } from "react";

export interface UseHistoryOptions {
  maxHistorySize?: number;
  enableKeyboardShortcuts?: boolean;
}

export interface UseHistoryReturn<T> {
  state: T;
  setState: (newState: T | ((prev: T) => T)) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  reset: (newInitialState?: T) => void;
  undoCount: number;
  redoCount: number;
}

interface HistoryState<T> {
  past: T[];
  present: T;
  future: T[];
}

export function useHistory<T>(
  initialState: T,
  options: UseHistoryOptions = {}
): UseHistoryReturn<T> {
  const { maxHistorySize = 50, enableKeyboardShortcuts = true } = options;

  const [history, setHistoryState] = useState<HistoryState<T>>({
    past: [],
    present: initialState,
    future: [],
  });

  const setState = useCallback(
    (newState: T | ((prev: T) => T)) => {
      setHistoryState((prev) => {
        const resolvedState =
          typeof newState === "function"
            ? (newState as (prev: T) => T)(prev.present)
            : newState;

        if (resolvedState === prev.present) {
          return prev;
        }

        const newPast = [...prev.past, prev.present];
        if (newPast.length > maxHistorySize) {
          newPast.shift(); // Remove oldest entry
        }

        return {
          past: newPast,
          present: resolvedState,
          future: [], // Clear future on new action
        };
      });
    },
    [maxHistorySize]
  );

  const undo = useCallback(() => {
    setHistoryState((prev) => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistoryState((prev) => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const reset = useCallback(
    (newInitialState?: T) => {
      setHistoryState({
        past: [],
        present: newInitialState ?? initialState,
        future: [],
      });
    },
    [initialState]
  );

  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      const isCtrlOrCmd = e.ctrlKey || e.metaKey;

      if (isCtrlOrCmd && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if (
        isCtrlOrCmd &&
        (e.key === "y" || (e.key === "z" && e.shiftKey))
      ) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardShortcuts, undo, redo]);

  return {
    state: history.present,
    setState,
    undo,
    redo,
    canUndo: history.past.length > 0,
    canRedo: history.future.length > 0,
    reset,
    undoCount: history.past.length,
    redoCount: history.future.length,
  };
}

export default useHistory;
