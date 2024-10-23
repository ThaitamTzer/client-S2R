export const formatPrice = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
  }).format(number)
}
