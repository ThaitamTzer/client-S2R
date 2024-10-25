export const formatPrice = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
  }).format(number)
}

export const truncateText = (text: string, maxLength: number) => {
  if (text?.length <= maxLength) return text
  return text?.substring(0, maxLength) + '...'
}
