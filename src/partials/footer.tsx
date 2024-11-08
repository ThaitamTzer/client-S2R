import IconifyIcon from '@/components/icons'
import Image from 'next/image'

export default function Footer() {
  return (
    <>
      <div className="w-full bg-slate-100 overflow-hidden">
        <div className="container mx-auto px-2 md:px-16 py-4 md:py-10 w-full flex flex-wrap gap-2 md:gap-0 justify-between">
          <div className="footer-info md:w-1/4">
            <div className="w-full grid gap-3">
              <div>
                <h1 className="text-2xl md:text-4xl font-bold text-green-800 md:-ml-4">
                  Share
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
              <div className="infor-section flex items-start">
                <div className="icon flex items-start">
                  <IconifyIcon className="text-lg md:text-2xl" icon="mingcute:location-line" />
                </div>
                <div className="infor-content pl-2 text-sm md:text-lg">
                  15 Đường số 6, phường 15, quận Gò Vấp, Tp.HCM
                </div>
              </div>
              <div className="infor-section flex items-start">
                <div className="icon flex items-start">
                  <IconifyIcon className="text-lg md:text-2xl" icon="ic:outline-mail" />
                </div>
                <div className="infor-content pl-2 text-sm md:text-lg">share2recieve.support@gmail.com</div>
              </div>
            </div>
          </div>
          <div className="footer-about w-3/4 flex flex-wrap justify-between text-base">
            <div className="support-section">
              <div className="sp-title mb-2 md:mb-6">
                <h3 className="text-sm md:text-lg font-semibold">Hỗ trợ khách hàng</h3>
              </div>
              <ul className="sp-content font-normal text-sm md:text-lg space-y-2">
                <li className="sp-item">Hướng dẫn mua hàng Online</li>
                <li className="sp-item">Hình thức thanh toán</li>
                <li className="sp-item">Điều kiện cho tặng</li>
                <li className="sp-item">Quy trình xử lý quần áo</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-2 md:mb-6">
                <h3 className="text-sm md:text-lg font-semibold">Công ty</h3>
              </div>
              <ul className="sp-content font-normal text-sm md:text-lg space-y-2">
                <li className="sp-item">Về chúng tôi</li>
                <li className="sp-item">Điều khoản</li>
                <li className="sp-item">Chính sách bảo mật</li>
                <li className="sp-item">Trách nhiệm cộng đồng</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-2 md:mb-6">
                <h3 className="text-sm md:text-lg font-semibold">Câu chuyện đẹp</h3>
              </div>
              <ul className="sp-content font-normal text-sm md:text-lg space-y-2">
                <li className="sp-item">Túi ID</li>
                <li className="sp-item">Sứ mệnh</li>
                <li className="sp-item">Phong cách của bạn</li>
              </ul>
            </div>
            <div className="support-section">
              <div className="sp-title mb-2 md:mb-6">
                <h3 className="text-xs md:text-lg md:font-semibold">Kết nối với chúng tôi</h3>
              </div>
              <ul className="sp-content font-normal text-lg flex space-x-4">
                <li className="sp-item">
                  <Image src="/images/facebook-footer.png" alt="facebook" width={40} height={40} loading="lazy" />
                </li>
                <li className="sp-item">
                  <Image src="/images/instagram-footer.png" alt="instagram" width={40} height={40} loading="lazy" />
                </li>
                <li className="sp-item">
                  <Image src="/images/tiktok-footer.png" alt="tiktok" width={40} height={40} loading="lazy" />
                </li>
                <li className="sp-item">
                  <Image src="/images/youtube-footer.png" alt="youtube" width={40} height={40} loading="lazy" />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
