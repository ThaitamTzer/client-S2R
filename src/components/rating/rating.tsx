'use client'

import ratingService from '@/services/rating/rating.service'
import { RatingType } from '@/types/rating'
import useRatingStore from '@/zustand/rating'
import { Divider, Modal } from '@mantine/core'
import { useState } from 'react'
import useSWR from 'swr'
import { Avatar } from '@mantine/core'
import IconifyIcon from '../icons'
import { formatDate } from '../product-management/column'

export default function ViewRatingModal() {
  const { openRatingModal, toggleRatingModal, userId } = useRatingStore()
  const [ratingData, setRatingData] = useState<RatingType[]>([])

  useSWR('/api/rating/get-list-detail-rating', () => ratingService.getRatingByUserId('66f7223c232a6ff5e0b8ee85'), {
    onSuccess: (data) => {
      setRatingData(data)
    },
  })

  console.log(ratingData)
  console.log(userId)

  return (
    <Modal opened={openRatingModal} onClose={toggleRatingModal} title="Đánh giá của người bán" centered size="lg">
      <div className="flex flex-col gap-2">
        {ratingData.map((rating) => (
          <>
            {rating ? (
              <>
                <div key={rating._id} className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-2">
                    <Avatar
                      src={rating.userId.avatar}
                      alt={rating.userId.firstname + ' ' + rating.userId.lastname}
                      radius="xl"
                      size="md"
                    />
                    <div className="flex flex-col ">
                      <p className="text-md font-semibold">
                        {rating.userId.firstname} {rating.userId.lastname} ({formatDate(rating.createdAt)}){' '}
                        {rating.targetType === 'sale' ? '( Đơn mua )' : '( Đơn trao đổi )'}
                      </p>
                      <div className="flex flex-row items-center gap-2">
                        <p className="text-sm font-semibold">{rating.rating} / 5</p>
                        <IconifyIcon icon="fluent-emoji-flat:star" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-black text-sm">Nội dung:</span>
                    <div className="w-full h-auto min-h-[20px] bg-gray-400 rounded-sm p-1 px-2">
                      <p className="text-md">{rating.comment}</p>
                    </div>
                  </div>
                </div>
                {ratingData.length > 1 && <Divider />}
              </>
            ) : (
              <div className="flex flex-1 ">
                <p className="text-xl">Chưa có đánh giá nào</p>
              </div>
            )}
          </>
        ))}
      </div>
    </Modal>
  )
}
