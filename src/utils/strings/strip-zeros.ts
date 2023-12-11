export const stripZeros = (gsIdValue: string) => {
  return gsIdValue.replace(/([A-Za-z]+)0+(\d+)/i, "$1$2");
};
