import { navLink } from '@/types/navTypes'
export const TypeCategory: navLink[] = [
  {
    href: '/shop',
    label: 'Tất cả sản phẩm',
  },
  {
    href: '/shop?filterTypeCategory=female',
    label: 'Thời trang nữ',
  },
  {
    href: '/shop?filterTypeCategory=male',
    label: 'Thời trang nam',
  },
  {
    href: '/shop?filterTypeCategory=unisex',
    label: 'Unisex',
  },
  {
    href: '/shop?filterTypeCategory=item',
    label: 'Phụ kiện',
  },
  {
    href: '/shop?filterTypeCategory=other',
    label: 'Khác',
  },
]
