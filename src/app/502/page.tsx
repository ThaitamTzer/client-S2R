'use client'
import { Button, Container, Title, Text, Group, Center } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { IconServerOff, IconRefresh } from '@tabler/icons-react'

export default function Error502Page() {
  const router = useRouter()

  const handleRefresh = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <Container size="md" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <Center style={{ width: '100%', flexDirection: 'column', textAlign: 'center' }}>
        <IconServerOff size={120} color="gray" stroke={1.5} />

        <Title order={1} mt="xl" mb="md">
          502 - Lỗi máy chủ
        </Title>

        <Text size="lg" color="dimmed" maw={600} mb="xl">
          Xin lỗi, chúng tôi đang gặp sự cố với máy chủ. Vui lòng thử lại sau ít phút.
        </Text>

        <Text size="sm" color="dimmed" mb="xl">
          Nếu sự cố vẫn tiếp diễn, vui lòng liên hệ với bộ phận hỗ trợ.
        </Text>

        <Group>
          <Button variant="filled" size="md" leftSection={<IconRefresh size={18} />} onClick={handleRefresh}>
            Thử lại
          </Button>

          <Button variant="light" size="md" onClick={handleGoHome}>
            Về trang chủ
          </Button>
        </Group>
      </Center>
    </Container>
  )
}
