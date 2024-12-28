import dynamic from 'next/dynamic'

const ExChangeDrawer = dynamic(() => import('./exchangeDrawer'), {
  ssr: false,
})

export default function Exchange() {
  return <ExChangeDrawer />
}
