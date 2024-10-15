"use client";

export const HomePageHero = () => {
  return (
    <>
      <div className="relative mt-6 wrapper pointer-events-none">
        {/* Thêm margin-top nhẹ giữa nội dung và video */}
        <section className="relative w-full h-[40.25vw] bg-transparent">
          <div className="wrapper z-[999] absolute top-0 w-full h-full bg-transparent pointer-events:none ">
            <div className="w-full relative left-0 top-0  opacity-100 before:absolute before:top-0 before:left-0 h-full bg-transparent overflow-hidden">
              <div className="relative h-full bg-transparent">
                <div className="absolute w-full h-full block bg-transparent overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <div className="absolute w-screen h-screen -top-[25%] -bottom-[10%]">
                        <iframe
                          frameBorder={0}
                          src="https://www.youtube.com/embed/uyHgY2O__fY?autoplay=1&mute=1&loop=1&start=0&end=200&disablekb=1"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          className="absolute w-full h-full z-[995]"
                          style={{
                            top: "0",
                            left: "0",
                            width: "100vw", // Đặt chiều rộng của video là toàn bộ viewport
                            height: "100vh",
                            border: "none",
                            objectFit: "cover", // Kéo dãn video để bao phủ toàn bộ khung chứa
                          }}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};
