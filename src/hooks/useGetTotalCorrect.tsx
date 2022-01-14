import { useEffect, useState } from "react";

export const useGetTotalCorrect = (game: number[], result: number[]) => {
  const [gamesCorrect, setGamesCorrect] = useState(0);

  console.log(gamesCorrect);

  useEffect(() => {
    const getCorrectNumbersArray = (
      gameArray: number[],
      resultArray: number[]
    ) => {
      const results = gameArray.map((num) => isNumberOnArray(resultArray, num));
      return results;
    };

    const isNumberOnArray = (array: number[], number: number) => {
      const hasNumber = array.includes(number);
      return hasNumber;
    };

    const totalTrues = getCorrectNumbersArray(game, result).filter(
      (value) => value === true
    ).length;

    setGamesCorrect(totalTrues);
  }, [game, result]);

  return {
    gamesCorrect,
  };
};
