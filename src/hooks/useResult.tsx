import { useState } from "react";

export const useResult = () => {
  const [result, setResult] = useState<number[]>([]);
  const [resultNumber, setResultNumber] = useState<number>(0);
  const [concourse, setConcourse] = useState("");
  const [date, setDate] = useState("");
  const [display, setDisplay] = useState(false);

  return {
    result,
    setResult,
    resultNumber,
    setResultNumber,
    concourse,
    setConcourse,
    date,
    setDate,
    display,
    setDisplay,
  };
};
