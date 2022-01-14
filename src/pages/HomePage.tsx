import { Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";

import { useGame } from "../hooks/useGame";
import { useResult } from "../hooks/useResult";
import { util } from "../utils/util";

export const HomePage = () => {
  const { result, setResult, resultNumber, setResultNumber } = useResult();
  const { game, setGame, gameNumber, setGameNumber } = useGame();

  const onRemove = (
    number: number,
    array: number[],
    setArray: (e: any) => void
  ) => {
    const filteredResult = array.filter((num) => num !== number);
    setArray(filteredResult);
  };

  console.log(game);

  return (
    <Flex w="full" bg="gray.50" minH="100vh" justify="center" py="8">
      <VStack width="container.sm">
        <Text fontSize="xl">Verificador da Mega-Sena</Text>

        <VStack w="full" align="flex-start">
          <Text>Números Sorteados</Text>

          <HStack spacing="8" w="full" justify="space-between">
            <Input
              type="number"
              value={resultNumber}
              onChange={(e) => setResultNumber(+e.target.value)}
            />
            <Button
              onClick={() =>
                util.onAdd(result, resultNumber, setResult, setResultNumber)
              }
            >
              Adicionar
            </Button>
          </HStack>
        </VStack>

        <HStack spacing="4">
          {result?.map((number) => (
            <BallComponent
              key={number}
              number={number}
              onClick={() => util.onRemove(number, result, setResult)}
            />
          ))}
        </HStack>

        <VStack w="full" align="flex-start">
          <Text>Números Apostados</Text>

          <HStack spacing="8" w="full" justify="space-between">
            <Input
              type="number"
              value={gameNumber}
              onChange={(e) => setGameNumber(+e.target.value)}
            />
            <Button
              onClick={() =>
                util.onAdd(game, gameNumber, setGame, setGameNumber)
              }
            >
              Adicionar
            </Button>
          </HStack>
        </VStack>

        <HStack spacing="4">
          {game?.map((num) => (
            <BallComponent
              key={num}
              number={num}
              onClick={() => util.onRemove(num, game, setGame)}
            />
          ))}
        </HStack>
      </VStack>
    </Flex>
  );
};

const BallComponent = ({
  number,
  onClick,
}: {
  number: number;
  onClick: (number: any) => void;
}) => {
  return (
    <HStack
      spacing="8"
      justify="space-between"
      py="8"
      cursor="pointer"
      onClick={onClick}
    >
      <Flex
        justify="center"
        align="center"
        bg="white"
        h="10"
        w="10"
        shadow="md"
        borderRadius="full"
      >
        <Text>{number}</Text>
      </Flex>
    </HStack>
  );
};
