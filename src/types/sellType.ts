export type Sell = {
  _id: string
  orderId: {
    _id: string
    paymentStatus: string
  }
  sellerId: string
  subTotal: number
  products: [
    {
      _id: string
      subOrderId: string
      productId: {
        _id: string
        imgUrls: string[]
      }
      productName: string
      quantity: number
      price: number
      size: string
      color: string
    },
  ]
  status: string
  createdAt: string
  updatedAt: string
  orderUUID: string
}

export type SellType = {
  data: Sell[]
}
