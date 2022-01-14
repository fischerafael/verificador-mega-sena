class Util {
  onAdd = (
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

  onRemove = (number: number, array: number[], setArray: (e: any) => void) => {
    const filteredResult = array.filter((num) => num !== number);
    setArray(filteredResult);
  };
}

export const util = new Util();
