export type UpdateAddressOrder = {
  address: string
  phone: string
  type: string
}

export type CreateOrderNow = {
  productId: string
  quantity: number
  size: string
  color: string
}

export type CreateOrderRes = {
  message: string
  order: Order
}

type User = {
  _id: string
  firstname: string
  lastname: string
  email: string
  avatar: string
  address: string
  phone: string
}

export type Product = {
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
}

export type SubOrder = {
  _id: string
  orderId: string
  sellerId: {
    _id: string
    firstname: string
    lastname: string
    avatar: string
    email: string
  }
  subTotal: number
  products: Product[]
  status: string
  orderUUID: string
  shippingService: string
  shippingFee: number
  note: string | null
}

export type DataOrder = {
  _id: string
  userId: User
  phone: string
  address: string
  totalAmount: number
  paymentStatus: string
  transactionId: string | null
  type: string
  subOrders: SubOrder[]
  createdAt: string | Date
  updatedAt: string | Date
}

export type Order = {
  _id: string
  userId: User
  phone: string
  address: string
  totalAmount: number
  paymentStatus: string
  transactionId: string | null
  type: string
  subOrders: SubOrder[]
  createdAt: string | Date
  updatedAt: string | Date
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
}

export type OrderById = {
  data: DataOrder
  summary: {
    totalAmount: number
    totalTypes: number
    totalPrice: number
    totalShippingFee: number
  }
}

export type Orders = {
  data: Order[]
}
