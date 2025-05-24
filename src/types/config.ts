export type ConfigType = {
  _id: string
  sectionUrl_1: string
  sectionUrl_2: string
  videoUrl_1: string
  videoUrl_2: string
  valueToPoint: number
  valueToPromotion: number
  reportWarning: number
  reprotBlockerProduct: number
  reportBlockUser: number
  createdAt: string
  updatedAt: string
  valueToCross: number
  paymentMethod: {
    momoPayment: boolean
    bonusPayment: boolean
    CODPayment: boolean
    _id: string
  }
  userCan: {
    userCanBuy: boolean
    userCanSell: boolean
    userCanExchange: boolean
    userCanDonate: boolean
    _id: string
  }
}
