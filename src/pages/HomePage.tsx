import { Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";

import { useGame } from "../hooks/useGame";
import { useGetTotalCorrect } from "../hooks/useGetTotalCorrect";
import { useResult } from "../hooks/useResult";
import { util } from "../utils/util";

export const HomePage = () => {
  const { result, setResult, resultNumber, setResultNumber } = useResult();
  const { game, setGame, gameNumber, setGameNumber } = useGame();
  const { gamesCorrect } = useGetTotalCorrect(game, result);

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
      <VStack width="container.sm" p="4" spacing="8">
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
          <Text>Números Sorteados</Text>

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

          <HStack spacing="4">
            {result?.map((number) => (
              <BallComponent
                key={number}
                number={number}
                onClick={() => util.onRemove(number, result, setResult)}
              />
            ))}
          </HStack>
        </VStack>

        {result.length === 6 && (
          <>
            <VStack w="full" align="flex-start">
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

              <HStack spacing="4">
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
                  fontSize="3xl"
                  fontWeight="bold"
                  color="green.300"
                  textAlign="center"
                >
                  {gamesCorrect}
                </Text>
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
