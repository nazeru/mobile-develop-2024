export const currencyFormat = (number) => {
  return new Intl.NumberFormat("ru-RU").format(number) + ' ₽'
}