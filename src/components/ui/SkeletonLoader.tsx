import { Skeleton } from '@mantine/core'

// Generic skeleton component
export const SkeletonLoader = ({ 
  width = '100%', 
  height = 20, 
  count = 1, 
  className = '' 
}: {
  width?: string | number
  height?: string | number
  count?: number
  className?: string
}) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} width={width} height={height} mb="sm" />
      ))}
    </div>
  )
}

// Product card skeleton
export const ProductCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
      <Skeleton height={200} mb="sm" />
      <Skeleton height={20} width="80%" mb="xs" />
      <Skeleton height={16} width="60%" mb="xs" />
      <Skeleton height={16} width="40%" />
    </div>
  )
}

// Navigation skeleton
export const NavigationSkeleton = () => {
  return (
    <div className="flex space-x-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} height={32} width={80} />
      ))}
    </div>
  )
}

// Hero section skeleton
export const HeroSkeleton = () => {
  return (
    <div className="w-full h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-center">
        <Skeleton height={40} width={300} mb="lg" />
        <Skeleton height={20} width={200} mb="md" />
        <Skeleton height={48} width={120} />
      </div>
    </div>
  )
}

// Category grid skeleton
export const CategoryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
          <Skeleton height={120} mb="sm" />
          <Skeleton height={16} width="70%" />
        </div>
      ))}
    </div>
  )
}

// List item skeleton
export const ListItemSkeleton = ({ count = 3 }: { count?: number }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 animate-pulse">
          <Skeleton height={40} width={40} />
          <div className="flex-1 space-y-2">
            <Skeleton height={16} width="80%" />
            <Skeleton height={14} width="60%" />
          </div>
        </div>
      ))}
    </div>
  )
}

// Form skeleton
export const FormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton height={16} width={120} mb="xs" />
        <Skeleton height={40} />
      </div>
      <div>
        <Skeleton height={16} width={100} mb="xs" />
        <Skeleton height={40} />
      </div>
      <div>
        <Skeleton height={16} width={80} mb="xs" />
        <Skeleton height={100} />
      </div>
      <Skeleton height={44} width={120} />
    </div>
  )
}

// Table skeleton
export const TableSkeleton = ({ rows = 5, columns = 4 }: { rows?: number, columns?: number }) => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex space-x-4 mb-4">
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton key={index} height={20} width={120} />
        ))}
      </div>
      
      {/* Rows */}
      <div className="space-y-2">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="flex space-x-4">
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton key={colIndex} height={40} width={120} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// Chat skeleton
export const ChatSkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
          <div className="max-w-xs">
            <Skeleton height={40} width={200} />
          </div>
        </div>
      ))}
    </div>
  )
}

// Dashboard widget skeleton
export const DashboardWidgetSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <Skeleton height={20} width={120} />
        <Skeleton height={16} width={40} />
      </div>
      <Skeleton height={32} width={80} mb="sm" />
      <Skeleton height={12} width="100%" />
    </div>
  )
}