'use client'
import { useForm } from '@mantine/form'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import bankService from '@/services/bank/bank.service'
import { Banking } from '@/services/order/order.service'

export default function BankingInfor() {
  const { user } = useAuth()
  console.log(user)

  const [banking, setBanking] = useState<Banking[]>([])

  useEffect(() => {
    bankService.listBanking().then((res) => {
      setBanking(res.data)
    })
  }, [])

  const filterBanking = banking.filter((bank) => bank.short_name === user?.banking?.bankingName)

  console.log('filterBanking', filterBanking)

  const form = useForm({
    initialValues: {
      bankingNumber: '',
      bankingName: '',
      bankingNameUser: '',
      bankingBranch: '',
    },
    validateInputOnChange: true,
  })

  return (
    <>
      <div className="container px-1 md:px-10 mx-auto">
        <div className="title text-black text-2xl font-semibold">
          <h2>Thông tin thanh toán</h2>
        </div>
        <div className="container mx-auto px-1 mt-5">
          <div className="card bg-white shadow-2xl rounded-md w-full h-auto">
            <div className="form p-3 md:p-8">
              <form onSubmit={form.onSubmit((values) => console.log(values))}>
                {/* Card Banking UI */}
                <div className="w-[300px] h-[170px] bg-blue-500 shadow-md rounded-lg"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
