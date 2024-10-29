export type CreateExchangeType = {
  requestProduct: {
    productId: string
    size: string
    colors: string
    amount: number
  }
  receiveProduct: {
    productId: string
    size: string
    colors: string
    amount: number
  }
  note?: string
}

export type ExchangeType = {
  _id: string
  requesterId: {
    _id: string
    firstname: string
    lastname: string
    email: string
    avatar: string
  }
  receiverId: {
    _id: string
    firstname: string
    lastname: string
    email: string
    avatar: string
  }
  requestProduct: {
    requesterProductId: {
      _id: string
      productName: string
      imgUrls: string[]
    }
    size: string
    colors: string
    amount: number
  }
  receiveProduct: {
    receiverProductId: {
      _id: string
      productName: string
      imgUrls: string[]
    }
    size: string
    colors: string
    amount: number
    _id: string
  }
  receiverStatus: {
    exchangeStatus: 'pending' | 'shipping' | 'completed' | 'canceled'
    confirmStatus: 'pending' | 'confirmed'
    statusDate: string | Date
    _id: string
  }
  requestStatus: {
    exchangeStatus: 'pending' | 'shipping' | 'completed' | 'canceled'
    confirmStatus: 'pending' | 'confirmed'
    statusDate: string | Date
    _id: string | Date
  }
  allExchangeStatus: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled'
  shippingMethod: string
  note: string
  completedAt: string | Date
  createdAt: string | Date
  updatedAt: string | Date
  role: string
}
