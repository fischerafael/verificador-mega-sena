import { Button, Flex, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

export const HomePage = () => {
  const [result, setResult] = useState<number[]>([]);
  const [resultNumber, setResultNumber] = useState<number>(0);

  const onAdd = () => {
    if (!resultNumber) return;
    if (result.includes(resultNumber)) return;
    if (resultNumber <= 0) return;
    if (resultNumber > 60) return;
    setResult([...result, resultNumber]);
    setResultNumber(0);
  };

  const onRemove = (number: number) => {
    const filteredResult = result.filter((num) => num !== number);
    setResult(filteredResult);
  };

  console.log(resultNumber, result);

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
            <Button onClick={onAdd}>Adicionar</Button>
          </HStack>
        </VStack>

        <HStack spacing="4">
          {result?.map((number) => (
            <BallComponent
              key={number}
              number={number}
              onClick={() => onRemove(number)}
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
