import {
  Button,
  Flex,
  HStack,
  Input,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { IPrize } from "../data/interfaces";

import { useGame } from "../hooks/useGame";
import { useGetTotalCorrect } from "../hooks/useGetTotalCorrect";
import { useResult } from "../hooks/useResult";
import { util } from "../utils/Util";

export const HomePage = () => {
  const {
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
  } = useResult();
  const { game, setGame, gameNumber, setGameNumber } = useGame();
  const { gamesCorrect } = useGetTotalCorrect(game, result);

  useEffect(() => {
    if (display) return;
    (async () => {
      const res = await fetch(
        "https://loteriascaixa-api.herokuapp.com/api/mega-sena/latest"
      );
      const data = (await res.json()) as {
        dezenas: number[];
        concurso: number;
        data: string;
        premiacoes: IPrize[];
      };

      console.log(data);

      const numberArray = data?.dezenas?.map((string) => +string);

      setResult(numberArray);
      setConcourse(data?.concurso.toString());
      setDate(data?.data);
    })();
  }, [display]);

  return (
    <Flex
      w="full"
      bg="gray.800"
      color="gray.50"
      minH="100vh"
      justify="center"
      py="8"
      fontFamily="mono"
      fontSize="sm"
    >
      <VStack width="container.sm" p="4" spacing="16">
        <VStack w="full" spacing="0">
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="green.300"
            textAlign="center"
          >
            Verificador da Mega-Sena
          </Text>
          <Text>Confira quantos números você acertou!</Text>
        </VStack>

        <VStack w="full" align="flex-start">
          <HStack justify="space-between" w="full" align="flex-start">
            <Text fontSize="lg">
              Números Sorteados {concourse} - {date}
            </Text>

            <VStack align="flex-end">
              <Switch
                colorScheme="green"
                onChange={() => setDisplay((prev) => !prev)}
              />
              <Text fontSize="xs">Editar Manualmente</Text>
            </VStack>
          </HStack>

          <HStack spacing="4" justify="center" w="full">
            {result?.map((number) => (
              <BallComponent
                key={number}
                number={number}
                onClick={() => {
                  if (!display) return;
                  util.onRemove(number, result, setResult);
                }}
              />
            ))}
          </HStack>

          {display && (
            <>
              <Text>Adicionar Números do Concurso Manualmente</Text>
              <HStack spacing="8" w="full" justify="space-between">
                <Input
                  type="number"
                  value={resultNumber}
                  onChange={(e) => setResultNumber(+e.target.value)}
                />
                <CustomButton
                  onClick={() =>
                    util.onAdd(result, resultNumber, setResult, setResultNumber)
                  }
                  label="Adicionar"
                />
              </HStack>
            </>
          )}
        </VStack>

        {result.length === 6 && (
          <>
            <VStack pt="8" w="full" align="flex-start">
              <Text>Números Apostados</Text>

              <HStack spacing="8" w="full" justify="space-between">
                <Input
                  type="number"
                  value={gameNumber}
                  onChange={(e) => setGameNumber(+e.target.value)}
                />
                <CustomButton
                  onClick={() =>
                    util.onAdd(game, gameNumber, setGame, setGameNumber)
                  }
                  label="Adicionar"
                />
              </HStack>

              <HStack spacing="4" justify="center" w="full">
                {game?.map((num) => (
                  <BallComponent
                    key={num}
                    number={num}
                    onClick={() => util.onRemove(num, game, setGame)}
                  />
                ))}
              </HStack>

              <VStack w="full" align="center">
                <Text>Números Corretos</Text>

                <Text
                  fontSize="6xl"
                  fontWeight="black"
                  color="green.300"
                  textAlign="center"
                >
                  {gamesCorrect}
                </Text>

                {gamesCorrect === 4 && (
                  <Text
                    fontSize="3xl"
                    fontWeight="black"
                    color="green.300"
                    textAlign="center"
                  >
                    Parabéns, ganhou na quadra!
                  </Text>
                )}
              </VStack>
            </VStack>
          </>
        )}
      </VStack>
    </Flex>
  );
};

const CustomButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: (e: any) => void;
}) => {
  return (
    <Button
      onClick={onClick}
      bg="green.300"
      _hover={{ background: "green.700" }}
    >
      {label}
    </Button>
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
        bg="gray.900"
        h="10"
        w="10"
        shadow="md"
        borderRadius="full"
      >
        <Text fontWeight="bold" color="green.300">
          {number}
        </Text>
      </Flex>
    </HStack>
  );
};
