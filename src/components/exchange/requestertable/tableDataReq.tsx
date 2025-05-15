'use client'

import { columns } from './columnReq'
import { DataTable } from 'mantine-datatable'
import { useRouter, useSearchParams } from 'next/navigation'
import { Select } from 'antd'
import exChangeService from '@/services/exchange/exchange.service'
import useSWR from 'swr'
import { useExchange } from '@/zustand/exchange'
import { useCallback, useMemo, useState } from 'react'
import { useMediaQuery } from '@mantine/hooks'
import { Box, Title, Paper, Stack, Text, Group, ActionIcon, Menu, Avatar, Badge } from '@mantine/core'
import { IconDotsVertical, IconEye } from '@tabler/icons-react'
import Image from 'next/image'
import { truncateText } from '@/helper/format'
import { getAllExchangeStatusName } from '@/helper/getName'

export default function TableDataReq() {
  const [total, setTotal] = useState(0)
  const [allUsers, setAllUsers] = useState<{ value: string; label: string }[]>([])
  const param = useSearchParams()
  const router = useRouter()
  const page = Number(param.get('page')) || 1
  const limit = Number(param.get('limit')) || 10
  const filterUserIds = param.getAll('filterUserId')
  const isDesktop = useMediaQuery('(min-width: 62em)')

  const { isLoading, data: exchanges } = useSWR(
    ['exchanges', page, limit, ...filterUserIds, 'requester'],
    () => exChangeService.getAll(page, limit, filterUserIds.join(','), 'requester'),
    {
      onSuccess: (data) => {
        setTotal(data?.total)
      },
    },
  )

  // Tính toán STT cho mỗi bản ghi
  const recordsWithIndex = useMemo(() => {
    return (
      exchanges?.data?.map((record, index) => ({
        ...record,
        index: (page - 1) * limit + index + 1,
      })) || []
    )
  }, [exchanges, page, limit])

  const handlePageChange = useCallback(
    (page: number) => {
      const currentFilters = param.getAll('filterUserId')
      const filterParams = currentFilters.map((id) => `filterUserId=${id}`).join('&')
      const queryString = `page=${page}&limit=${limit}${filterParams ? '&' + filterParams : ''}`
      router.push(`/exchange-management?tab=requester&${queryString}`, { scroll: false })
    },
    [param, limit, router],
  )

  const handlePageSizeChange = useCallback(
    (pageSize: number) => {
      const currentFilters = param.getAll('filterUserId')
      const filterParams = currentFilters.map((id) => `filterUserId=${id}`).join('&')
      const queryString = `page=1&limit=${pageSize}${filterParams ? '&' + filterParams : ''}`
      router.push(`/exchange-management?tab=requester&${queryString}`, { scroll: false })
    },
    [param, router],
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'canceled':
      case 'rejected':
        return 'red'
      case 'pending':
        return 'yellow'
      case 'completed':
        return 'green'
      case 'accepted':
        return 'blue'
      default:
        return 'gray'
    }
  }

  useSWR('forAllUsers', () => exChangeService.getAll(1, 100, ''), {
    onSuccess: (data) => {
      if (!data || !data.data) {
        return
      }
      const uniqueUsers = new Map()

      data?.data
        .filter((user) => user.role === 'requester')
        .forEach((user) => {
          const receiverId = user.receiverId._id
          if (!uniqueUsers.has(receiverId)) {
            uniqueUsers.set(receiverId, {
              value: receiverId,
              label: user.receiverId.firstname + ' ' + user.receiverId.lastname,
            })
          }
        })

      setAllUsers(Array.from(uniqueUsers.values()))
    },
  })

  const mobileColumns = [
    {
      accessor: 'mobileView',
      title: '',
      render: (record: any) => (
        <Stack gap="xs">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="xs" wrap="nowrap">
              <Avatar
                size="sm"
                src={record.role === 'requester' ? record.receiverId.avatar : record.requesterId.avatar}
                alt={record.role === 'requester' ? record.receiverId.firstname : record.requesterId.firstname}
              />
              <Text size="sm" fw={500} lineClamp={1}>
                {record.role === 'requester'
                  ? record.receiverId.firstname + ' ' + record.receiverId.lastname
                  : record.requesterId.firstname + ' ' + record.requesterId.lastname}
              </Text>
            </Group>
            <Group gap="xs" wrap="nowrap">
              <Badge color={getStatusColor(record.allExchangeStatus)} variant="light" size="sm">
                {getAllExchangeStatusName(record.allExchangeStatus)}
              </Badge>
              <Menu position="bottom-end" withinPortal>
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDotsVertical size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconEye size={16} />}
                    onClick={() => {
                      setTimeout(() => {
                        useExchange.getState().setOpenViewExchangeModal(true)
                      }, 200)
                      useExchange.getState().setExchangeId(record._id)
                    }}
                  >
                    Xem chi tiết
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>

          <Group gap="xs" align="flex-start">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={
                  record.role === 'requester'
                    ? record.requestProduct.requesterProductId.imgUrls[0]
                    : record.receiveProduct.receiverProductId.imgUrls[0]
                }
                alt={
                  record.role === 'requester'
                    ? record.requestProduct.requesterProductId.productName
                    : record.receiveProduct.receiverProductId.productName
                }
                fill
                className="object-cover rounded-md"
                sizes="64px"
              />
            </div>
            <Stack gap={2} style={{ flex: 1 }}>
              <Text size="xs" c="dimmed">
                Sản phẩm cần đổi:
              </Text>
              <Text size="xs" className="break-words max-w-[250px] md:max-w-full">
                {truncateText(
                  record.role === 'requester'
                    ? record.requestProduct.requesterProductId.productName
                    : record.receiveProduct.receiverProductId.productName,
                  50,
                )}
              </Text>
            </Stack>
          </Group>

          <Group gap="xs" align="flex-start">
            <div className="relative w-16 h-16 flex-shrink-0">
              <Image
                src={
                  record.role === 'requester'
                    ? record.receiveProduct.receiverProductId.imgUrls[0]
                    : record.requestProduct.requesterProductId.imgUrls[0]
                }
                alt={
                  record.role === 'requester'
                    ? record.receiveProduct.receiverProductId.productName
                    : record.requestProduct.requesterProductId.productName
                }
                fill
                className="object-cover rounded-md"
                sizes="64px"
              />
            </div>
            <Stack gap={2} style={{ flex: 1 }}>
              <Text size="xs" c="dimmed">
                Sản phẩm của bạn:
              </Text>
              <Text size="xs" className="break-words max-w-[250px] md:max-w-full">
                {truncateText(
                  record.role === 'requester'
                    ? record.receiveProduct.receiverProductId.productName
                    : record.requestProduct.requesterProductId.productName,
                  50,
                )}
              </Text>
            </Stack>
          </Group>
        </Stack>
      ),
    },
  ]

  return (
    <Paper shadow="xs" p="md" withBorder>
      <Box mb="md">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Title order={2}>Danh sách trao đổi</Title>
          <Select
            style={{ width: isDesktop ? '50%' : '100%' }}
            size="large"
            mode="multiple"
            placeholder="Chọn người nhận yêu cầu"
            options={allUsers}
            allowClear
            value={param.getAll('filterUserId')}
            onChange={(values) => {
              const currentParams = new URLSearchParams(window.location.search)
              currentParams.delete('filterUserId')
              values.forEach((id: string) => {
                currentParams.append('filterUserId', id)
              })
              router.push(
                `/exchange-management?tab=requester&${currentParams.toString() ? '?' + currentParams.toString() : ''}`,
              )
            }}
          />
        </div>
      </Box>

      <DataTable
        borderRadius="sm"
        striped
        withTableBorder
        highlightOnHover
        columns={isDesktop ? columns : mobileColumns}
        records={recordsWithIndex}
        totalRecords={total}
        recordsPerPage={limit}
        fetching={isLoading}
        page={page}
        onPageChange={handlePageChange}
        onRecordsPerPageChange={handlePageSizeChange}
        recordsPerPageOptions={[10, 20, 50]}
        recordsPerPageLabel="Số hàng mỗi trang"
        paginationText={({ from, to, totalRecords }) => `Hiển thị ${from} - ${to} của ${totalRecords} mục`}
        noRecordsText="Không có dữ liệu"
        loadingText="Đang tải..."
        minHeight={150}
        height={isDesktop ? 500 : 700}
        maxHeight={isDesktop ? 500 : 700}
        verticalSpacing="sm"
        horizontalSpacing="xs"
        scrollAreaProps={{ type: 'scroll' }}
      />
    </Paper>
  )
}
