import { Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const HomePage = () => {
  const [result, setResult] = useState<number[]>([]);
  const [resultNumber, setResultNumber] = useState<number>(0);

  const onAdd = (
    array: number[],
    number: number,
    setArray: (e: any) => void,
    setNumber: (e: any) => void
  ) => {
    if (!number) return;
    if (array.includes(number)) return;
    if (number <= 0) return;
    if (number > 60) return;
    if (array.length >= 6) return;
    setArray([...array, number]);
    setNumber(0);
  };

  const onRemove = (
    number: number,
    array: number[],
    setArray: (e: any) => void
  ) => {
    const filteredResult = array.filter((num) => num !== number);
    setArray(filteredResult);
  };

  const [game, setGame] = useState<number[]>([]);
  const [gameNumber, setGameNumber] = useState<number>(0);

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
                onAdd(result, resultNumber, setResult, setResultNumber)
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
              onClick={() => onRemove(number, result, setResult)}
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
              onClick={() => onAdd(game, gameNumber, setGame, setGameNumber)}
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
              onClick={() => onRemove(num, game, setGame)}
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
