import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  // Transition from previous mode to the next,
  function transition(newMode, replace = false) {
    setMode(newMode);
    if (replace) {
      setHistory((prev) => {
        const tempArr = [...prev];
        tempArr.pop();
        return tempArr;
      });
    }
    setHistory((prev) => [...prev, newMode]);
  }

  // Goes back to the previous mode if
  // the history is not in its initial state
  function back() {
    if (history.length > 1) {
      setHistory((prev) => {
        const tempArr = [...prev];
        tempArr.pop();
        setMode(tempArr[tempArr.length - 1]);
        return tempArr;
      });
    }
  }

  return {
    mode,
    transition,
    back,
  };
}
