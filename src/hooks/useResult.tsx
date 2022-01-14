import { useState } from "react";

export const useResult = () => {
  const [result, setResult] = useState<number[]>([]);
  const [resultNumber, setResultNumber] = useState<number>(0);

  return { result, setResult, resultNumber, setResultNumber };
};
