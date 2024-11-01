'use client'

import { Breadcrumb as AntBreadcrumb } from 'antd'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  link: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbItems = items?.map((item, index) => ({
    title:
      index === items.length - 1 ? (
        <span>{item.label}</span>
      ) : (
        <Link href={item.link}>{item.label}</Link>
      ),
  }))

  return (
    <AntBreadcrumb
      items={breadcrumbItems}
      style={{
        fontWeight: 'bold',
        color: '#000',
        marginBottom: '20px',
        marginTop: '20px',
        gap: '10px',
        flexWrap: 'wrap',
        width: '100%',
      }}
    />
  )
}
