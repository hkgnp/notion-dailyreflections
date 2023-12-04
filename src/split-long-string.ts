export const splitLongString = (str: string, maxLength: number): string[] => {
  const result: string[] = [];

  for (let i = 0; i < str.length; i += maxLength) {
    result.push(str.substring(i, i + maxLength));
  }

  return result;
};
