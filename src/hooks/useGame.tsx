import { useState } from "react";

export const useGame = () => {
  const [game, setGame] = useState<number[]>([]);
  const [gameNumber, setGameNumber] = useState<number>(0);

  return { game, setGame, gameNumber, setGameNumber };
};
