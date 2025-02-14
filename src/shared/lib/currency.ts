export const currencyConverter = (price: number) => {
  return new Intl.NumberFormat('ko-KR').format(price);
};
