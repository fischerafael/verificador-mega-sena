import { useState } from "react";
import { IPrize } from "../data/interfaces";

export const useResult = () => {
  const [result, setResult] = useState<number[]>([]);
  const [resultNumber, setResultNumber] = useState<number>(0);
  const [concourse, setConcourse] = useState("");
  const [date, setDate] = useState("");
  const [display, setDisplay] = useState(false);
  const [prizes, setPrizes] = useState(
    {} as {
      quadra: IPrize | undefined;
      quina: IPrize | undefined;
      sena: IPrize | undefined;
    }
  );

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
    prizes,
    setPrizes,
  };
};
