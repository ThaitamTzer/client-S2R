type requesterId = {
  _id: string
  firstname: string
  lastname: string
  email: string
  avatar: string
}

type receiverId = {
  _id: string
  firstname: string
  lastname: string
  email: string
  avatar: string
}

type requesterProductId = {
  _id: string
  productName: string
  imgUrls: string[]
}

type receiverProductId = {
  _id: string
  productName: string
  imgUrls: string[]
}

type requestProduct = {
  requesterProductId: requesterProductId
  size: string
  colors: string
  amount: number
  _id?: string
}

type receiveProduct = {
  receiverProductId: receiverProductId
  size: string
  colors: string
  amount: number
  _id?: string
}

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
  requesterId: requesterId
  receiverId: receiverId
  requestProduct: requestProduct
  receiveProduct: receiveProduct
  exchangeStatus: 'pending' | 'accepted' | 'rejected' | 'completed' | 'canceled'
  shippingMethod: string
  note: string
  completedAt: Date | string
  createdAt: Date | string
  updatedAt: Date | string
  receiverExchangeStatus: 'pending' | 'shipping' | 'delivered' | 'canceled'
  requesterExchangeStatus: 'pending' | 'shipping' | 'delivered' | 'canceled'
  role: 'requester' | 'receiver'
}
