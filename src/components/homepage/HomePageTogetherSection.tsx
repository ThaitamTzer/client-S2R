import Image from 'next/image'

export default function HomePageTogetherSection() {
  return (
    <>
      <div
        className="together-section relative mt-10 mb-20 w-full h-[250px] bg-contain bg-[center_96px] bg-no-repeat "
        style={{
          backgroundImage: 'url("/images/choose-price-bg.png")',
        }}
      >
        <div className="container mx-auto h-full w-[1200px] md:w-[1000px]">
          <div className="together_title text-2xl font-bold text-green-900 uppercase text-center ">
            <h1>
              Hãy cùng Share
              <span
                style={{
                  color: 'salmon',
                }}
              >
                2
              </span>
              Receive
            </h1>
          </div>
          <div className="together_desc text-sm font-bold text-center mt-2 mb-10">
            Tuần hoàn và kéo dài vòng đời của các sản phẩm thời trang đã qua sử dụng.
          </div>
          <div className="card-container flex justify-evenly items-center">
            <div className="together-card flex flex-col justify-center items-center w-[15%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/packet.png"
                  alt="packet"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
                Đồ cũ không có nghĩa là phải vứt đi
              </p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[13%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/shirt.svg"
                  alt="shirt"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
                Đồ cũ không có nghĩa là phải vứt đi
              </p>
            </div>
            <div className="together-card flex flex-col justify-center items-center w-[13%] text-center">
              <div className="card-img flex items-center justify-center p-3 bg-white rounded-md shadow-[0px_0px_10px_0px_#68d391] mb-3  max-w-36 w-full max-h-56">
                <Image
                  width={155}
                  height={155}
                  src="/images/replace.png"
                  alt="replace"
                  loading="lazy"
                  className="w-auto h-24"
                />
              </div>
              <p className="together-card-desc font-medium text-sm ">
                Đồ cũ không có nghĩa là phải vứt đi
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
