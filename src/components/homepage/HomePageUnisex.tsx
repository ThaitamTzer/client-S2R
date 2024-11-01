import Link from 'next/link'

const HomePageUnisex = () => {
  return (
    <>
      <div className="relative mt-5">
        <div className="text-center flex justify-center">
          <div className="flex w-[50%] items-center rounded-full">
            <div className="flex-1 border-b border-gray-300"></div>
            <Link href="shop?filterTypeCategory=unisex">
              <h2 className="m-6 group relative w-max text-black text-2xl font-bold leading-3 px-8 py-3 uppercase">
                Thời trang unisex
                <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
                <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-green-600 group-hover:w-3/6"></span>
              </h2>
            </Link>
            <div className="flex-1 border-b border-gray-300"></div>
          </div>
        </div>
        <div className=" relative w-full h-full">
          <Link href="shop?filterTypeCategory=unisex">
            <div
              className="w-full h-[500px] bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: 'url(/images/unisex-banner.jpg)',
              }}
            ></div>
          </Link>
        </div>
      </div>
    </>
  )
}

export default HomePageUnisex
